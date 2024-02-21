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
use App\MeliEnvioFull;

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
            $foliosFullComplete = $request->folios_full_complete;
            $criterio = $request->criterio;
            $ubica  = null;
            //~Validaciones
            if(!($criterio=="PRODUCTO" || $criterio=="UBICACION" || $criterio=="ALL")){
                throw new Exception('Criterio solo permite PRODUCTO UBICACION ALL');
            }
            if($folioFull==null){
                throw new Exception('Se requiere el folio');
            }

            $arrFoliosFull= explode(",", $foliosFullComplete);

            if($criterio == "UBICACION"){
                //~Valida que exista la ubicacion
                $ubica= CatUbicaProducto::where('codigo','=',$filtro)->get()->first();
    
                if($ubica == null){
                    throw new Exception('No existe la ubicacion');
                }

                $detaConfig = MeliSurtirConfigEnvioFullEntity::with('producto')
                ->whereIn('folio_full', $arrFoliosFull)
                ->whereIn('id_producto', StockUbicaProducto::select(['id_producto'])
                    ->where('codigo_ubica', '=', $ubica->codigo)
                )->get();

                //~Agrega el stock(foto) y detalle de lo surtido
                foreach ($detaConfig as $deta) {
                    $folioFullConfig= $deta->folio_full;

                    //~Busca el nombre de la foto
                    $meliEnvioFull= MeliEnvioFull::where('folio_full','=',$folioFullConfig)->first();
                    $fotoStockSurtir= $meliEnvioFull->foto_stock_surtir;

                    $stock= MeliSurtirFotoStockEnvioFullEntity::where('folio_full','=',$fotoStockSurtir)
                        ->where('codigo_ubicacion','=',$ubica->codigo)
                        ->where('id_producto','=',$deta->id_producto)->get();
                    $deta->stock= $stock;

                    $detaSurtido= MeliSurtirDetaEnvioFullEntity::where('folio_full','=',$folioFullConfig)
                        ->where('id_surtir_config_envio_full', '=', $deta->id_surtir_config_envio_full)->get();

                    $deta->detaSurtido= $detaSurtido;
                }
            }else{
                if($criterio == "PRODUCTO"){
                    $detaConfig = MeliSurtirConfigEnvioFullEntity::with('producto')
                    ->whereIn('folio_full', $arrFoliosFull)
                    ->where(function ($query) use ($filtro) {
                        $query->where('codigo_producto', 'like', '%'.$filtro.'%')
                              ->orWhere('nombre_producto', 'like', '%'.$filtro.'%')
                              ->orWhere('id_publicacion_tienda', 'like', '%'.$filtro.'%');
                    })->get();                        
                }else{
                    $detaConfig = MeliSurtirConfigEnvioFullEntity::with('producto')
                    ->whereIn('folio_full', $arrFoliosFull)->get();
                }

                //~Agrega detalle de lo surtido
                foreach ($detaConfig as $deta) {                                        
                    $detaSurtido= MeliSurtirDetaEnvioFullEntity::where('folio_full','=', $deta->folio_full)
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

            //~Busca el nombre de la foto
            $meliEnvioFull= MeliEnvioFull::where('folio_full','=',$folioFull)->first();
            $fotoStockSurtir= $meliEnvioFull->foto_stock_surtir;

            //~Calcula el nuevo stock en la foto
            $stock= MeliSurtirFotoStockEnvioFullEntity::where('folio_full','=',$fotoStockSurtir)
                ->where('codigo_ubicacion','=',$codigoUbicacion)
                ->where('codigo_producto','=',$codigoProducto)->get();
            
            return [ 'xstatus'=>true, 'detaSurtido'=>$result, 'stockFoto'=> $stock];
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

            //~Datos del Detalle por eliminar
            $detaEnvioFull= MeliSurtirDetaEnvioFullEntity::findOrFail($idSurtirDetaEnvioFull);                        
            
            DB::select('call sp_meli_surtir_elimina_mov(?, ?, @err, @msg)', [$folioFull, $idSurtirDetaEnvioFull]);
            $results = DB::select('select @err as err, @msg as msg');            
            $pError= $results[0]->err;
            $pMsgError= $results[0]->msg;

            if($pError!=0){
                throw new Exception('No fue posible eliminar el movimiento. '.$pMsgError);
            }

            $result= MeliSurtirDetaEnvioFullEntity::where('folio_full','=',$folioFull)
                        ->where('id_surtir_config_envio_full', '=', $idSurtirConfigEnvioFull)->get();

            //~Busca el nombre de la foto
            $meliEnvioFull= MeliEnvioFull::where('folio_full','=',$folioFull)->first();
            $fotoStockSurtir= $meliEnvioFull->foto_stock_surtir;

            //~Calcula el nuevo stock en la foto            
            $stock= MeliSurtirFotoStockEnvioFullEntity::where('folio_full','=',$fotoStockSurtir)
                ->where('codigo_ubicacion','=',$detaEnvioFull->codigo_ubicacion)
                ->where('codigo_producto','=',$detaEnvioFull->codigo_producto)->get();
            
            return [ 'xstatus'=>true, 'detaSurtido'=>$result, 'stockFoto'=> $stock];
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

            $meliEnvioFull= MeliEnvioFull::where('folio_full','=',$folioFull)->first();
            $fotoStockSurtir= $meliEnvioFull->foto_stock_surtir;
            
            $stock= MeliSurtirFotoStockEnvioFullEntity::with('almacen')
                    ->where('folio_full','=',$fotoStockSurtir)                    
                    ->where('id_producto', '=', $idProducto)->get();                                   

            return [ 'xstatus'=>true, 'ubicaciones'=>$stock];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function getDetalleFotoStock(Request $request){
        DB::beginTransaction();
        try{            
            $folioFull = $request->nameFotoStock;            
            
            $stock= MeliSurtirFotoStockEnvioFullEntity::with('almacen')->with('producto')
                ->where('folio_full','=',$folioFull)->get();                      

            return [ 'xstatus'=>true, 'deta'=>$stock];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function refreshFotoStock(Request $request){
        DB::beginTransaction();
        try{            
            $nameFotoStock = $request->nameFotoStock;
            $folioFull = $request->folioFull;

            DB::select('call sp_meli_surtir_genera_foto_stock(?, ?, @err, @msg)', [$folioFull, $nameFotoStock]);
            $results = DB::select('select @err as err, @msg as msg');            
            $pError= $results[0]->err;
            $pMsgError= $results[0]->msg;
            
            if($pError!=0){
                throw new Exception('No fue posible refrescar la foto: '.$pMsgError);
            }            

            return [ 'xstatus'=>true];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function ligarFotoSotck(Request $request){
        DB::beginTransaction();
        try{            
            $nameFotoStock = $request->nameFotoStock;
            $renameFotoStock = $request->renameFotoStock;
            $folioFull = $request->folioFull;

            //~Valida que exista la nueva foto            
            $isExiste= MeliSurtirFotoStockEnvioFullEntity::where('folio_full','=',$renameFotoStock)->first();
            if($isExiste==null){
                throw new Exception('La foto ingresada no existe');
            }

            $renameFotoStock= $isExiste->folio_full;
            
            //~Actualiza el folio de envio
            $meliEnvioFull= MeliEnvioFull::where('folio_full','=',$folioFull)->first();
            if($meliEnvioFull==null){
                throw new Exception('Folio Envio no existe');
            }
            
            $meliEnvioFull->foto_stock_surtir= $renameFotoStock;
            $meliEnvioFull->update();

            DB::commit();
            return [ 'xstatus'=>true, 'nameFotoStock'=>$renameFotoStock];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    public function generaMovimientosLoteSurtir(Request $request){
        DB::beginTransaction();
        try{            
            $foliosFull = explode(",", $request->folios_full);
            $lotes= array();
            $lotesStr= "";
            foreach ($foliosFull as $folioFull) {                                     
                DB::select('call sp_meli_sutir_genera_lote_almacen(?, @lote, @err, @msg)', [$folioFull]);
                $results = DB::select('select @lote lote, @err as err, @msg as msg');
                $pLote= $results[0]->lote;
                $pError= $results[0]->err;
                $pMsgError= $results[0]->msg;

                if($pError!=0){
                    throw new Exception('No fue posible generar el lote para el folio '.$folioFull.' :'.$pMsgError);
                }

                array_push($lotes, $pLote);
                $lotesStr.=$folioFull." : ".$pLote." | ";
            }
            
            return [ 'xstatus'=>true, 'lotesGenerados'=>$lotes, 'cadenaLotes'=> substr($lotesStr, 0, -3)];
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }
}