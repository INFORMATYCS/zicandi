<?php

namespace App\Exports;

use App\VentaMeli;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\FromView;
use DB;

class AlmacenExport implements FromView
{
    
    use Exportable;

    public function define()
    {              

        return $this;
    }

    /**
    * @return \Illuminate\Support\Collection
    */
    public function view(): View{
        $sql= " select 	p.codigo,
                        p.id_producto,
                        p.nombre,
                        p.ultimo_precio_compra,
                        a.id_almacen,
                        a.nombre almacen,
                        bita.stock,
                        now() fecha_consulta
                from producto p
                left join stock_producto bita on p.id_producto = bita.id_producto
                left join almacen a on bita.id_almacen = a.id_almacen
                where p.xstatus = 1
                order by p.id_producto";        

            return view('exports.almacen', [
                'stock' => DB::select( $sql )
            ]);

    }
}
