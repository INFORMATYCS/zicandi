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
    public function index(Request $request){
       
        if(!$request->ajax())return redirect('/');

        $buscar = $request->buscar;
        $criterio = $request->criterio;
        
        if($buscar==''){
            $listaProveedores = Proveedor::orderBy('id_proveedor','desc')->paginate(10);
        }else{
            $listaProveedores = Proveedor::where($criterio, 'like', '%' . $buscar . '%')->orderBy('id_proveedor','desc')->paginate(10);
        }
        

        return [
            'pagination' => [
                'total'         => $listaProveedores->total(),
                'current_page'         => $listaProveedores->currentPage(),
                'per_page'         => $listaProveedores->perPage(),
                'last_page'         => $listaProveedores->lastPage(),
                'from'         => $listaProveedores->firstItem(),
                'to'         => $listaProveedores->lastItem()
            ],
            'proveedor'=> $listaProveedores
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
        //~Valida, el nombre del proveedor no puede ser zicandi
        if($request->nombre=="zicandi"){
            abort(585, 'El nombre del proveedor no puede ser zicandi');
        }
        
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
    public function update(Request $request){
        
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
    public function desactivar(Request $request){
        $proveedor = Proveedor::findOrFail($request->id_proveedor);
        $proveedor->xstatus ='0';

        $proveedor->save();
    }

    /**
     * 
     * 
     */
    public function activar(Request $request){        
        $proveedor = Proveedor::findOrFail($request->id_proveedor);
        $proveedor->xstatus ='1';

        $proveedor->save();
    }

}
