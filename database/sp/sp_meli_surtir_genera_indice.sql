DROP PROCEDURE sp_meli_surtir_genera_indice;
delimiter //

CREATE DEFINER=`p-us-global-zicandi`@`%` PROCEDURE sp_meli_surtir_genera_indice(	IN p_id_folio_full VARCHAR(50),
												OUT p_total_ok INTEGER, 	
												OUT p_total_err INTEGER,
                                                OUT p_error INTEGER, 
                                                OUT p_msg_error VARCHAR(200))
BEGIN	    
    DECLARE V_total_ok INTEGER;
    DECLARE V_total_err INTEGER;    
 
    
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
		GET DIAGNOSTICS CONDITION 1
		@p1= RETURNED_SQLSTATE, p_msg_error = MESSAGE_TEXT, p_error = MYSQL_ERRNO;
	END;
	
	delete from meli_surtir_foto_stock_envio_full where folio_full = p_id_folio_full;
	delete from meli_surtir_deta_envio_full where folio_full = p_id_folio_full;
	delete from meli_surtir_config_envio_full where folio_full = p_id_folio_full;
	delete from meli_surtir_indice_envio_full where folio_full = p_id_folio_full;

	
	insert into meli_surtir_indice_envio_full(id_surtir_indice_envio_full, id_meli_envio_full, id_deta_meli_envio_full, folio_full, id_publicacion, codigo_barras_full, id_publicacion_tienda, total_piezas_envio, estatus, created_at, updated_at)
	select 	0, 
			mef.id_meli_envio_full,
			mdef.id_deta_meli_envio_full,
			mef.folio_full,
			mdef.id_publicacion,
			mdef.codigo_barras_full,
			mdef.id_publicacion_tienda,
			mdef.total_etiquetas,
			'IND' estatus,
			now(),
			null
	from meli_envio_full mef, meli_deta_envio_full mdef 
	where mef.id_meli_envio_full = mdef.id_meli_envio_full 
	and mef.folio_full = p_id_folio_full;

	
	insert into meli_surtir_config_envio_full(id_surtir_config_envio_full, folio_full, referencia, id_surtir_indice_envio_full, id_deta_meli_envio_full, id_publicacion_tienda, id_producto, id_config_publicacion, codigo_producto, nombre_producto, total_piezas_surtir, total_piezas_surtidas, ubicacion_1, ubicacion_2, ubicacion_3, estatus, created_at, updated_at)
	select 	0,
			msief.folio_full,
			msief.folio_full,
			msief.id_surtir_indice_envio_full,
			msief.id_deta_meli_envio_full,
			msief.id_publicacion_tienda,
			p.id_producto,
			cp.id_config_publicacion,
			p.codigo,
			p.nombre,
			cp.cantidad * msief.total_piezas_envio total_piezas_surtir,
			0,
			null ubicacion_1,
			null ubicacion_2,
			null ubicacion_3,
			'PEN',
			NOW(),
			null
	from meli_surtir_indice_envio_full msief, config_publicacion cp, producto p 
	where msief.id_publicacion = cp.id_publicacion 
	and cp.id_producto = p.id_producto
	and msief.folio_full = p_id_folio_full;

	
	insert into meli_surtir_config_envio_full(id_surtir_config_envio_full, folio_full, referencia, id_surtir_indice_envio_full, id_deta_meli_envio_full, id_publicacion_tienda, id_producto, id_config_publicacion, codigo_producto, nombre_producto, total_piezas_surtir, total_piezas_surtidas, ubicacion_1, ubicacion_2, ubicacion_3, estatus, created_at, updated_at)
	select 	0,
			msief.folio_full,
			msief.folio_full,
			msief.id_surtir_indice_envio_full,
			msief.id_deta_meli_envio_full,
			msief.id_publicacion_tienda,
			0,
			0,
			null,
			null,
			0, 
			0,
			null ubicacion_1,
			null ubicacion_2,
			null ubicacion_3,
			'NLC',
			NOW(),
			null
	from meli_surtir_indice_envio_full msief
	where msief.folio_full = p_id_folio_full
	and msief.id_surtir_indice_envio_full not in(
		select id_surtir_indice_envio_full from meli_surtir_config_envio_full mscef
		where mscef.folio_full = p_id_folio_full
	);

	commit;

	
	select sum(msief.total_piezas_envio)
	into V_total_err
	from meli_surtir_indice_envio_full msief
	where msief.folio_full = p_id_folio_full
	and msief.id_surtir_indice_envio_full in (
		select mscef.id_surtir_indice_envio_full from meli_surtir_config_envio_full mscef
		where msief.folio_full = p_id_folio_full
		and mscef.estatus = 'NLC'
	);
	
	select sum(msief.total_piezas_envio) 
	into V_total_ok
	from meli_surtir_indice_envio_full msief
	where msief.folio_full = p_id_folio_full
	and msief.id_surtir_indice_envio_full in (
		select mscef.id_surtir_indice_envio_full from meli_surtir_config_envio_full mscef
		where msief.folio_full = p_id_folio_full
		and mscef.estatus = 'PEN'
	);

	SET p_total_ok = V_total_ok;
	SET p_total_err = V_total_err;
	SET p_error = 0;
	set p_msg_error = 'satisfactory-execution';
END;
//
	
delimiter ;