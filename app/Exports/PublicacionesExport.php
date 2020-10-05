<?php

namespace App\Exports;

use App\Publicacion;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;

class PublicacionesExport implements FromView
{
    
    use Exportable;

    public function define($buscar, $criterio, $idCuentaTienda, $estatusPublicacion, $filtros)
    {
        $this->buscar = $buscar;
        $this->criterio = $criterio;
        $this->idCuentaTienda = $idCuentaTienda;
        $this->estatusPublicacion = $estatusPublicacion;
        $this->filtros = $filtros;        
        
        return $this;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View
    {
        if($this->buscar==''){
            return view('exports.publicaciones', [
                'publicacion' => Publicacion::with('config')            
                ->select('publicacion.id_publicacion_tienda' ,'publicacion.id_variante_publicacion' ,'publicacion.titulo' ,'publicacion.nombre_variante' ,'publicacion.precio' ,'publicacion.stock' ,'publicacion.ventas' ,'publicacion.visitas', 'publicacion.envio_gratis' ,'publicacion.full' ,'publicacion.estatus')
                ->where('publicacion.id_cuenta_tienda', '=', $this->idCuentaTienda)            
                ->whereIn('publicacion.estatus', $this->estatusPublicacion)            
                ->get()
            ]);

           
        }else{
            return view('exports.publicaciones', [
                'publicacion' => Publicacion::with('config')            
                ->select('publicacion.id_publicacion_tienda' ,'publicacion.id_variante_publicacion' ,'publicacion.titulo' ,'publicacion.nombre_variante' ,'publicacion.precio' ,'publicacion.stock' ,'publicacion.ventas' ,'publicacion.visitas', 'publicacion.envio_gratis' ,'publicacion.full' ,'publicacion.estatus')
                ->where('publicacion.id_cuenta_tienda', '=', $this->idCuentaTienda)
                ->where('publicacion.'.$this->criterio, 'like', '%' . $this->buscar . '%')            
                ->whereIn('publicacion.estatus', $this->estatusPublicacion)            
                ->get()
            ]);
        }
    }
}
