<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliPublicacionEstadisticas extends Model{
    //~Nombre de la tabla
    protected $table = 'meli_publicacion_estadisticas';
    
    //~Llave primaria
    protected $primaryKey = 'id_publicacion_estadisticas'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_publicacion', 'id_variante_publicacion', 'id_publicacion_tienda', 'fecha_estadistica', 'puntaje_stock_full', 'puntaje_visitas_full'];
}