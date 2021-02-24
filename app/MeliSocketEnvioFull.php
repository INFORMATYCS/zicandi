<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliSocketEnvioFull extends Model{
    //~Nombre de la tabla
    protected $table = 'meli_socket_envio_full';
    
    //~Llave primaria
    protected $primaryKey = 'id_meli_socket_envio_full'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['zpl_cadena','estatus'];
}
