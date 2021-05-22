<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliDetaMetricaProyecto extends Model
{
    //~Nombre de la tabla
   protected $table = 'meli_deta_metrica_proyecto';
    
   //~Llave primaria
   protected $primaryKey = 'id_deta_meli_metrica_proyecto'; 

   //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
   protected $fillable = ['id_meli_metrica_proyecto','fecha_metrica','promedio_visitas','promedio_ventas'];
}
