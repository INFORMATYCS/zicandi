<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Config;
Use Exception;
Use Log;

class MainController extends Controller{
    
    /**
     * Entorno App / Produccion | Pruebas
     * API: /main/entorno
     * 
     */
    public function getEntorno(){
        try{
            
            return [ 'xstatus'=>true, 'entorno'=>Config::get('zicandi.entorno') ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Version de la aplicacion
     * API: /main/version
     * 
     */
    public function getVersionApp(){
        try{
            
            return [ 'xstatus'=>true, 'version'=>Config::get('zicandi.version') ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }
}
