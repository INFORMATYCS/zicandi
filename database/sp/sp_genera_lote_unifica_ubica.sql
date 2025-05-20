DROP PROCEDURE sp_genera_lote_unifica_ubica;
delimiter //
CREATE PROCEDURE sp_genera_lote_unifica_ubica(	IN p_ubica_origen VARCHAR(200), 
													IN p_ubica_destino VARCHAR(200), 
													OUT p_lote VARCHAR(200), 
													OUT p_error INTEGER, 
													OUT p_msg_error VARCHAR(200))
BEGIN
    DECLARE V_LOTE VARCHAR(50);
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;
    
	SET SQL_SAFE_UPDATES = 0;
	
	SET V_LOTE= SUBSTRING(CONCAT('04UN',DATE_FORMAT(NOW(),'%Y%m%d%H%i%s')), 1, 50);

	INSERT INTO lote_operacion_procesos
	SELECT * 
	FROM (
	SELECT 	0, 
			V_LOTE lote, 
			CONCAT(p_ubica_origen,' to ',p_ubica_destino) ref1, 
			NOW() b,
			a.id_almacen,
			a.nombre almacen,
			cup.codigo ubicacion,
			p.id_producto,
			p.codigo,
			p.nombre,
			p.url_imagen,
			'RET' tipo,
			sup.stock,
			'P' estado,
			null x,
			null y,
			NOW() z,
			NOW() a
	FROM stock_ubica_producto sup, producto p, cat_ubica_producto cup, almacen a 
	WHERE sup.id_producto = p.id_producto
	AND sup.codigo_ubica = cup.codigo
	AND cup.id_almacen = a.id_almacen 
	AND sup.codigo_ubica = p_ubica_origen
	UNION ALL
	SELECT 	0, 
			V_LOTE lote, 
			CONCAT(p_ubica_origen,' to ',p_ubica_destino) ref1, 
			NOW() b,
			ad.id_almacen,
			ad.nombre almacen,
			cupd.codigo ubicacion,
			p.id_producto,
			p.codigo,
			p.nombre,
			p.url_imagen,
			'ING' tipo,
			sup.stock,
			'P' estado,
			null x,
			null y,
			NOW() z,
			NOW() a
	FROM stock_ubica_producto sup, producto p, cat_ubica_producto cup, almacen a, cat_ubica_producto cupd, almacen ad  
	WHERE sup.id_producto = p.id_producto
	AND sup.codigo_ubica = cup.codigo
	AND cup.id_almacen = a.id_almacen
	AND cupd.id_almacen = ad.id_almacen
	AND cupd.codigo = p_ubica_destino
	AND sup.codigo_ubica = p_ubica_origen
	)x
	ORDER BY x.id_producto, x.tipo DESC;

	COMMIT;

	SET p_lote= V_LOTE;
	SET p_error = 0;
	set p_msg_error = 'satisfactory-execution';    
END;
//
	
delimiter ;