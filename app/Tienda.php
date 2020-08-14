<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tienda extends Model
{
    //~Nombre de la tabla
    protected $table = 'tienda';
    
    //~Llave primaria
    protected $primaryKey = 'id_tienda'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['codigo','nombre','web'];
}
