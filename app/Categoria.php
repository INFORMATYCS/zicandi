<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    //~Nombre de la tabla
    protected $table = 'categoria';
    
    //~Llave primaria
    protected $primaryKey = 'id_categoria'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['codigo','nombre','xstatus'];

    //~Relacion One To Many
    public function productos(){
        return $this->hasMany('App\Producto');
    }
}
