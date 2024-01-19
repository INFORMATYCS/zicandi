<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliSurtirDetaEnvioFullEntity extends Model{
    //~Nombre de la tabla
    protected $table = 'meli_surtir_deta_envio_full';
    
    //~Llave primaria
    protected $primaryKey = 'id_surtir_deta_envio_full'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['folio_full','id_surtir_config_envio_full','id_producto','codigo_producto','id_almacen','codigo_ubicacion','total_piezas'];

    //~Relacion One To Many
    public function producto(){
        return $this->hasMany('App\Producto', 'id_producto', 'id_producto');
    }

    public function almacen(){
        return $this->hasMany('App\Almacen', 'id_almacen', 'id_almacen');
    }
}

