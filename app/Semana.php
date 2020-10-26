<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Semana extends Model{
    //~Nombre de la tabla
    protected $table = 'bett_semana';
    
    //~Llave primaria
    protected $primaryKey = 'id_bett_semana'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['semana','xstatus'];
}
