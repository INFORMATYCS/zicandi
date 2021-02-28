<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliDetaEnvioFull extends Model{
    //~Nombre de la tabla
    protected $table = 'meli_deta_envio_full';
    
    //~Llave primaria
    protected $primaryKey = 'id_deta_meli_envio_full'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_meli_envio_full','id_publicacion','id_producto','codigo_barras_full','codigo_producto','id_publicacion_tienda','total_etiquetas','etiquetas_impresas','etiquetas_pendientes','zpl_cadena','estatus'];


    //~Relacion One To Many
    public function config(){
        return $this->hasMany('App\MeliConfigEnvioFull', 'id_deta_meli_envio_full', 'id_deta_meli_envio_full');
    }


    //~Relacion One To Many
    public function publicacion(){
        return $this->hasMany('App\Publicacion', 'id_publicacion', 'id_publicacion');
    }

}
