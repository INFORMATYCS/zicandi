<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliPublicacionHistorico extends Model{
    //~Nombre de la tabla
    protected $table = 'meli_publicacion_historico';
    
    //~Llave primaria
    protected $primaryKey = 'id_publicacion_historico'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_publicacion', 'id_variante_publicacion', 'id_publicacion_tienda', 'fecha_consulta', 'precio', 'stock', 'ventas', 'visitas', 'envio_gratis', 'full', 'estatus'];
}