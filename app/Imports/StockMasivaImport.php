<?php

namespace App\Imports;

use App\TempCargaStock;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithMultipleSheets;

class StockMasivaImport implements ToModel, WithMultipleSheets
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {        
        if($row[0]=="ID unico del producto en BD" || $row[0]=="ID producto"){
            return null;
        }       

        return new TempCargaStock([
            'id_producto'           => $row[0],
            'id_almacen'            => $row[1],
            'codigo_producto'       => $row[2],
            'tipo_movimiento'       => $row[3],
            'codigo_ubicacion'      => $row[4],
            'cantidad'              => $row[5],
            'piezas_operar'         => 0,
            'stock_actual'          => 0,
            'stock_nuevo'           => 0,
            'lote_referencia'       => $row[6],
            'opt1'                  => $row[7],
            'opt2'                  => $row[8],
            'opt3'                  => $row[9],
            'estatus'               => 'INI'
        ]);
    }



    public function sheets(): array
    {
        return [
            0 => $this,
        ];
    }
}
