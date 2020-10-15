<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class VentaMeli extends Model{
    //~Nombre de la tabla
    protected $table = 'venta_meli';
    
    //~Llave primaria
    protected $primaryKey = 'id_venta_meli'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_control_ventas_meli','id_cuenta_tienda','id_paquete_meli','id_orden_meli','id_publicacion','id_variante','titulo','id_pago','fecha_pago','monto_pagado','cantidad','precio_venta','comision','isr','iva','neto','precio_compra','utl_monto','utl_porcentaje','id_envio','nombre_cliente','direccion_entrega','metodo_envio','costo_envio_cliente','costo_envio_empresa','nota','estatus_meli','estatus'];



    //~Relacion inversa One To Many
    public function cuentaTienda(){
        return $this->belongsTo('App\CuentaTienda');
    }

    //~Relacion inversa One To Many
    public function controlVenta(){
        return $this->belongsTo('App\ControlVentasMeli');
    }

 
}
