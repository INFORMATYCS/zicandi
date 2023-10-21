<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class LoteOperacionProcesosEntity extends Model{
    //~Nombre de la tabla
    protected $table = 'lote_operacion_procesos';
    
    //~Llave primaria
    protected $primaryKey = 'id_lote_operacion'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['lote_referencia','referencia','fecha_operacion','id_almacen','nombre_almacen','codigo_ubicacion','id_producto','codigo_producto','nombre_producto','url_img_producto','tipo_movimiento','cantidad','estado','id_movimiento_almacen','msg_error'];
}