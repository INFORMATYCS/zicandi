<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Asociada extends Model{
    //~Nombre de la tabla
    protected $table = 'bett_asociada';
    
    //~Llave primaria
    protected $primaryKey = 'id_bett_asociada'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['codigo','nombre','telefono','direccion','xstatus'];

}
