<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DefineProducto extends Model
{
    //~Nombre de la tabla
    protected $table = 'define_producto';
    
    //~Llave primaria
    protected $primaryKey = 'id_define_producto'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_producto','atributo','valor','xstatus'];

    //~Relacion inversa One To Many Producto
    public function producto(){
        return $this->belongsTo('App\Producto');
    }
}
