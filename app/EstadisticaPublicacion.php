<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class EstadisticaPublicacion extends Model{
   //~Nombre de la tabla
   protected $table = 'estadistica_publicacion';
    
   //~Llave primaria
   protected $primaryKey = 'id_estadistica_publicacion'; 

   //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
   protected $fillable = ['id_publicacion','fecha_consulta','stock','ventas','visitas'];
}
