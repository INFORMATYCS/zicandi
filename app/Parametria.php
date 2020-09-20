<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Parametria extends Model
{
    //~Nombre de la tabla
    protected $table = 'parametria';
    
    //~Llave primaria
    protected $primaryKey = 'id_parametria'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['llave','valor','clave_proceso','descripcion','xstatus'];
}
