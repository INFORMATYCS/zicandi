DROP PROCEDURE sp_aplica_lote_operacion;
delimiter //

CREATE PROCEDURE sp_aplica_lote_operacion(		IN p_id_lote VARCHAR(50),
                                                    OUT p_error INTEGER, 
                                                    OUT p_msg_error VARCHAR(200))
BEGIN	    
    DECLARE v_id_lote_operacion INTEGER;
    DECLARE v_id_almacen INTEGER;
    DECLARE v_codigo_ubicacion VARCHAR(50);
    DECLARE v_id_producto INTEGER;
    DECLARE v_tipo_movimiento VARCHAR(3);
    DECLARE v_cantidad DECIMAL(8,2);
    DECLARE v_err_aplica VARCHAR(500);
    
    
	DECLARE var_final_sprod INTEGER DEFAULT 0;    	

	DECLARE cProcesaMovimientoAlmacen CURSOR FOR  
			SELECT id_lote_operacion, id_almacen, codigo_ubicacion, id_producto, tipo_movimiento, cantidad 
            FROM lote_operacion_procesos 
            WHERE lote_referencia = p_id_lote
            AND estado = 'P'
            ORDER BY tipo_movimiento ASC;

	DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final_sprod = 1;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;

	UPDATE lote_operacion_procesos SET estado='P' WHERE lote_referencia = p_id_lote AND estado = 'E';

	OPEN cProcesaMovimientoAlmacen;
	bucle: LOOP

		FETCH cProcesaMovimientoAlmacen INTO v_id_lote_operacion, v_id_almacen, v_codigo_ubicacion, v_id_producto, v_tipo_movimiento, v_cantidad;

		IF var_final_sprod = 1 THEN
		  LEAVE bucle;
		END IF;
        
        
		call sp_aplica_movimiento_almacen(v_id_producto, v_id_almacen, v_codigo_ubicacion, v_tipo_movimiento, v_cantidad, p_id_lote, @p_id_movimiento_almacen, @err, @msg);        	

		IF @err <> 0 THEN
			SET v_err_aplica = CONCAT('sp_aplica_movimiento_almacen: ', @msg);
			UPDATE lote_operacion_procesos SET msg_error=v_err_aplica, estado='E' WHERE id_lote_operacion = v_id_lote_operacion;
		ELSE
			UPDATE lote_operacion_procesos SET msg_error=NULL, estado='A', id_movimiento_almacen=@p_id_movimiento_almacen WHERE id_lote_operacion = v_id_lote_operacion;
        END IF;

	END LOOP bucle;
	CLOSE cProcesaMovimientoAlmacen;      

	SET p_error = 0;
END;
//
	
delimiter ;