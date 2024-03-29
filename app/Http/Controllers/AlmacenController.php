<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
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
use App\TempCargaStock;
use App\Parametria;
use App\Exports\AlmacenExport;
use App\Exports\AlmacenDetalleExport;
use App\Imports\StockMasivaImport;
use App\MeliSocketEnvioFull;


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

            DB::select('call sp_aplica_movimiento_almacen(?,?,?,?,?,?,@idMovimientoAlmacen,@err, @msg)', [$idProducto, $idAlmacen, $ubicacion, substr($tipoMovimiento,0,3), $cantidad, $loteReferencia]);
            $results = DB::select('select @idMovimientoAlmacen idMovimientoAlmacen, @err as err, @msg as msg');
            $idMovimientoAlmacen= $results[0]->idMovimientoAlmacen;
            $pError= $results[0]->err;
            $pMsgError= $results[0]->msg;

            if($pError!=0){
                throw new Exception('No fue posible aplicar el movimiento. '.$pMsgError);
            }

            $movimientoAlmacen= MovimientoAlmacen::findOrFail($idMovimientoAlmacen);

            //~Stock del producto
            $stockProducto = StockProducto::where('id_producto', '=', $idProducto)
            ->where('id_almacen','=',$idAlmacen)
            ->get()->first();

            //~Actualiza el stock de la ubicacion
            $stockUbicaProducto = StockUbicaProducto::where('id_stock_producto','=',$stockProducto->id_stock_producto)
            ->where('id_producto', '=', $idProducto)
            ->where('codigo_ubica','=',$catUbicaProducto->codigo)
            ->get()->first();

           

            //~Elimina todos los registros en cero
            /*StockUbicaProducto::where('id_stock_producto','=',$stockProducto->id_stock_producto)
            ->where('stock', '=', 0)            
            ->delete();*/

            

            //Realiza el arrastre de stock
            $parametria = Parametria::where('xstatus','=','1')
            ->where('clave_proceso','=','ARR_STOCK_MOV')
            ->where('llave','=','ARRASTRE_ACTIVO')
            ->select('llave','valor', 'descripcion')
            ->get()->first();

            if($parametria->valor == '1'){
                DB::select('call sp_arrastre_stock_producto(?)', [$idProducto]);
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
                                    WHEN ultima_entrada=ultima_salida THEN ultima_salida
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
     * Genera el detalle del resumen
     * 
     * 
     * 
     */
    public function resumenAlmacenReporte(Request $request){
        try{
            
            $idAlmacen = $request->idAlmacen;

            $almacen = Almacen::findOrFail($idAlmacen);//~Se busca en base al ID entrante        

            $nombreSalida = 'almacen_'.$almacen->nombre."_".uniqid().'_reporte.xlsx';            
            return (new AlmacenDetalleExport)->define($idAlmacen)->download($nombreSalida);

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
            ->select('id_movimiento_almacen','id_almacen','id_producto','tipo_movimiento',DB::raw("DATE_FORMAT(fecha_aplicacion, '%d/%m/%Y') as fecha_aplicacion"), 'cantidad','stock','ubicacion','estatus_movimientos','lote_referencia')                        
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

            $sql= "select p.codigo, p.nombre, IF(tipo_movimiento='RET', cantidad*-1, cantidad) cantidad, stock, ubicacion, tipo_movimiento
            from movimiento_almacen ma, producto p
            where ma.id_producto = p.id_producto
            and lote_referencia = '".$request->lote_referencia."'";

            $ordernEntrega = DB::select( $sql );


            $arreglo = [
                "loteReferencia"    => $request->lote_referencia,
                "fecha"             => date("d/m/Y"),
                "tabla"             => $ordernEntrega
            ];              

            //$pdf = \PDF::loadView('exports/ticketMovAlmacen', ['datos' => $arreglo]);
            return \PDF::loadView('exports/ticketMovAlmacen', ['datos' => $arreglo])
            ->stream('archivo.pdf');

            //return $pdf->download('resumenOrdenEntrega.pdf');  

            
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

    /**
     * Filter ubicaciones
     * 
     * 
     * 
     */
    public function filterAlmacenUbicaciones(Request $request){
        try{
            if(!$request->ajax())return redirect('/');

            $criterio = $request->criterio;

            $cat = CatUbicaProducto::select('codigo','nombre')
            ->where('xstatus','=', '1')
            ->where('codigo','like', '%' . $criterio . '%')            
            ->orderBy('nombre', 'asc')
            ->get();

            return ['ubicaciones' => $cat];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());            
            return ['exception' => $e->getMessage()];
        }   
    }


    /**
     * Crea nueva ubicacion
     * 
     * 
     */
    public function storeUbicacion(Request $request){
        try{
            //~Busca que no exista la ubicacion
            $reqCat = CatUbicaProducto::where('codigo','=', $request->codigo)->get();

            //~Valida la existencia del alamacen
            $almacen= Almacen::findOrFail($request->id_almacen);
            if($almacen==null)
                throw new Exception('No existe el almacen');   

            if($reqCat->isEmpty()){
                $cat = new CatUbicaProducto();
                $cat->codigo = $request->codigo;
                $cat->nombre = $request->nombre;
                $cat->id_almacen = $request->id_almacen;
                $cat->xstatus ='1';
                $cat->save();

                return [ 'xstatus'=>true, 'ubicacion' => $cat, 'almacen' => $almacen ];
            }else{
                return [ 'xstatus'=>false, 'error' => 'Ya existe la ubicacion' ];
            }            
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }                 
    }


    /**
     * Unifica dos ubicaciones
     * 
     * 
     */
    public function unificaUbicacion(Request $request){
        DB::beginTransaction();
        try{
            //~Busca que no exista la ubicacion
            $origen = CatUbicaProducto::where('codigo','=', $request->ubicacionOrigen)->first();
            if($origen==null){                
                return [ 'xstatus'=>false, 'error' => 'No existe ubicacion origen' ];
            }
            if($origen->id_almacen==null){
                return [ 'xstatus'=>false, 'error' => 'La ubicacion origen no esta ligada a ningun almacen' ];
            }

            $destino = CatUbicaProducto::where('codigo','=', $request->ubicacionDestino)->first();
            if($destino==null){                
                return [ 'xstatus'=>false, 'error' => 'No existe ubicacion destino' ];
            }
            if($destino->id_almacen==null){
                return [ 'xstatus'=>false, 'error' => 'La ubicacion destino no esta ligada a ningun almacen' ];
            }

            $codigoOrigen = $origen->codigo;
            $codigoDestino = $destino->codigo;

            DB::select('call sp_genera_lote_unifica_ubica(?, ?, @lote, @err, @msg)', [$codigoOrigen, $codigoDestino]);
            $results = DB::select('select @lote lote, @err as err, @msg as msg');
            $pLote= $results[0]->lote;
            $pError= $results[0]->err;
            $pMsgError= $results[0]->msg;

            if($pError!=0){
                throw new Exception('No fue posible generar el lote para el folio '.$folioFull.' :'.$pMsgError);
            }

            DB::commit();  

            return [ 'xstatus'=>true, 'lote' => $pLote ];
        }catch (\Exception $e) {
            DB::rollBack();

            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }                 
    }

    public function removeUbicacion(Request $request){
        DB::beginTransaction();
        try{
            //~Determina si hay detalle para la ubicacion
            $detalle = StockUbicaProducto::where('codigo_ubica','=', $request->ubicacion)->first();

            if($detalle!=null){                
                return [ 'xstatus'=>false, 'error' => 'No puedes borrar la ubicacion mientras tenga productos' ];
            }

            $ubica = CatUbicaProducto::where('codigo','=', $request->ubicacion)->first();
            $ubica->delete();

            DB::commit();  

            return [ 'xstatus'=>true];
        }catch (\Exception $e) {
            DB::rollBack();

            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }                 
    }

    /**
     * Consulta el detalle/resumen por ubicacion
     * 
     * 
     * 
     */
    public function resumenUbicacion(Request $request){
        
        try{
            $opcion = $request->opcion;
            $sql= " select 	    p.codigo,
                                p.nombre,
                                sup.stock
                    from stock_ubica_producto sup, producto p
                    where sup.id_producto = p.id_producto
                    and sup.codigo_ubica = '".$request->codigoUbicacion."'
                    order by p.codigo";   
            $detalle = DB::select( $sql );

            if($opcion=="ticket"){

                $arreglo = [                    
                    "fecha"             => date("d/m/Y"),
                    "ubicacion"             => $request->codigoUbicacion,
                    "tabla"             => $detalle
                ];              
                    
                return \PDF::loadView('exports/ticketDetalleUbicacion', ['datos' => $arreglo])
                ->stream('archivo.pdf');
            }else{
                return [ 'xstatus'=>true, 'detalleUbicacion' => $detalle ];
            }

        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }                 
    }


    /**
     * Carga el archivo en temporales
     * 
     * 
     */
    public function cargaTempArchivoXLS(Request $request){        
        try{
            $temp = new TempCargaStock();
            $temp->truncate();


            $file = $request->file('file');
            $resp = Excel::import(new StockMasivaImport, $file);

            //~Procesa la informacion
            $temp = TempCargaStock::all();


            foreach($temp as $t){   
                try{
                    $idProducto = intval($t->id_producto);
                    $codigoProducto = trim($t->codigo_producto);
                    $idAlmacen = intval($t->id_almacen);
                    $tipoMovimiento = strtoupper(trim($t->tipo_movimiento));
                    $codigoUbicacion = trim($t->codigo_ubicacion);
                    $cantidad = floatval ($t->cantidad);
                    $loteReferencia = trim ($t->lote_referencia);
                    $opt1 = trim ($t->opt1);
                    $opt2 = trim ($t->opt2);
                    $opt3 = trim ($t->opt3);

                    if($idProducto ==0 && $codigoProducto == null){
                        throw new Exception('Se requiere especificar el producto');
                    }

                    //~1 Busca el producto
                    $producto=null;
                    if($idProducto>0){
                        $producto = Producto::where('id_producto','=', $idProducto)
                        ->where('xstatus','=','1')
                        ->first();                        
                    }

                    if($producto==null){                
                        $producto = Producto::where('codigo','=', $codigoProducto)
                        ->where('xstatus','=','1')
                        ->first();

                        if($producto==null){
                            throw new Exception('Producto no encontrado en catalogo');
                        }
                    }

                    $t->id_producto = $producto->id_producto;


                    //~2 Busca el almacen
                    $almacen=null;
                    if($idAlmacen>0){
                        $almacen = Almacen::where('id_almacen','=', $idAlmacen)
                        ->where('xstatus','=','1')
                        ->first();  
                        
                        if($almacen==null){
                            throw new Exception('Almacen no encontrado en catalogo');
                        }
                    }else{
                        throw new Exception('Se requiere el ID del almacen');
                    }

                    //~3 Tipo de movimiento
                    if($tipoMovimiento != 'INGRESO' && $tipoMovimiento != 'RETIRO' && $tipoMovimiento != 'SET_UBICA' && $tipoMovimiento != 'SET_INI'){
                        throw new Exception('Tipo movimiento invalido, solo se permite INGRESO|RETIRO');
                    }


                    //~4 Busca que no exista la ubicacion
                    $catUbicaProducto = CatUbicaProducto::where('codigo','=', $codigoUbicacion)->first();
                    if($catUbicaProducto==null){                
                        throw new Exception('No existe la ubicacion');
                    }

                    //~5 Evalua cantidad de piezas
                    if($cantidad<0){
                        throw new Exception('El stock no puede ser menor a Cero o negativo');
                    }

                    //~6 Lote
                    if($loteReferencia = ''){
                        throw new Exception('Ingresa un lote de referencia');
                    }

                    //~7 Calcula el stock actual por ubicacion
                    $stockUbicaProducto = StockUbicaProducto::where('id_producto','=', $producto->id_producto)
                    ->where('codigo_ubica','=', $codigoUbicacion)
                    ->first();

                    if($stockUbicaProducto == null){
                        $stockUbicaActual = 0;
                        $idStockUbicaProducto = null;
                    }else{
                        $stockUbicaActual = $stockUbicaProducto->stock;
                        $idStockUbicaProducto = $stockUbicaProducto->id_stock_ubica_producto;                        
                    }
 
                    
                    //~8 Calcula stock PRODUCTO actual
                    $stockProducto =  StockProducto::where('id_producto','=', $producto->id_producto)
                    ->where('id_almacen','=', $almacen->id_almacen)
                    ->first();

                    if($stockProducto == null){
                        $stockActual = 0;
                        $idStockProducto = null;
                    }else{
                        $stockActual = $stockProducto->stock;
                        $idStockProducto = $stockProducto->id_stock_producto;
                    }

                    //~9 Determina las piezas en operacion
                    if($tipoMovimiento == 'INGRESO' || $tipoMovimiento == 'RETIRO'){
                        $piezasOperar = ($tipoMovimiento == 'RETIRO' ? $cantidad*-1 : $cantidad);
                        $stockActual = $stockUbicaActual;
                        $stockNuevo = $stockUbicaActual + ($tipoMovimiento == 'RETIRO' ? $cantidad*-1 : $cantidad);

                        if($stockNuevo < 0){
                            throw new Exception('Saldo insuficiente Actual = '.$stockActual.', Piezas operar = '.$piezasOperar.', Saldo nuevo = '.$stockNuevo);
                        }
                    }else if($tipoMovimiento == 'SET_UBICA' || $tipoMovimiento == 'SET_INI'){
                        $stockActual = ($tipoMovimiento == 'SET_UBICA' ? $stockUbicaActual : $stockActual);

                        if($stockActual == 0){
                            $piezasOperar = $cantidad;
                        }
                        elseif($stockActual > $cantidad){
                            $piezasOperar = $cantidad - $stockActual;
                        }else{
                            $piezasOperar = $stockActual -$cantidad;
                        }

                        $stockNuevo= $stockActual +  $piezasOperar;

                    }
                    
                 
                    $t->piezas_operar = $piezasOperar;                    
                    $t->stock_nuevo = $stockNuevo;                    
                    $t->stock_actual = $stockActual;                    
                    

                    $t->estatus = 'ACE';                    
                    $t->update();

                    
                }catch (\Exception $e) {                    
                    $t->estatus = 'ERR';
                    $t->diagnostico = $e->getMessage();
                    $t->update();
                }                      
                
            }

            //~Recupera la lista y completa con el producto
            $tempCargaStock = TempCargaStock::all();

            foreach($tempCargaStock as $t){
                $t->producto = Producto::find($t->id_producto);
                if($t->producto == null){
                    $t->producto = array('url_imagen'=>'','codigo'=>$t->codigo_producto,'nombre'=>'No localizado');
                }

                $t->almacen = Almacen::find($t->id_almacen);
            }

            
            return [ 'xstatus'=>true, 'carga' => $tempCargaStock ];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }                 
    }




    /**
     * Aplica ajustes en stock desde el Excel
     * 
     * 
     */
    public function aplicaCargaExcel(Request $request){        
        try{           

            DB::select('call sp_genera_lote_excel(@lote,@err, @msg)');
            $results = DB::select('select @lote lote, @err as err, @msg as msg');

            $lote= $results[0]->lote;
            $pError= $results[0]->err;
            $pMsgError= $results[0]->msg;

            if($pError!=0){
                throw new Exception('No fue posible generar el lote. '.$pMsgError);
            }

            //~Deshabilita modulo 11 11 2023
            return [ 'xstatus'=>false, 'error' => 'Se genero el lote '.$lote ];   

            //~Procesa la informacion
            $temp = TempCargaStock::where('estatus','=','ACE')->get();           

            foreach($temp as $t){   
                try{                    
                    $request->idAlmacen=        intval($t->id_almacen);  
                    $request->idProducto=       intval($t->id_producto);
                    $tipoMovimiento = $request->tipoMovimiento=   strtoupper(trim($t->tipo_movimiento));
                    $request->cantidad=         floatval ($t->piezas_operar) < 0 ? floatval ($t->piezas_operar)*-1 : floatval ($t->piezas_operar); 
                    $request->ubicacion=        trim($t->codigo_ubicacion);  
                    $request->loteReferencia=   trim ($t->lote_referencia);  


                    if( $tipoMovimiento=="SET_UBICA" ){
                        $piezasOperar = $t->piezas_operar;

                        if($piezasOperar<0){                            
                            $request->tipoMovimiento = "RETIRO";
                            $request->cantidad = $piezasOperar *-1;
                        }else{                            
                            $request->tipoMovimiento = "INGRESO";
                            $request->cantidad = $piezasOperar;
                        }

                    }else if($tipoMovimiento=="SET_INI"){
                        $stockProducto = StockProducto::where('id_producto','=', $request->idProducto)
                        ->where('id_almacen','=', $request->idAlmacen)
                        ->first();

                        //~Libera el saldo actual
                        StockProducto::where('id_producto','=', $request->idProducto)
                        ->where('id_almacen','=', $request->idAlmacen)
                        ->update( ['disponible'=> $stockProducto->stock, 'retenido'=>0] );
                        


                        //~Consulta saldo actual
                        $stockProducto =  StockProducto::where('id_producto','=', $request->idProducto)
                        ->where('id_almacen','=', $request->idAlmacen)
                        ->first();                        

                        //~Aplica un movimiento para dejar en cero el stock     
                        $reqCero = new Request;
                        $reqCero->idAlmacen=        intval($t->id_almacen);  
                        $reqCero->idProducto=       intval($t->id_producto);
                        $reqCero->tipoMovimiento=   "RETIRO";
                        $reqCero->cantidad=         $stockProducto->stock;
                        $reqCero->ubicacion=        trim($t->codigo_ubicacion);
                        $reqCero->loteReferencia=   trim ($t->lote_referencia);

                        $resultado = $this->movimientoAlmacen($reqCero);


                        //~Vacia a cero todas las ubicaciones para dejar en cero el stock general
                        StockUbicaProducto::where('id_producto','=', $request->idProducto)
                        ->where('id_stock_producto','=', $stockProducto->id_stock_producto)
                        ->delete();


                        $request->tipoMovimiento = "INGRESO";
                        $request->cantidad = floatval ($t->cantidad);
                        
                    }


                    //~Aplica movimiento
                    $resultado = $this->movimientoAlmacen($request);

                    if($resultado["xstatus"]){
                        $t->estatus = 'APL';
                        $t->update();                        
                        $t->movimiento = $resultado;
                    }else{
                        $t->estatus = 'EPL';
                        $t->diagnostico = $resultado["error"];
                        $t->update();
                    }

                }catch (\Exception $e) {                    
                    $t->estatus = 'ERR';
                    $t->diagnostico = $e->getMessage();
                    $t->update();
                   
                }                      
                
            }

            return [ 'xstatus'=>true, 'carga' => $temp ];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }                 
    }
    /**
     * Realizar el arrastre del stock historico por ID producto
     * API: /almacenes/movimiento
     * 
     */
    public function aplicaArrastreStockProducto(Request $request){
        DB::beginTransaction();
        try{            
            $idProducto = $request->idProducto;

            DB::select('call sp_arrastre_stock_producto(?)', [$idProducto]);

            return [ 'xstatus'=>true];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Genera un archivo png con el codigo qr del texto proporcionado
     * API: /almacenes/cat_ubica/generate-qr
     * 
     */
    public function generateQrPng(Request $request){
        DB::beginTransaction();
        try{            
            $texto = $request->text;

            $repositorio = Config::get('zicandi.repositorio.entrada.codigo-qr');

            QrCode::size(150)->generate($texto, $repositorio.$texto.'.svg');

            return [ 'xstatus'=>true];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Genera el reporte en pdf con los qr almacenados
     * API: /almacenes/cat_ubica/report-qr
     * 
     */
    public function imprimirReporteQr(Request $request){
        DB::beginTransaction();
        try{            
            $arrFiles = array();
            $handle = opendir(Config::get('zicandi.repositorio.entrada.codigo-qr'));
            if ($handle) {
                while (($entry = readdir($handle)) !== FALSE) {
                    if( strrpos($entry, ".svg") ){
                        $name = basename(Config::get('zicandi.repositorio.entrada.codigo-qr').$entry, ".svg");
                        array_push($arrFiles, array("nombre"=>$name,"path"=>Config::get('zicandi.repositorio.entrada.codigo-qr').$entry));
                    }
                }
            }
            closedir($handle);
            
            return \PDF::loadView('exports/codigoQrUbicaciones', ['datos' => $arrFiles])
            ->setPaper('a4', 'portrait')
            ->stream('impresionCodigoQR.pdf');            
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Depura el directorio a donde se almacenan los qr
     * API: /almacenes/cat_ubica/depura/report-qr
     * 
     */
    public function limpiarDirectorioCodigosQr(Request $request){
        DB::beginTransaction();
        try{                        
            $handle = opendir(Config::get('zicandi.repositorio.entrada.codigo-qr'));
            if ($handle) {
                while (($entry = readdir($handle)) !== FALSE) {
                    if( strrpos($entry, ".svg") ){                       
                        unlink( Config::get('zicandi.repositorio.entrada.codigo-qr').$entry );
                    }
                }
            }
            closedir($handle);    

            return [ 'xstatus'=>true];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    public function generateQrPngLabel(Request $request){
        DB::beginTransaction();
        try{            
            $texto = $request->text;
            $zpl='^XA
^CI28^LH240,5
^FWR

^FO16,168^A0N,18,18^FD^FS
^FO16,168^A0N,18,18^FD^FS

^FB280,2,2
^FO200,30^A0,50,40^FD'.$texto.'^FS

^FO30,15^BQN,2,50^FDQA,'.$texto.'^FS
^PQ1,0,1,Y^XZ';

            //~Inserta en el socket
            $meliSocketEnvioFull = new MeliSocketEnvioFull();
            $meliSocketEnvioFull->zpl_cadena = $zpl;
            $meliSocketEnvioFull->estatus = 'PEN';
            $meliSocketEnvioFull->save();
            
            DB::commit();
            return [ 'xstatus'=>true];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Consulta almacen ligado a la ubicacion
     * 
     * 
     * 
     */
    public function getAlmacenByUbicacion(Request $request){
        
        try{
            $ubicacion= CatUbicaProducto::where('codigo','=',$request->codigo)->first();

            $almacen= null;
            if($ubicacion->id_almacen!=null){
                $almacen= Almacen::findOrFail($ubicacion->id_almacen);
            }
            
            return [ 'xstatus'=>true, 'almacen' => $almacen ];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }                 
    }

    /**
     * Asigna almacen ligado a la ubicacion
     * 
     * 
     * 
     */
    public function setAlmacenByUbicacion(Request $request){
        
        try{
            $ubicacion= CatUbicaProducto::where('codigo','=',$request->codigo)->first();
            if($ubicacion==null)
                throw new Exception('No existe la ubicacion');

            $almacen= Almacen::findOrFail($request->id_almacen);
            if($almacen==null)
                throw new Exception('No existe el almacen');       
            
            $ubicacion->id_almacen=$request->id_almacen;
            $ubicacion->save();
            
            return [ 'xstatus'=>true, 'almacen' => $almacen ];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }                 
    }

    /**
     * Consulta del catalogo las ultimas entradas de ubicaciones
     * 
     * 
     * 
     */
    public function getLastUbicaciones(Request $request){        
        try{
            $ubicaciones = CatUbicaProducto::orderBy('id_cat_ubica_producto', 'DESC')->get();

            $cadenaUbica= "";
            $limitResponse= 7;
            foreach ($ubicaciones as $ubica) {
                $cadenaUbica=$ubica->codigo." ".$cadenaUbica;                
                $limitResponse--;
                if($limitResponse<=0){
                    $cadenaUbica.="-> next";
                    break;
                }
            }
            
            return [ 'xstatus'=>true, 'lastUbicaStr' => $cadenaUbica, 'catUbicacion' => $ubicaciones];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }                 
    }
}