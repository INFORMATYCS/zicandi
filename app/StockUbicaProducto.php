<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockUbicaProducto extends Model{
    //~Nombre de la tabla
    protected $table = 'stock_ubica_producto';
    
    //~Llave primaria
    protected $primaryKey = 'id_stock_ubica_producto'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_stock_producto','id_producto','codigo_ubica','stock'];

}