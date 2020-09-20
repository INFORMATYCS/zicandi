<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categoria;

class CategoriaController extends Controller
{
    /**
     * Lista todas las categorias activas
     */
    public function selectCategoria(Request $request){
        if(!$request->ajax())return redirect('/');

        $categorias = Categoria::where('xstatus','=','1')
        ->select('id_categoria','nombre')
        ->orderBy('nombre', 'asc')
        ->get();

        return ['categorias' => $categorias];
    }
}
