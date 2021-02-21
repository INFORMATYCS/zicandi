<?php

namespace App\Exports\sheets;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithTitle;
use DB;

class AlmacenDetalleSheet implements FromView, WithTitle
{

    private $idAlmacen;

    public function __construct($idAlmacen){              
        $this->idAlmacen = $idAlmacen;
        
    }



    
    /**
    * 
    */
    public function view(): View{
        $sql="select 	    a.id_almacen,
                            a.nombre as nombre_almacen,
                            p.id_producto,
                            p.codigo,
                            p.nombre as nombre_producto,
                            p.ultimo_precio_compra,
                            p.precio_referenciado,
                            p.promedio_precio_compra,
                            sp.stock,
                            sp.disponible,
                            sp.retenido
                from almacen a, producto p, stock_producto sp
                where sp.id_almacen = a.id_almacen
                and sp.id_producto = p.id_producto
                and a.id_almacen = ".$this->idAlmacen;
     

        return view('exports.detalleAlmacen', [
            'stock' => DB::select( $sql )
        ]);
    }


    public function title(): string{
        return "Stock General";
    }
}
