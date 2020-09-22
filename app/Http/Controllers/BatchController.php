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

    /**
     * Recupera todos los procesos sin importar el estatus
     * 
     * 
     */
    public function getProcesosAll(Request $request){
        if(!$request->ajax())return redirect('/');

        $batchProceso = BatchProceso::orderBy('id_batch_proceso','desc')->get();
       

        return [
            'listaProcesos'=> $batchProceso
        ];
    }

    /**
     * Almacen nuevo proceso
     * 
     */
    public function storeProceso(Request $request){        
        $batchProceso = new BatchProceso();
        $batchProceso->archivo_php = $request->archivo_php;
        $batchProceso->descripcion = $request->descripcion;
        $batchProceso->estatus = $request->estatus;        

        $batchProceso->save();
    }


    /**
     * Actualiza proceso
     * 
     */
    public function updateProceso(Request $request){                
        $batchProceso = BatchProceso::findOrFail($request->id_batch_proceso);//~Se busca en base al ID entrante
        $batchProceso->archivo_php = $request->archivo_php;
        $batchProceso->descripcion = $request->descripcion;
        $batchProceso->estatus = $request->estatus;    

        $batchProceso->save();
    }



    

}
