<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TempCargaStock extends Model{
    //~Nombre de la tabla
    protected $table = 'temp_carga_stock';
    
    //~Llave primaria
    protected $primaryKey = 'id_temp_carga_stock'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_producto','id_almacen','codigo_producto','tipo_movimiento','codigo_ubicacion','stock','lote_referencia','estatus','diagnostico'];

}
