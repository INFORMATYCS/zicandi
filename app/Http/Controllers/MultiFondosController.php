<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Compra;
use App\DetaCompra;
use App\MovimientoProducto;
use App\Concepto;
use App\StockProducto;
use App\Producto;


class MultiFondosController extends Controller
{
    /**
     * 
     * 
     */
    public function liquidarCompra(Request $request){
        $compra = Compra::findOrFail($request->id_compra);//~Se busca en base al ID entrante
        $detalle = $compra->detalle;

        $currentDBtime = DB::select( 'select NOW() as fecha' );
        $concepto = Concepto::where('codigo', '=', 'COM001')->get()->first();

        foreach ($detalle as $deta) {
            
            $movProducto = new MovimientoProducto();
            $producto = Producto::find($deta['id_producto']);
            $stockProducto = $producto->stock;

            $movProducto->id_producto = $deta['id_producto'];
            $movProducto->fecha_aplicacion = $currentDBtime[0]->fecha;
            $movProducto->fecha_transaccion = $currentDBtime[0]->fecha;
            $movProducto->referencia = $compra->id_compra;
            $movProducto->concepto = $concepto->codigo;
            $movProducto->naturaleza = $concepto->naturaleza;
            $movProducto->cantidad = $deta['cantidad'];
            $movProducto->precio = $deta['precio'];
            $movProducto->stock = $stockProducto->stock + $deta['cantidad'];
            $movProducto->estatus_movimiento = 'A';

            $movProducto->save();


            //~Actualiza stock
            $stockProducto->stock = $stockProducto->stock + $deta['cantidad'];
            $stockProducto->disponible = $stockProducto->disponible + $deta['cantidad'];
            $stockProducto->ultima_entrada = $currentDBtime[0]->fecha;
            $stockProducto->update();

            //~Actualiza precio de compra
            $precioPromedio = $this->calculaPrecioPromedio($producto->id_producto, $deta['precio']);
            $producto->ultimo_precio_compra = $deta['precio'];
            $producto->promedio_precio_compra = $precioPromedio;
            $producto->update();            

        }

        $compra->estatus = 'APLICADO';
        $compra->update();

        return ['resp' => array('id_compra'=>$compra->id_compra, 
                                'estatus'=>$compra->estatus
                               )];
    }

    /**
     * Obtiene el promedio del precio de las ultimas compras de un producto
     * 
     */
    private function calculaPrecioPromedio($idProducto, $precio){
        
        $sql= " SELECT AVG(PRECIO) AS promedio FROM (
                SELECT DC.PRECIO
                FROM COMPRA C, DETA_COMPRA DC
                WHERE C.ID_COMPRA = DC.ID_COMPRA
                AND DC.ID_PRODUCTO = $idProducto
                AND C.ESTATUS = 'APLICADO'
                UNION ALL
                SELECT $precio FROM DUAL 
                ) X";


        $rs = DB::select( $sql );

        $promedio = $rs[0]->promedio;

        if($promedio==null){
            $promedio=$precio;
        }

        return $promedio;
    }

    public function arrastreProducto($id_producto, $fecha=null){

        if($fecha == null){
            $fecha = date("d/m/Y");
        }

        $sql= " SELECT ID_MOVIMIENTO_PRODUCTO, FECHA_APLICACION, NATURALEZA, CANTIDAD, ESTATUS_MOVIMIENTO 
                FROM MOVIMIENTO_PRODUCTO 
                WHERE ID_PRODUCTO = ".$id_producto." AND DATE(FECHA_APLICACION) >= STR_TO_DATE('".$fecha."','%d/%m/%Y') 
                ORDER BY FECHA_APLICACION ASC, ID_MOVIMIENTO_PRODUCTO ASC";


        $rs = DB::select( $sql );
    }
}
