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

    //~Relacion One To Many
    public function atributos(){
        return $this->hasMany('App\DefineProducto', 'id_producto', 'id_producto');
    }

    //~Relacion Many To Many Proveedores
    public function proveedores(){
        return  $this->belongsToMany('App\Proveedor', 'deta_proveedor_producto', 'id_producto', 'id_proveedor')
                ->withTimestamps()
                ->withPivot('id_deta_proveedor_producto', 'id_proveedor', 'codigo_barras')
                ->as('codigo');
    }


}



