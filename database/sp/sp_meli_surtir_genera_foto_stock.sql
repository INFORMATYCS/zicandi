DROP PROCEDURE sp_meli_surtir_genera_foto_stock;
delimiter //
CREATE PROCEDURE sp_meli_surtir_genera_foto_stock(	IN p_id_folio_full VARCHAR(50),
													IN p_name VARCHAR(50),
	                                                OUT p_error INTEGER, 
	                                                OUT p_msg_error VARCHAR(200))
BEGIN
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;
	
	delete from meli_surtir_foto_stock_envio_full where folio_full = p_name;

	
	INSERT INTO meli_surtir_foto_stock_envio_full
	select 0, p_name, if(cup.id_almacen is null,0,cup.id_almacen) , cup.codigo, sup.id_producto, p.codigo, sup.stock, 0, sup.stock, now(),null
	from stock_ubica_producto sup, cat_ubica_producto cup, producto p
	where sup.codigo_ubica = cup.codigo
	and sup.id_producto = p.id_producto 
	and cup.id_almacen is not null
	and sup.stock <> 0;

	UPDATE meli_envio_full SET foto_stock_surtir = p_name 
	WHERE folio_full= p_id_folio_full;

	commit;
	
	SET p_error = 0;
	set p_msg_error = 'satisfactory-execution';
END;
//
	
delimiter ;