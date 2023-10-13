<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
Use Config;
Use Exception;
Use Log;
use DB;
use App\Http\Components\Enums\XStatusEnum;
use App\Http\Components\Enums\TipoMovimientoAlmacenEnum;
use App\Http\Components\Enums\PrefijoLoteAlmamcenEnum;
use App\CapFolioEntity;
use App\CapFolioDetalleEntity;
use App\Producto;
use App\Almacen;
use App\CatUbicaProducto;
use App\LoteOperacionProcesosEntity;



class CapturadorController extends Controller{
    /**
     * Listar registros
     *
     * @return \Illuminate\Http\Response
     */
    public function getFolios(Request $request){
       
        $listFolios = CapFolioEntity::orderBy('id_cap_folio','desc')->paginate(30);
       

        return [
            'pagination' => [
                'total'         => $listFolios->total(),
                'current_page'         => $listFolios->currentPage(),
                'per_page'         => $listFolios->perPage(),
                'last_page'         => $listFolios->lastPage(),
                'from'         => $listFolios->firstItem(),
                'to'         => $listFolios->lastItem()
            ],
            'folios'=> $listFolios
        ];
        
    }

    public function getFolio(Request $request){       
        try{                                    
            $cap= CapFolioEntity::with('detalle')->findOrFail($request->id_cap_folio);
            
            return [ 'xstatus'=>true, 'cap_folio'=>$cap, 'error' => null ];
        }catch(Exception $e){            
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){
        //~Valida que no exista el mismo concepto en el dia
        $valida = CapFolioEntity::whereDate('fecha_creacion', '=', date('Y-m-d'))
        ->where('concepto', '=', $request->concepto)->first();
        
        if ($valida==null) {
            $cap = new CapFolioEntity();        
            $cap->concepto = $request->concepto;
            $cap->fecha_creacion = now();        
            $cap->xstatus ='1';

            $cap->save();

            return [ 'xstatus'=>true, 'msg'=>'Se registro correctamente '.$request->concepto, 'error' => null, 'id_cap_folio' => $cap->id_cap_folio];
        }else{
            return [ 'xstatus'=>false, 'msg'=>'No es posible registrar dos veces el mismo concepto: '.$request->concepto, 'error' => 'Concepto duplicado' ];
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request){                        
        //~Valida que no exista el mismo concepto en el dia
        $valida = CapFolioEntity::whereDate('fecha_creacion', '=', date('Y-m-d'))
        ->where('concepto', '=', $request->concepto)
        ->where('id_cap_folio', '<>', $request->id_cap_folio)
        ->first();

        if($valida==null){
            $capFolio = CapFolioEntity::findOrFail($request->id_cap_folio);//~Se busca en base al ID entrante
            $capFolio->concepto = $request->concepto;        

            $capFolio->save();

            return [ 'xstatus'=>true, 'error' => null ];
        }else{
            return [ 'xstatus'=>false, 'msg'=>'No es posible registrar dos veces el mismo concepto: '.$request->concepto, 'error' => 'Concepto duplicado' ];
        }

    }

    /**
     * 
     * 
     */
    public function setXstatus(Request $request){
        if($request->xstatus!='1' && $request->xstatus!='0'){
            return [ 'xstatus'=>false, 'error' => 'Estatus no valido (0, 1)' ];
        }

        $capFolio = CapFolioEntity::findOrFail($request->id_cap_folio);//~Se busca en base al ID entrante

        $capFolio->xstatus = $request->xstatus;

        $capFolio->save();

        return [ 'xstatus'=>true, 'error' => null ];
    }

    public function addProduct(Request $request){
        DB::beginTransaction();
        try{                        
            $tipoOperacion= $request->tipo_operacion;
            if($tipoOperacion!='SET' && $tipoOperacion!='ADD'){
                throw new Exception('Tipo operacion invalido, solo se permite SET o ADD');
            }
            
            $producto = Producto::where('codigo', '=', $request->codigo_producto)->firstOrFail();            
            $capFolio = CapFolioEntity::where('xstatus', '=', '1')->findOrFail($request->id_cap_folio);            

            if($request->total_captura<=0){
                throw new Exception('Monto de piezas a capturar debe ser mayor a cero');
            }

            //~Evalua si ya existe una captura previa para el mismo producto
            $cap= CapFolioDetalleEntity::where('id_producto','=', $producto->id_producto)
            ->where('id_cap_folio','=',$capFolio->id_cap_folio)
            ->where('xstatus','=',XStatusEnum::ACTIVO)->first();

            if($cap!=null){
                if($tipoOperacion=="ADD"){
                    $cap->total_captura = $cap->total_captura + $request->total_captura;
                    $bandReg='update';
                }else{
                    $cap->total_captura = $request->total_captura;
                    $bandReg='set';
                }
                
                $cap->save();                
            }else{
                $cap = new CapFolioDetalleEntity();
                $cap->id_cap_folio = $request->id_cap_folio;
                $cap->id_producto = $producto->id_producto;
                $cap->codigo_producto = $producto->codigo;
                $cap->nombre_producto = $producto->nombre;
                $cap->url_imagen = $producto->url_imagen;
                $cap->total_captura = $request->total_captura;            
                $cap->xstatus = XStatusEnum::ACTIVO;

                $cap->save();
                $bandReg='new';
            }

            DB::commit();
            
            return [    'xstatus'=>true, 
                        'msg'=> 'Se registro correctamente el producto',
                        'bandReg'=> $bandReg,
                        'product'=> $cap, 'error' => null ];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    private function unificaListado($arrayProdIn){
        $detalles = $arrayProdIn;
        foreach($arrayProdIn as $key => &$value){
            $total = $arrayProdIn[$key]['total_captura'];
            foreach($detalles as $keyDet => &$valueDet){
                if($value['codigo_producto'] == $valueDet['codigo_producto'] && $key != $keyDet){
                    $total += intval($valueDet['total_captura']);
                    unset($detalles[$keyDet]);
                    unset($arrayProdIn[$keyDet]);
                }
            }
            $arrayProdIn[$key]['total_captura'] = $total;
        }

        return $arrayProdIn;
    }

    public function addProductsAll(Request $request){
        try{                        
            $idCapFolio= $request->id_cap_folio;
            $detalleArray= $request->detalle;
            $tipoOperacion= $request->tipo_operacion;
            if($tipoOperacion!='SET' && $tipoOperacion!='ADD'){
                throw new Exception('Tipo operacion invalido, solo se permite SET o ADD');
            }

            //Unifica el arreglo, sumarizando el campo total_captura
            $detalle= $this->unificaListado($detalleArray);

            //~Registra en BD
            $salida= array();
            foreach($detalle as $product){
                $reg= $product;
                $request = new Request();
                $request->setMethod('POST');
                $request->request->add(
                    [   'id_cap_folio' => $idCapFolio,
                        'tipo_operacion' => $tipoOperacion, 
                        'codigo_producto' => $product['codigo_producto'], 
                        'total_captura' => $product['total_captura']
                    ]);
                $productResp= array("codigo_producto"=>$product['codigo_producto'], "result"=>$this->addProduct($request));    
                array_push($salida, $productResp);
            }

            return [    'xstatus'=>true, 
                        'result'=> $salida,                        
                        'error' => null ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function removeProduct(Request $request){
        DB::beginTransaction();
        try{                        
            $id= $request->id_cap_folio_detalle;
            $capDeta= CapFolioDetalleEntity::findOrFail($request->id_cap_folio_detalle);
            $capDeta->delete();
            DB::commit();            
            return [ 'xstatus'=>true, 'msg'=>'Se borro correctamente el producto', 'error' => null ];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function setPiezasProduct(Request $request){
        DB::beginTransaction();
        try{                        
            if($request->total_captura<=0){
                throw new Exception('Monto de piezas a capturar debe ser mayor a cero');
            }
            
            $capDeta= CapFolioDetalleEntity::findOrFail($request->id_cap_folio_detalle);
            $capDeta->total_captura = $request->total_captura;

            $capDeta->save();

            DB::commit();          
            return [ 'xstatus'=>true, 'msg'=>'Se actualizaron correctamente las piezas del producto', 'error' => null ];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function migrateLote(Request $request){
        DB::beginTransaction();
        try{                        
            //~Validaciones            
            if(!TipoMovimientoAlmacenEnum::isValidName($request->tipo_movimiento)){
                return [ 'xstatus'=>false, 'error' => 'Valide el tipo de movimiento, valor no aceptable' ];
            }
            $idCapFolio= $request->id_cap_folio;
            $tipoMovimiento= TipoMovimientoAlmacenEnum::fromString($request->tipo_movimiento);
            $capFolio = CapFolioEntity::where('xstatus', '=', '1')->findOrFail($request->id_cap_folio);
            $almacen = Almacen::findOrFail($request->id_almacen);            
            $ubicacion = CatUbicaProducto::where('codigo', '=', $request->codigo_ubicacion)->where('xstatus', '=', '1')->firstOrFail();                        

            if($request->lote!=null){
                //~Elimina el lote                
                $lote= $request->lote;
                LoteOperacionProcesosEntity::where('lote_referencia','=',$lote)->delete();
            }else{
                //~Construye el lote
                $seqLote = app(ParametriaController::class)->seqLotePrefijoAlmacen_nextval(PrefijoLoteAlmamcenEnum::CAPTURADOR_04VO);
                $lote= PrefijoLoteAlmamcenEnum::CAPTURADOR_04VO.date('dmY').$seqLote.str_pad(substr(strtoupper(str_replace(' ','',$capFolio->concepto)),0,5), 5, 'X');
            }

            //~Consulta detalle
            $request = new Request();
            $request->setMethod('POST');
            $request->request->add(['id_cap_folio' => $idCapFolio]);    
            $detalle= $this->getFolio($request);
            if(!$detalle['xstatus']){
                throw new Exception('No fue posible consultar el detalle del id cap folio. '.$detalle['error']);
            }

            $result= array();
            $totalReg=0;
            foreach($detalle['cap_folio']['detalle'] as $product){
                $insertLote= new LoteOperacionProcesosEntity();                
                $insertLote->lote_referencia= $lote;
                $insertLote->referencia= $idCapFolio;
                $insertLote->fecha_operacion= now();
                $insertLote->id_almacen= $almacen->id_almacen;
                $insertLote->nombre_almacen= $almacen->nombre;
                $insertLote->codigo_ubicacion= $ubicacion->codigo;
                $insertLote->id_producto= $product['id_producto'];                
                $insertLote->codigo_producto= $product['codigo_producto'];
                $insertLote->nombre_producto= $product['nombre_producto'];
                $insertLote->url_img_producto= $product['url_imagen'];
                $insertLote->tipo_movimiento= $tipoMovimiento;
                $insertLote->cantidad= $product['total_captura'];
                $insertLote->estado= 'P';                
                $insertLote->save();
                array_push($result, $insertLote);
                $totalReg++;
            }

            DB::commit();          
            return [ 'xstatus'=>true, 'msg'=>'Migracion exitosa', 'total_reg'=>$totalReg, 'result'=>$result, 'error' => null ];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function depuraFoliosBinario(Request $request){
        DB::beginTransaction();
        try{                        
            
            $folios= CapFolioEntity::orderBy('id_cap_folio','asc')->get();
            $total = (count($folios))/2;
            $indice= 1;

            if($total>3){
                foreach($folios as $folio){
                    if($indice<$total){
                        $idCapFolio= $folio->id_cap_folio;
                        $capDeta= CapFolioDetalleEntity::where('id_cap_folio','=', $idCapFolio)->delete();
                        $cap= CapFolioEntity::findOrFail($idCapFolio);
                        $cap->delete();
                        $indice++;
                    }
                }
            }
            

            DB::commit();          
            return [ 'xstatus'=>true, 'msg'=>'Depuracion exitosa', 'error' => null ];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }
}