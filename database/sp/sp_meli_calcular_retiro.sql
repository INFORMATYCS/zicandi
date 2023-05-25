DROP PROCEDURE sp_meli_calcular_retiro;
delimiter //
CREATE PROCEDURE sp_meli_calcular_retiro(
    IN p_folio_envio VARCHAR(50))    
BEGIN
    DECLARE var_final INTEGER DEFAULT 0;	
    DECLARE v_resultado_carga_inicial INTEGER;
    DECLARE v_resultado_procesa_prod INTEGER;
    DECLARE v_codigo_producto varchar(15);
    DECLARE v_prioridad INTEGER;
    
    DECLARE cProcesa CURSOR FOR 
		SELECT codigo_producto, prioridad FROM meli_procesa_retiro_indice
		WHERE folio_full = p_folio_envio
		ORDER BY prioridad;
    
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final = 1;
    
    call sp_wLOG('truncate table log_sp_global', "INFO");
    truncate table log_sp_global;
    
    call sp_wLOG(CONCAT('Inicia calculo retiro stock para el folio: ',p_folio_envio), "INFO");
    
    call sp_wLOG('Desactiva SQL_SAFE_UPDATES', "INFO");
    SET SQL_SAFE_UPDATES = 0;        
    
    /*
    Realiza la carga inicial de informacion y calcula las primeras estadisticas
    */
    CALL sp_meli_carga_inicia_info(p_folio_envio, v_resultado_carga_inicial);
    
    /*
    Comienza con el calculo
    */
    call sp_wLOG('Inicia calculo del retiro por producto', "INFO");
    OPEN cProcesa;
	bucle: LOOP

		FETCH cProcesa INTO v_codigo_producto, v_prioridad;
            

		IF var_final = 1 THEN
		  LEAVE bucle;
		END IF;
        
       call sp_meli_procesa_producto(p_folio_envio,v_codigo_producto, v_resultado_procesa_prod);

	END LOOP bucle;
	CLOSE cProcesa;
    
    /*
    Validaciones finales
    */    
    call sp_meli_validacion_final(p_folio_envio);
    
    call sp_wLOG('Termina proceso', "INFO");    
END;
//
	
delimiter ;