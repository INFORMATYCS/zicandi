<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MovimientoAlmacen extends Model{
    //~Nombre de la tabla
   protected $table = 'movimiento_almacen';
    
   //~Llave primaria
   protected $primaryKey = 'id_movimiento_almacen'; 

   //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
   protected $fillable = ['id_almacen','id_producto','tipo_movimiento','fecha_aplicacion','cantidad','stock','ubicacion','estatus_movimientos'];
}
