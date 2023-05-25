DROP PROCEDURE sp_meli_carga_inicia_info;
delimiter //
CREATE PROCEDURE sp_meli_carga_inicia_info(IN p_folio_envio VARCHAR(50), OUT p_resultado INTEGER)
BEGIN
    
    DECLARE var_final INTEGER DEFAULT 0;	
    DECLARE var_final2 INTEGER DEFAULT 0;	
    
    DECLARE v_id INTEGER;
	DECLARE v_id_publicacion VARCHAR(50);
	DECLARE v_total_etiquetas INTEGER;	
    DECLARE v_config_prod	INTEGER;
    DECLARE v_total_productos INTEGER;
    DECLARE v_codigo_producto varchar(15);
    DECLARE v_nombre_producto varchar(75);
    DECLARE v_stock_codigo_ubica varchar(20);
    DECLARE v_stock_piezas	decimal(19,2);
    DECLARE v_retiro_ubicacion_est INTEGER;
    DECLARE v_retiro_producto_ubica_est INTEGER;
    DECLARE v_retiro_ubicacion_piezas decimal(19,2);
    DECLARE v_count_gral INTEGER;

    DECLARE v_mensaje VARCHAR(500);
    DECLARE v_estatus VARCHAR(3);
    
    DECLARE cProcesa CURSOR FOR 
		SELECT id, id_publicacion_tienda, total_etiquetas, config_prod, total_productos, codigo_producto, nombre_producto, stock_codigo_ubica, stock_piezas, retiro_ubicacion_piezas
		FROM meli_procesa_retiro
        WHERE folio_full = p_folio_envio;    
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final = 1;
   
   call sp_wLOG('Inicia carga inicial de informacion', "INFO");
   /*
    PASO 1:
    Inserta indice de productos e informacion a procesar
    */    
    delete from meli_procesa_retiro where folio_full = p_folio_envio;        
	insert into meli_procesa_retiro (id_meli_envio_full,tienda,folio_full,codigo_barras_full,id_publicacion_tienda,total_etiquetas,config_prod,total_productos,codigo_producto,nombre_producto,stock_codigo_ubica,stock_piezas)
	SELECT 
		mef.id_meli_envio_full AS id_meli_envio_full,
		ct.usuario AS tienda,
		mef.folio_full AS folio_full,
		mdef.codigo_barras_full AS codigo_barras_full,
		mdef.id_publicacion_tienda AS id_publicacion_tienda,
		mdef.total_etiquetas AS total_etiquetas,
		cp.cantidad AS config,
		mdef.total_etiquetas * cp.cantidad AS total_productos,
		pro.codigo AS codigo,
		pro.nombre AS nombre,
		sup.codigo_ubica AS codigo_ubica,
		sup.stock AS stock
	FROM meli_envio_full mef
	JOIN meli_deta_envio_full mdef ON mef.id_meli_envio_full = mdef.id_meli_envio_full
	JOIN publicacion pub ON mdef.id_publicacion = pub.id_publicacion
	JOIN cuenta_tienda ct ON pub.id_cuenta_tienda = ct.id_cuenta_tienda
	JOIN config_publicacion cp ON pub.id_publicacion = cp.id_publicacion
	JOIN producto pro ON cp.id_producto = pro.id_producto
	LEFT JOIN stock_ubica_producto sup ON sup.id_producto = pro.id_producto
	WHERE mef.folio_full = p_folio_envio;   
    
    SELECT COUNT(*) INTO v_count_gral FROM meli_procesa_retiro WHERE folio_full = p_folio_envio;   
    call sp_wLOG(CONCAT('Paso 1: Se cargaron un total de ', v_count_gral, ' registros en meli_procesa_retiro'), "COUNT");
    
    /*
    PASO 2:
    Crea el indice de productos
    */
    DELETE FROM meli_procesa_retiro_indice WHERE folio_full = p_folio_envio;
    COMMIT;
    
    INSERT INTO meli_procesa_retiro_indice(folio_full, codigo_producto)
	SELECT distinct folio_full, codigo_producto FROM meli_procesa_retiro
	WHERE folio_full = p_folio_envio;
    
    SELECT COUNT(*) INTO v_count_gral FROM meli_procesa_retiro_indice WHERE folio_full = p_folio_envio;   
    call sp_wLOG(CONCAT('Paso 2: Carga del indice exitosa, con un total de ', v_count_gral, ' codigos de productos en meli_procesa_retiro_indice'), "COUNT");
    
    /*
    PASO 3:
    Calcula las primeras dos estadisticas:
    - retiro_ubicacion_est
    - retiro_producto_ubica_est
    */
    call sp_wLOG('Paso 3: Comienza calculo de las estadisticas: retiro_ubicacion_est y retiro_producto_ubica_est', "INFO");
	OPEN cProcesa;
	bucle: LOOP

		FETCH cProcesa INTO v_id, v_id_publicacion, v_total_etiquetas, v_config_prod, v_total_productos, v_codigo_producto, v_nombre_producto, v_stock_codigo_ubica, v_stock_piezas, v_retiro_ubicacion_piezas;
            

		IF var_final = 1 THEN
		  LEAVE bucle;
		END IF;
        
        SET v_estatus = 'OK';
        SET v_mensaje = '';
        
        
        /*
			Calcula retiro_ubicacion_est
			Cuenta la cantidad de veces que aparecer la ubicacion en todo el lote
            Objetivo: Entre mas veces aparesca la ubicacion, tiene mayor puntaje para usarse
        */
        SELECT count(*) 
        into v_retiro_ubicacion_est
        FROM meli_procesa_retiro
        WHERE folio_full = p_folio_envio
        AND stock_codigo_ubica = v_stock_codigo_ubica;
        
        /*
			Calcula retiro_producto_ubica_est
			Cuenta la cantidad de ubicaciones en las que existe el producto
            Objetivo: 	Sirve para priorizar la ubicacion, entre mas chico sea el valor seran menos opciones a elegir
						Cuando el valor es 1 (uno) entonces de esa ubicacion se retiran las piezas en automatico
        */
        SELECT count(*) 
        into v_retiro_producto_ubica_est
        FROM meli_procesa_retiro
        WHERE folio_full = p_folio_envio
        AND codigo_producto = v_codigo_producto;
                
        
        
		UPDATE meli_procesa_retiro
        SET retiro_ubicacion_est = v_retiro_ubicacion_est,
        retiro_producto_ubica_est = v_retiro_producto_ubica_est
        WHERE id = v_id;


	END LOOP bucle;
	CLOSE cProcesa;
	
    COMMIT;

	/*
    PASO 4:
    En base a las estadisticas da prioridad al codigo del producto    
    */
    call sp_wLOG('Paso 4: En base a las estadisticas da prioridad al codigo del producto en meli_procesa_retiro_indice.prioridad', "INFO");
    BEGIN
		
		DECLARE v_stock_codigo_ubica varchar(20);
		DECLARE v_retiro_ubicacion_est INTEGER;
        DECLARE v_prioridad INTEGER;
		
		 DECLARE cPrioridad CURSOR FOR 
			SELECT DISTINCT stock_codigo_ubica, retiro_ubicacion_est 
			FROM meli_procesa_retiro
			WHERE folio_full = p_folio_envio
			ORDER BY 2 desc;
		
		DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final2 = 1;
        
        SET v_prioridad = 1;
		OPEN cPrioridad;
		bucle: LOOP

			FETCH cPrioridad INTO v_stock_codigo_ubica, v_retiro_ubicacion_est ;
				

			IF var_final2 = 1 THEN
			  LEAVE bucle;
			END IF;
            
            UPDATE meli_procesa_retiro_indice SET PRIORIDAD = v_prioridad
			WHERE folio_full = p_folio_envio
			AND codigo_producto IN (
				SELECT DISTINCT codigo_producto FROM meli_procesa_retiro
				WHERE folio_full = p_folio_envio
				AND stock_codigo_ubica = v_stock_codigo_ubica
			);
		 
         
			SET v_prioridad = v_prioridad + 1;

		END LOOP bucle;
		CLOSE cPrioridad;
    END;

    commit;
   
END;
//
	
delimiter ;