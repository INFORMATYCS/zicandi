DROP PROCEDURE sp_genera_lote_excel;
delimiter //

CREATE PROCEDURE sp_genera_lote_excel(OUT p_lote VARCHAR(200), OUT p_error INTEGER, OUT p_msg_error VARCHAR(200))
BEGIN
    DECLARE V_LOTE VARCHAR(50);
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;
    
	SET SQL_SAFE_UPDATES = 0;
	
	SET V_LOTE= SUBSTRING(CONCAT('04EX',DATE_FORMAT(NOW(),'%Y%m%d%H%i%s')), 1, 50);

	INSERT INTO lote_operacion_procesos
	SELECT 	0, 			
			V_LOTE, 
	        SUBSTRING(TCS.LOTE_REFERENCIA, 1, 20), 
	        NOW(), 
	        TCS.ID_ALMACEN, 
	        A.NOMBRE, 
	        TCS.CODIGO_UBICACION, 
	        TCS.ID_PRODUCTO,
	        TCS.CODIGO_PRODUCTO,
	        P.NOMBRE,
	        P.URL_IMAGEN,
	        CASE
				WHEN TCS.TIPO_MOVIMIENTO = 'RETIRO' THEN 'RET'
				WHEN TCS.TIPO_MOVIMIENTO = 'INGRESO' THEN 'ING'
				ELSE 'XXX'
			END TIPO_MOV,
	        TCS.CANTIDAD,
	        'P',
	        NULL,
	        NULL,
	        NOW(),
	        NOW()
	FROM temp_carga_stock TCS, almacen A, producto P
	WHERE TCS.ID_ALMACEN= A.ID_ALMACEN
	AND TCS.ID_PRODUCTO = P.ID_PRODUCTO
	AND TCS.ESTATUS = 'ACE';

	COMMIT;

	SET p_lote= V_LOTE;
	SET p_error = 0;
	set p_msg_error = 'satisfactory-execution';    
END;
//
	
delimiter ;