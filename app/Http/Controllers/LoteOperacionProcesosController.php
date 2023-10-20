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



class LoteOperacionProcesosController extends Controller{
    /**
     * Listar registros
     *
     * @return \Illuminate\Http\Response
     */
    public function getDetaLote(Request $request){
        $deta = LoteOperacionProcesosEntity::where('lote_referencia','=',$request->lote_referencia)
        ->orderBy('id_lote_operacion','desc')->get();
       
        return [ 'xstatus'=>true, 'deta'=>$deta, 'error' => null ];
    }


    public function aplicaLote(Request $request){
        DB::beginTransaction();
        try{         
            $pError='';
            $pMsgError='';                           
            DB::select('call sp_aplica_lote_operacion(?,@err, @msg)', [$request->lote_referencia]);
            $results = DB::select('select @err as err, @msg as msg');

            $pError= $results[0]->err;
            $pMsgError= $results[0]->msg;

            if($pError==0){
                DB::commit();
                $deta = LoteOperacionProcesosEntity::where('lote_referencia','=',$request->lote_referencia)
                ->orderBy('id_lote_operacion','desc')->get();

                return [ 'xstatus'=>true, 'deta'=>$deta, 'error' => null ];
            }else{
                DB::rollBack();

                return [ 'xstatus'=>false, 'error' => 'Error al ejecutar sp_aplica_lote_operacion: '.$pMsgError ];
            }
            
            
        }catch(Exception $e){            
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    public function getCatalogoLotes(Request $request){
        DB::beginTransaction();
        try{        
            $prefix= $request->prefix_lote . "%"; 
            $result= DB::select("   select 	lote_referencia, 
                                            referencia,
                                            fecha_operacion,
                                            (select count(*) from lote_operacion_procesos lop where lop.lote_referencia=x.lote_referencia and lop.estado='E') estado_error,
                                            (select count(*) from lote_operacion_procesos lop where lop.lote_referencia=x.lote_referencia and lop.estado='A') estado_ok,
                                            (select count(*) from lote_operacion_procesos lop where lop.lote_referencia=x.lote_referencia and lop.estado='P') estado_pendiente
                                    from (
                                        select distinct lote_referencia, referencia, fecha_operacion
                                        from lote_operacion_procesos 
                                        where lote_referencia like ? order by id_lote_operacion desc limit 30
                                    )x", [$prefix]);                        
            return [ 'xstatus'=>true, 'result' => $result ];
        }catch(Exception $e){            
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function eliminarLoteCompleto(Request $request){
        DB::beginTransaction();
        try{         
            LoteOperacionProcesosEntity::where('lote_referencia','=',$request->lote_referencia)->delete();
            DB::commit();
            return [ 'xstatus'=>true];
        }catch(Exception $e){            
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function updateRegLote(Request $request){
        DB::beginTransaction();
        try{                     
            $reg = LoteOperacionProcesosEntity::findOrFail($request->id_lote_operacion);//~Se busca en base al ID entrante

            $reg->tipo_movimiento= $request->tipo_movimiento;
            $reg->cantidad= $request->cantidad;
            $reg->estado= 'P';
            $reg->msg_error= '';
            $reg->save();        

            DB::commit();
            return [ 'xstatus'=>true];
        }catch(Exception $e){            
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function deleteRegLote(Request $request){
        DB::beginTransaction();
        try{                     
            $reg = LoteOperacionProcesosEntity::findOrFail($request->id_lote_operacion);//~Se busca en base al ID entrante            
            $reg->delete();

            DB::commit();
            return [ 'xstatus'=>true];
        }catch(Exception $e){            
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }
}