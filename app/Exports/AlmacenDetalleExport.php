<?php

namespace App\Exports;

use App\VentaMeli;
use Maatwebsite\Excel\Concerns\Exportable;
use Illuminate\Contracts\View\View;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;
use App\Exports\sheets\AlmacenDetalleSheet;
use App\Exports\sheets\AlmacenDetalleUbicaSheet;




class AlmacenDetalleExport implements WithMultipleSheets
{
    
    use Exportable;
    

    private $idAlmacen;

    public function define($idAlmacen){
        $this->idAlmacen = $idAlmacen;

        return $this;
    }

    public function sheets(): array{
        $sheet = [];

        $sheet[0] = new AlmacenDetalleSheet($this->idAlmacen);
        $sheet[1] = new AlmacenDetalleUbicaSheet($this->idAlmacen);
        

        return $sheet;

    }
}
