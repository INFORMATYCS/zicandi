DROP PROCEDURE sp_arrastre_stock_almacen;
delimiter //
CREATE DEFINER=`p-us-global-zicandi`@`%` PROCEDURE sp_arrastre_stock_almacen(		IN p_id_producto INTEGER, 
													IN p_id_almacen INTEGER,                                                    
                                                    OUT p_error INTEGER, 
                                                    OUT p_msg_error VARCHAR(200))
BEGIN
	DECLARE v_stock_arrastre DECIMAL(8,2);
    declare v_id_movimiento_almacen INTEGER;
    DECLARE v_stock DECIMAL(8,2);
    DECLARE v_cantidad DECIMAL(8,2);    
    
	DECLARE var_final_sprod INTEGER DEFAULT 0;    	

	DECLARE cProcesaMovimientoAlmacen CURSOR FOR     
			SELECT id_movimiento_almacen, IF(tipo_movimiento='RET', cantidad*-1, cantidad) cantidad, stock 
            FROM movimiento_almacen
			WHERE id_producto= p_id_producto
			AND id_almacen = p_id_almacen
			AND estatus_movimientos = 'A'
			ORDER BY fecha_aplicacion ASC, id_movimiento_almacen ASC;
            
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final_sprod = 1;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;

	SET v_stock_arrastre=0;

	OPEN cProcesaMovimientoAlmacen;
	bucle: LOOP

		FETCH cProcesaMovimientoAlmacen INTO v_id_movimiento_almacen, v_cantidad, v_stock;            

		IF var_final_sprod = 1 THEN
		  LEAVE bucle;
		END IF;
        
        SET v_stock_arrastre= v_stock_arrastre + v_cantidad;
        IF v_stock_arrastre <> v_stock THEN
			UPDATE movimiento_almacen SET stock= v_stock_arrastre WHERE id_movimiento_almacen = v_id_movimiento_almacen;
        END IF;
        
        UPDATE stock_producto SET stock=v_stock_arrastre, disponible=v_stock_arrastre, retenido=0 
        WHERE id_almacen = p_id_almacen
		AND id_producto = p_id_producto;	

	END LOOP bucle;
	CLOSE cProcesaMovimientoAlmacen;      

	SET p_error = 0;
END;
//
	
delimiter ;