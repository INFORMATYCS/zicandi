<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TempCatBett extends Model
{
    //~Nombre de la tabla
    protected $table = 'temp_cat_bett';
    
    //~Llave primaria
    protected $primaryKey = 'id_temp_cat_bett'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['codigo','nombre','precio','precio_oferta','url','descripcion','imagen','imagen_mini','estatus_proceso'];
}
