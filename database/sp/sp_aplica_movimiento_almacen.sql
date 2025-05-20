DROP PROCEDURE sp_aplica_movimiento_almacen;
delimiter //
CREATE PROCEDURE sp_aplica_movimiento_almacen(	IN p_id_producto INTEGER,
                                                    IN p_id_almacen INTEGER,
                                                    IN p_codigo_ubicacion VARCHAR(15),
                                                    IN p_tipo_movimiento VARCHAR(3),
                                                    IN p_cantidad INTEGER,
                                                    IN p_lote_referencia VARCHAR(50),
                                                    OUT p_id_movimiento_almacen INTEGER,
                                                    OUT p_error INTEGER, 
                                                    OUT p_msg_error VARCHAR(200))
BEGIN
	DECLARE v_conteo_valida INTEGER;
    DECLARE v_valida_stock_ubica DECIMAL(8,2);
	DECLARE v_id_stock_producto INTEGER;
	DECLARE v_stock DECIMAL(8,2);
	DECLARE v_nuevo_stock DECIMAL(8,2);
	DECLARE v_stock_ubica DECIMAL(8,2);
	DECLARE v_error_arrastre VARCHAR(500);


	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;


	
	SELECT COUNT(*) into v_conteo_valida FROM almacen WHERE id_almacen = p_id_almacen AND xstatus = '1';
	IF v_conteo_valida<=0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Almacen no localizado', MYSQL_ERRNO = 5001;
	END IF;

	
	SELECT COUNT(*) into v_conteo_valida FROM producto WHERE id_producto = id_producto AND xstatus = '1';
	IF v_conteo_valida<=0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Producto no localizado', MYSQL_ERRNO = 5002;
	END IF;

	
	SELECT COUNT(*) into v_conteo_valida FROM cat_ubica_producto WHERE codigo = p_codigo_ubicacion AND id_almacen = p_id_almacen AND xstatus = '1';
	IF v_conteo_valida<=0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ubicacion no existe, no esta ligada al almacen seleccionado o no esta en xstatus = 1', MYSQL_ERRNO = 5003;
	END IF;	
    
	
	IF p_tipo_movimiento <> 'RET' AND p_tipo_movimiento <> 'ING' THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de movimiento invalido, solo se permite RET e ING', MYSQL_ERRNO = 5004;
	END IF;
	IF p_cantidad <= 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad de piezas a ingresar o retirar debe ser mayor a 0 (cero)', MYSQL_ERRNO = 5005;SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad de piezas a ingresar o retirar debe ser mayor a 0 (cero)', MYSQL_ERRNO = 5005;
	END IF;

	
	call sp_arrastre_stock_almacen(p_id_producto, p_id_almacen, @err, @msg);

	IF @err <> 0 THEN
		SET v_error_arrastre = CONCAT('Error al procesar el arrastre de saldos: ', @msg);
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = v_error_arrastre, MYSQL_ERRNO = 5007;
	END IF;

	
	SELECT COUNT(*) INTO v_conteo_valida
	FROM stock_producto
	WHERE id_almacen = p_id_almacen AND id_producto = p_id_producto;

	IF v_conteo_valida=0 THEN
		INSERT INTO stock_producto(id_almacen, id_producto, stock, disponible, retenido)
		VALUES(p_id_almacen, p_id_producto, 0, 0, 0);	
	END IF;

	SELECT id_stock_producto, stock 
	INTO v_id_stock_producto, v_stock
	FROM stock_producto
	WHERE id_almacen = p_id_almacen AND id_producto = p_id_producto;

	IF p_tipo_movimiento = 'RET' THEN
		SET v_nuevo_stock= v_stock - p_cantidad;
	ELSE    
		SET v_nuevo_stock= v_stock + p_cantidad;
	END IF;

	IF v_nuevo_stock < 0 THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente', MYSQL_ERRNO = 5006;
	END IF;
    
     
	IF p_tipo_movimiento = 'RET' THEN		        
        SELECT SUM(stock)  
        INTO v_valida_stock_ubica
        FROM stock_ubica_producto
		WHERE codigo_ubica = p_codigo_ubicacion
		AND id_producto = p_id_producto
		AND id_stock_producto= v_id_stock_producto;
        			
        IF v_valida_stock_ubica IS null THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente en la ubicacion, no se localizo la ubicacion', MYSQL_ERRNO = 5008;
        ELSEIF v_valida_stock_ubica < p_cantidad THEN
			SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente en la ubicacion', MYSQL_ERRNO = 5009;
        END IF;
    
	END IF;

	
	INSERT INTO movimiento_almacen(id_almacen,id_producto,tipo_movimiento,fecha_aplicacion,cantidad,stock,ubicacion,lote_referencia,estatus_movimientos)
	VALUES(
		p_id_almacen,
		p_id_producto,
		p_tipo_movimiento,
		CURDATE(),
		p_cantidad,
		v_nuevo_stock,
		p_codigo_ubicacion,
		p_lote_referencia,
		'A'
	);
    SET p_id_movimiento_almacen = LAST_INSERT_ID();

	
	IF p_tipo_movimiento = 'RET' THEN
		UPDATE stock_producto SET stock= v_nuevo_stock, disponible= v_nuevo_stock, ultima_salida= CURDATE()
		WHERE id_stock_producto = v_id_stock_producto;
	ELSE    
		UPDATE stock_producto SET stock= v_nuevo_stock, disponible= v_nuevo_stock, ultima_entrada= CURDATE()
		WHERE id_stock_producto = v_id_stock_producto;
	END IF;

	
	SELECT COUNT(*) INTO v_conteo_valida FROM stock_ubica_producto
	WHERE codigo_ubica = p_codigo_ubicacion
	AND id_producto = p_id_producto
	AND id_stock_producto= v_id_stock_producto;

	IF v_conteo_valida=0 THEN
		INSERT INTO stock_ubica_producto(id_stock_producto, id_producto, codigo_ubica, stock)
		VALUES(v_id_stock_producto, p_id_producto, p_codigo_ubicacion, p_cantidad);
	ELSE
		SELECT SUM(IF(tipo_movimiento='RET', cantidad*-1, cantidad)) stock
		INTO v_stock_ubica
		FROM movimiento_almacen
		WHERE id_producto= p_id_producto
		AND id_almacen = p_id_almacen
		AND ubicacion = p_codigo_ubicacion
		AND estatus_movimientos = 'A';

		UPDATE stock_ubica_producto SET stock=v_stock_ubica WHERE id_stock_producto= v_id_stock_producto AND id_producto= p_id_producto AND codigo_ubica=p_codigo_ubicacion;
	END IF;

	
	DELETE FROM stock_ubica_producto WHERE id_stock_producto= v_id_stock_producto AND id_producto= p_id_producto AND codigo_ubica=p_codigo_ubicacion AND stock=0;

	COMMIT;

END;
//
	
delimiter ;