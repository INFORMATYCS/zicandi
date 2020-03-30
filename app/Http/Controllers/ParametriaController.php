<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Parametria;

class ParametriaController extends Controller{

    /**
     * Parametria por clave del proceso
     * 
     */
    public function getParametriaByProceso(Request $request){
        if(!$request->ajax())return redirect('/');

        $parametria = Parametria::where('xstatus','=','1')
        ->where('clave_proceso','=',$request->clave_proceso)
        ->select('llave','valor', 'descripcion')
        ->orderBy('llave', 'asc')
        ->get();

        return ['parametria' => $parametria];
    }

    /**
     * Crea una secuencia por año actual
     * 
     */
    public function seqProductoCodigo_nextval(Request $request){
        if(!$request->ajax())return redirect('/');

        $anioActual = date("Y");
        $seq=0;
        
        $parametria = Parametria::where('clave_proceso', '=', 'SEQ_PROD_COD')
        ->where('llave', '=', $anioActual)
        ->where('xstatus', '=', '1')
        ->select('id_parametria','clave_proceso','llave','valor','descripcion')
        ->first(); 

        if($parametria==null){            
            $parametria = new Parametria();
            $parametria->clave_proceso = 'SEQ_PROD_COD';
            $parametria->llave = $anioActual;
            $parametria->valor = 100;
            $parametria->xstatus = 1;   
            
            $seq = 100;
        }else{
            $valor = $parametria->valor;            
            $parametria->clave_proceso = 'SEQ_PROD_COD';
            $parametria->llave = $anioActual;
            $parametria->valor = $valor + 1;
            $parametria->xstatus = 1;   
            
            $seq= $valor + 1;
        }     
        
        $parametria->save();
        

        return $anioActual.$seq;
    }
}
