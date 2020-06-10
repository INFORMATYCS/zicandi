<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Compra;
use App\Proveedor;

class ComprasController extends Controller
{
   /**
     * Listar registros
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
       
        if(!$request->ajax())return redirect('/');

            $compras = Compra::join('proveedor','compra.id_proveedor','=','proveedor.id_proveedor')
            ->select('compra.id_compra','compra.folio','proveedor.nombre_corto as proveedor','compra.referencia_proveedor as referencia','compra.updated_at','compra.xstatus')
            ->orderBy('compra.id_compra', 'desc')->paginate(10);		

        return [
            'pagination' => [
                'total'         => $compras->total(),
                'current_page'         => $compras->currentPage(),
                'per_page'         => $compras->perPage(),
                'last_page'         => $compras->lastPage(),
                'from'         => $compras->firstItem(),
                'to'         => $compras->lastItem()
            ],
            'compras'=> $compras
        ];
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $compra = new Compra();        
        $compra->id_proveedor = $request->id_proveedor;
        $compra->folio = $request->folio;
        $compra->referencia_proveedor = $request->referencia_proveedor;
        $compra->id_carpeta_adjuntos = $request->id_carpeta_adjuntos;
        $compra->xstatus ='1';

        $compra->save();
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request){
                
        $compra = Compra::findOrFail($request->id_compra);//~Se busca en base al ID entrante
        $compra->id_proveedor = $request->id_proveedor;
        $compra->folio = $request->folio;
        $compra->referencia_proveedor = $request->referencia_proveedor;
        $compra->id_carpeta_adjuntos = $request->id_carpeta_adjuntos;
        $compra->xstatus ='1';

        $compra->save();                
    }


    /**
     * 
     * 
     */
    public function desactivar(Request $request){
        $compra = Compra::findOrFail($request->id_compra);
        $compra->xstatus ='0';

        $compra->save();
    }

    /**
     * 
     * 
     */
    public function activar(Request $request){        
        $compra = Compra::findOrFail($request->id_compra);
        $compra->xstatus ='1';

        $compra->save();
    }
}
