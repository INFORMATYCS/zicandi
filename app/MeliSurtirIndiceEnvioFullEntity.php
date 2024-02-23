<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliSurtirIndiceEnvioFullEntity extends Model{
    //~Nombre de la tabla
    protected $table = 'meli_surtir_indice_envio_full';
    
    //~Llave primaria
    protected $primaryKey = 'id_surtir_indice_envio_full'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_meli_envio_full','id_deta_meli_envio_full','folio_full','id_publicacion','codigo_barras_full','id_publicacion_tienda','total_piezas_envio','estatus'];

    //~Relacion One To Many
    public function publicacion(){
        return $this->hasMany('App\Publicacion', 'id_publicacion', 'id_publicacion');
    }

}
