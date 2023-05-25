drop table meli_procesa_retiro;
create table meli_procesa_retiro(
   id int not null auto_increment,
   id_meli_envio_full int not null,
   tienda varchar(50) not null,
   folio_full varchar(50) not null,
   codigo_barras_full varchar(50),
   id_publicacion_tienda varchar(50),
   total_etiquetas int default 0,   
   config_prod	int default 0,
   total_productos int default 0,   
   codigo_producto varchar(15),
   nombre_producto varchar(75),
   stock_codigo_ubica varchar(20),
   stock_piezas	decimal(19,2),
   retiro_ubicacion_piezas	decimal(19,2),   
   retiro_ubicacion_est	decimal(19,2),
   retiro_ubicacion_uso_est	decimal(19,2),
   retiro_producto_ubica_est	decimal(19,2),   
   mensaje	varchar(500),
   estatus varchar(3),
   primary key(id)
);
ALTER TABLE meli_procesa_retiro ADD INDEX indx_folio_envio_meli (folio_full);

drop table log_sp_global;
create table log_sp_global(
	id int not null auto_increment,
    ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    log varchar(10000),
   primary key(id)
);

drop table meli_procesa_retiro_indice;
create table meli_procesa_retiro_indice(
   folio_full varchar(50) not null, 		
   codigo_producto varchar(15),
   prioridad INTEGER default 100,
   estatus varchar(3) default 'PEN'   
);
ALTER TABLE meli_procesa_retiro_indice ADD INDEX indx_folio_envio_meli02 (folio_full);