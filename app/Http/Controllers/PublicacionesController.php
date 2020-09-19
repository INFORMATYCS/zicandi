<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Publicacion;

class PublicacionesController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        if(!$request->ajax())return redirect('/');

        $buscar = $request->buscar;
        $criterio = $request->criterio;
        $idCuentaTienda = $request->idCuentaTienda;
        
        $filtros = json_decode($request->filtros);
    
        $estatusPublicacion = array();
        if($filtros->activas)
        array_push($estatusPublicacion, 'active');

        if($filtros->pausadas)
        array_push($estatusPublicacion, 'paused');
        
        
        if(strtoupper (substr( $buscar, 0, 3 )) === "MLM"){
            $criterio = "id_publicacion_tienda";
        }

        if($buscar==''){
            $publicaciones = Publicacion::with('config')            
            ->select('publicacion.id_publicacion' ,'publicacion.id_tienda' ,'publicacion.id_cuenta_tienda' ,'publicacion.id_publicacion_tienda' ,'publicacion.id_variante_publicacion' ,'publicacion.titulo' ,'publicacion.nombre_variante' ,'publicacion.precio' ,'publicacion.stock' ,'publicacion.ventas' ,'publicacion.visitas', 'publicacion.envio_gratis' ,'publicacion.full' ,'publicacion.link' ,'publicacion.foto_mini' ,'publicacion.fecha_consulta' ,'publicacion.estatus')
            ->where('publicacion.id_cuenta_tienda', '=', $idCuentaTienda)            
            ->whereIn('publicacion.estatus', $estatusPublicacion)
            ->orderBy('publicacion.id_publicacion', 'desc')
            ->paginate(100);
        }else{
            $publicaciones = Publicacion::with('config')            
            ->select('publicacion.id_publicacion' ,'publicacion.id_tienda' ,'publicacion.id_cuenta_tienda' ,'publicacion.id_publicacion_tienda' ,'publicacion.id_variante_publicacion' ,'publicacion.titulo' ,'publicacion.nombre_variante' ,'publicacion.precio' ,'publicacion.stock' ,'publicacion.ventas' ,'publicacion.visitas', 'publicacion.envio_gratis' ,'publicacion.full' ,'publicacion.link' ,'publicacion.foto_mini' ,'publicacion.fecha_consulta' ,'publicacion.estatus')
            ->where('publicacion.id_cuenta_tienda', '=', $idCuentaTienda)
            ->where('publicacion.'.$criterio, 'like', '%' . $buscar . '%')            
            ->whereIn('publicacion.estatus', $estatusPublicacion)
            ->orderBy('publicacion.id_publicacion', 'desc')
            ->paginate(100);
        }
        

        return [
            'pagination' => [
                'total'             => $publicaciones->total(),
                'current_page'      => $publicaciones->currentPage(),
                'per_page'          => $publicaciones->perPage(),
                'last_page'         => $publicaciones->lastPage(),
                'from'              => $publicaciones->firstItem(),
                'to'                => $publicaciones->lastItem()
            ],
            'publicaciones'=> $publicaciones
        ];
    }


    /**
     * Productos ligados a la publicacion seleccionada
     * 
     * 
     */
    public function saveProductosLigados(Request $request){
       
        if(!$request->ajax())return redirect('/');

        $publicacion = Publicacion::findOrFail($request->idPublicacion);
        $listaProductosActual = $publicacion->config;
        $listaProductosNueva = $request->config;

        //~Borra todas las asociaciones actuales
        $publicacion->config()->detach();
        $total = 0;

        foreach ($listaProductosNueva as $producto) {
            if($producto['xstatus']){
                $idPublicacion = $request->idPublicacion;
                $idProducto = $producto['id_producto'];

                $publicacion->config()->attach($idPublicacion, ['id_producto'=>$idProducto]);
                $total++;
            }
        }        
        
        return ['total' => $total];        
    }

    
}
