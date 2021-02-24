<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliConfigEnvioFull extends Model{
    //~Nombre de la tabla
    protected $table = 'meli_config_envio_full';
    
    //~Llave primaria
    protected $primaryKey = 'id_config_meli_envio_full'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_meli_envio_full','id_deta_meli_envio_full','id_producto','id_config_publicacion','codigo_producto','nombre_producto','total_piezas'];


    //~Relacion One To Many
    public function producto(){
        return $this->hasMany('App\Producto', 'id_producto', 'id_producto');
    }

}
