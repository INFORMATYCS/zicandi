<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
Use Config;
Use Exception;
Use Log;
use App\Http\Lib\ProcesadorImagenes;
use App\TempCatBett;
use App\Categoria;
use App\Producto;
use App\StockProducto;
use App\Proveedor;
use App\Asociada;
use App\Semana;
use App\OrdenEntrega;
use DB;

class BetterwareController extends Controller{
    /**
     * Lee pagina betterware e inserta en temporales
     *
     * @return \Illuminate\Http\Response
     */
    public function getPage(Request $request){
    try{
        $url = $request->url;

        $cliente = curl_init();
		curl_setopt($cliente, CURLOPT_URL, $url);	
		curl_setopt($cliente, CURLOPT_HEADER, 0);
		curl_setopt($cliente, CURLOPT_RETURNTRANSFER, true); 

		$contenido = curl_exec($cliente);
		$puntero = 1;
		
        $productos = array();
        $msgErrorSalida ="";
		while(true){
            try{
            $puntero = strpos($contenido, '<div class="productThumbs"', $puntero);
            if($puntero<=0){
                break;
            }

            $inicialUrlDetalle = strpos($contenido, '<a href="', $puntero);
            $finalUrlDetalle = strpos($contenido, '" class="img-link">', $inicialUrlDetalle);
            $urlDetalle = substr($contenido, $inicialUrlDetalle + 9, $finalUrlDetalle - ($inicialUrlDetalle+9));
            
            
            $inicialImagen = strpos($contenido, '<img src="', $puntero);
            $finalImagen = strpos($contenido, '" class="', $inicialImagen);
            $urlImagen = substr($contenido, $inicialImagen + 10, $finalImagen - ($inicialImagen+10));                        

			$puntero = strpos($contenido, '<div class="nombre">', $puntero);							
			
			//Busca nombre del producto
			$inicialNombre = strpos($contenido, '>', $puntero + 21);
			$finalNombre = strpos($contenido, '</a>', $inicialNombre);
			$nombre = substr($contenido, $inicialNombre + 1, $finalNombre - ($inicialNombre+1));
			
			$puntero = $finalNombre;
			
			//Busca el codigo del producto
			$puntero = strpos($contenido, '<div class="codigo">', $puntero);	
			
			$inicialCodigo = strpos($contenido, '<b>', $puntero + 22);
			$finalCodigo = strpos($contenido, '</b>', $inicialCodigo);
			$codigo = substr($contenido, $inicialCodigo + 3, $finalCodigo - ($inicialCodigo+3));
			
			$puntero = $finalCodigo;
			$puntero = strpos($contenido, '<div>', $puntero);	
			
			//Busca el precio del producto
            //$inicialPrecio = $puntero  + 5;
            $inicialPrecio = strpos($contenido, '$', $puntero);
			$finalPrecio = strpos($contenido, '</div>', $inicialPrecio);
			$precio = substr($contenido, $inicialPrecio, $finalPrecio - $inicialPrecio);
			
			//Precio con descuento
			if(strpos($precio, "a")>0){
                $inicialPrecioGrande = strpos($precio, '$');
				$finalPrecioGrande = strpos($precio, 'a <b>$');
				$precioGrande = substr($precio, $inicialPrecioGrande, $finalPrecioGrande - $inicialPrecioGrande);
				
				
				$inicialPrecioDes = $finalPrecioGrande  + 5;
				$finalPrecioDes = strpos($precio, '</b>', $inicialPrecioDes);
				$precio = substr($precio, $inicialPrecioDes, $finalPrecioDes - $inicialPrecioDes);
			}else{
				$precioGrande = $precio;
			}
			
			$precio = str_replace("$", "", $precio );
			$precioGrande = str_replace("$", "", $precioGrande );
			
            $puntero = $finalPrecio;      
            
            //Procesa imagen
            try{//
                $fichero = Config::get('zicandi.betterware.path').$urlImagen;
                $ext = substr($urlImagen, -3);
        
                $actual = file_get_contents($fichero);
    
                $b64= base64_encode($actual);
    
                $procesadorImagenes = new ProcesadorImagenes();
                $imagen = array(    
                    'nombre'=>$codigo.'.'.$ext,
                    'size'=>0,
                    'type'=>$ext,
                    'b64'=>$b64
                );
                $url_imagen = $procesadorImagenes->publicaImagenMini100C($imagen); 
            }catch (\Exception $e) {
                $ERROR = $e->getMessage();
                echo $ERROR;
                Log::error( $ERROR );
                $url_imagen = "";
            }    

            //~Busca la descripcion del producto
            $clienteDetalle = curl_init();
            curl_setopt($clienteDetalle, CURLOPT_URL, Config::get('zicandi.betterware.path').$urlDetalle);	
            curl_setopt($clienteDetalle, CURLOPT_HEADER, 0);
            curl_setopt($clienteDetalle, CURLOPT_RETURNTRANSFER, true); 

            $detalle = curl_exec($clienteDetalle);
            $pDetalle = strpos($detalle, '<strong>Descripción</strong><br />');
            $descripcion = "";
            if($pDetalle>0){
                $inicialDesc = $pDetalle;
			    $finalDesc = strpos($detalle, '</p>', $inicialDesc);
                $descripcion = substr($detalle, $inicialDesc + 35, $finalDesc - ($inicialDesc+35));
                $descripcion = ltrim($descripcion);
                $descripcion = rtrim($descripcion);
            }

            curl_close($clienteDetalle);

            $temp = new TempCatBett();
            $temp->codigo = substr($codigo,0,15);
            $temp->nombre = substr($nombre,0,50);
            $temp->precio = trim($precio);
            $temp->precio_oferta = trim($precioGrande);
            $temp->url =Config::get('zicandi.betterware.path').$urlDetalle;
            $temp->descripcion =substr($descripcion,0,250);           
            $temp->imagen =Config::get('zicandi.betterware.path').$urlImagen;
            $temp->imagen_mini =$url_imagen;
            
            $temp->save();     
            }catch (\Exception $e) {
                $msgErrorSalida = "Error en ".$codigo." ".$e->getMessage();
            }                                    
		}	
		
        curl_close($cliente);   
        
        if($msgErrorSalida==""){
            return "OK";    
        }else{
            return $msgErrorSalida;
        }
        
    }catch (\Exception $e) {
        $ERROR = $e->getMessage();
        echo $ERROR;
    }    
    }

    public function limpiaTablaTemporal(Request $request){
        $temp = new TempCatBett();
        $temp->truncate();
    }

    public function resumenMigracion(Request $request){

        $res = \DB::select("SELECT count(DISTINCT codigo) as total FROM temp_cat_bett");

        $resExiste = \DB::select("SELECT count(DISTINCT codigo) as total FROM producto WHERE codigo in (SELECT codigo FROM temp_cat_bett)");

        $total = $res[0]->total;
        $existe = $resExiste[0]->total;
        $nuevo = $total - $existe;


        return array("total"=>$total, "update"=>$existe, "nuevo"=>$nuevo);            
    }

    public function migracionProductos(Request $request){
        //~Configura proveedor
        $proveedor = Proveedor::where('nombre_corto','=','BETT')
        ->select('id_proveedor','nombre')        
        ->get(); 

        $idProveedor = $proveedor[0]->id_proveedor;

        //~Configura categoria
        $idCategoria = 0;
        $categorias = Categoria::where('xstatus','=','1')
        ->select('id_categoria','nombre')
        ->where('nombre','=','Carga Masiva')
        ->get();        

        if($categorias->isEmpty()){
            $categoria = new Categoria();
            $categoria->codigo = "MAS";
            $categoria->nombre = "Carga Masiva"; 
            $categoria->save();   
            
            $idCategoria = $categoria->id_categoria;
        }else{
            $idCategoria = $categorias[0]->id_categoria;
        }            

        $temp = TempCatBett::all();        

        foreach($temp as $t){
            
            $producto = Producto::where('codigo','=',$t->codigo)
            ->select('id_producto','nombre','codigo','url_imagen','nota','ultimo_precio_compra','promedio_precio_compra','xstatus')            
            ->get(); 

            if($producto->isEmpty()){
                $producto = new Producto();    
                $producto->id_categoria = $idCategoria;
                $producto->codigo = $t->codigo;
                $producto->nombre = substr($t->nombre, 0, 30);
                $producto->url_imagen = Config::get('zicandi.url_public').$t->imagen_mini;
                $producto->nota = $t->descripcion;
                $producto->ultimo_precio_compra = $t->precio * Config::get('zicandi.betterware.factorConversion');
                $producto->promedio_precio_compra = $t->precio * Config::get('zicandi.betterware.factorConversion');
                $producto->precio_referenciado = $t->precio * Config::get('zicandi.betterware.factorConversion');
                $producto->xstatus ='1';
                $producto->save();

                $producto->proveedores()->attach($idProveedor,['codigo_barras'=>$t->codigo]);


                //~Registra stock
                $stock = new StockProducto();
                $stock->id_producto = $producto->id_producto;
                $stock->stock = 0;
                $stock->disponible = 0;
                $stock->retenido = 0;
                $stock->save();

            }else{
                $producto = Producto::find($producto[0]->id_producto);
                $producto->nombre = substr($t->nombre, 0, 30);
                $producto->url_imagen = Config::get('zicandi.url_public').$t->imagen_mini;
                $producto->nota = $t->descripcion;                
                $ultimoPrecioCompras = $producto->calcularUltimoPrecioCompra();

                if( $ultimoPrecioCompras<=0 ){
                    $producto->ultimo_precio_compra = $t->precio * Config::get('zicandi.betterware.factorConversion');
                    $producto->promedio_precio_compra = $t->precio * Config::get('zicandi.betterware.factorConversion');
                    $producto->precio_referenciado = $t->precio * Config::get('zicandi.betterware.factorConversion');
                }else{
                    $producto->precio_referenciado = $t->precio * Config::get('zicandi.betterware.factorConversion');
                }


                $producto->save();


                //~Registra stock
                $productoStock = StockProducto::where('id_producto','=',$producto->id_producto)->get();
                if($productoStock->isEmpty()){
                    $stock = new StockProducto();
                    $stock->id_producto = $producto->id_producto;
                    $stock->stock = 0;
                    $stock->disponible = 0;
                    $stock->retenido = 0;
                    $stock->save();
                }
            }

        }

        return 1;
    }


    
    /**
     * Recupera listado de asociadas
     * API: /bett/asociadas
     * 
     */
    public function listadoAsociadas(Request $request){
        try{
            
            if(!$request->ajax())return redirect('/');

            $buscar = $request->buscar;
            $criterio = $request->criterio;
            
            if($buscar==''){
                $listaAsociadas = Asociada::orderBy('id_bett_asociada','desc')->paginate(10);
            }else{
                $listaAsociadas = Asociada::where($criterio, 'like', '%' . $buscar . '%')->orderBy('id_bett_asociada','desc')->paginate(10);
            }
            

            return [
                'pagination' => [
                    'total'         => $listaAsociadas->total(),
                    'current_page'         => $listaAsociadas->currentPage(),
                    'per_page'         => $listaAsociadas->perPage(),
                    'last_page'         => $listaAsociadas->lastPage(),
                    'from'         => $listaAsociadas->firstItem(),
                    'to'         => $listaAsociadas->lastItem()
                ],
                'asociadas'=> $listaAsociadas,
                'xstatus'=>true
            ];


        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Registra nueva asociada
     * API: /bett/nueva_asociada
     * 
     */
    public function nuevaAsociada(Request $request){
        try{
            
            
            $asociada = new Asociada();
            $asociada->codigo=$request->codigo;
            $asociada->nombre=$request->nombre;
            $asociada->telefono=$request->telefono;
            $asociada->direccion=$request->direccion;
            $asociada->tipo=$request->tipo;
            $asociada->xstatus='1';

            $asociada->save();

            return [ 'xstatus'=>true, 'id_bett_asociada' => $asociada->id_bett_asociada ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Actualiza asociada existente
     * API: /bett/update_asociada
     * 
     */
    public function actualizaAsociada(Request $request){
        try{
            
            
            $asociada = Asociada::findOrFail($request->id_bett_asociada);//~Se busca en base al ID entrante
            $asociada->codigo=$request->codigo;
            $asociada->nombre=$request->nombre;
            $asociada->telefono=$request->telefono;
            $asociada->direccion=$request->direccion;
            $asociada->tipo=$request->tipo;
            $asociada->xstatus='1';

            $asociada->save();

            return [ 'xstatus'=>true, 'id_bett_asociada' => $asociada->id_bett_asociada ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Activa asociada existente
     * API: /bett/activar_asociada
     * 
     */
    public function activarAsociada(Request $request){
        try{
            
            
            $asociada = Asociada::findOrFail($request->id_bett_asociada);//~Se busca en base al ID entrante           
            $asociada->xstatus='1';

            $asociada->save();

            return [ 'xstatus'=>true, 'id_bett_asociada' => $asociada->id_bett_asociada ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Desactiva asociada existente
     * API: /bett/desactivar_asociada
     * 
     */
    public function desactivarAsociada(Request $request){
        try{
            
            
            $asociada = Asociada::findOrFail($request->id_bett_asociada);//~Se busca en base al ID entrante           
            $asociada->xstatus='0';

            $asociada->save();

            return [ 'xstatus'=>true, 'id_bett_asociada' => $asociada->id_bett_asociada ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Registra nueva semana
     * API: /bett/nueva_semana
     * 
     */
    public function nuevaSemana(Request $request){
        try{
            
            $semana = Semana::where('semana','=',$request->semana)->get();   
            if(count($semana)>0){
                throw new Exception('Ya existe la semana, favor de cambiar');
            }else{
                $semana = new Semana();
                $semana->semana = $request->semana;
                $semana->xstatus = 1;

                $semana->save();
            }
            
            return [ 'xstatus'=>true, 'id_semana' => $semana->id_bett_semana ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Enlista todas las semanas
     * API: /bett/semanas
     * 
     */
    public function selectSemana(Request $request){
        try{

            $semanas = Semana::where('xstatus','=','1')
            ->select('id_bett_semana as id_semana','semana')
            ->orderBy('id_bett_semana', 'desc')
            ->limit(10)
            ->get();

            
            return [ 'xstatus'=>true, 'semanas' => $semanas ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Enlista todas las asociadas, excluye aquellas que ya tienen una orden
     * API: /bett/asociadas_orden
     * 
     */
    public function selectAsociada(Request $request){
        try{

            $sql= "SELECT id_bett_asociada, nombre FROM bett_asociada aso
                    WHERE xstatus = '1'
                    and id_bett_asociada not in (
                        SELECT id_bett_asociada FROM bett_orden_entrega orden
		                WHERE orden.id_bett_semana = ".$request->id_bett_semana."                                                   
                    ) ORDER BY nombre";


            $rs = DB::select( $sql );
            
            return [ 'xstatus'=>true, 'asociadas' => $rs ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Registra nueva orden
     * API: /bett/nueva_orden
     * 
     */
    public function nuevaOrden(Request $request){
        try{
            $ordernEntrega = new OrdenEntrega();
            $asociada = Asociada::findOrFail($request->idBettAsociada);


            $ordernEntrega->id_bett_semana= $request->idSemana;
            $ordernEntrega->id_bett_asociada= $request->idBettAsociada;
            $ordernEntrega->nombre_asociada= $asociada->nombre;
            $ordernEntrega->grupo_entrega= $request->grupoEntrega;
            $ordernEntrega->total_productos= $request->totalProductos;
            $ordernEntrega->monto_cobrar= $request->montoCobrar;  
            $ordernEntrega->bolsas_entregar= $request->bolsasEntregar;
            $ordernEntrega->bolsas_recibir= $request->bolsasRecibir;
            $ordernEntrega->comentarios_entrega= $request->comentariosEntrega;
            $ordernEntrega->prioridad_entrega= $request->prioridadEntrega;
            $ordernEntrega->estatus= 'EN CURSO';

            $ordernEntrega->save();

            return [ 'xstatus'=>true, 'id_bett_orden_entrega' => $ordernEntrega->id_bett_orden_entrega ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Enlista ordenes de entrega por semana y grupo
     * API: /bett/ordenes
     * 
     */
    public function getOrdenesEntrega(Request $request){
        try{
            $grupo = $request->grupoEntrega;
            if($grupo==""){
                $grupo = "%";
            }
            
            $ordenEntrega = OrdenEntrega::where('id_bett_semana','=',$request->idSemana)
            ->select('id_bett_orden_entrega', 'id_bett_semana','id_bett_asociada','nombre_asociada','grupo_entrega','total_productos','monto_cobrar','monto_recibido','bolsas_entregar','bolsas_recibir','comentarios_entrega','comentarios_recibidos','metodo_pago','prioridad_entrega','estatus')            
            ->where('grupo_entrega','like',$grupo)              
            ->orderBy('prioridad_entrega', 'asc')                      
            ->get();                        
            return [ 'xstatus'=>true, 'ordenes' => $ordenEntrega ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Actualiza datos de la orden
     * API: /bett/update_ordenes
     * 
     */
    public function actualizaOrden(Request $request){
        try{
            $ordernEntrega = new OrdenEntrega();
            $ordernEntrega = OrdenEntrega::findOrFail($request->idBettOrdenEntrega);
                                                
            $ordernEntrega->monto_recibido= $request->montoRecibido;
            $ordernEntrega->bolsas_recibir= $request->bolsasRecibir;
            $ordernEntrega->comentarios_recibidos= $request->comentariosRecibidos;
            $ordernEntrega->metodo_pago= $request->metodoPago;
            $ordernEntrega->estatus= $request->estatus;            
            $ordernEntrega->total_productos= $request->totalProductos;
            $ordernEntrega->monto_cobrar= $request->montoCobrar;
            $ordernEntrega->bolsas_entregar= $request->bolsasEntregar;
            $ordernEntrega->comentarios_entrega= $request->comentariosEntrega;
            $ordernEntrega->prioridad_entrega= $request->prioridadEntrega;
 
            if($request->eliminar){
                $ordernEntrega->delete();
            }else{
                $ordernEntrega->update();
            }

            return [ 'xstatus'=>true];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Orden entregada o pospuesta
     * API: /bett/finaliza_ordenes
     * 
     */
    public function finalizaOrden(Request $request){
        try{
            $ordernEntrega = new OrdenEntrega();
            $ordernEntrega = OrdenEntrega::findOrFail($request->idBettOrdenEntrega);
                                                
            $ordernEntrega->monto_recibido= $request->montoRecibido;
            $ordernEntrega->bolsas_recibir= $request->bolsasRecibir;
            $ordernEntrega->comentarios_recibidos= $request->comentariosRecibidos;
            $ordernEntrega->metodo_pago= $request->metodoPago;
            $ordernEntrega->estatus= $request->estatus;

            $ordernEntrega->update();

            return [ 'xstatus'=>true];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    /**
     * Crear resumen de entrega
     * API: /bett/resumen_ordenes
     */
    public function creaResumenPDF(Request $request){
        try{            
            
            $semana = Semana::findOrFail($request->id_bett_semana);
            

            $sql= "select 	orden.nombre_asociada, grupo_entrega, orden.total_productos, orden.monto_cobrar, orden.monto_recibido, orden.bolsas_entregar, orden.bolsas_recibir, orden.comentarios_entrega, orden.comentarios_recibidos, orden.metodo_pago, orden.prioridad_entrega, orden.estatus
            from bett_orden_entrega orden, bett_semana semana
            where orden.id_bett_semana = semana.id_bett_semana
            and semana.semana = ".$semana->semana."
            order by orden.grupo_entrega, orden.metodo_pago;";

            $ordernEntrega = DB::select( $sql );

            $arreglo = [
                "titulo"    => "Resumen de entregas asociadas",
                "fecha"     => date("d/m/Y"),
                "semana"    => $semana->semana,
                "resumen" => $ordernEntrega
            ];           
            $pdf = \PDF::loadView('exports/resumenOrdenEntrega', ['datos' => $arreglo]);
            return $pdf->download('resumenOrdenEntrega.pdf');            
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }
    
}
