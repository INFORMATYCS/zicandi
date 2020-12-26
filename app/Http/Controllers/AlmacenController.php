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
            $idAlmacen = $request->id_almacen;
            $idProducto = $request->id_producto;
            $tipoMovimiento = $request->tipo_movimiento;
            $cantidad = $request->cantidad;
            $ubicacion = $request->ubicacion;            

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

            //~Stock del producto
            $stockProducto = StockProducto::where('id_producto', '=', $idProducto)->get()->first();

            //~Valida si existe registro en stock_producto    
            if($stockProducto == null){
                $stockProducto = new StockProducto();
                $stockProducto->id_producto = $idProducto;
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
            $movimientoAlmacen->estatus_movimientos='A';

            $movimientoAlmacen->save();
                               
            //~Actualiza stock del producto
            $stockProducto->stock = $nuevoStockProducto;
            $stockProducto->disponible = $nuevoStockProducto - $stockProducto->retenido;
            $stockProducto->update();                            

            //~Valida si existe registro en bita_resumen_almacen            
            $bitaResumenAlmacen = BitaResumenAlmacen::where('id_producto', '=', $idProducto)
            ->where('id_almacen', '=', $idAlmacen)->get()->first();

            if($bitaResumenAlmacen == null){
                $bitaResumenAlmacen = new BitaResumenAlmacen();
                $bitaResumenAlmacen->id_producto = $idProducto;
                $bitaResumenAlmacen->id_almacen = $idAlmacen;
                $bitaResumenAlmacen->stock = $nuevoStockAlmacen;
                $bitaResumenAlmacen->primer_registro = new \DateTime();;
                $bitaResumenAlmacen->ultimo_registro = new \DateTime();;                
                $bitaResumenAlmacen->save();
            }else{                
                $bitaResumenAlmacen->stock = $nuevoStockAlmacen;                
                $bitaResumenAlmacen->ultimo_registro = new \DateTime();;                
                $bitaResumenAlmacen->update();
            }

            DB::commit();
            return [ 'xstatus'=>true];
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
            $sql= " SELECT stock FROM movimiento_almacen
                    WHERE id_movimiento_almacen = (
                        SELECT max(id_movimiento_almacen) FROM movimiento_almacen
                        WHERE id_almacen = $idAlmacen AND id_producto = $idProducto
                        AND fecha_aplicacion = (
                            SELECT ultimo_registro FROM bita_resumen_almacen
                            WHERE id_almacen = $idAlmacen AND id_producto = $idProducto
                        )
                    )";        

            $rs = DB::select( $sql );

            if(count($rs)>0){
                $ultimoSaldo = $rs[0]->stock;                
               
            }else{
                $ultimoSaldo;
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


}