<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliMetricaVisor extends Model{
    //~Nombre de la tabla
   protected $table = 'meli_metrica_visor';
    
   //~Llave primaria
   protected $primaryKey = 'id_meli_metrica_visor'; 

   //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
   protected $fillable = ['url','foto','titulo','id_publicacion_tienda','vendedor','estatus'];
}
