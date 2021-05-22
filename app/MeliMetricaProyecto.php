<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliMetricaProyecto extends Model
{
   //~Nombre de la tabla
   protected $table = 'meli_metrica_proyecto';
    
   //~Llave primaria
   protected $primaryKey = 'id_meli_metrica_proyecto'; 

   //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
   protected $fillable = ['nombre','foto','promedio_visitas','promedio_ventas','xstatus','tendencia'];
}
