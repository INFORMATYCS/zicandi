<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ArchivoAdjunto extends Model
{
    //~Nombre de la tabla
    protected $table = 'archivo_adjunto';
    
    //~Llave primaria
    protected $primaryKey = 'id_archivo_adjunto'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['nombre','alias','path','descripcion','xstatus'];

    //~Relacion inversa One To Many CarpetaAdjuntos
    public function carpeta(){        
        return $this->belongsTo('App\CarpetaAdjuntos');
    }


}
