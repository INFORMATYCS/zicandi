<?php

namespace App\Http\Controllers;
use Config;
Use Log;
use View;
use Session;
Use Exception;
use DB;
use Illuminate\Http\Request;
use App\Http\Lib\Meli;
use App\CuentaTienda;
use App\Parametria;
use App\MeliEnvioFull;
use App\MeliDetaEnvioFull;
use App\MeliConfigEnvioFull;
use App\MeliSocketEnvioFull;
use App\Publicacion;
use App\ConfigPublicacion;
use App\Producto;






class MercadoLibreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request){                
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        //Session::put('access_token', null);
        $salida = array();
        $code = $request->code;
        $meli = new Meli($appId, $secretKey);
        if($code!=null || Session::get('access_token')!=null ) {
            if($code!=null && !Session::get('access_token')) {

                try{
                    $user = $meli->authorize($code, $redirectURI);
                    
                    Session::put('access_token', $user['body']->access_token);
                    Session::put('expires_in', time() + $user['body']->expires_in);
                    Session::put('refresh_token', $user['body']->refresh_token);

                    $request->accessToken = $user['body']->access_token;
                    $me = $this->me($request);
                    
                    //~Actualiza tabla cuentas
                    if( $me['httpCode']=="200" ){
                        CuentaTienda::where('usuario','=',$me['body']->nickname)
                        ->update([  'estatus' => 'CONECTADO',                        
                            'att_access_token' => $user['body']->access_token,
                            'att_refresh_token' =>  $user['body']->refresh_token,
                            'att_expira_token' =>  date("Y-m-d H:i:s", Session::get('expires_in')) ]);
                    }

                    return View::make("loginMELI");
                }catch(Exception $e){
                    echo "Exception: ",  $e->getMessage(), "\n";
                }
            }else{
                if(Session::get('expires_in') < time()) {
                    try {
                        // Make the refresh proccess
                        $refresh = $meli->refreshAccessToken();
        
                        // Now we create the sessions with the new parameters                        
                        Session::put('access_token', $refresh['body']->access_token);
                        Session::put('expires_in', time() + $refresh['body']->expires_in);
                        Session::put('refresh_token', $refresh['body']->refresh_token);

                        //~Actualiza tabla cuentas
                        CuentaTienda::where('att_id','=',$user['body']->user_id)
                        ->update([  'estatus' => 'CONECTADO',                        
                            'att_access_token' => $user['body']->access_token,
                            'att_refresh_token' =>  $user['body']->refresh_token,
                            'att_expira_token' =>  date("Y-m-d H:i:s", Session::get('expires_in')) ]);
                    } catch (Exception $e) {
                          echo "Exception: ",  $e->getMessage(), "\n";
                    }                    
                }    
                $salida = array('urlLogin'=>null, 'msg'=>'Sesion activa');            
            }
        }else{
            $urlLogin = $meli->getAuthUrl($redirectURI, Meli::$AUTH_URL[$siteId]);

            $salida = array('urlLogin'=>$urlLogin, 'msg'=>'Inicia logeo con ML');            
        }

        return $salida;        
    }

    public function refreshToken($refreshToken){        
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        $meli = new Meli($appId, $secretKey, null, $refreshToken);
        $refresh = null;

        try{
            $refresh = $meli->refreshAccessToken();
            if( $refresh == null ){
                $refresh = array('httpCode'=>'NO_SESSION');
            }elseif( $refresh['httpCode']!="200" ){
                $refresh = array('httpCode'=>'NO_SESSION');
            }else{
                Session::put('access_token', $refresh['body']->access_token);
                Session::put('expires_in', time() + $refresh['body']->expires_in);
                Session::put('refresh_token', $refresh['body']->refresh_token);
            }
            
        }catch(Exception $e){
            $refresh = array('httpCode'=>'NO_SESSION');
        }
            
       

        return $refresh;        
    }


    public function getAsynCODE(Request $request){
        $code = $request->code;

        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');
        

        $meli = new Meli($appId, $secretKey);
        $user = $meli->authorize($code, $redirectURI);
			
        Session::put('access_token', $user['body']->access_token);
        Session::put('expires_in', time() + $user['body']->expires_in);
        Session::put('refresh_token', $user['body']->refresh_token);


        return View::make("loginmeli");
    }

    public function me(Request $request){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        $accessToken = Session::get('access_token');
        if(isset($request->accessToken)){
            $accessToken = $request->accessToken;
        }
        

        if( $accessToken !=null){                        
                $meli = new Meli($appId, $secretKey);

                $params = array('access_token' => $accessToken);
                $result = $meli->get('/users/me', $params);

                if($result ==null || $result['httpCode']!="200"){
                    $result = array('httpCode'=>'NO_SESSION');
                }
            
        }else{
            $result = array('httpCode'=>'NO_SESSION');
        }
        
        return $result;
    }

    public function logout(Request $request){
        Session::put('access_token', null);
        Session::put('expires_in', null);
        Session::put('refresh_token', null);        
    }

    public function publicaciones($id, $token){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        $publicaciones = array();
        $result = array('httpCode'=>'NO_SESSION');

        if( $token!=null ){
            $meli = new Meli($appId, $secretKey);
            $offset = 0;
            $limit = 100;

            do{
                $params = array('access_token' => $token,
                                'offset' => $offset,
                                'limit' => $limit);
                $result = $meli->get('/users/'.$id.'/items/search', $params);

                //~itera el resto de paginas
                if($result['httpCode']=="200"){            
                    $paging = $result['body']->paging;
                    $totalPubicaciones = $paging->total;
                    $results = $result['body']->results;
                    
                    for($i=0; $i < count($results); $i++){
                        array_push($publicaciones, $results[$i]);
                    }
                    

                    $offset = $offset + $limit;    
                    $result = array('httpCode'=> $result['httpCode']);                
                }else{
                    break;
                }
            }while($offset < $totalPubicaciones);

        }

        $result['lista'] = $publicaciones;

        
        return $result;
    }

   


    public function items($its, $token){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        if($token!=null){
            $meli = new Meli($appId, $secretKey);

            $params = array('access_token' => $token,
                            'ids' => $its);
            $result = $meli->get('/items', $params);
        }else{
            $result = array('httpCode'=>'NO_SESSION');
        }
        
        return $result;
    }

    public function visitas($its, $token){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        if($token!=null){
            $meli = new Meli($appId, $secretKey);

            $params = array('access_token' => $token,
                            'ids' => $its);
            $result = $meli->get('/visits/items', $params);
        }else{
            $result = array('httpCode'=>'NO_SESSION');
        }
        
        return $result;
    }


    public function ventas($id, $token, $fechaInicial, $fechaFinal){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        $ventas = array();
        $result = array('httpCode'=>'NO_SESSION');

        if( $token!=null ){
            $meli = new Meli($appId, $secretKey);
            $offset = 0;
            $limit = 50;

            do{
                $params = array('seller' => $id,
                                'order.date_created.from' => $fechaInicial,
                                'order.date_created.to' => $fechaFinal,
                                'access_token' => $token,
                                'offset' => $offset,
                                'limit' => $limit);
                $result = $meli->get('/orders/search', $params);

                //~itera el resto de paginas
                if($result['httpCode']=="200"){            
                    $paging = $result['body']->paging;
                    $totalPubicaciones = $paging->total;
                    $results = $result['body']->results;
                    
                    for($i=0; $i < count($results); $i++){
                        array_push($ventas, $results[$i]);
                    }
                    

                    $offset = $offset + $limit;    
                    $result = array('httpCode'=> $result['httpCode']);                
                }else{
                    break;
                }
            }while($offset < $totalPubicaciones);

        }

        $result['lista'] = $ventas;

        
        return $result;
    }


    public function envioDetalle($id, $token){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        if($token!=null){
            $meli = new Meli($appId, $secretKey);

            $params = array('access_token' => $token);
            $result = $meli->get('/shipments/'.$id, $params);
        }else{
            $result = array('httpCode'=>'NO_SESSION');
        }
        
        return $result;
    }


    public function pagoDetalle($id, $token){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        if($token!=null){
            $ch = curl_init();

            // set url
            curl_setopt($ch, CURLOPT_URL, "https://api.mercadopago.com/v1/payments/".$id."?access_token=".$token);

            //return the transfer as a string
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            // $output contains the output string
            $result = json_decode(curl_exec($ch));

            // close curl resource to free up system resources
            curl_close($ch);
        }else{
            $result = array('httpCode'=>'NO_SESSION');
        }
        
        return $result;
    }
    


    /**
     * Calcula el costo de venta en mercadolibre
     * 
     * 
     * 
     */
    public function precioVentaCategoria($idCategoria, $tipoListing, $precioReferencia){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        
        $meli = new Meli($appId, $secretKey);

        $params = array(    'category_id' => $idCategoria,
                            'price' => $precioReferencia);
        $result = $meli->get('/sites/'.$siteId.'/listing_prices/'.$tipoListing, $params);
        
        
        if($result['httpCode']=="200"){
            $resultMeli = $result['body'];
            $comision = $resultMeli->sale_fee_amount;
        }else{            
            //~Porcentaje default
            $parametria = Parametria::where('xstatus','=','1')->where('clave_proceso','=','PUBLICA')->where('llave','=','PORCE_DEFAULT_ML')->select('valor')->first();
            $comision = floatval($parametria->valor);   
        }
        
        return $comision;
    }


    /**
     * Precio por envio para publicacion
     * 
     * 
     */
    public function costoEnvioGratis($item_id, $idUsuarioMELI){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        
        $meli = new Meli($appId, $secretKey);

        $params = array(    'item_id' => $item_id);
        $result = $meli->get('/users/'.$idUsuarioMELI.'/shipping_options/free', $params);
        
        
        if($result['httpCode']=="200"){
            $resultMeli = $result['body'];
            $costo = $resultMeli->coverage->all_country->list_cost;
        }else{
            //~Costo envio default
            $parametria = Parametria::where('xstatus','=','1')->where('clave_proceso','=','PUBLICA')->where('llave','=','COSTO_ENVIO_DEFAULT_ML')->select('valor')->first();
            $costo = floatval($parametria->valor);            
        }
        
        return $costo;
    }


    /**
     * Recupera listado con los ultimo 30 folios de envio registrados
     * 
     * 
     */
    public function get30FoliosEnviosMeli(Request $request){
        try{

            $envios = MeliEnvioFull::with('cuentatienda')
            ->latest()
            ->take(30)
            ->get();
        
            return [ 'xstatus'=>true, 'envios' => $envios ];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }
    }

    /**
     * Recupera informacion de la publicacion
     * 
     * 
     * 
     */
    public function getIdPublicacionByInventoryId($token, $inventoryID){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        if($token!=null){
            $meli = new Meli($appId, $secretKey);

            $params = array('access_token' => $token);
            $result = $meli->get('/inventories/'.$inventoryID.'/stock/fulfillment', $params);

            
        }else{
            $result = array('httpCode'=>'NO_SESSION');
        }
        
        return $result;
    }


    /***
     * Registra nuevo folio de envio a MELI
     * 
     * 
     */
    public function creaFolioEnvioMeli(Request $request){
        try{       

            $idCuentaTienda = $request->id_cuenta_tienda;
            $cuenta = CuentaTienda::findOrFail($idCuentaTienda);
            $token = $cuenta->att_access_token;

            $folioFull = $request->folio_full;
            $referencia = $request->referencia;
            $fechaCita = $request->fecha_cita;
            $horaCita = $request->hora_cita; 
            $archivoZPL = $request->file('archivo_zpl');

            $contenidoZPL = \File::get($archivoZPL);
            
            //~Valida que no exista el folio
            $envio = MeliEnvioFull::where('folio_full','=',$folioFull)->first();

            if($envio!=null){                        
                MeliConfigEnvioFull::where('id_meli_envio_full','=',$envio->id_meli_envio_full)->delete();
                MeliDetaEnvioFull::where('id_meli_envio_full','=',$envio->id_meli_envio_full)->delete();
                MeliEnvioFull::where('folio_full','=',$folioFull)->delete();
            }
            
            //~Registra folio envio
            $meliEnvioFull = new MeliEnvioFull();
            $meliEnvioFull->id_cuenta_tienda = $idCuentaTienda;
            $meliEnvioFull->folio_full = $folioFull;
            $meliEnvioFull->referencia = $referencia;
            $meliEnvioFull->fecha_cita = $fechaCita;
            $meliEnvioFull->hora_cita = $horaCita;

            $meliEnvioFull->save();
            
            
            $codigoBarrasFull= false;

            $bloquesZPL = explode("^XA", $contenidoZPL);
            $zplList = Array();

            foreach($bloquesZPL as $zpl){
                try{
                    $zpl= "^XA".$zpl;

                    $ft = strpos($zpl, '^FT');
                    $fd = strpos($zpl, '^FD',$ft);
                    $fs = strpos($zpl, '^FS', $fd);

                    $codigoBarrasFull = substr($zpl, $fd + 3, ($fs-$fd)-3);

                    $pq = strpos($zpl, '^PQ', $fs);
                    $pqf = strpos($zpl, ',', $pq);                

                    $totalEtiquetas = substr($zpl, $pq + 3, ($pqf - $pq)-3);

                    $zplFinal = substr($zpl, 0, $pq + 3) . "$$$" . substr($zpl, $pqf);

                    if($codigoBarrasFull){                    
                        /** Recupera informacion de mercadolibre API */
                        $respMeli = $this->getIdPublicacionByInventoryId($token, $codigoBarrasFull);

                        $idPublicacion= "";
                        $idVariacion= "";

                        if($respMeli['httpCode'] == '200'){
                            $referencias = $respMeli['body']->external_references;

                            if( count($referencias) > 0 ){
                                $idPublicacion = $referencias[0]->id;
                                if(isset($referencias[0]->variation_id)){
                                    $idVariacion = $referencias[0]->variation_id;
                                }
                            }
                        }else{
                            throw new Exception('Error al conectar con MELI. '. $respMeli['httpCode']. ' '. $respMeli['body']->message);
                        }

                        //~Busca publicacion
                        if($idVariacion!=""){
                            $publicacion = Publicacion::where('id_publicacion_tienda','=', $idPublicacion)
                            ->where('id_variante_publicacion','=', $idVariacion)
                            ->where('id_cuenta_tienda','=', $idCuentaTienda)
                            ->first();
                        }else{
                            $publicacion = Publicacion::where('id_publicacion_tienda','=', $idPublicacion)
                            ->where('id_cuenta_tienda','=', $idCuentaTienda)
                            ->first();
                        }

                        if($publicacion == null){
                            throw new Exception('No fue posible localizar la publicacion');
                        }

                        //~Configuracion de la publicacion
                        $configPublicacion = ConfigPublicacion::with('productos')
                        ->where('id_publicacion','=',$publicacion->id_publicacion)
                        ->get();                    
                        
                        if($configPublicacion == null){
                            throw new Exception('Ningun producto ligado a la publicacion');
                        }

                        array_push($zplList, array( "codigoBarrasFull"=>$codigoBarrasFull, "xstatus"=>true));

                        //~Inserta detalle
                        $meliDetaEnvioFull = new MeliDetaEnvioFull();
                        $meliDetaEnvioFull->id_meli_envio_full = $meliEnvioFull->id_meli_envio_full;                        
                        $meliDetaEnvioFull->id_publicacion = $publicacion->id_publicacion;                        
                        $meliDetaEnvioFull->codigo_barras_full = $codigoBarrasFull;                        
                        $meliDetaEnvioFull->id_publicacion_tienda = $publicacion->id_publicacion_tienda;
                        $meliDetaEnvioFull->total_etiquetas = $totalEtiquetas;
                        $meliDetaEnvioFull->etiquetas_impresas = 0;
                        $meliDetaEnvioFull->etiquetas_pendientes = $totalEtiquetas;
                        $meliDetaEnvioFull->zpl_cadena = $zplFinal;
                        $meliDetaEnvioFull->estatus = 'REG';
                        $meliDetaEnvioFull->save();


                        foreach ($configPublicacion as $c) {
                            $meliConfigEnvioFull = new MeliConfigEnvioFull();

                            $meliConfigEnvioFull->id_meli_envio_full = $meliEnvioFull->id_meli_envio_full;    
                            $meliConfigEnvioFull->id_deta_meli_envio_full = $meliDetaEnvioFull->id_deta_meli_envio_full;
                            $meliConfigEnvioFull->id_producto = $c->productos->id_producto;
                            $meliConfigEnvioFull->id_config_publicacion = $c->id_config_publicacion;
                            $meliConfigEnvioFull->codigo_producto = $c->productos->codigo;
                            $meliConfigEnvioFull->nombre_producto = $c->productos->nombre;
                            $meliConfigEnvioFull->total_piezas = $c->cantidad;                                                        

                            $meliConfigEnvioFull->save();

                        }                        

                    }
                }catch (\Exception $e) {
                    \Log::error($e->getTraceAsString());       
                    array_push($zplList, array( "codigoBarrasFull"=>$codigoBarrasFull,
                                                "xstatus"=>false,
                                                "error"=>$e->getMessage()));
                }

            }                        

        
            return [ 'xstatus'=>true, 'zpl' => $zplList ];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }
    }



    /**
     * Recupera el detalle actual del folio de envio
     * 
     * 
     * 
     */
    public function getDetalleFolioEnvioMeli(Request $request){
        try{

            $folioFull      = $request->folio_full;
            $filtro         = $request->filtro;            
            /**
             * Codigo Producto
             * Nombre Producto
             * Titulo Publicacion
             * ID publicacion tienda
             * Codigo Barras Full
             * 
             */

            $opcionFiltro   = $request->opcion_filtro;
            /**
             * TODO: Muestra todos los registros
             * PENDIENTE: Solo los que tengan etiquetas pendientes de imprimir
             * COMPLETO: Solo las que ya estan con etiquetas completas
             */


            $envio = MeliEnvioFull::where('folio_full','=',$folioFull)
            ->first();

            $deta = MeliDetaEnvioFull::with('config')                        
            ->with('publicacion')            
            ->where('id_meli_envio_full','=',$envio->id_meli_envio_full);
            if( $opcionFiltro == "PENDIENTE" ){
                $deta = $deta->where('etiquetas_pendientes','>', 0);
            }elseif( $opcionFiltro == "COMPLETO" ){
                $deta = $deta->whereColumn('total_etiquetas','etiquetas_impresas');
            }
            $deta = $deta->get();

            
            foreach($deta as $d){       
                $d->visible = true;         
                foreach($d->config as $c){                                        
                    $c->producto = Producto::findOrFail($c->id_producto);
                }
            }

            //~Aplica los filtros
            if($filtro!=null){
                foreach($deta as $d){            
                    $d->visible = false;    

                    if( !(strpos(strtoupper($d->id_publicacion_tienda), strtoupper($filtro)) ===false) ){
                        $d->visible = true;
                    }

                    if( strtoupper($d->codigo_barras_full) == strtoupper($filtro) ){
                        $d->visible = true;
                    }

                    foreach($d->config as $c){                                        
                        if($filtro == $c->producto->codigo){
                            $d->visible = true;
                        }

                        if( !(strpos(strtoupper($c->producto->nombre), strtoupper($filtro)) ===false) ){
                            $d->visible = true;
                        }
                        
                    }


                    if( !(strpos(strtoupper($d->publicacion[0]->titulo), strtoupper($filtro)) ===false) ){
                        $d->visible = true;
                    }

                    
                }
            }

       
        
            return [    'xstatus'=>true, 
                        'envio'=>$envio, 
                        'detalle' => $deta ];

        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }
    }



    /**
     * Realiza la impresa y contabilidad de las etiquetas
     * 
     * 
     * 
     */
    public function imprimeEtiquetaEnvioFull(Request $request){
        try{

            $idDetaMeliEnvioFull      = $request->id_deta_meli_envio_full;
            $totalEtiquetasImprime    = $request->total_etiqueta_imprime;

            $deta = MeliDetaEnvioFull::findOrFail($idDetaMeliEnvioFull);
            

            if($totalEtiquetasImprime > $deta->etiquetas_pendientes){
                throw new Exception('Excede el numero de etiquetas pendientes');
            }

            $zpl = str_replace("$$$", $totalEtiquetasImprime, $deta->zpl_cadena );
        
            $deta->etiquetas_impresas = $deta->etiquetas_impresas + $totalEtiquetasImprime;
            $deta->etiquetas_pendientes = $deta->etiquetas_pendientes - $totalEtiquetasImprime;
            
            if($deta->etiquetas_pendientes == 0){
                $deta->estatus = 'TER';
            }else{
                $deta->estatus = 'IMP';
            }


            $deta->update();


            //~Inserta en el socket
            $meliSocketEnvioFull = new MeliSocketEnvioFull();
            $meliSocketEnvioFull->zpl_cadena = $zpl;
            $meliSocketEnvioFull->estatus = 'PEN';
            $meliSocketEnvioFull->save();




        
            return [    'xstatus'=>true,                         
                        'detalle' => $deta ];
                        
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }
    }


    /**
     * Imprime sin contabilizar la etiqueta
     * 
     * 
     * 
     */
    public function reimprimeEtiquetaEnvioFull(Request $request){
        try{

            $idDetaMeliEnvioFull      = $request->id_deta_meli_envio_full;
            $totalEtiquetasImprime    = $request->total_etiqueta_imprime;

            $deta = MeliDetaEnvioFull::findOrFail($idDetaMeliEnvioFull);
            

            $zpl = str_replace("$$$", $totalEtiquetasImprime, $deta->zpl_cadena );

            //~Inserta en el socket
            $meliSocketEnvioFull = new MeliSocketEnvioFull();
            $meliSocketEnvioFull->zpl_cadena = $zpl;
            $meliSocketEnvioFull->estatus = 'PEN';
            $meliSocketEnvioFull->save();
        
        
            return [    'xstatus'=>true,                         
                        'detalle' => $deta ];
                        
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];                 
        }
    }


    /**
     * Servicio con la cadena disponible para imprimir
     * 
     * 
     */
    public function socketPortPrint(){
        try{

            $meliSocketEnvioFull = MeliSocketEnvioFull::where('estatus','=','PEN')
            ->first();

            if($meliSocketEnvioFull==null){
                return [    'xstatus' => 0 ];
            }

            $zpl = $meliSocketEnvioFull->zpl_cadena;

            $meliSocketEnvioFull->estatus = 'TER';
            $meliSocketEnvioFull->update();
        
            return [  'xstatus' => 1,  'zpl'=> $zpl  ];
                        
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());       
            return [ 'xstatus'=>0, 'error' => $e->getMessage() ];                 
        }
    }


}
