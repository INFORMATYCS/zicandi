<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliMetricaVisorProyecto extends Model{
    //~Nombre de la tabla
   protected $table = 'meli_metrica_visor_proyecto';
    
   //~Llave primaria
   protected $primaryKey = 'id_meli_metrica_visor_proyecto'; 

   //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
   protected $fillable = ['id_meli_metrica_visor','id_meli_metrica_proyecto'];
}
