DROP PROCEDURE sp_resumen_movimiento_prod;
delimiter //

CREATE PROCEDURE sp_resumen_movimiento_prod(		IN p_id_producto INTEGER,                                                 
                                                    OUT p_error INTEGER, 
                                                    OUT p_msg_error VARCHAR(200))
BEGIN
	DECLARE v_error_arrastre VARCHAR(500);
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;
    
	SET SQL_SAFE_UPDATES = 0;
    
    
    UPDATE movimiento_almacen SET estatus_movimientos='X' WHERE id_producto=p_id_producto AND estatus_movimientos = 'A';
    
    
    INSERT INTO movimiento_almacen
	SELECT 0, id_almacen,  id_producto, 'ING', now(), total, 0, ubicacion, concat('resumen-',DATE_FORMAT(now(), "%d%m%Y")) lote, 'A', SYSDATE(), SYSDATE()
	FROM (
		SELECT id_almacen, ubicacion, id_producto, sum(if(tipo_movimiento = 'RET', cantidad*-1,cantidad)) total
		FROM movimiento_almacen
		WHERE id_producto=p_id_producto
		AND estatus_movimientos='X'
		GROUP BY id_almacen, ubicacion, id_producto
	)x
	WHERE x.total > 0;
    
    
    DELETE FROM movimiento_almacen WHERE id_producto = p_id_producto AND estatus_movimientos = 'X';

	
	DELETE FROM stock_ubica_producto where id_producto = p_id_producto;
    
    
    call sp_arrastre_stock_producto(p_id_producto);
    
    
    
    call sp_arrastre_stock_almacen(p_id_producto, 20, @err, @msg);
    IF @err <> 0 THEN
		SET v_error_arrastre = CONCAT('Error al procesar el arrastre de saldos almacen 20: ', @msg);
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_arrastre, MYSQL_ERRNO = 5007;
	END IF;
    
    
    call sp_arrastre_stock_almacen(p_id_producto, 15, @err, @msg);
    IF @err <> 0 THEN
		SET v_error_arrastre = CONCAT('Error al procesar el arrastre de saldos almacen 15: ', @msg);
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_arrastre, MYSQL_ERRNO = 5007;
	END IF;
    
	SET p_error = 0;
END;
//
	
delimiter ;