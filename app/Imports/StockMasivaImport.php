<?php

namespace App\Imports;

use App\TempCargaStock;
use Maatwebsite\Excel\Concerns\ToModel;

class StockMasivaImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        return new TempCargaStock([
            'id_producto'           => $row[0],
            'id_almacen'            => $row[1],
            'codigo_producto'       => $row[2],
            'tipo_movimiento'       => $row[3],
            'codigo_ubicacion'      => $row[4],
            'stock'                 => $row[5],
            'lote_referencia'       => $row[6],
            'estatus'               => 'INI'
        ]);
    }
}
