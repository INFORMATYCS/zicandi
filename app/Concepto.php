<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Concepto extends Model{
    //~Nombre de la tabla
    protected $table = 'concepto';
    
    //~Llave primaria
    protected $primaryKey = 'id_concepto'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['codigo','descripcion','naturaleza','xstatus'];
   
}