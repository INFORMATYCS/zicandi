<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CatUbicaProducto extends Model
{
    //~Nombre de la tabla
    protected $table = 'cat_ubica_producto';

    public $timestamps = false;
    
    //~Llave primaria
    protected $primaryKey = 'id_cat_ubica_producto'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['codigo','nombre','xstatus'];

}
