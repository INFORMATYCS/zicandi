DROP PROCEDURE sp_meli_surtir_arrastre;
delimiter //
CREATE PROCEDURE sp_meli_surtir_arrastre( IN p_folio_full varchar(15),
										 IN p_id_surtir_config_envio_full int(10),
	                                     OUT p_error INTEGER,
	                                     OUT p_msg_error VARCHAR(200))
BEGIN
	DECLARE v_codigo_producto VARCHAR(15);
	DECLARE v_codigo_ubicacion VARCHAR(15);
	DECLARE v_total_piezas_surtidas_deta int(11);
	DECLARE v_id_surtir_indice_envio_full int(10);
	DECLARE v_total_piezas_surtir int(11);
	DECLARE v_total_piezas_surtidas int(11);
	DECLARE v_estado VARCHAR(3);
	DECLARE v_total_indice int(10);
	DECLARE v_total_existe int(10);
	DECLARE v_foto_stock_surtir varchar(50);

	DECLARE var_final_cDetalleConfig INTEGER DEFAULT 0;

	DECLARE cDetalleConfig CURSOR FOR     
		select distinct codigo_producto, codigo_ubicacion  
		from meli_surtir_deta_envio_full
		where id_surtir_config_envio_full = p_id_surtir_config_envio_full
		and folio_full = p_folio_full;
	
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final_cDetalleConfig = 1;

	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;

	SET autocommit = 0;

	select count(*) into v_total_existe from meli_surtir_deta_envio_full
	where id_surtir_config_envio_full = p_id_surtir_config_envio_full
	and folio_full = p_folio_full;

	if v_total_existe <= 0 then
		update 	meli_surtir_config_envio_full
		set 	total_piezas_surtidas = 0,
				estatus = 'PEN'
		where id_surtir_config_envio_full = p_id_surtir_config_envio_full;
	
		select id_surtir_indice_envio_full into v_id_surtir_indice_envio_full 
		from meli_surtir_config_envio_full where id_surtir_config_envio_full = p_id_surtir_config_envio_full;
	
		update meli_surtir_indice_envio_full set estatus = 'PRO'
		where id_surtir_indice_envio_full = v_id_surtir_indice_envio_full;
	end if;

	OPEN cDetalleConfig;
	bucle: LOOP

		FETCH cDetalleConfig INTO v_codigo_producto, v_codigo_ubicacion;          

		IF var_final_cDetalleConfig = 1 THEN
		  LEAVE bucle;
		END IF;
	
		
		select mef.foto_stock_surtir into v_foto_stock_surtir
		from meli_envio_full mef 
		where mef.folio_full = p_folio_full;		
	
		
		
		select sum(total_piezas) 
		into v_total_piezas_surtidas_deta
		from meli_surtir_deta_envio_full
		where folio_full in (select folio_full from meli_envio_full where foto_stock_surtir= v_foto_stock_surtir)
		and codigo_ubicacion = v_codigo_ubicacion
		and codigo_producto = v_codigo_producto;			

		
		update 	meli_surtir_foto_stock_envio_full msfsef
		set 	msfsef.retenido = if(v_total_piezas_surtidas_deta is null, 0, v_total_piezas_surtidas_deta),
				msfsef.disponible = msfsef.stock - if(v_total_piezas_surtidas_deta is null, 0, v_total_piezas_surtidas_deta)
		where msfsef.folio_full = v_foto_stock_surtir
		and msfsef.codigo_producto = v_codigo_producto
		and msfsef.codigo_ubicacion = v_codigo_ubicacion;
	
	
		
		select sum(total_piezas)
		into v_total_piezas_surtidas_deta
		from meli_surtir_deta_envio_full
		where folio_full = p_folio_full
		and codigo_producto = v_codigo_producto
		and id_surtir_config_envio_full = p_id_surtir_config_envio_full;
		
		
		update 	meli_surtir_config_envio_full
		set 	total_piezas_surtidas = if(v_total_piezas_surtidas_deta is null, 0, v_total_piezas_surtidas_deta)			
		where id_surtir_config_envio_full = p_id_surtir_config_envio_full;
		
	
		
		select id_surtir_indice_envio_full, total_piezas_surtir, total_piezas_surtidas
		into v_id_surtir_indice_envio_full, v_total_piezas_surtir, v_total_piezas_surtidas 
		from meli_surtir_config_envio_full
		where id_surtir_config_envio_full = p_id_surtir_config_envio_full;
	
		if v_total_piezas_surtidas = v_total_piezas_surtir then
			set v_estado= 'SUR';			
		else
			set v_estado= 'PRO';			
		end if;
		
		update 	meli_surtir_config_envio_full
		set 	estatus= v_estado
		where id_surtir_config_envio_full = p_id_surtir_config_envio_full;
	
		
		select count(*) 
		into v_total_indice 
		from meli_surtir_config_envio_full
		where folio_full = p_folio_full
		and id_surtir_indice_envio_full = v_id_surtir_indice_envio_full
		and estatus <> 'SUR';
	
		if v_total_indice = 0 then
			update meli_surtir_indice_envio_full set estatus = 'TER'
			where id_surtir_indice_envio_full = v_id_surtir_indice_envio_full;
		else
			update meli_surtir_indice_envio_full set estatus = 'PRO'
			where id_surtir_indice_envio_full = v_id_surtir_indice_envio_full;
		end if;

	END LOOP bucle;
	CLOSE cDetalleConfig;      

	COMMIT;
	SET autocommit = 1;
	
	SET p_error = 0;
	set p_msg_error = 'satisfactory-execution';
END;
//
	
delimiter ;