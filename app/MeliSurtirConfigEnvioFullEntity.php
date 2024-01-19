<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliSurtirConfigEnvioFullEntity extends Model{
    //~Nombre de la tabla
    protected $table = 'meli_surtir_config_envio_full';
    
    //~Llave primaria
    protected $primaryKey = 'id_surtir_config_envio_full'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['folio_full','id_surtir_indice_envio_full','id_deta_meli_envio_full','id_publicacion_tienda','id_producto','id_config_publicacion','codigo_producto','nombre_producto','total_piezas_surtir','total_piezas_surtidas','ubicacion_1','ubicacion_2','ubicacion_3','estatus'];

    //~Relacion One To Many
    public function producto(){
        return $this->hasMany('App\Producto', 'id_producto', 'id_producto');
    }
}



