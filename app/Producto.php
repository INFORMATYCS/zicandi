<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    //~Nombre de la tabla
    protected $table = 'producto';
    
    //~Llave primaria
    protected $primaryKey = 'id_producto'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_categoria','codigo','nombre','url_imagen','nota','ultimo_precio_compra','promedio_precio_compra','xstatus'];


    //~Relacion inversa One To Many
    public function categoria(){
        return $this->belongsTo('App\Categoria');
    }
}



