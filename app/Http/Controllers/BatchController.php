<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\BatchProceso;


class BatchController extends Controller{

    public function getTareas(){
        $batchProceso = BatchProceso::where('estatus','=','A')        
        ->orderBy('id_batch_proceso', 'asc')
        ->get();

        $salida = array();
        foreach($batchProceso as $t){

            $id_batch_proceso = $t->id_batch_proceso;
            $php = $t->archivo_php;
            array_push($salida, $php);

        } 
        
        echo json_encode($salida);

    }

    public function descargaFuente(Request $request){
        $archivo = $request->archivo;

        header("Content-disposition: attachment; filename=".$archivo."");
        header("Content-type: MIME");
        readfile("repositorio/sistema/codigo_fuente_batch/".$archivo."");

    }

    public function test(){
        echo "Hola como estas, soy Zicandi Server";
    }

    public function setTermino(Request $request){
        $archivo = $request->archivo;        

        $affectedRows = BatchProceso::where('archivo_php','=',$archivo)        
        
        ->update( ['fecha_ultima_exec' => \DB::raw('SYSDATE()')] );
    }
}
