<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;
use App\DefineProducto;
use App\Http\Lib\ProcesadorImagenes;
use App\StockProducto;

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
        $codigoML = false;

        if(is_numeric($buscar)) {
            $criterio = "codigo";
            
            if(strlen($buscar)>=9 && strlen($buscar)<=10 ){
                $codigoML = true;
                $buscar = "MLM".$buscar;
            }
        }else{
            if(strtoupper(substr($buscar,0,3))=="MLM"){
                $codigoML = true;
            }
            $criterio = "nombre";
        }
        
        if($buscar==''){
            $productos = Producto::with('atributos')
            ->join('categoria','producto.id_categoria','=','categoria.id_categoria')
            ->select('producto.id_producto','producto.id_categoria','producto.id_carpeta_adjuntos','producto.codigo','producto.nombre as nombre','producto.url_imagen','producto.nota','categoria.codigo as codigo_categoria','.producto.promedio_precio_compra','producto.ultimo_precio_compra','producto.xstatus')
            ->orderBy('producto.id_producto', 'desc')
            ->paginate(10);
        }else{
            $productos = Producto::with('atributos')
            ->join('categoria','producto.id_categoria','=','categoria.id_categoria')
            ->select('producto.id_producto','producto.id_categoria','producto.id_carpeta_adjuntos','producto.codigo','producto.nombre as nombre','producto.url_imagen','producto.nota','categoria.codigo as codigo_categoria','.producto.promedio_precio_compra','producto.ultimo_precio_compra','producto.xstatus')
            ->where('producto.'.$criterio, 'like', '%' . $buscar . '%')
            ->orderBy('producto.id_producto', 'desc')
            ->paginate(10);

            if($productos->total() == 0 && $codigoML == true){
                $productos = Producto::with('atributos')
                ->join('categoria','producto.id_categoria','=','categoria.id_categoria')                
                ->join('config_publicacion','producto.id_producto','=','config_publicacion.id_producto')
                ->join('publicacion','publicacion.id_publicacion','=','config_publicacion.id_publicacion')
                ->select('producto.id_producto','producto.id_categoria','producto.id_carpeta_adjuntos','producto.codigo','producto.nombre as nombre','producto.url_imagen','producto.nota','categoria.codigo as codigo_categoria','.producto.promedio_precio_compra','producto.ultimo_precio_compra','producto.xstatus')
                ->where('publicacion.id_publicacion_tienda', '=', $buscar)
                ->orderBy('producto.id_producto', 'desc')
                ->paginate(10);
            }

            
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
        
        $imagen = array(    
            'nombre'=>$request->imagen_nombre,
            'size'=>$request->imagen_size,
            'type'=>$request->imagen_type,
            'b64'=>$request->imagen_local
        );

        $procesadorImagenes = new ProcesadorImagenes();
        $url_imagen = $procesadorImagenes->publicaImagenMini100($imagen);    
        
        $especificacionList = $request->especificaciones;
        
        $producto = new Producto();
        $producto->id_categoria = $request->id_categoria;
        $producto->id_carpeta_adjuntos = $request->id_carpeta_adjuntos;
        $producto->codigo = $request->codigo;
        $producto->nombre = $request->nombre;
        $producto->url_imagen = $url_imagen;
        $producto->nota = $request->nota;        
        $producto->ultimo_precio_compra = 0;
        $producto->promedio_precio_compra = 0;
        $producto->precio_referenciado = 0;
        $producto->xstatus ='1';

        

        $producto->save();


        foreach ($especificacionList['especificaciones'] as $atributo) {
            if($atributo['xstatus']){
                if($atributo['llave']!=null){
                    $defineProducto = new DefineProducto();
                    $defineProducto->atributo = $atributo['llave'];
                    $defineProducto->valor = $atributo['valor'];
                    $defineProducto->xstatus = 1;

                    $producto->atributos()->save($defineProducto);
                }
            }
        }

        //~Registra stock
        /*$stock = new StockProducto();
        $stock->id_producto = $producto->id_producto;
        $stock->stock = 0;
        $stock->disponible = 0;
        $stock->retenido = 0;
        $stock->save();*/

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
        $producto->id_carpeta_adjuntos = $request->id_carpeta_adjuntos;
        $producto->codigo = $request->codigo;        
        $producto->nombre = $request->nombre;
        $producto->nota = $request->nota;
        $producto->xstatus ='1';

        //~Imagen
        $imagen = array(    
            'nombre'=>$request->imagen_nombre,
            'size'=>$request->imagen_size,
            'type'=>$request->imagen_type,
            'b64'=>$request->imagen_local
        );

        if($imagen['nombre']==null && $imagen['size']==0){
            $url_imagen = $request->url_imagen;
        }else{            
            $procesadorImagenes = new ProcesadorImagenes();
            $url_imagen = $procesadorImagenes->publicaImagenMini100($imagen); 
        }

        $producto->url_imagen = $url_imagen;

        $producto->save();

        //~Atributos
        $especificacionList = $request->especificaciones;
        $producto->atributos()->delete();

        foreach ($especificacionList['especificaciones'] as $atributo) {
            if($atributo['xstatus']){
                if($atributo['llave']!=null){
                    $defineProducto = new DefineProducto();
                    $defineProducto->atributo = $atributo['llave'];
                    $defineProducto->valor = $atributo['valor'];
                    $defineProducto->xstatus = 1;

                    $producto->atributos()->save($defineProducto);
                }
            }
        }        

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


    /**
     * Lista todos los proveedores por id_producto
     * 
     */
    public function getProveedoresByProducto(Request $request){
       
        if(!$request->ajax())return redirect('/');

        $producto = Producto::findOrFail($request->id_producto);
        $listaProveedores = $producto->proveedores;
        
        return ['proveedores' => $listaProveedores];        
    }

    /**
     * Guarda los proveedores por producto
     * 
     */
    public function storeProveedoresByProducto(Request $request){
        $idProducto = $request->id_producto;
        $proveedoresList = $request->proveedores;
       
        $producto = Producto::find($idProducto);

        //~Borra todas las asociaciones actuales
        $producto->proveedores()->detach();

        foreach ($proveedoresList['proveedores'] as $proveedor) {
            if($proveedor['xstatus']){
                $idProveedor = $proveedor['id_proveedor'];
                $codigoBarras = $proveedor['codigo']['codigo_barras'];

                $producto->proveedores()->attach($idProveedor,['codigo_barras'=>$codigoBarras]);

            }
        }
    }

}
