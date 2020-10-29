<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ConfigPublicacion extends Model{
    //~Nombre de la tabla
    protected $table = 'config_publicacion';
    
    //~Llave primaria
    protected $primaryKey = 'id_config_publicacion'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_producto','id_publicacion','cantidad'];

    //~Relacion inversa One To Many Producto
    public function productos(){
        return $this->belongsTo('App\Producto');

    }

    public function publicaciones(){
        return $this->belongsTo('App\Publicacion');
    }
}
