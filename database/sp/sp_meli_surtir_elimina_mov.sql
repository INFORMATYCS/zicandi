DROP PROCEDURE sp_meli_surtir_elimina_mov;
delimiter //
CREATE PROCEDURE sp_meli_surtir_elimina_mov( IN p_folio_full varchar(15),
											 IN p_id_surtir_deta_envio_full int(10),
	                                         OUT p_error INTEGER,
	                                         OUT p_msg_error VARCHAR(200))
BEGIN
	DECLARE v_codigo_producto VARCHAR(15);
	DECLARE v_codigo_ubicacion VARCHAR(15);
	DECLARE v_total_piezas int(11);
	DECLARE v_id_surtir_config_envio_full int(11);
	DECLARE v_foto_stock_surtir varchar(50);

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;

	SET autocommit = 0;

	
	select  codigo_ubicacion, codigo_producto, id_surtir_config_envio_full  
	into v_codigo_ubicacion, v_codigo_producto, v_id_surtir_config_envio_full
	from meli_surtir_deta_envio_full
	where id_surtir_deta_envio_full = p_id_surtir_deta_envio_full
	and folio_full = p_folio_full;

	if v_id_surtir_config_envio_full is null then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontro el detalle (id_surtir_deta_envio_full)', MYSQL_ERRNO = 5000;
	end if;

	
	DELETE from meli_surtir_deta_envio_full 
	WHERE id_surtir_deta_envio_full = p_id_surtir_deta_envio_full and folio_full = p_folio_full;

	
	select mef.foto_stock_surtir into v_foto_stock_surtir
	from meli_envio_full mef 
	where mef.folio_full = p_folio_full;

	
	
	select sum(total_piezas) 
	INTO v_total_piezas
	from meli_surtir_deta_envio_full
	where folio_full in (select folio_full from meli_envio_full where foto_stock_surtir= v_foto_stock_surtir)
	and codigo_ubicacion = v_codigo_ubicacion
	and codigo_producto = v_codigo_producto;

	
	update 	meli_surtir_foto_stock_envio_full msfsef
	set 	msfsef.retenido = v_total_piezas,
			msfsef.disponible = msfsef.stock - if(v_total_piezas is null, 0, v_total_piezas)
	where msfsef.folio_full = v_foto_stock_surtir
	and msfsef.codigo_producto = v_codigo_producto
	and msfsef.codigo_ubicacion = v_codigo_ubicacion;

	COMMIT;

	
	call sp_meli_surtir_arrastre(p_folio_full, v_id_surtir_config_envio_full, @err, @msg);
	
	SET autocommit = 1;

	SET p_error = 0;
	set p_msg_error = 'satisfactory-execution';
END;
//
	
delimiter ;