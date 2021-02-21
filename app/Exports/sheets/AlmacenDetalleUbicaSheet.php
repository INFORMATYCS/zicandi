<?php

namespace App\Exports\sheets;

use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use Maatwebsite\Excel\Concerns\WithTitle;
use DB;

class AlmacenDetalleUbicaSheet implements FromView, WithTitle{

    private $idAlmacen;

    public function __construct($idAlmacen){              
        $this->idAlmacen = $idAlmacen;
        
    }


    /**
    * 
    */
    public function view(): View{
        $sql ="select       a.nombre almacen, 
                            p.codigo, 
                            p.nombre producto, 
                            sup.codigo_ubica, 
                            sup.stock
                from almacen a, stock_producto sp, producto p, stock_ubica_producto sup
                where a.id_almacen = sp.id_almacen
                and sp.id_producto = p.id_producto
                and sp.id_stock_producto = sup.id_stock_producto
                and sp.id_producto = sup.id_producto
                and a.id_almacen = ".$this->idAlmacen." 
                order by p.codigo, sup.codigo_ubica";
     

        return view('exports.detalleAlmacenUbica', [
            'stock' => DB::select( $sql )
        ]);
    }


    public function title(): string{
        return "Stock X Ubicacion";
    }
}
