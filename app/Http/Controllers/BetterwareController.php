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
use App\Proveedor;
use App\Asociada;
use App\Semana;
use App\OrdenEntrega;
use DB;

class BetterwareController extends Controller{


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



    /**
     * Recupera todos los productos del catalogo de betterware
     * 
     * 
     * 
     */
    public function getProductosBett(Request $request)
    {                          
        $resp = array();
        $insertados = 0;
        
        // Variables para controlar la paginación dinámica
        $pagina = 1;
        $limite = 250; // Solicitamos el máximo permitido por Shopify por petición
        $seguirBuscando = true;

        try {
            // IMPORTANTE: Limpiar la tabla temporal una sola vez al inicio del proceso
            $this->limpiaTablaTemporal($request);

            while ($seguirBuscando) {
                
                // Construimos la URL dinámica añadiendo el límite y el número de página
                $url = "https://betterware.com.mx/products.json?limit={$limite}&page={$pagina}";

                // Inicializamos cURL nativo de PHP para la página actual
                $ch = curl_init();
                
                // Configuramos la petición
                curl_setopt($ch, CURLOPT_URL, $url);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($ch, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
                
                // Ejecutamos la petición
                $body = curl_exec($ch);
                $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
                
                if (curl_errno($ch)) {
                    $errorCurl = curl_error($ch);
                    curl_close($ch);
                    throw new \Exception($errorCurl);
                }
                
                curl_close($ch);
                
                // Validamos que el servidor nos haya respondido correctamente
                if ($httpCode !== 200) {
                    Log::error("Error HTTP {$httpCode} al consultar la página {$pagina} de Betterware.");
                    // Rompemos el ciclo para retornar lo que se haya alcanzado a insertar antes del fallo
                    break;
                }
                
                $data = json_decode($body, true);
                
                if (json_last_error() !== JSON_ERROR_NONE) {
                    Log::error("JSON inválido en la página {$pagina}: " . json_last_error_msg());
                    break;
                }
                
                $products = isset($data['products']) ? $data['products'] : [];
                
                // CONTROL DE AGOTAMIENTO: Si Shopify devuelve un arreglo vacío, terminamos el bucle
                if (count($products) === 0) {
                    $seguirBuscando = false;
                    break;
                }
                
                // Procesamiento e inserción de los productos de la página actual
                foreach ($products as $product) {
                    $nombreLimpio = $this->limpiarNombreProducto($product['title']);                    
                    $descripcion = isset($product['body_html']) ? trim(html_entity_decode(strip_tags($product['body_html']), ENT_QUOTES, 'UTF-8')) : '';
                    $handle       = isset($product['handle']) ? $product['handle'] : '';
                    
                    $imagenUrl = null;
                    if (!empty($product['images']) && isset($product['images'][0]['src'])) {
                        $imagenUrl = $product['images'][0]['src'];
                    }
                    
                    if (isset($product['variants']) && is_array($product['variants'])) {
                        foreach ($product['variants'] as $variant) {
                            
                            $precioOferta = 0;
                            if (isset($variant['compare_at_price']) && !is_null($variant['compare_at_price']) && $variant['compare_at_price'] !== '') {
                                $precioOferta = (float) $variant['compare_at_price'];
                            }
                            
                            $urlProducto = 'https://betterware.com.mx/products/' . $handle . '?variant=' . $variant['id'];
                            
                            if($variant['sku']!=null){
                                $temp = TempCatBett::create([
                                    'codigo'          => isset($variant['sku']) ? $variant['sku'] : null,
                                    'nombre'          => $nombreLimpio,
                                    'precio'          => isset($variant['price']) ? (float) $variant['price'] : 0,
                                    'precio_oferta'   => $precioOferta,
                                    'url'             => $urlProducto,
                                    'descripcion'     => $descripcion,
                                    'imagen'          => $imagenUrl,
                                    'imagen_mini'     => null,
                                    'estatus_proceso' => 'PEN',
                                ]);
                                
                                array_push($resp, [$temp['id_temp_cat_bett'], $temp['nombre']]);
                                $insertados++;
                            }
                        }
                    }
                }
                
                // Avanzamos el puntero a la siguiente página
                $pagina++;
                
                // delay preventivo de 1 segundo para respetar los límites de velocidad (Rate Limit) de Shopify
                sleep(2);
            }
                            
            return [ 
                'xstatus'    => true, 
                'productos'  => $resp
            ];
            
        } catch (\Exception $e) {
            Log::error('Error al scrapear o insertar el catálogo: ' . $e->getMessage());
            return response()->json(['status' => 'error', 'message' => $e->getMessage()], 500);
        }
    }

    
    
    /**
     * Descarga imagenes de betterware
     * 
     * 
     * 
     */
    private function getImagenBett($pathImagen, $codigo, $nombreSalida, $isAplicaMini){
        $band = true;
        $urlPublicacion = "";
        $urlPublicacionMini = "";
        try{
            $ruta = parse_url($pathImagen, PHP_URL_PATH);
            $ext = pathinfo($ruta, PATHINFO_EXTENSION);

            $actual = file_get_contents($pathImagen);            

            $b64= base64_encode($actual);

            $procesadorImagenes = new ProcesadorImagenes();
            $imagen = array(    
                'nombre'=>$nombreSalida.'.'.$ext,
                'size'=>0,
                'type'=>$ext,
                'b64'=>$b64
            );

            
            if($isAplicaMini){
                $urlPublicacionMini = $procesadorImagenes->publicaImagenMini100Bett($imagen);     
            }

            //Se anula el respaldo de la imagen de alta resolucion
            //$urlPublicacion = $procesadorImagenes->publicaImagenRespBett($imagen);
        }catch (\Exception $e) {
            $ERROR = $e->getMessage();                
            Log::error( $ERROR );
            $urlPublicacion = "";
            $urlPublicacionMini = "";
            $band = false;
        }


        return array ($band, $urlPublicacion, $urlPublicacionMini);
    }


    /**
     * Procesa por producto
     * Lee el temporal y realiza la migracion a producto
     * Procesa la imagen
     * 
     */
    public function procesaTempProducto(Request $request){
        try{            
            $cadenaProcesa = $request->id_temp_cat_bett;
            
            $idTempCatBettList = explode(",", $cadenaProcesa);
            $mensajeErrSalida = "";

            foreach($idTempCatBettList as $idTempCatBett){
                if(intval($idTempCatBett)>0){
                    
                    //----------------------- Procesamiento individual
                    try{
                        $temp = TempCatBett::findOrFail($idTempCatBett);

                        $codigo = $temp->codigo;
                        $nombre = $temp->nombre;
                        $precio = $temp->precio;
                        $precio_oferta = $temp->precio_oferta;
                        $url = $temp->url;
                        $imagen = $temp->imagen;
                        $descripcion = substr($temp->descripcion, 0, 299);                        
                        $categoria = $temp->categoria;
                        $espec_json = $temp->espec_json;
            
                        //~No todos los productos tienen precio de oferta
                        if($precio_oferta == null || $precio_oferta == 0){
                            $precio_oferta = $precio;
                        }
            
                        
                        //Procesa imagen 1 y mini
                        list ($bandExito, $url_original, $url_imagen) = $this->getImagenBett($imagen, $codigo, $codigo, true);
            
                        $temp->imagen_mini = $url_imagen;
                        //$temp->imagen_respaldo = $url_original;
                        $temp->estatus_proceso = 'PRO';
            
                        $temp->update();
            
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
                        
                        //Realiza la migracion a Producto
                        $producto = Producto::where('codigo','=',$codigo)
                        ->select('id_producto','nombre','codigo','url_imagen','nota','ultimo_precio_compra','promedio_precio_compra','xstatus')            
                        ->get(); 
            
                        if($producto->isEmpty()){
                            $producto = new Producto();    
                            $producto->id_categoria = $idCategoria;
                            $producto->codigo = $codigo;
                            $producto->nombre = substr($nombre, 0, 30);
                            
                            if($bandExito){
                                $producto->url_imagen = Config::get('zicandi.url_public').$url_imagen;
                            }
                            
                            $producto->nota = $descripcion;
                            $producto->id_carpeta_adjuntos = 0;
                            $producto->ultimo_precio_compra = $precio_oferta * Config::get('zicandi.betterware.factorConversion');
                            $producto->promedio_precio_compra = $precio_oferta * Config::get('zicandi.betterware.factorConversion');
                            $producto->precio_referenciado = $precio_oferta * Config::get('zicandi.betterware.factorConversion');
                            $producto->xstatus ='1';
                            $producto->save();
            
                            $producto->proveedores()->attach($idProveedor,['codigo_barras'=>$codigo]);
            
            
            
                        }else{
                            $producto = Producto::find($producto[0]->id_producto);
                            $producto->nombre = substr($nombre, 0, 30);
                            
                            if($bandExito){
                                $producto->url_imagen = Config::get('zicandi.url_public').$url_imagen;
                            }
                            
                            $producto->nota = $descripcion;                
                            $ultimoPrecioCompras = $producto->calcularUltimoPrecioCompra();
            
                            if( $ultimoPrecioCompras<=0 ){
                                $producto->ultimo_precio_compra = $precio_oferta * Config::get('zicandi.betterware.factorConversion');
                                $producto->promedio_precio_compra = $precio_oferta * Config::get('zicandi.betterware.factorConversion');
                                $producto->precio_referenciado = $precio_oferta * Config::get('zicandi.betterware.factorConversion');
                            }else{
                                $producto->precio_referenciado = $precio_oferta * Config::get('zicandi.betterware.factorConversion');
                            }
            
            
                            $producto->save();
                        
                        }
                    }catch(Exception $e){
                        Log::error( $e->getTraceAsString() ); 
                        $mensajeErrSalida.= $idTempCatBett . '=>' . substr($e->getMessage(),0 , 100);                                  
                    }
                    //----------------------- Procesamiento individual
                }
            }

            if($mensajeErrSalida!=""){
                throw new Exception($mensajeErrSalida);
            }
            
            
            
           
            
            return [ 'xstatus'=>true ];
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Remueve acentos y caracteres especiales dejando solo letras, números y espacios.
     *
     * @param string $cadena
     * @return string
     */
    function limpiarNombreProducto($cadena)
    {
        $acentos = [
            'á'=>'a', 'é'=>'e', 'í'=>'i', 'ó'=>'o', 'ú'=>'u', 
            'Á'=>'A', 'É'=>'E', 'Í'=>'I', 'Ó'=>'O', 'Ú'=>'U',
            'ñ'=>'n', 'Ñ'=>'N', 'ü'=>'u', 'Ü'=>'U'
        ];
        
        // Reemplaza acentos y eñes
        $cadena = strtr($cadena, $acentos);
        
        // Remueve caracteres especiales (solo deja letras, números y espacios)
        $cadena = preg_replace('/[^A-Za-z0-9 ]/', '', $cadena);
        
        return trim($cadena);
    }
    
}
