<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Config;
Use Exception;
Use Log;
use DB;
use App\Almacen;
use App\Producto;
use App\StockProducto;
use App\BitaResumenAlmacen;
use App\MovimientoAlmacen;
use App\CatUbicaProducto;
use App\StockUbicaProducto;
use App\Exports\AlmacenExport;

class AlmacenController extends Controller{
    /**
     * Listar registros
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
       
        //if(!$request->ajax())return redirect('/');


        $listaAlmacen = Almacen::orderBy('id_almacen','desc')->paginate(10);
       

        return [
            'pagination' => [
                'total'         => $listaAlmacen->total(),
                'current_page'         => $listaAlmacen->currentPage(),
                'per_page'         => $listaAlmacen->perPage(),
                'last_page'         => $listaAlmacen->lastPage(),
                'from'         => $listaAlmacen->firstItem(),
                'to'         => $listaAlmacen->lastItem()
            ],
            'almacen'=> $listaAlmacen
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
        $almacen = new Almacen();        
        $almacen->nombre = $request->nombre;
        $almacen->ubicacion = $request->ubicacion;
        $almacen->nota = $request->nota;
        $almacen->xstatus ='1';

        $almacen->save();


        return [ 'xstatus'=>true, 'error' => null ];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request){
                
        $almacen = Almacen::findOrFail($request->id_almacen);//~Se busca en base al ID entrante
        $almacen->nombre = $request->nombre;
        $almacen->ubicacion = $request->ubicacion;
        $almacen->nota = $request->nota;
        $almacen->xstatus ='1';

        $almacen->save();


        return [ 'xstatus'=>true, 'error' => null ];

    }


    /**
     * 
     * 
     */
    public function desactivar(Request $request){
        $almacen = Almacen::findOrFail($request->id_almacen);
        $almacen->xstatus ='0';

        $almacen->save();
    }

    /**
     * 
     * 
     */
    public function activar(Request $request){        
        $almacen = Almacen::findOrFail($request->id_almacen);
        $almacen->xstatus ='1';

        $almacen->save();
    }




    function procesador($array){
	
        if(count($array["indice"])<=1){		
            return $array;
        }
        for($i=0; $i<count($array["indice"])-1; $i++){
            $cat = $array["indice"][$i];
            $hijo = $this->get("https://tendencias.mercadolibre.com.mx".$cat["path"]);
            
            if($cat["nombre"]==$hijo["indice"][0]["nombre"]){
                $array["indice"][$i]["detalle"]=$hijo["detalle"];
            }else{
                //$array["indice"][$i]["hijo"]=$hijo;		

                $array["indice"][$i]["hijo"] = $this->procesador($hijo);
            }
        }
        
        
        return $array;
    }


    public function get($page){
	
        $handle = curl_init();
         
        $url = $page;
         
        // Set the url
        curl_setopt($handle, CURLOPT_URL, $url);
        curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 0); 
        curl_setopt($handle, CURLOPT_TIMEOUT, 5); //timeout in seconds
        // Set the result output to be a string.
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
         
        $output = curl_exec($handle);
         
        curl_close($handle);
         
        //~Div Indice (Lateral) 
        $posIniIndice = stripos($output, '<div class="andes-card sidebar__card">');
        $posIniDestaca = stripos($output, '<div class="andes-card sidebar__card">', $posIniIndice + 1);
        $posIniDetalle = stripos($output, '<div class="andes-card searches">', $posIniDestaca + 1);
    
        $bloqueHtmlIndice = substr($output, $posIniIndice, $posIniDestaca - $posIniIndice);
        $bloqueHtmlDestaca = substr($output, $posIniDestaca, $posIniDetalle - $posIniDestaca);
        $bloqueHtmlDetalle = substr($output, $posIniDetalle);
    
        $arrBloqueHtmlIndice = explode("<a href=", $bloqueHtmlIndice);
        $arrBloqueHtmlDestaca = explode("<a href=", $bloqueHtmlDestaca);
        $arrBloqueHtmlDetalle = explode('<li class="searches__item">', $bloqueHtmlDetalle);
    
        $arrIndiceSalida = array();
        for($i=1; $i<count($arrBloqueHtmlIndice); $i++){
            array_push($arrIndiceSalida, $this->limpiaCadenaTipo1($arrBloqueHtmlIndice[$i]));
        }
    
    
        $arrDestacaSalida = array();
        for($i=1; $i<count($arrBloqueHtmlDestaca); $i++){
            array_push($arrDestacaSalida, $this->limpiaCadenaTipo1($arrBloqueHtmlDestaca[$i]));
        }
    
        $arrDetalleSalida = array();
        for($i=1; $i<count($arrBloqueHtmlDetalle); $i++){
            array_push($arrDetalleSalida, $this->limpiaCadenaTipo2($arrBloqueHtmlDetalle[$i]));
        }
    
        $salida = array(
            "indice"=>$arrIndiceSalida,
            //"destaca"=>$arrDestacaSalida,
            "detalle"=>$arrDetalleSalida
        );
    
        return $salida;
    
    }
    
    public function limpiaCadenaTipo1($cadena){
        $catF = stripos($cadena, '">');
        $cat = substr($cadena, 1, $catF-1);
    
        $ncatF = stripos($cadena, '</a>');
        $nCat = substr($cadena, $catF + 2, $ncatF-$catF-2);
    
        $catArray = array("nombre"=>$nCat,"path"=>$cat);
        return $catArray;
    }
    
    public function limpiaCadenaTipo2($cadena){
        $catF = stripos($cadena, '">');
        $cat = substr($cadena, 9, $catF-9);
    
        $ncatF = stripos($cadena, '</a>');
        $nCat = substr($cadena, $catF + 2, $ncatF-$catF-2);
    
        $catArray = array("nombre"=>$nCat,"path"=>$cat);
        return $catArray;
    }


    /**
     * Registra movimiento en almacen
     * API: /almacenes/movimiento
     * 
     */
    public function movimientoAlmacen(Request $request){
        DB::beginTransaction();
        try{
            $idAlmacen = $request->idAlmacen;
            $idProducto = $request->idProducto;
            $tipoMovimiento = $request->tipoMovimiento;
            $cantidad = $request->cantidad;
            $ubicacion = $request->ubicacion;  
            $loteReferencia = $request->loteReferencia; 

            //~Validaciones
            if($tipoMovimiento!="INGRESO" && $tipoMovimiento!="RETIRO"){
                throw new Exception('Tipo de movimiento no valido');
            }
            if($cantidad==null || $cantidad<=0){
                throw new Exception('Especificar la cantidad de productos');
            }

            //~Producto
            $producto = Producto::findOrFail($idProducto);

            if($producto->xstatus!=1){
                throw new Exception('Producto no activo');
            }

            //~Almacen
            $almacen = Almacen::findOrFail($idAlmacen);

            if($almacen->xstatus!=1){
                throw new Exception('Almacen no activo');
            }

             //~Valida la ubicacion
             $catUbicaProducto = CatUbicaProducto::where('codigo', '=', $ubicacion)
             ->where('xstatus','=', '1')
             ->get()->first();

             if($catUbicaProducto == null){
                throw new Exception('No existe la ubicacion');
             }

            //~Stock del producto
            $stockProducto = StockProducto::where('id_producto', '=', $idProducto)
            ->where('id_almacen','=',$idAlmacen)
            ->get()->first();

            //~Valida si existe registro en stock_producto    
            if($stockProducto == null){
                $stockProducto = new StockProducto();
                $stockProducto->id_producto = $idProducto;
                $stockProducto->id_almacen = $idAlmacen;
                $stockProducto->stock = 0;
                $stockProducto->disponible = 0;
                $stockProducto->retenido = 0;                
                $stockProducto->save();
            }

            //~Calcula el ultimo saldo(stock) en el almacen
            $saldo = $this->getStock($idAlmacen, $idProducto);
            
            if($tipoMovimiento=="INGRESO"){
                $nuevoStockAlmacen = $saldo + $cantidad;
                $nuevoStockProducto = $stockProducto->stock + $cantidad;
            }else{
                $nuevoStockAlmacen = $saldo - $cantidad;
                $nuevoStockProducto = $stockProducto->stock - $cantidad;

                $saldoDisponible = 0;
                if($stockProducto != null){
                    $saldoDisponible = $stockProducto->disponible;
                }

                //~Sobregiro del producto en el almacen seleccionado
                if($nuevoStockAlmacen < 0){
                    throw new Exception('Saldo(stock) insuficiente en el almacen');
                }

                //~Sobregiro del producto
                if($nuevoStockProducto < 0 || $saldoDisponible < $cantidad){
                    throw new Exception('Saldo(stock) insuficiente para el producto');
                }
            }


            //~Registra movimiento
            $movimientoAlmacen = new MovimientoAlmacen();
            $movimientoAlmacen->id_almacen=$idAlmacen;
            $movimientoAlmacen->id_producto=$idProducto;
            $movimientoAlmacen->tipo_movimiento=substr($tipoMovimiento,0,3);
            $movimientoAlmacen->fecha_aplicacion=new \DateTime();
            $movimientoAlmacen->cantidad=$cantidad;            
            $movimientoAlmacen->stock=$nuevoStockAlmacen;            
            $movimientoAlmacen->ubicacion=$ubicacion;
            $movimientoAlmacen->lote_referencia=$loteReferencia;            
            $movimientoAlmacen->estatus_movimientos='A';

            $movimientoAlmacen->save();
                               
            //~Actualiza stock del producto
            $stockProducto->stock = $nuevoStockProducto;
            $stockProducto->disponible = $nuevoStockProducto - $stockProducto->retenido;

            if($tipoMovimiento=="INGRESO"){
                $stockProducto->ultima_entrada = new \DateTime();
            }else{
                $stockProducto->ultima_salida = new \DateTime();
            }            
            
            $stockProducto->update();                                        

            //~Actualiza el stock de la ubicacion
            $stockUbicaProducto = StockUbicaProducto::where('id_stock_producto','=',$stockProducto->id_stock_producto)
            ->where('id_producto', '=', $idProducto)
            ->where('codigo_ubica','=',$catUbicaProducto->codigo)
            ->get()->first();

            if($stockUbicaProducto==null){
                $stockUbicaProducto = new StockUbicaProducto();
                $stockUbicaProducto->id_stock_producto=$stockProducto->id_stock_producto;
                $stockUbicaProducto->id_producto=$idProducto;
                $stockUbicaProducto->codigo_ubica=$catUbicaProducto->codigo;

                if($tipoMovimiento=="INGRESO"){
                    $stockUbicaProducto->stock=$cantidad;
                }else{
                    $stockUbicaProducto->stock=$cantidad;
                }
            
                $stockUbicaProducto->save();
            }else{
                $stockActual = $stockUbicaProducto->stock;

                if($tipoMovimiento=="INGRESO"){
                    $stockActual = $stockActual + $cantidad;
                }else{
                    $stockActual = $stockActual - $cantidad;
                }
                $stockUbicaProducto->stock=$stockActual;
            
                $stockUbicaProducto->update();
            }


            DB::commit();
            return [ 'xstatus'=>true, 'movimiento'=>$movimientoAlmacen, 'stockUbicacion'=>$stockUbicaProducto, 'stockProducto'=>$stockProducto];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Obtiene el ultimo saldo(stock)
     * 
     * 
     */
    public function getStock($idAlmacen, $idProducto){
        try{
            $ultimoSaldo = 0;
            $sql = "SELECT stock FROM movimiento_almacen
                    WHERE id_movimiento_almacen = (
                    SELECT MAX(id_movimiento_almacen) FROM movimiento_almacen
                    WHERE id_almacen = $idAlmacen
                    AND id_producto = $idProducto
                    AND fecha_aplicacion = (
                        SELECT CASE
									WHEN ultima_entrada IS NOT NULL AND ultima_salida IS NULL THEN ultima_entrada
									WHEN ultima_entrada IS NULL AND ultima_salida IS NOT NULL THEN ultima_salida
									WHEN ultima_entrada>ultima_salida THEN ultima_entrada
									WHEN ultima_entrada<ultima_salida THEN ultima_salida    
								END 
                        FROM stock_producto 
                        WHERE id_producto = $idProducto AND id_almacen = $idAlmacen
                    )
                )";            

            $rs = DB::select( $sql );

            if(count($rs)>0){
                $ultimoSaldo = $rs[0]->stock;                               
            }

            return $ultimoSaldo;
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return 0;
        }
    }


    /**
     * Exporta a excel almacen completo
     * API: /almacenes/export
     * 
     */
    public function exportar(Request $request){
        try{
            
            $nombreSalida = 'almacen_'.uniqid().'_reporte.xlsx';
            
            return (new AlmacenExport)->define()->download($nombreSalida);
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        
    }


    /**
     * Obtiene el resumen por almacen
     * Total de productos
     * Total de piezas
     * Valor del almacen
     */
    public function resumenAlmacen(Request $request){
        try{
            
            $idAlmacen = $request->id_almacen;

            $almacen = Almacen::findOrFail($idAlmacen);//~Se busca en base al ID entrante
            

            $sql="select 	count(p.id_producto) total_productos,
            sum(sp.stock) total_piezas,
            sum(sp.stock * p.ultimo_precio_compra) valor
            from almacen a, producto p, stock_producto sp
            where sp.id_almacen = a.id_almacen
            and sp.id_producto = p.id_producto
            and a.id_almacen = ".$idAlmacen;

            $rs = DB::select( $sql );

            $totalProductos = 0;
            $totalStock = 0;
            $totalPesos = 0;
            
            if(count($rs)>0){                
                $totalProductos = $rs[0]->total_productos;
                $totalStock = $rs[0]->total_piezas;
                $totalPesos = $rs[0]->valor;                         
            }
            
            
            return [    'xstatus'=>true, 
                        'totalProductos'=>$totalProductos, 
                        'totalStock'=>$totalStock, 
                        'totalPesos'=>$totalPesos, 
                        'almacen'=>$almacen];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        
    }

    /**
     * Obtiene el detalle de productos dentro del almacen junto con su stock
     * 
     * 
     */
    public function resumenDetalleProductosAlmacen(Request $request){
        try{
            
            $idAlmacen = $request->id_almacen;
            $idProductoBuscar = $request->id_producto;


            if($idProductoBuscar == null){
                $almacen = StockProducto::with('ubicacionStock')
                ->join('producto','producto.id_producto','=','stock_producto.id_producto')
                ->select('stock_producto.id_stock_producto','stock_producto.id_almacen','producto.id_producto','producto.codigo','producto.nombre','producto.url_imagen','producto.ultimo_precio_compra','stock_producto.stock','stock_producto.retenido','stock_producto.disponible')
                ->where('stock_producto.id_almacen', '=', $idAlmacen)
                ->where('producto.xstatus', '=', 1)
                ->paginate(10);
            }else{
                $almacen = StockProducto::with('ubicacionStock')
                ->join('producto','producto.id_producto','=','stock_producto.id_producto')
                ->select('stock_producto.id_stock_producto','stock_producto.id_almacen','producto.id_producto','producto.codigo','producto.nombre','producto.url_imagen','producto.ultimo_precio_compra','stock_producto.stock','stock_producto.retenido','stock_producto.disponible')
                ->where('stock_producto.id_almacen', '=', $idAlmacen)
                ->where('producto.id_producto', '=', $idProductoBuscar)
                ->where('producto.xstatus', '=', 1)
                ->paginate(10);
            }

            


            return [    'xstatus'=>true, 
                        'detalle'=> $almacen,
                        'pagination' => [
                            'total'         => $almacen->total(),
                            'current_page'         => $almacen->currentPage(),
                            'per_page'         => $almacen->perPage(),
                            'last_page'         => $almacen->lastPage(),
                            'from'         => $almacen->firstItem(),
                            'to'         => $almacen->lastItem()
                        ]
                    ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        
    }


    /**
     * Recupera el detalle de movimientos en el almacen por producto
     * 
     * 
     */
    public function detalleMovAlmacen(Request $request){
        try{
            
            $idAlmacen = $request->id_almacen;
            $idProducto = $request->id_producto;

            $detalle = MovimientoAlmacen::where('id_almacen','=',$idAlmacen) 
            ->where('id_producto', '=', $idProducto)
            ->select('id_movimiento_almacen','id_almacen','id_producto','tipo_movimiento',DB::raw("DATE_FORMAT(fecha_aplicacion, '%m/%d/%Y') as fecha_aplicacion"), 'cantidad','stock','ubicacion','estatus_movimientos')
            ->orderBy('fecha_aplicacion','asc')
            ->orderBy('id_movimiento_almacen','desc')
            ->paginate(30);




            return [    'xstatus'=>true, 
                        'detalle'=> $detalle,
                        'pagination' => [
                            'total'         => $detalle->total(),
                            'current_page'         => $detalle->currentPage(),
                            'per_page'         => $detalle->perPage(),
                            'last_page'         => $detalle->lastPage(),
                            'from'         => $detalle->firstItem(),
                            'to'         => $detalle->lastItem()
                        ]
                    ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        
    }


    /**
     * Crear lote de ingreso o retiro
     * 
     * 
     */
    public function generaLoteAlmacen(Request $request){
        try{
            
            
            $seq = app(ParametriaController::class)->seqFolioRegistroAlmacen_nextval();
            $lote = 'INOUT_'.str_pad($seq,10,"0",STR_PAD_LEFT);


            return [    'xstatus'=>true, 'lote'=> $lote ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        
    }


    /**
     * General ticket con la orden de entrada y salida
     * 
     * 
     */
    public function exportTicketOrden(Request $request){
        try{
            
            $loteReferencia = $request->lote_referencia;

            $pdf = \PDF::loadView('exports/ticketMovAlmacen');
  return $pdf->download('pruebapdf.pdf');

           // $pdf = app('dompdf.wrapper');
/*
            $customPaper = array(0,0,100,283.80);
            $pdf->setPaper($customPaper, 'landscape');
    $pdf->loadHTML('<h1>Styde.net</h1>
    <p>hola</p>
    <p>hola</p>
    <p>hola</p>
    <p>hola</p>
    <p>hola</p>
    <p>hola</p>
    <p>hola</p>
    <p>Setting the paper size in PHP requires knowing the point (pt) measurement, points being the native PDF unit. The PDF resolution (with Dompdf) is 72pt/inch. So 10cm x 20cm is roughly equivalent to 283 X 566 (as you noted in your answer).

    You can, however, allow Dompdf to calculate the appropriate point size by specifying your page dimensions in CSS. This is available starting with Dompdf 0.6.2.</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>1</p>
    <p>2</p>
    <p>2</p>
    <p>3</p>
    ');

    return $pdf->download('mi-archivo.pdf');
            */

            
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        
    }


    /**
     * Map almacen
     * 
     * 
     * 
     */
    public function selectAlmacen(Request $request){
        try{
            if(!$request->ajax())return redirect('/');

            $almacen = Almacen::select('id_almacen','nombre')
            ->where('xstatus','=', '1')
            ->orderBy('nombre', 'asc')
            ->get();

            return ['almacen' => $almacen];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());            
            return ['exception' => $e->getMessage()];
        }   
    }


    /**
     * Map ubicaciones
     * 
     * 
     * 
     */
    public function selectAlmacenUbicaciones(Request $request){
        try{
            if(!$request->ajax())return redirect('/');

            $cat = CatUbicaProducto::select('codigo','nombre')
            ->where('xstatus','=', '1')
            ->orderBy('nombre', 'asc')
            ->get();

            return ['ubicaciones' => $cat];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());            
            return ['exception' => $e->getMessage()];
        }   
    }



    

}