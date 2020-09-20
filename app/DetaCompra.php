<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DetaCompra extends Model
{
    //~Nombre de la tabla
    protected $table = 'deta_compra';
    
    //~Llave primaria
    protected $primaryKey = 'id_deta_compra'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_compra','id_producto','cantidad','precio','id_carpeta_adjuntos','id_movimiento_producto','xstatus'];

    //~Relacion One To One
    public function carpeta(){
        return $this->hasOne('App\CarpetaAdjuntos','id_carpeta_adjuntos','id_carpeta_adjuntos');
    }

    public function getProducto(){
        return $this->hasOne('App\Producto','id_producto','id_producto');
    }

    
}