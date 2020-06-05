<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CarpetaAdjuntos extends Model
{
    //~Nombre de la tabla
    protected $table = 'carpeta_adjuntos';
    
    //~Llave primaria
    protected $primaryKey = 'id_carpeta_adjuntos'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['nombre'];

    //~Relacion One To Many
    public function adjuntos(){
        return $this->hasMany('App\ArchivoAdjunto', 'id_carpeta_adjuntos', 'id_carpeta_adjuntos');
    }
}