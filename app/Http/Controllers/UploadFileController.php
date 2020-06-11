<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Lib\ProcesadorImagenes;
use App\CarpetaAdjuntos;
use App\ArchivoAdjunto;


class UploadFileController extends Controller{
    
    /**
     * 
     * 
     */
    public function index(Request $request){
       
       $r = $request;
       $file = $request->file('file');
       $carpeta = $request->id_carpeta_adjuntos;

       $procesadorImagenes = new ProcesadorImagenes();
       $path = $procesadorImagenes->publicaDocumento($carpeta, $file);  

       //~Guarda en base
       $this->store($request->id_carpeta_adjuntos, $path, substr($request->nombre, 0, 50));
    }


    /**
     * Sube el archivo y lo registra en base
     * 
     */
    public function getAdjuntosByCarpeta(Request $request){
        if(!$request->ajax())return redirect('/');

        $carpeta = CarpetaAdjuntos::find($request->id_carpeta_adjuntos);        
        
        $adjuntos = $carpeta->adjuntos;

        foreach ($adjuntos as $adjunto) {
	        $adjunto["checked"]=0;
	    }
            
        return ['adjuntos' => $adjuntos];
    }

    /**
     * Store a newly created resource in storage.
     *
     */
    public function store($id_carpeta_adjuntos, $path, $nombre)
    {

        $archivo = new ArchivoAdjunto();
        $archivo->id_carpeta_adjuntos = $id_carpeta_adjuntos;
        $archivo->nombre = $nombre;
        //$archivo->alias = $request->alias;
        $archivo->path = $path;
        //$archivo->descripcion = $request->descripcion;
        $archivo->xstatus ='1';

        $archivo->save();
    }

    public function delete(Request $request){
        $archivo = ArchivoAdjunto::find($request->id_archivo_adjunto);        

        rename ($archivo->path, $archivo->path.".del");

        $archivo->delete();
    }


    public function nuevaCarpeta(Request $request){
        $carpeta = new CarpetaAdjuntos();        
        $carpeta->nombre = $request->nombre;        

        $carpeta->save();

        return $carpeta->id_carpeta_adjuntos;
    }
}