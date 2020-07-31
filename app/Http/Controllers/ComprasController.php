<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Compra;
use App\DetaCompra;
use App\Proveedor;
use App\Producto;

class ComprasController extends Controller
{
   /**
     * Listar registros
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
       
        if(!$request->ajax())return redirect('/');

            $compras = Compra::join('proveedor','compra.id_proveedor','=','proveedor.id_proveedor')
            ->select('compra.id_compra','compra.folio','proveedor.nombre_corto as proveedor','compra.referencia_proveedor as referencia','compra.updated_at','compra.xstatus','compra.estatus')
            ->orderBy('compra.id_compra', 'desc')->paginate(10);		

        return [
            'pagination' => [
                'total'         => $compras->total(),
                'current_page'         => $compras->currentPage(),
                'per_page'         => $compras->perPage(),
                'last_page'         => $compras->lastPage(),
                'from'         => $compras->firstItem(),
                'to'         => $compras->lastItem()
            ],
            'compras'=> $compras
        ];
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $compra = new Compra();        
        $compra->id_proveedor = $request->id_proveedor;
        $compra->folio = $request->folio;
        $compra->referencia_proveedor = $request->referencia_proveedor;
        $compra->id_carpeta_adjuntos = $request->id_carpeta_adjuntos;
        $compra->estatus ='REGISTRADO';
        $compra->xstatus ='1';

        $compra->save();

        //~Guarda el detalle
        $detalleCompra = $request->listaDetalleCompra;

        foreach ($detalleCompra as $deta) {            
            if($deta['xstatus']==1){
                $cantidad = $deta['cantidad'];            
                $precio = $deta['precio'];
                $producto = $deta['producto'];
                $idCompra = $compra->id_compra;

                $detaCompra = new DetaCompra();
                $detaCompra->id_compra = $idCompra;
                $detaCompra->id_producto =$producto['id_producto'];
                $detaCompra->cantidad = $cantidad;
                $detaCompra->precio = $precio;

                $detaCompra->save();
            }
        }

        return ['compra' => $compra];
    }

    /**
     * Consulta detalle de la compra
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getDetalleCompra(Request $request)
    {
        $compra = Compra::findOrFail($request->id_compra);//~Se busca en base al ID entrante
        $detalle = $compra->detalle;

        $detaAux = array();
        foreach ($detalle as $deta) {
            $producto = Producto::findOrFail($deta->id_producto);
            $deta['producto'] = $producto;
            $deta['xstatus'] = 1;   
            array_push($detaAux, $deta);         
        }

        return ['compra' => $compra, 'detalle' => $detaAux];
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request){
                
        $compra = Compra::findOrFail($request->id_compra);//~Se busca en base al ID entrante
        $compra->id_proveedor = $request->id_proveedor;
        $compra->folio = $request->folio;
        $compra->referencia_proveedor = $request->referencia_proveedor;        
        $compra->estatus ='REGISTRADO';
        $compra->xstatus ='1';

        $compra->save();          

        //~Limpía detalle
        $compra->detalle()->delete();
        
        
        //~Guarda el detalle
        $detalleCompra = $request->listaDetalleCompra;

        foreach ($detalleCompra as $deta) {           
            
            if($deta['xstatus']==1){
                $producto = $deta['producto'];

                $detaCompra = new DetaCompra();
                $detaCompra->id_deta_compra =$deta['id_deta_compra'];
                $detaCompra->id_compra = $compra->id_compra;
                $detaCompra->id_producto =$producto['id_producto'];
                $detaCompra->cantidad =$deta['cantidad']; 
                $detaCompra->precio = $deta['precio'];

                $detaCompra->save();            
            }
            
        }
    }


    /**
     * 
     * 
     */
    public function desactivar(Request $request){
        $compra = Compra::findOrFail($request->id_compra);
        $compra->xstatus ='0';

        $compra->save();
    }

    /**
     * 
     * 
     */
    public function activar(Request $request){        
        $compra = Compra::findOrFail($request->id_compra);
        $compra->xstatus ='1';

        $compra->save();
    }
}
