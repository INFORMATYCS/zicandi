<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BitaResumenAlmacen extends Model{
     //~Nombre de la tabla
   protected $table = 'bita_resumen_almacen';
    
   //~Llave primaria
   protected $primaryKey = 'id_bita_resumen_almacen'; 

   //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
   protected $fillable = ['id_almacen','id_producto','stock','primer_registro','ultimo_registro'];

}
