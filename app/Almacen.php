<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Almacen extends Model
{
    //~Nombre de la tabla
    protected $table = 'almacen';
    
    //~Llave primaria
    protected $primaryKey = 'id_almacen'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['nombre','ubicacion','nota','xstatus'];


    //~Relacion One To Many
    public function detalle(){
        return $this->hasMany('App\DetaAlmacen', 'id_almacen', 'id_almacen');
    }
}
