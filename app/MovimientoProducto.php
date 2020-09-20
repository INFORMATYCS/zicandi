<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MovimientoProducto extends Model{
    //~Nombre de la tabla
    protected $table = 'movimiento_producto';
    
    //~Llave primaria
    protected $primaryKey = 'id_movimiento_producto'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_producto','fecha_aplicacion','fecha_transaccion','referencia','concepto','naturaleza','cantidad','precio','stock','estatus_movimiento'];

    public function getProducto(){
        return $this->hasOne('App\Producto','id_producto','id_producto');
    }

}
