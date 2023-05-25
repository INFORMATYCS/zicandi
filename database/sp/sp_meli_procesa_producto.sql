DROP PROCEDURE sp_meli_procesa_producto;
delimiter //
CREATE PROCEDURE sp_meli_procesa_producto(IN p_folio_envio VARCHAR(50), IN p_codigo_producto VARCHAR(25), OUT p_resultado INTEGER)
BEGIN
    
    DECLARE var_final INTEGER DEFAULT 0;	
    DECLARE v_id INTEGER;
    DECLARE v_acum_total_productos INTEGER DEFAULT -1000;
    DECLARE v_total_productos_usar_ubica INTEGER;
    DECLARE v_total_productos INTEGER;
    DECLARE v_stock_codigo_ubica varchar(20);
    DECLARE v_stock_piezas decimal(19,2);
    DECLARE v_retiro_ubicacion_est INTEGER;
    DECLARE v_estatus varchar(3);
	
    DECLARE cProcesa CURSOR FOR 
		SELECT mpr.id, mpr.total_productos, mpr.stock_codigo_ubica, mpr.stock_piezas, mpr.retiro_ubicacion_est
        FROM meli_procesa_retiro mpr, meli_procesa_retiro_indice mpri
		WHERE mpri.folio_full = mpr.folio_full
		AND mpri.codigo_producto = mpr.codigo_producto
		AND mpr.folio_full = p_folio_envio
		AND mpr.codigo_producto = p_codigo_producto
		AND mpri.estatus = 'PEN'
		ORDER BY mpr.retiro_ubicacion_uso_est DESC, mpr.retiro_ubicacion_est DESC;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final = 1;
   
    call sp_wLOG(CONCAT('Codigo del producto: ',p_codigo_producto), "INFO");
   
	OPEN cProcesa;
	bucle: LOOP

		FETCH cProcesa INTO v_id, v_total_productos, v_stock_codigo_ubica, v_stock_piezas, v_retiro_ubicacion_est;

		IF var_final = 1 THEN
		  LEAVE bucle;
		END IF;
        
        SET v_estatus = 'TER'; 
        SET v_total_productos_usar_ubica = 0;
        
        IF v_acum_total_productos = -1000 THEN
			SET v_acum_total_productos = v_total_productos;
        END IF;
        
        IF v_stock_piezas >= v_acum_total_productos THEN        			
            SET v_total_productos_usar_ubica = v_acum_total_productos;
            SET v_acum_total_productos = 0;                       
        ELSE
			SET v_acum_total_productos = v_acum_total_productos - v_stock_piezas;
            SET v_total_productos_usar_ubica = v_stock_piezas;
        END IF;
            
        /*
        Actualiza
        */
        UPDATE meli_procesa_retiro SET retiro_ubicacion_piezas = v_total_productos_usar_ubica
        WHERE folio_full = p_folio_envio
        AND codigo_producto = p_codigo_producto
        AND id = v_id;
        /*
        Actualiza la estadistica de uso
        Objetivo: Saber si la ubicacion ya fue utilizada y por ende dar mas prioridad
        */
        UPDATE meli_procesa_retiro SET retiro_ubicacion_uso_est = IFNULL(retiro_ubicacion_uso_est,0) + 1
        WHERE folio_full = p_folio_envio
        AND stock_codigo_ubica = v_stock_codigo_ubica;

	END LOOP bucle;
	CLOSE cProcesa;
   
	/*
    En caso de faltar piezas
    */
    IF v_acum_total_productos > 0 THEN
		UPDATE meli_procesa_retiro SET mensaje = CONCAT('Faltan ', v_acum_total_productos ,'piezas del producto'), estatus = 'ERR'
        WHERE folio_full = p_folio_envio
        AND codigo_producto = p_codigo_producto
        AND id = v_id;
        
        call sp_wLOG(CONCAT('Faltan ', v_acum_total_productos ,'piezas del producto'), "WAR");
    END IF;
    
    /*
    Marca el producto como procesado
    */
	UPDATE meli_procesa_retiro_indice SET estatus = 'TER'
    WHERE folio_full = p_folio_envio
    AND codigo_producto = p_codigo_producto;
   
END;
//
	
delimiter ;