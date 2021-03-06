<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class StockProducto extends Model{
    //~Nombre de la tabla
    protected $table = 'stock_producto';
    
    //~Llave primaria
    protected $primaryKey = 'id_stock_producto'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_almacen','id_producto','stock','disponible','retenido','minimo','maximo','ultima_entrada','ultima_salida'];

    public function getProducto(){
        return $this->hasOne('App\Producto','id_producto','id_producto');
    }

    //~Recupera la lista de ubicaciones de stock
    public function ubicacionStock(){
        return $this->hasMany('App\StockUbicaProducto', 'id_stock_producto', 'id_stock_producto');
    }
}