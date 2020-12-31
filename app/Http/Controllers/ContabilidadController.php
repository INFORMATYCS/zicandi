<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Config;
Use Exception;
Use Log;
use DB;
use App\ContaEmpresa;
use App\ContaCuenta;
use App\ContaSubCuenta;
use App\ContaSubCuentaSaldo;

class ContabilidadController extends Controller
{
    /**
     * Obtiene las subcuentas por empresa
     *
     * @return \Illuminate\Http\Response
     */
    public function plantillaByEmpresa(Request $request){
        try{
            $idEmpresa = $request->id_conta_empresa;
            $ejercicio = $request->ejercicio;

            $plantilla = ContaEmpresa::join('conta_cuenta','conta_empresa.id_conta_empresa','=','conta_cuenta.id_conta_empresa')            
            ->join('conta_subcuenta','conta_cuenta.id_conta_cuenta','=','conta_subcuenta.id_conta_cuenta')
            ->join('conta_subcuenta_saldo','conta_subcuenta.id_conta_subcuenta','=','conta_subcuenta_saldo.id_conta_subcuenta')
            ->select(   'conta_empresa.id_conta_empresa','conta_empresa.nombre as empresa',
                        'conta_cuenta.id_conta_cuenta', 'conta_cuenta.codigo as codigo_cuenta','conta_cuenta.nombre as cuenta',
                        'conta_subcuenta.id_conta_subcuenta', 'conta_subcuenta.codigo as codigo_subcuenta','conta_subcuenta.nombre as subcuenta',
                        'conta_subcuenta_saldo.ejercicio', 'conta_subcuenta_saldo.id_carpeta_adjuntos', 'conta_subcuenta_saldo.ejercicio', 'conta_subcuenta_saldo.saldo_cierre')
            ->where('conta_empresa.id_conta_empresa', '=', $idEmpresa)
            ->where('conta_subcuenta_saldo.ejercicio', '=', $ejercicio)                        
            ->orderBy('conta_subcuenta.id_conta_subcuenta', 'asc')
            ->get();


            return [ 'xstatus'=>true, 'plantilla'=>$plantilla ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }    
    }

    /**
     * Crea ejercicio para montar los saldos
     * Por empresa
     * 
     * @return \Illuminate\Http\Response
     */
    public function crearEjercicio(Request $request){        
        try{
            $idEmpresa = $request->id_conta_empresa;
            $ejercicio = $request->ejercicio;

            //~Valida si ya existe el ejercicio en tabla de saldos
            $sql= " SELECT COUNT(*) AS total FROM conta_subcuenta_saldo
                    WHERE ejercicio = '".$ejercicio."'
                    AND id_conta_subcuenta IN (
                        SELECT sub.id_conta_subcuenta FROM conta_empresa emp, conta_cuenta cta, conta_subcuenta sub
                        WHERE emp.id_conta_empresa = cta.id_conta_empresa
                        AND cta.id_conta_cuenta = sub.id_conta_cuenta
                        AND emp.id_conta_empresa = ".$idEmpresa."
                    )";  
            $rs = DB::select( $sql );

            $totalReg = 0;            
            
            if(count($rs)>0){                
                $totalReg = $rs[0]->total;                
            }

            if($totalReg > 0){
                throw new Exception('Ejercicio ya existe');
            }

            //~Crea carpeta para adjuntos general
            $request->nombre = "conta_".$ejercicio;
            $idCarpetaAdjunto = app(UploadFileController::class)->nuevaCarpeta($request);

            //~Recupera la plantilla
            $plantilla = ContaEmpresa::join('conta_cuenta','conta_empresa.id_conta_empresa','=','conta_cuenta.id_conta_empresa')            
            ->join('conta_subcuenta','conta_cuenta.id_conta_cuenta','=','conta_subcuenta.id_conta_cuenta')
            ->select(   'conta_empresa.id_conta_empresa','conta_empresa.nombre as empresa',
                        'conta_cuenta.id_conta_cuenta', 'conta_cuenta.codigo as codigo_cuenta','conta_cuenta.nombre as cuenta',
                        'conta_subcuenta.id_conta_subcuenta', 'conta_subcuenta.codigo as codigo_subcuenta','conta_subcuenta.nombre as subcuenta')                    
            ->where('conta_empresa.id_conta_empresa', '=', $idEmpresa)                        
            ->get();

            $totalRegistrosCreados = 0;
            $plantillaSaldos = array();
            foreach ($plantilla as $p) {
                $idSubcuenta = $p->id_conta_subcuenta;
                
                $contaSubCuentaSaldo = new contaSubCuentaSaldo();
                $contaSubCuentaSaldo->id_conta_subcuenta = $idSubcuenta;
                $contaSubCuentaSaldo->id_carpeta_adjuntos = $idCarpetaAdjunto;
                $contaSubCuentaSaldo->ejercicio = $ejercicio;
                $contaSubCuentaSaldo->saldo_cierre = 0;
                
                $contaSubCuentaSaldo->save();
                
                $totalRegistrosCreados++;
                array_push($plantillaSaldos, $contaSubCuentaSaldo);
            }
            
            
            return [ 'xstatus'=>true, 'totalCreados'=>$totalRegistrosCreados, 'idCarpetaAdjunto'=>$idCarpetaAdjunto, 'saldos'=>$plantillaSaldos ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }


    }

    /**
     * Actualiza saldos de la platilla guardada previamente
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function updateSaldo(Request $request){
        try{
            $idEmpresa = $request->id_conta_empresa;
            $detalleSaldos = $request->detalle_saldos;

            if(count($detalleSaldos) == 0){
                throw new Exception('Se requiere el detalle de saldos');
            }

            foreach ($detalleSaldos as $saldo) {
                $idContaSubCuenta = $saldo['id_conta_subcuenta'];
                $ejercicio = $saldo['ejercicio'];
                $saldoCierre = $saldo['saldo_cierre'];


                $contaSubCuentaSaldo = ContaSubCuentaSaldo::where('id_conta_subcuenta','=',$idContaSubCuenta)
                ->where('ejercicio','=',$ejercicio)  
                ->update(['saldo_cierre'=> $saldoCierre]);

            }



            return [ 'xstatus'=>true];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Obtiene las empresas registradas en formato ComboBox
     * 
     * 
     */
    public function selectEmpresa(){
        try{            

            $empresas = ContaEmpresa::select('id_conta_empresa','nombre')
            ->where('xstatus','=','1')
            ->orderBy('nombre', 'asc')
            ->get();

            return ['empresas' => $empresas];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());            
            return ['exception' => $e->getMessage()];
        }   
    }
}
