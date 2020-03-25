<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;

class ProductoController extends Controller{
    
    
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
            $productos = Producto::join('categoria','producto.id_categoria','=','categoria.id_categoria')
            ->select('producto.id_producto','producto.id_categoria','producto.codigo','producto.nombre as nombre_producto','producto.url_imagen','producto.modelo','categoria.codigo as codigo_categoria','.producto.promedio_precio_compra','producto.ultimo_precio_compra','producto.xstatus')
            ->orderBy('producto.id_producto', 'desc')
            ->paginate(10);
        }else{
            $productos = Producto::join('categoria','producto.id_categoria','=','categoria.id_categoria')
            ->select('producto.id_producto','producto.id_categoria','producto.codigo','producto.nombre as nombre_producto','producto.url_imagen','producto.modelo','categoria.codigo as codigo_categoria','.producto.promedio_precio_compra','producto.ultimo_precio_compra','producto.xstatus')
            ->where('producto.'.$criterio, 'like', '%' . $buscar . '%')
            ->orderBy('producto.id_producto', 'desc')
            ->paginate(10);            
        }
        

        return [
            'pagination' => [
                'total'         => $productos->total(),
                'current_page'         => $productos->currentPage(),
                'per_page'         => $productos->perPage(),
                'last_page'         => $productos->lastPage(),
                'from'         => $productos->firstItem(),
                'to'         => $productos->lastItem()
            ],
            'producto'=> $productos
        ];
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request){    
        $producto = new Producto();
        $producto->id_categoria = $request->id_categoria;
        $producto->codigo = $request->codigo;
        $producto->url_imagen = $request->url_imagen;
        $producto->modelo = $request->modelo;
        $producto->xstatus ='1';

        $producto->save();



    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request){
        
        $producto = Producto::findOrFail($request->id_producto);//~Se busca en base al ID entrante
        $producto->id_categoria = $request->id_categoria;
        $producto->codigo = $request->codigo;
        $producto->url_imagen = $request->url_imagen;
        $producto->modelo = $request->modelo;
        $producto->xstatus ='1';

        $producto->save();
    }


    /**
     * 
     * 
     */
    public function desactivar(Request $request){
        $producto = Producto::findOrFail($request->id_producto);
        $producto->xstatus ='0';

        $producto->save();
    }

    /**
     * 
     * 
     */
    public function activar(Request $request){        
        $producto = Producto::findOrFail($request->id_producto);
        $producto->xstatus ='1';

        $producto->save();
    }    

}
