<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use SimpleSoftwareIO\QrCode\Facades\QrCode;
Use Config;
Use Exception;
Use Log;
use DB;
use App\MeliSurtirConfigEnvioFullEntity;
use App\MeliSurtirFotoStockEnvioFullEntity;
use App\MeliSurtirDetaEnvioFullEntity;
use App\StockUbicaProducto;
use App\CatUbicaProducto;

class EnvioMeliController extends Controller{
    /**
     * Consulta el detalle del envio a surtir
     * Tabla: meli_surtir_config_envio_full
     * API: /meli/surtir/envio/detalle
     * 
     */
    public function getDetalleConfig(Request $request){
        DB::beginTransaction();
        try{            
            $folioFull = $request->folio_full;
            $filtro = $request->filtro;
            $criterio = $request->criterio;
            $ubica  = null;
            //~Validaciones
            if(!($criterio=="PRODUCTO" || $criterio=="UBICACION" || $criterio=="ALL")){
                throw new Exception('Criterio solo permite PRODUCTO UBICACION ALL');
            }
            if($folioFull==null){
                throw new Exception('Se requiere el folio');
            }

            if($criterio == "UBICACION"){
                //~Valida que exista la ubicacion
                $ubica= CatUbicaProducto::where('codigo','=',$filtro)->get()->first();
    
                if($ubica == null){
                    throw new Exception('No existe la ubicacion');
                }

                $detaConfig = MeliSurtirConfigEnvioFullEntity::with('producto')
                ->where('folio_full', '=', $folioFull)
                ->whereIn('id_producto', StockUbicaProducto::select(['id_producto'])
                    ->where('codigo_ubica', '=', $ubica->codigo)
                )->get();

                //~Agrega el stock(foto) y detalle de lo surtido
                foreach ($detaConfig as $deta) {                    
                    $stock= MeliSurtirFotoStockEnvioFullEntity::where('folio_full','=',$folioFull)
                        ->where('codigo_ubicacion','=',$ubica->codigo)
                        ->where('id_producto','=',$deta->id_producto)->get();
                    $deta->stock= $stock;

                    $detaSurtido= MeliSurtirDetaEnvioFullEntity::where('folio_full','=',$folioFull)
                        ->where('id_surtir_config_envio_full', '=', $deta->id_surtir_config_envio_full)->get();

                    $deta->detaSurtido= $detaSurtido;
                }
            }else{
                if($criterio == "PRODUCTO"){
                    $detaConfig = MeliSurtirConfigEnvioFullEntity::with('producto')
                    ->where('folio_full', '=', $folioFull)
                    ->where(function ($query) use ($filtro) {
                        $query->where('codigo_producto', 'like', '%'.$filtro.'%')
                              ->orWhere('nombre_producto', 'like', '%'.$filtro.'%')
                              ->orWhere('id_publicacion_tienda', 'like', '%'.$filtro.'%');
                    })->get();                        
                }else{
                    $detaConfig = MeliSurtirConfigEnvioFullEntity::with('producto')
                    ->where('folio_full', '=', $folioFull)->get();
                }

                //~Agrega detalle de lo surtido
                foreach ($detaConfig as $deta) {                                        
                    $detaSurtido= MeliSurtirDetaEnvioFullEntity::where('folio_full','=',$folioFull)
                        ->where('id_surtir_config_envio_full', '=', $deta->id_surtir_config_envio_full)->get();

                    $deta->detaSurtido= $detaSurtido;
                }
            }                

            return [ 'xstatus'=>true, 'deta' => $detaConfig, 'ubicacion' => $ubica ];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function registrarMovimiento(Request $request){
        DB::beginTransaction();
        try{            
            $folioFull = $request->folio_full;
            $idSurtirConfigEnvioFull = $request->id_surtir_config_envio_full;
            $codigoProducto = $request->codigo_producto;
            $codigoUbicacion = $request->codigo_ubicacion;
            $totalPiezas = $request->total_piezas;
            
            DB::select('call sp_meli_surtir_registra_mov(?,?,?,?,?,@err, @msg)', [$folioFull, $idSurtirConfigEnvioFull, $codigoProducto, $codigoUbicacion, $totalPiezas]);
            $results = DB::select('select @err as err, @msg as msg');            
            $pError= $results[0]->err;
            $pMsgError= $results[0]->msg;

            if($pError!=0){
                throw new Exception('No fue posible registrar el movimiento. '.$pMsgError);
            }

            $result= MeliSurtirDetaEnvioFullEntity::where('folio_full','=',$folioFull)
                        ->where('id_surtir_config_envio_full', '=', $idSurtirConfigEnvioFull)->get();                        

            return [ 'xstatus'=>true, 'detaSurtido'=>$result];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function eliminarMovimiento(Request $request){
        DB::beginTransaction();
        try{            
            $folioFull = $request->folio_full;
            $idSurtirConfigEnvioFull = $request->id_surtir_config_envio_full;
            $idSurtirDetaEnvioFull = $request->id_surtir_deta_envio_full;            
            
            DB::select('call sp_meli_surtir_elimina_mov(?, ?, @err, @msg)', [$folioFull, $idSurtirDetaEnvioFull]);
            $results = DB::select('select @err as err, @msg as msg');            
            $pError= $results[0]->err;
            $pMsgError= $results[0]->msg;

            if($pError!=0){
                throw new Exception('No fue posible eliminar el movimiento. '.$pMsgError);
            }

            $result= MeliSurtirDetaEnvioFullEntity::where('folio_full','=',$folioFull)
                        ->where('id_surtir_config_envio_full', '=', $idSurtirConfigEnvioFull)->get();                        

            return [ 'xstatus'=>true, 'detaSurtido'=>$result];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function getUbicacionesAll(Request $request){
        DB::beginTransaction();
        try{            
            $folioFull = $request->folio_full;
            $idProducto = $request->id_producto;
            
            $stock= MeliSurtirFotoStockEnvioFullEntity::with('almacen')
                    ->where('folio_full','=',$folioFull)                    
                    ->where('id_producto', '=', $idProducto)->get();                                   

            return [ 'xstatus'=>true, 'ubicaciones'=>$stock];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }
}