<?php

namespace App\Exports;

use App\VentaMeli;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use DB;

class VentasExport implements FromView
{
    
    use Exportable;

    public function define($buscar, $fechaInicial, $fechaFinal, $idCuentaTienda, $color)
    {
        
        $this->idCuentaTienda = $idCuentaTienda;
        $this->fechaInicial = $fechaInicial;
        $this->fechaFinal = $fechaFinal;
        $this->buscar = $buscar;
        $this->color = $color;

        return $this;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        
        $idCuentaTienda = $this->idCuentaTienda;
        $fechaInicial = $this->fechaInicial;
        $fechaFinal = $this->fechaFinal;        
        $buscar = $this->buscar;
        $color = $this->color;

        $sqlBuscar ="";
        if($buscar!=null){
            $sqlBuscar ="and (titulo like '%".$buscar."%' or id_publicacion like'%".$buscar."%' or nombre_cliente like '%".$buscar."%')";
        }

        $sqlColor ="";
        if($color!="todos"){
            if($color=="verde"){
                $sqlColor =" and utl_porcentaje >= .20 ";
            }elseif($color=="naranja"){
                $sqlColor =" and (utl_porcentaje >= .05 and utl_porcentaje < .20) ";
            }else{
                $sqlColor =" and utl_porcentaje  < .05 ";
            }
        }
        
        $sql= "select 	id_venta_meli idVentaMeli, 			
                        IF(id_paquete_meli>0, (	select count(*) 
                                                from venta_meli vaux 
                                                where vaux.id_control_ventas_meli = vmeli.id_control_ventas_meli 
                                                and vaux.id_cuenta_tienda = vmeli.id_cuenta_tienda 
                                                and vaux.id_paquete_meli = vmeli.id_paquete_meli), 1) totalPaquete,
                        id_paquete_meli idPaqueteMeli, 
                        id_orden_meli idOrdenMeli,         
                        DATE_FORMAT(fecha_venta,'%d/%m%/%Y') fechaVenta, 
                        id_publicacion idPublicacion, 
                        id_variante idVariante, 
                        titulo, 
                        id_pago idPago, 
                        DATE_FORMAT(fecha_pago,'%d/%m%/%Y') fechaPago, 
                        monto_pagado montoPagoCliente, 
                        cantidad, 
                        precio_venta precioVenta, 
                        comision, 
                        isr, 
                        iva, 
                        neto, 
                        precio_compra ultimoPrecioCompra, 
                        utl_monto utlMonto, 
                        utl_porcentaje utlPorcentaje, 
                        id_envio idEnvio,  
                        nombre_cliente nombreCliente, 
                        direccion_entrega direccionEntrega, 
                        metodo_envio metodoEnvio, 
                        costo_envio_cliente costoEnvioCliente, 
                        costo_envio_empresa costoEnvioEmpresa, 
                        nota nota, 
                        estatus_meli estatusVentaMeli        
                from venta_meli vmeli
                where id_cuenta_tienda = $idCuentaTienda
                and estatus = 'TER'
                $sqlBuscar
                $sqlColor
                and DATE(fecha_venta) between STR_TO_DATE('$fechaInicial', '%Y-%m-%d') and STR_TO_DATE('$fechaFinal', '%Y-%m-%d')
                order by id_paquete_meli";        

            //$rs = DB::select( $sql );

        
        
        
            return view('exports.ventas', [
                'ventas' => DB::select( $sql )
            ]);

           
       
    
    }
}
