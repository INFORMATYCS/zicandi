<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliDetaMetricaVisor extends Model{
    //~Nombre de la tabla
   protected $table = 'meli_deta_metrica_visor';
    
   //~Llave primaria
   protected $primaryKey = 'id_meli_deta_metrica_visor'; 

   //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
   protected $fillable = ['id_meli_metrica_visor','fecha_consulta','precio','ventas','visitas','full','msi','disponibles','isCatalogo','estatus_publicacion'];
}
