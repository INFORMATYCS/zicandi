DROP PROCEDURE sp_meli_validacion_final;
delimiter //
CREATE PROCEDURE sp_meli_validacion_final(IN p_folio_envio VARCHAR(50))
BEGIN
	DECLARE var_final INTEGER DEFAULT 0;
        
	DECLARE v_total_valida INTEGER;
    
    DECLARE v_id_publicacion VARCHAR(50);
    DECLARE v_total_prometido_meli INTEGER;
    DECLARE v_codigo_producto varchar(15);
    DECLARE v_nombre_producto varchar(75);
    DECLARE v_retiro_ubicacion_piezas decimal(19,2);
    DECLARE v_diferencia decimal(19,2);
    
    DECLARE cProcesa CURSOR FOR 
		SELECT id_publicacion_tienda, total_prometido_meli, codigo_producto, nombre_producto, IFNULL(piezas_retiro,0), total_prometido_meli-IFNULL(piezas_retiro,0) diferencia
		FROM (
			SELECT  id_publicacion_tienda, total_etiquetas * config_prod total_prometido_meli, codigo_producto, nombre_producto, SUM(mpr.retiro_ubicacion_piezas) piezas_retiro
			FROM meli_procesa_retiro mpr
			WHERE mpr.folio_full = p_folio_envio
			GROUP BY id_publicacion_tienda, total_etiquetas, codigo_producto, nombre_producto
		)X
		WHERE total_prometido_meli-IFNULL(piezas_retiro,0) <> 0;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final = 1;
    

    /*
	Total de etiquetas registradas en mercadolibre
	*/
	SELECT SUM(total_etiquetas) 
    INTO v_total_valida
    FROM meli_envio_full mef, meli_deta_envio_full mdef
	WHERE mef.id_meli_envio_full = mdef.id_meli_envio_full
	AND mef.folio_full = p_folio_envio;
    
    call sp_wLOG(CONCAT('Total de etiquetas mercadolibre: ', v_total_valida), "VAL");

	/*
	Total de productos cargados para procesar
	*/
	SELECT SUM(total_etiquetas) 
    INTO v_total_valida
    FROM (
	SELECT DISTINCT id_publicacion_tienda, total_etiquetas FROM meli_procesa_retiro
	WHERE folio_full = p_folio_envio
	)X;
    
    call sp_wLOG(CONCAT('Total de registros cargados para procesar: ', v_total_valida), "VAL");
    
    /*
	Detalla faltantes
	*/
    call sp_wLOG('Detalle de faltantes', "VAL");
	OPEN cProcesa;
	bucle: LOOP

		FETCH cProcesa INTO v_id_publicacion, v_total_prometido_meli, v_codigo_producto, v_nombre_producto, v_retiro_ubicacion_piezas, v_diferencia;
            
		IF var_final = 1 THEN
		  LEAVE bucle;
		END IF;
        
        call sp_wLOG(CONCAT(v_id_publicacion, ' [', v_codigo_producto, '] ', v_nombre_producto, '. Productos prometidos: ', v_total_prometido_meli, ', productos por retirar: ', v_retiro_ubicacion_piezas, '. Diferencia: ', v_diferencia), "VAL");
       

	END LOOP bucle;
	CLOSE cProcesa;
	
    COMMIT;

	
   
END;
//
	
delimiter ;