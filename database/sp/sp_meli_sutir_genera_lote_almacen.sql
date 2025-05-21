DROP PROCEDURE sp_meli_sutir_genera_lote_almacen;
delimiter //

CREATE DEFINER=`p-us-global-zicandi`@`%` PROCEDURE sp_meli_sutir_genera_lote_almacen(	IN p_id_folio_full VARCHAR(50),
                                                    	OUT p_id_lote VARCHAR(50),
														OUT p_error INTEGER, 
                                                    	OUT p_msg_error VARCHAR(200))
begin
	declare v_id_surtir_deta_envio_full INTEGER;
	declare v_folio_full VARCHAR(50);
	declare v_id_surtir_config_envio_full INTEGER;
	declare v_id_producto INTEGER;
	declare v_codigo_producto VARCHAR(15);
	declare v_id_almacen INTEGER;
	declare v_codigo_ubicacion VARCHAR(15);
	declare v_total_piezas INTEGER;
	declare v_lote_calculado VARCHAR(50);
	declare v_reg_apl_lote INTEGER;
	declare v_nombre_almacen VARCHAR(100);
	declare v_nombre_producto VARCHAR(100);
	declare v_url_imagen VARCHAR(500);

	DECLARE var_final_sprod INTEGER DEFAULT 0;

	DECLARE cProcesaMovimientoAlmacen CURSOR FOR  
		select id_surtir_deta_envio_full,folio_full,id_surtir_config_envio_full,id_producto,codigo_producto,id_almacen,codigo_ubicacion,total_piezas 
		from meli_surtir_deta_envio_full
		where folio_full = p_id_folio_full;

	DECLARE CONTINUE HANDLER FOR NOT FOUND SET var_final_sprod = 1;
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;

	
	SET v_lote_calculado = concat('0406MELI',DATE_FORMAT(NOW(), '%m%Y'),'00',p_id_folio_full);

	
	select count(*) into v_reg_apl_lote
	from lote_operacion_procesos lop 
	where lop.lote_referencia = v_lote_calculado
	and lop.estado = 'A';

	if v_reg_apl_lote > 0 then
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya existe el lote con registros aplicados', MYSQL_ERRNO = 5001;
	end if;

	
	delete from lote_operacion_procesos 
	where lote_referencia = v_lote_calculado;	

	OPEN cProcesaMovimientoAlmacen;
	bucle: loop

		FETCH cProcesaMovimientoAlmacen INTO v_id_surtir_deta_envio_full, v_folio_full, v_id_surtir_config_envio_full, v_id_producto, v_codigo_producto, v_id_almacen, v_codigo_ubicacion, v_total_piezas;
	
		IF var_final_sprod = 1 THEN
		  LEAVE bucle;
		END IF;
		
		select a.nombre 
		into v_nombre_almacen 
		from almacen a 
		where a.id_almacen = v_id_almacen;
	
		
		select p.nombre, p.url_imagen
		into v_nombre_producto, v_url_imagen
		from producto p 
		where p.id_producto = v_id_producto;
	
		insert into lote_operacion_procesos(id_lote_operacion, lote_referencia, referencia, fecha_operacion, id_almacen, nombre_almacen, codigo_ubicacion, id_producto, codigo_producto, nombre_producto, url_img_producto, tipo_movimiento, cantidad, estado, created_at)
		values(
		0,
		v_lote_calculado,
		p_id_folio_full,
		NOW(),
		v_id_almacen,
		v_nombre_almacen,
		v_codigo_ubicacion,
		v_id_producto,
		v_codigo_producto,
		v_nombre_producto,
		v_url_imagen,
		'RET',
		v_total_piezas,
		'P',
		NOW()
		);               
	END LOOP bucle;
	CLOSE cProcesaMovimientoAlmacen;      

	COMMIT;
	SET p_error = 0;
	SET p_id_lote = v_lote_calculado;
END;
//
	
delimiter ;