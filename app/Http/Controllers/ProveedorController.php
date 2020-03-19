<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Proveedor;

class ProveedorController extends Controller
{
    /**
     * Listar registros
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $listaProveedores = Proveedor::all();
        return $listaProveedores;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $proveedor = new Proveedor();
        $proveedor->nombre_corto = $request->nombre_corto;
        $proveedor->nombre = $request->nombre;
        $proveedor->pagina_web = $request->pagina_web;
        $proveedor->contacto = $request->contacto;
        $proveedor->xstatus ='1';

        $proveedor->save();



    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $id= $request->id_proveedor;
        $proveedor = Proveedor::findOrFail($request->id_proveedor);//~Se busca en base al ID entrante
        $proveedor->nombre_corto = $request->nombre_corto;
        $proveedor->nombre = $request->nombre;
        $proveedor->pagina_web = $request->pagina_web;
        $proveedor->contacto = $request->contacto;
        $proveedor->xstatus ='1';

        $proveedor->save();
    }


    /**
     * 
     * 
     */
    public function desactivar(Request $request)
    {
        $proveedor = Proveedor::findOrFail($request->id_proveedor);
        $proveedor->xstatus ='0';

        $proveedor->save();
    }

    /**
     * 
     * 
     */
    public function activar(Request $request)
    {
        $proveedor = Proveedor::findOrFail($request->id_proveedor);
        $proveedor->xstatus ='1';

        $proveedor->save();
    }

}
