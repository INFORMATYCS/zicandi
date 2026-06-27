DROP PROCEDURE sp_meli_surtir_registra_mov;
delimiter //


CREATE DEFINER=`p-us-global-zicandi`@`%` PROCEDURE sp_meli_surtir_registra_mov( IN p_folio_full varchar(15),
											 IN p_id_surtir_config_envio_full int(10),
											 IN p_codigo_producto varchar(15),
											 IN p_codigo_ubicacion varchar(15),
											 IN p_total_piezas int(11),
	                                         OUT p_error INTEGER,
	                                         OUT p_msg_error VARCHAR(200))
BEGIN
	DECLARE v_saldo_disponible int(11);
	declare v_id_almacen	int(10);
	declare v_id_producto	int(10);
	declare v_id_surtir_indice_envio_full int(10);
	declare v_total_piezas_surtir int(11);
	declare v_total_piezas_surtidas int(11); 	
	declare v_total_piezas_surtidas_deta int(11);
	declare v_total_indice int(10);
	declare v_foto_stock_surtir varchar(50);
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;

	SET autocommit = 0;

	if p_total_piezas <= 0 then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Las piezas a procesar deben ser mayor a cero', MYSQL_ERRNO = 5000;
	end if;
	
	
	select mef.foto_stock_surtir into v_foto_stock_surtir
	from meli_envio_full mef 
	where mef.folio_full = p_folio_full;

	
	select disponible 
	into v_saldo_disponible
	from meli_surtir_foto_stock_envio_full msfsef  
	where msfsef.folio_full = v_foto_stock_surtir
	and msfsef.codigo_producto = p_codigo_producto
	and msfsef.codigo_ubicacion = p_codigo_ubicacion;

	if v_saldo_disponible is null then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Valida que el producto exista en la ubicacion', MYSQL_ERRNO = 5000;
	end if;

	IF p_total_piezas > v_saldo_disponible THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo insuficiente', MYSQL_ERRNO = 5000;
	END IF;

	
	select id_almacen into v_id_almacen from cat_ubica_producto cup where codigo = p_codigo_ubicacion;

	IF v_id_almacen is null THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe el almacen', MYSQL_ERRNO = 5001;
	END IF;

	
	select id_producto into v_id_producto from producto where codigo = p_codigo_producto;
	
	IF v_id_producto is null THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe el producto', MYSQL_ERRNO = 5002;
	END IF;	

	
	select id_surtir_indice_envio_full, total_piezas_surtir, total_piezas_surtidas
	into v_id_surtir_indice_envio_full, v_total_piezas_surtir, v_total_piezas_surtidas 
	from meli_surtir_config_envio_full
	where id_surtir_config_envio_full = p_id_surtir_config_envio_full;


	if p_total_piezas > (v_total_piezas_surtir - v_total_piezas_surtidas) then
		rollback;
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Se excede la cantidad de piezas requeridas', MYSQL_ERRNO = 5003;
	end if;


	
	insert into meli_surtir_deta_envio_full(id_surtir_deta_envio_full,folio_full,id_surtir_config_envio_full,id_producto,codigo_producto,id_almacen,codigo_ubicacion,total_piezas,created_at)
	values(
	0,
	p_folio_full,
	p_id_surtir_config_envio_full,
	v_id_producto,
	p_codigo_producto,
	v_id_almacen,
	p_codigo_ubicacion,
	p_total_piezas,
	now()
	);	

	COMMIT;

	
	call sp_meli_surtir_arrastre(p_folio_full, p_id_surtir_config_envio_full, @err, @msg);

	SET autocommit = 1;	
	SET p_error = 0;
	set p_msg_error = 'satisfactory-execution';
END;
//
	
delimiter ;