<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Config;
Use Exception;
Use Log;
use App\Publicacion;
use App\ConfigPublicacion;
use App\Exports\PublicacionesExport;
use Maatwebsite\Excel\Facades\Excel;
use DB;


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

        $utilidad = $filtros->utilidad;

        list($campoOrden, $direccionOrden) = explode('|', $filtros->orden);
    
        $estatusPublicacion = array();
        if($filtros->activas)
        array_push($estatusPublicacion, 'active');

        if($filtros->pausadas)
        array_push($estatusPublicacion, 'paused');

        if($filtros->sinligar)
        $sinligar=true;
        
        
        if(strtoupper (substr( $buscar, 0, 3 )) === "MLM"){
            $criterio = "id_publicacion_tienda";
        }

        if($buscar==''){
            $publicaciones = Publicacion::with('config')            
            ->select('publicacion.id_publicacion' ,'publicacion.id_tienda' ,'publicacion.id_cuenta_tienda' ,'publicacion.id_publicacion_tienda' ,'publicacion.id_variante_publicacion' ,'publicacion.titulo' ,'publicacion.nombre_variante' ,'publicacion.precio' ,'publicacion.stock' ,'publicacion.ventas' ,'publicacion.visitas', 'publicacion.envio_gratis' ,'publicacion.full' ,'publicacion.link' ,'publicacion.foto_mini' ,'publicacion.fecha_consulta' ,'publicacion.estatus', 'publicacion.tipo_listing','publicacion.costo_envio','publicacion.comision_venta','publicacion.iva','publicacion.isr','publicacion.neto_venta_final','publicacion.ultimo_precio_compra',DB::raw('publicacion.neto_venta_final - publicacion.ultimo_precio_compra as neto'), DB::raw('round(((publicacion.neto_venta_final - publicacion.ultimo_precio_compra)/publicacion.ultimo_precio_compra)*100,0) as p_neto') )
            ->where('publicacion.id_cuenta_tienda', '=', $idCuentaTienda)            
            ->whereIn('publicacion.estatus', $estatusPublicacion);
            
        }else{
            $configPublicacion = ConfigPublicacion::join('producto','producto.id_producto','=','config_publicacion.id_producto')
            ->select('config_publicacion.id_publicacion')
            ->where('producto.codigo', '=', $buscar)
            ->get();



            $publicaciones = Publicacion::with('config')            
            ->select('publicacion.id_publicacion' ,'publicacion.id_tienda' ,'publicacion.id_cuenta_tienda' ,'publicacion.id_publicacion_tienda' ,'publicacion.id_variante_publicacion' ,'publicacion.titulo' ,'publicacion.nombre_variante' ,'publicacion.precio' ,'publicacion.stock' ,'publicacion.ventas' ,'publicacion.visitas', 'publicacion.envio_gratis' ,'publicacion.full' ,'publicacion.link' ,'publicacion.foto_mini' ,'publicacion.fecha_consulta' ,'publicacion.estatus', 'publicacion.tipo_listing','publicacion.costo_envio','publicacion.comision_venta','publicacion.iva','publicacion.isr','publicacion.neto_venta_final','publicacion.ultimo_precio_compra',DB::raw('publicacion.neto_venta_final - publicacion.ultimo_precio_compra as neto'), DB::raw('round(((publicacion.neto_venta_final - publicacion.ultimo_precio_compra)/publicacion.ultimo_precio_compra)*100,0) as p_neto') )
            ->where('publicacion.id_cuenta_tienda', '=', $idCuentaTienda)
            ->where(function ($query) use ($criterio, $buscar, $configPublicacion){
                $query->where('publicacion.'.$criterio, 'like', '%' . $buscar . '%') 
                ->orWhereIn('publicacion.id_publicacion', $configPublicacion);
            })            
            ->whereIn('publicacion.estatus', $estatusPublicacion);
                    
        }

        if(!($utilidad->verde && $utilidad->amarilla && $utilidad->roja)){
            $limiteInferior = 0;
            $limiteSuperior = 0;

            if($utilidad->verde){
                $limiteInferior = 20;
                $limiteSuperior = 1000;
            }
            
            if($utilidad->amarilla){
                $limiteInferior = 5;

                if($limiteSuperior==0)
                $limiteSuperior = 19;
            }
            
            if($utilidad->roja){
                $limiteInferior = -1000;

                if($limiteSuperior==0)
                $limiteSuperior = 4;
            }
            

            
            $publicaciones = $publicaciones->whereRaw("round(((publicacion.neto_venta_final - publicacion.ultimo_precio_compra)/publicacion.ultimo_precio_compra)*100,0) BETWEEN ".$limiteInferior." and ".$limiteSuperior);
        }
        

        $publicaciones = $publicaciones->orderBy($campoOrden, $direccionOrden)
        ->paginate(100);

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
     * Exporta a excel publicaciones conforme a los filtros de pantalla
     * API: /publicaciones/exportar
     * 
     */
    public function exportar(Request $request){
        try{

            $param = json_decode($request->param);

            $buscar = $param->buscar;
            $criterio = $param->criterio;
            $idCuentaTienda = $param->idCuentaTienda;
            
            $filtros = $param->filtros;

            $estatusPublicacion = array();
            if($filtros->activas)
            array_push($estatusPublicacion, 'active');

            if($filtros->pausadas)
            array_push($estatusPublicacion, 'paused');
            
            
            if(strtoupper (substr( $buscar, 0, 3 )) === "MLM"){
                $criterio = "id_publicacion_tienda";
            }

            
            return (new PublicacionesExport)->define($buscar, $criterio, $idCuentaTienda, $estatusPublicacion, $filtros)->download('invoices.xlsx');
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        
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
                $cantidad = $producto['cantidad'];

                $publicacion->config()->attach($idPublicacion, ['id_producto'=>$idProducto,'cantidad'=>$cantidad]);
                $total++;
            }
        }        
        
        return ['total' => $total];        
    }

    /**
     * Recupera detalle de la publicacion
     * 
     * API: /publicaciones/get
     * 
     */
    public function getPublicacion(Request $request){
        try{
            $idPublicacion = $request->idPublicacion;
 
            $pub = Publicacion::with('config')
            ->where('id_publicacion_tienda','=',$idPublicacion)->get();
            

            return [                
                'publicacion' => $pub,
                'xstatus'=>true
            ];

        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    
}
