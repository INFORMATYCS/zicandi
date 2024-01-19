<?php

namespace App\Http\Controllers;
use Config;
Use Log;
use View;
use Session;
Use Exception;
use DB;
use Carbon\Carbon;
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
use App\Http\Lib\ProcesadorImagenes;
use App\MeliDetaMetricaProyecto;
use App\Producto;
use App\MeliMetricaVisor;
use App\MeliDetaMetricaVisor;
use App\MeliMetricaProyecto;
use App\MeliMetricaVisorProyecto;

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
					

                    //~Reserva el valor para guardar al terminar el proceso
                    $tokenLogeo = $user['body']->access_token;
                    $refreshTokenLogeo = $user['body']->refresh_token;

                    $request->accessToken = $user['body']->access_token;
                    $me = $this->me($request);
                    
                    //~Actualiza tabla cuentas
                    if( $me['httpCode']=="200" ){
                        CuentaTienda::where('usuario','=',$me['body']->nickname)
                        ->update([  'estatus' => 'CONECTADO',                        
                            'att_access_token' => $tokenLogeo,
                            'att_refresh_token' =>  $refreshTokenLogeo,
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
            $urlLogin = $meli->getAuthUrl($redirectURI, Meli::$AUTH_URL["MLM"]);

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

            // Genera indice de productos por SURTIR
            DB::select('call sp_meli_surtir_genera_indice(?, @totalOk, @totalErr, @err, @msg)', [$folioFull]);
            $results = DB::select('select @totalOk totalOk, @totalErr totalErr, @err as err, @msg as msg');
            $totalOk= $results[0]->totalOk;
            $totalErr= $results[0]->totalErr;
            $pError= $results[0]->err;
            $pMsgError= $results[0]->msg;

            if($pError!=0){
                throw new Exception('No fue posible generar el indice para surtir el envio'.$pMsgError);
            }

            DB::select('call sp_meli_surtir_genera_foto_stock(?, @err, @msg)', [$folioFull]);

            return [ 'xstatus'=>true, 'zpl' => $zplList, 'surtirEnvioOk' => ($totalOk==null ? 0 : $totalOk), 'surtirEnvioErr' => ($totalErr==null ? 0 : $totalErr)];
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

            
            //~Agrega producto
            foreach($deta as $d){       
                $d->visible = true;         
                foreach($d->config as $c){                                        
                    $c->producto = Producto::findOrFail($c->id_producto);
                }
            }

            //~Agrega ubicaciones y stock

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


    /**
     * 
     * 
     * 
     * 
     */
    public function getMeliVisitasNoToken($item_id, $fecha){
        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        
        $meli = new Meli($appId, $secretKey);

        $params = array(    'item_id' => $item_id);
        $result = $meli->get('/items/visits?ids='.$item_id.'&date_from='.$fecha.'T00:00:00.000-00:00&date_to='.$fecha.'T23:59:00.000-00:00');
        
        
        if($result['httpCode']=="200"){
            $resultMeli = $result['body'];
            $visitas = $resultMeli[0]->total_visits;
        }else{
            $visitas = 0;
        }
        
        return $visitas;
    }


    /**
     * Registra publicacion
     * 
     * 
     */
    public function registraPublicacionVisor(Request $request){        
        try{            

            $url = $request->url;
            $idMeliMetricaProyecto = $request->idMeliMetricaProyecto;
            $idPublicacionTienda = $request->idPublicacionTienda;

            // create curl resource
            $ch = curl_init();

            // set url
            curl_setopt($ch, CURLOPT_URL, $url);

            //return the transfer as a string
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

            // $output contains the output string
            $output = curl_exec($ch);            

            // close curl resource to free up system resources
            curl_close($ch);

           

            //~Estatus de la publicacion            
            $textPausada = strpos($output, 'Publicación pausada</div>');

            if($textPausada == false){

                $iFoto = strpos($output, 'class="ui-pdp-gallery__figure"');
                $iFoto = strpos($output, 'https:', $iFoto);
                $fFotoWidth = strpos($output, '" width="', $iFoto);
                $fFotoDataIndex = strpos($output, ' data-index="0"', $iFoto);
                if($fFotoWidth<$fFotoDataIndex && $fFotoWidth!=false){
                    $fFoto= $fFotoWidth;
                }else{
                    $fFoto= $fFotoDataIndex -1;
                }

                $foto = trim(substr($output, $iFoto, ($fFoto - $iFoto)));

                $inicial = strpos($output, "vendidos</span>") -100;
                if($inicial==-100){
                    $inicial = strpos($output, "vendido</span>") -100;

                    if($inicial==-100){
                        $inicial = strpos($output, '<span class="ui-pdp-subtitle">Nuevo</span>') -100;
                    }
                }

                $final = strpos($output, '<span class="andes-button__content">Comprar ahora');
		        if($final == false){
                    $final = strpos($output, '<span class="andes-button__content">Agregar al carrito');
                }
		

                $html = substr($output, $inicial, $final - $inicial);


                $iTitulo = strpos($html, "ui-pdp-title");
                $fTitulo = strpos($html, "</h1>", $iTitulo);
                $titulo = trim(substr($html, $iTitulo + 14, ($fTitulo - $iTitulo)-14));

                
                $textVendidoPor = strpos($html, '<span class="ui-pdp-seller__label-sold">');
                if($textVendidoPor!=false){
                    $iVendedor = strpos($html, '<span class="ui-pdp-color--BLUE">', $textVendidoPor);
                    $fVendedor = strpos($html, '</span>', $iVendedor);
                    $vendedor = trim(substr($html, $iVendedor + 33, ($fVendedor - $iVendedor)-33));
                }else{
                    $vendedor = "NO DEF";
                }
                
                if($idPublicacionTienda == null){
                    $iIdPublicacion = strpos($url, 'MLM');
                    $fIdPublicacion = strpos($url, '-', $iIdPublicacion + 4);
                    if($fIdPublicacion==false){
                        $fIdPublicacion = strlen($url);
                    }
                    $idPublicacion = trim(str_replace('-', '', substr($url, $iIdPublicacion, ($fIdPublicacion - $iIdPublicacion))));

                    $isCatalogo = false;
                    if(strlen($idPublicacion) > 12){
                        $isCatalogo = true;
                        $idPublicacion = substr($idPublicacion, 0, 11);
                    }
                }else{
                    $idPublicacion= $idPublicacionTienda;
                }

                $publicacion = array(
                    "titulo"        => $titulo,
                    "vendedor"      => $vendedor,
                    "idPublicacion" => $idPublicacion
                );

                $meliMetricaVisor = MeliMetricaVisor::where('id_publicacion_tienda','=',$idPublicacion)
                ->first();

                //~Inserta
                if($meliMetricaVisor==null){
                    $meliMetricaVisor = new MeliMetricaVisor();
                    $meliMetricaVisor->url = $url;
                    $meliMetricaVisor->foto = $foto;
                    $meliMetricaVisor->titulo = $titulo;
                    $meliMetricaVisor->id_publicacion_tienda = $idPublicacion;
                    $meliMetricaVisor->vendedor = $vendedor;
                    $meliMetricaVisor->estatus_publicacion = 'PEN';
                    $meliMetricaVisor->estatus = 'ACT';
                    $meliMetricaVisor->save();
                }else{
                    $meliMetricaVisor->estatus = 'ACT';
                    $meliMetricaVisor->update();
                }

                $request->html = $html;
                $request->output = $output;
                $request->ListMeliMetricaVisor = $meliMetricaVisor->id_meli_metrica_visor;
                $request->ultimoBloque = 0;
                $request->bloque = 0;

                $metrica = $this->metricaPublicacionVisor($request);
                
                /*if($metrica["xstatus"]){
                    $respMetricas = $metrica["metrica"];
                }*/

                //~Liga la publicacion al proyecto
                $meliMetricaVisorProyecto = MeliMetricaVisorProyecto::where('id_meli_metrica_proyecto','=', $idMeliMetricaProyecto)
                ->where('id_meli_metrica_visor','=', $meliMetricaVisor->id_meli_metrica_visor)
                ->first();
                                
                if($meliMetricaVisorProyecto == null){
                    $meliMetricaVisorProyecto = new MeliMetricaVisorProyecto();
                    $meliMetricaVisorProyecto->id_meli_metrica_proyecto = $idMeliMetricaProyecto;
                    $meliMetricaVisorProyecto->id_meli_metrica_visor = $meliMetricaVisor->id_meli_metrica_visor;
                    $meliMetricaVisorProyecto->save();
                }

                

                return [ 'xstatus'=>true, 'publicacion' => $publicacion];
            }else{
                throw new Exception('Publicacion pausada, no es posible registrarla');
            }            
                        
        }catch (\Exception $e) {
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }        
        
    }

    /**
     * Obtiene metricas de la publicacion
     * 
     * 
     * 
     */
    public function metricaPublicacionVisor(Request $request){        
        try{    
        
            $cadenaProcesa = $request->ListMeliMetricaVisor;
            $ultimoBloque = $request->ultimoBloque;
            $bloque = $request->bloque;
            
            if($bloque == 1){
                //~Reinicia estadisticas de proyectos
                $hoy = Carbon::today();
                MeliDetaMetricaProyecto::whereDate('fecha_metrica', '=', $hoy)
                ->update(['promedio_visitas'=>'0','promedio_ventas'=>'0']);                
            }
                
            $idMeliMetricaVisorList = explode(",", $cadenaProcesa);
            $mensajeErrSalida = "";

            foreach($idMeliMetricaVisorList as $idMeliMetricaVisor){
                if(intval($idMeliMetricaVisor)>0){
                    //~-------------------Procesamiento individual
                    try{                                                          
                        $meliMetricaVisor = MeliMetricaVisor::findOrFail($idMeliMetricaVisor);            
                        $url = $meliMetricaVisor->url;    
                        $idPublicacion = $meliMetricaVisor->id_publicacion_tienda;    
                        
                        if(isset($request->html)){
                            $html = $request->html;
                            $output = $request->output;
                        }else{
                            // create curl resource
                            $ch = curl_init();

                            // set url
                            curl_setopt($ch, CURLOPT_URL, $url);

                            //return the transfer as a string
                            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

                            // $output contains the output string
                            $output = curl_exec($ch);            

                            // close curl resource to free up system resources
                            curl_close($ch);

                            $inicial = strpos($output, "vendidos</span>") -100;
                            if($inicial==-100){
                                $inicial = strpos($output, "vendido</span>") -100;

                                if($inicial==-100){
                                    $inicial = strpos($output, '<span class="ui-pdp-subtitle">Nuevo</span>') -100;
                                }
                            }

                            $final = strpos($output, '<span class="andes-button__content">Comprar ahora');
                            if($final == false){
                                $final = strpos($output, '<span class="andes-button__content">Agregar al carrito');
                            }
                            
                            //~En caso de no existir la pagina continua con la siguiente publicacion
                            if($final==false && $inicial ==-100 && strpos($output, 'Parece que esta página no existe') > 0){
                                continue;
                            }

                            
                            $html = substr($output, $inicial, $final - $inicial);
                        }

                        //~Estatus de la publicacion            
                        $textPausada = strpos($output, 'Publicación pausada</div>');
                        if($textPausada == false){

                            $iVendidos = strpos($html, "|");
                            $fVendidos = strpos($html, "vendidos</span>", $iVendidos);
                            if(!$fVendidos){
                                $fVendidos = strpos($html, "vendido</span>", $iVendidos);
                            }
                            if(!$fVendidos && !$iVendidos){
                                $vendidos= 0;    
                            }else{
                                $vendidos = trim(substr($html, $iVendidos + 1, ($fVendidos - $iVendidos)-1));
                            }


                            $iPrecio = strpos($html, '<span class="price-tag-fraction">');
                            $fPrecio = strpos($html, "</span>", $iPrecio);
                            $precio = floatval( str_replace(',', '', trim(substr($html, $iPrecio + 33, ($fPrecio - $iPrecio)-33))) );

                            $icoFull = strpos($html, 'class="ui-pdp-icon ui-pdp-icon--full"');
                            if($icoFull>0){
                                $full = 1;
                            }else{
                                $full = 0;
                            }


                            $textSinInteres = strpos($html, 'span> sin inter');
                            if($textSinInteres>0){
                                $msi = 1;
                            }else{
                                $msi = 0;
                            }

                            $iDisponible = strpos($html, '<span class="ui-pdp-buybox__quantity__available">');

                            if($iDisponible ==false){
                                $textUltimoDisponible = strpos($html, '¡Última disponible!</p>');
                                if($textUltimoDisponible>0){
                                    $disponible = 1;
                                }else{
                                    $disponible = 0;
                                }
                            }else{
                                $fDisponible = strpos($html, "disponibles)</span>", $iDisponible);
                                $disponible = trim(substr($html, $iDisponible + 50, ($fDisponible - $iDisponible)-50));
                            }
                
                            $isCatalogo = 0;
                            if($idPublicacion == null){
                                $iIdPublicacion = strpos($url, 'MLM');
                                $fIdPublicacion = strpos($url, '-', $iIdPublicacion + 4);
                                $idPublicacion = trim(str_replace('-', '', substr($url, $iIdPublicacion, ($fIdPublicacion - $iIdPublicacion))));
                                
                                if(strlen($idPublicacion) > 12){
                                    $isCatalogo = 1;
                                    $idPublicacion = substr($idPublicacion, 0, 11);
                                }
                            }

                            $visitas = 0;
                            if($isCatalogo!=1){
                                $visitas = $this->getMeliVisitasNoToken( $idPublicacion, date("Y-m-d") );
                            }


                            $metrica = array(
                                "vendidos"  => $vendidos,
                                "precio"  => $precio,
                                "full"  => $full,
                                "msi"  => $msi,
                                "disponible"  => $disponible,
                                "isCatalogo"  => $isCatalogo,
                                "visitas"  => $visitas                
                            );
                            
                            $hoy = Carbon::today();
                            $meliDetaMetricaVisor = MeliDetaMetricaVisor::where('id_meli_metrica_visor', '=', $idMeliMetricaVisor)
                            ->whereDate('fecha_consulta', '=', $hoy)
                            ->first();

                            $bandExiste = true;
                            if($meliDetaMetricaVisor == null){
                                $meliDetaMetricaVisor = new MeliDetaMetricaVisor();
                                $bandExiste = false;
                            }

                            $meliDetaMetricaVisor->id_meli_metrica_visor = $idMeliMetricaVisor;
                            $meliDetaMetricaVisor->fecha_consulta = date("Y-m-d");
                            $meliDetaMetricaVisor->precio = $precio;
                            $meliDetaMetricaVisor->ventas = $vendidos;
                            $meliDetaMetricaVisor->visitas = $visitas;
                            $meliDetaMetricaVisor->full = $full;
                            $meliDetaMetricaVisor->msi = $msi;
                            $meliDetaMetricaVisor->disponibles = $disponible;
                            $meliDetaMetricaVisor->isCatalogo = $isCatalogo;
                            $meliDetaMetricaVisor->estatus_publicacion = 'ACTIVA';
                                
                            if( $bandExiste ==false ){
                                $meliDetaMetricaVisor->save();
                            }else{                                       
                                $meliDetaMetricaVisor->update();
                            }

                            MeliMetricaVisor::where('id_meli_metrica_visor', '=', $idMeliMetricaVisor)
                            ->update(['estatus_publicacion'=>'ACTIVA','ult_precio'=>$precio,'ult_visitas'=>$visitas]);

                        }else{
                            $meliDetaMetricaVisorUltimo = MeliDetaMetricaVisor::where('id_meli_metrica_visor', '=', $idMeliMetricaVisor)
                            ->latest()                
                            ->take(1)
                            ->first();

                            $metrica = array(
                                "vendidos"  => $meliDetaMetricaVisorUltimo->ventas,
                                "precio"  => $meliDetaMetricaVisorUltimo->precio,
                                "full"  => $meliDetaMetricaVisorUltimo->full,
                                "msi"  => $meliDetaMetricaVisorUltimo->msi,
                                "disponible"  => $meliDetaMetricaVisorUltimo->disponibles,
                                "isCatalogo"  => $meliDetaMetricaVisorUltimo->isCatalogo,
                                "visitas"  => $meliDetaMetricaVisorUltimo->visitas,
                                'estatusPublicacion' => 'PAUSADA'
                            );

                            
                            $hoy = Carbon::today();
                            $meliDetaMetricaVisorHoy = MeliDetaMetricaVisor::where('id_meli_metrica_visor', '=', $idMeliMetricaVisor)
                            ->whereDate('fecha_consulta', '=', $hoy)
                            ->first();
                        
                            
                            if($meliDetaMetricaVisorHoy == null){
                                $meliDetaMetricaVisor = new MeliDetaMetricaVisor();     
                                
                                $meliDetaMetricaVisor->id_meli_metrica_visor = $idMeliMetricaVisor;
                                $meliDetaMetricaVisor->fecha_consulta = date("Y-m-d");
                                $meliDetaMetricaVisor->precio = $meliDetaMetricaVisorUltimo->precio;
                                $meliDetaMetricaVisor->ventas = $meliDetaMetricaVisorUltimo->ventas;
                                $meliDetaMetricaVisor->visitas = $meliDetaMetricaVisorUltimo->visitas;
                                $meliDetaMetricaVisor->full = $meliDetaMetricaVisorUltimo->full;
                                $meliDetaMetricaVisor->msi = $meliDetaMetricaVisorUltimo->msi;
                                $meliDetaMetricaVisor->disponibles = $meliDetaMetricaVisorUltimo->disponibles;
                                $meliDetaMetricaVisor->isCatalogo = $meliDetaMetricaVisorUltimo->isCatalogo;
                                $meliDetaMetricaVisor->estatus_publicacion = 'PAUSADA';

                                $meliDetaMetricaVisor->save();                        
                            }               

                            MeliMetricaVisor::where('id_meli_metrica_visor', '=', $idMeliMetricaVisor)
                            ->update(['estatus_publicacion'=>'PAUSADA']);
                        }

                        //~Genera el gafico rapido
                        $sql= " select fecha_consulta, ventas, visitas from (
                            select fecha_consulta, ventas, visitas from meli_deta_metrica_visor
                            where id_meli_metrica_visor = ".$idMeliMetricaVisor."
                            order by fecha_consulta desc
                            limit 30) x
                            order by fecha_consulta asc";


                        $rs = DB::select( $sql );

                        //~Crea array de ventas y visitas
                        $ventasValues = array();
                        $visitasValues = array();
                        $ind = 0;
                        $ventasDiaAntes = 0;
                        $ultimaVenta = 0;
                        $acumVentas = 0;
                        $ultimaVisita = 0;
                        

                        foreach($rs as $venta){  
                            if($ind >=1){
                                array_push($ventasValues, $acumVentas + (($venta->ventas)-$ventasDiaAntes));
                                $ultimaVenta= ($venta->ventas)-$ventasDiaAntes;
                                $acumVentas+=$ultimaVenta;
                            }else{
                                array_push($ventasValues, 1);
                                $acumVentas+=1;
                            }                                
                            

                            $ventasDiaAntes= $venta->ventas;
                            $ind++;

                            array_push($visitasValues, $venta->visitas + 1);
                            $ultimaVisita= $venta->visitas;
                        }            
                        //Reemplaza el primer valor
                        if(count($ventasValues)>=2){
                            $ventasValues[0] = $ventasValues[1];
                        }

                        $procesadorImagenes = new ProcesadorImagenes();                        

                        $graphVentas = $procesadorImagenes->creaGraficaPlanaMetricas($ventasValues, "g_ventas_".$idMeliMetricaVisor, "VENTA");
                        $graphVisitas = $procesadorImagenes->creaGraficaPlanaMetricas($visitasValues, "g_visita_".$idMeliMetricaVisor, "VISITA");


                        MeliMetricaVisor::where('id_meli_metrica_visor', '=', $idMeliMetricaVisor)
                        ->update(['url_graph_visitas'=>$graphVisitas,'url_graph_ventas'=>$graphVentas,'ult_ventas'=>$ultimaVenta-1]);

                        //~------ Metricas proyecto
                        $meliMetricaVisorProyecto = MeliMetricaVisorProyecto::where('id_meli_metrica_visor', '=', $idMeliMetricaVisor)->get();

                        if($meliMetricaVisorProyecto!=null){
                            foreach($meliMetricaVisorProyecto as $proyectos){
                                $idMeliMetricaProyecto = $proyectos->id_meli_metrica_proyecto;
                                $hoy = Carbon::today();

                                $meliDetaMetricaProyecto = MeliDetaMetricaProyecto::where('id_meli_metrica_proyecto','=',$idMeliMetricaProyecto)                                
                                ->whereDate('fecha_metrica', '=', $hoy)
                                ->first();


                                if($meliDetaMetricaProyecto==null){
                                    $meliDetaMetricaProyecto = new MeliDetaMetricaProyecto();
                                    $meliDetaMetricaProyecto->id_meli_metrica_proyecto = $idMeliMetricaProyecto;
                                    $meliDetaMetricaProyecto->fecha_metrica = $hoy;
                                    $meliDetaMetricaProyecto->promedio_ventas = $ultimaVenta;
                                    $meliDetaMetricaProyecto->promedio_visitas = $ultimaVisita;

                                    $meliDetaMetricaProyecto->save();
                                }else{
                                    $sumVentas = $meliDetaMetricaProyecto->promedio_ventas;
                                    $sumVisitas = $meliDetaMetricaProyecto->promedio_visitas;

                                    $meliDetaMetricaProyecto->promedio_ventas = $sumVentas + $ultimaVenta;
                                    $meliDetaMetricaProyecto->promedio_visitas = $sumVisitas + $ultimaVisita;

                                    $meliDetaMetricaProyecto->update();
                                }
                            }
                        }


                        //~------ Metricas proyecto
                                                
                    }catch (\Exception $e) {
                        Log::error( $e->getMessage() );            
                        Log::error( $e->getTraceAsString() );            
                        $mensajeErrSalida.= $idMeliMetricaVisor . '=>' . substr($e->getMessage(),0 , 100);      
                    } 
                    //~-------------------Procesamiento individual  
            
            
                }
            }

            if($ultimoBloque=='1'){
                //~Calcula metricas por proyecto
                $proyectos = MeliMetricaProyecto::all();
                foreach($proyectos as $proyecto){
                    $sql= " select fecha_metrica, ventas, visitas from (
                                select fecha_metrica, promedio_ventas ventas, promedio_visitas visitas from meli_deta_metrica_proyecto
                                where id_meli_metrica_proyecto = ".$proyecto->id_meli_metrica_proyecto."
                                order by fecha_metrica desc
                                limit 30) x
                            order by fecha_metrica asc";


                    $rs = DB::select( $sql );

                    $ventasValues = array();
                    $visitasValues = array();
                    $puntero = "UP";
                    $tendenciaUp=0;
                    $tendenciaDown=0;
                    $ventasDiaAntes = 0;
                    foreach($rs as $metricas){
                        array_push($ventasValues, $metricas->ventas+1);
                        array_push($visitasValues, $metricas->visitas+1);
                        
                        if($metricas->ventas > $ventasDiaAntes){                            
                            $tendenciaUp++;
                            $tendenciaDown=0;

                            if($tendenciaUp>=3){
                                $puntero = "UP";                             
                            }
                        }else{
                            $tendenciaDown++;
                            $tendenciaUp=0;

                            if($tendenciaDown>=3){
                                $puntero = "DOW";                                
                            }
                        }

                        $ventasDiaAntes= $metricas->ventas;
                    }
                    $graphVentas = $procesadorImagenes->creaGraficaPlanaMetricas($ventasValues, "g_p_ventas_".$proyecto->id_meli_metrica_proyecto, "VENTA");
                    $graphVisitas = $procesadorImagenes->creaGraficaPlanaMetricas($visitasValues, "g_p_visita_".$proyecto->id_meli_metrica_proyecto, "VISITA");

                    $proyecto->graph_ventas = $graphVentas; 
                    $proyecto->graph_visitas = $graphVisitas; 
                    $proyecto->tendencia = $puntero; 
                    $proyecto->update();
                }
            }

            if($mensajeErrSalida!=""){
                throw new Exception($mensajeErrSalida);
            }

            return [ 'xstatus'=>true ];
        
        }catch (\Exception $e) {
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }     

    }



    /**
     * Obtiene las metricas por publicacion
     * 
     * 
     * 
     */
    public function getPublicacionMetricaVisor(Request $request){        
        try{
            $estatus = $request->estatus;
            $filtro = $request->filtro;
            $idMeliMetricaProyecto= $request->idMeliMetricaProyecto;

            $tipoRespuesta = null;
            if(isset($request->tipo)){
                $tipoRespuesta = $request->tipo;
            }



            $meliMetricaVisor = MeliMetricaVisor::join('meli_metrica_visor_proyecto','meli_metrica_visor.id_meli_metrica_visor','=','meli_metrica_visor_proyecto.id_meli_metrica_visor')
            ->where('meli_metrica_visor_proyecto.id_meli_metrica_proyecto','=',$idMeliMetricaProyecto)
            ->where('meli_metrica_visor.estatus','=',$estatus);

            if($filtro!=null){
                $meliMetricaVisor = $meliMetricaVisor->where('meli_metrica_visor.titulo','like', '%' . $filtro . '%')
                ->orWhere('meli_metrica_visor.id_publicacion_tienda','like','%' . $filtro . '%')
                ->orWhere('meli_metrica_visor.vendedor','like','%' . $filtro . '%');
            }

            $meliMetricaVisor = $meliMetricaVisor->orderBy('meli_metrica_visor.ult_ventas', 'desc');

            if($tipoRespuesta==null){
                $meliMetricaVisor = $meliMetricaVisor->paginate(30);
            

                return [
                    'xstatus'=>true,
                    'pagination' => [
                        'total'         => $meliMetricaVisor->total(),
                        'current_page'         => $meliMetricaVisor->currentPage(),
                        'per_page'         => $meliMetricaVisor->perPage(),
                        'last_page'         => $meliMetricaVisor->lastPage(),
                        'from'         => $meliMetricaVisor->firstItem(),
                        'to'         => $meliMetricaVisor->lastItem()
                    ],
                    'metricas'=> $meliMetricaVisor
                ];   
            }else{
                $meliMetricaVisor = MeliMetricaVisor::where('estatus','=','ACT')->get();
                
                return [
                    'xstatus'=>true,                    
                    'metricas'=> $meliMetricaVisor
                ];
            }         
        }catch (\Exception $e) {
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }        
        
    }


    /**
     * 
     * 
     * 
     * 
     */
    public function cambiaEstatusMetricaVisor(Request $request){        
        try{
            $estatus = $request->estatus;
            $idMeliMetricaVisor = $request->idMeliMetricaVisor;
            $meliMetricaVisor = MeliMetricaVisor::findOrFail($idMeliMetricaVisor);

            $meliMetricaVisor->update(['estatus'=> $estatus]);

            return [ 'xstatus'=>true ];
        }catch (\Exception $e) {
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }        
        
    }


    public function getDetalleMetricaVisor(Request $request){        
        try{
            $idMeliMetricaVisor = $request->idMeliMetricaVisor;
            $fechaInicial = $request->fechaInicial;
            $fechaFinal = $request->fechaFinal;
            
            $diff = date_diff(date_create($fechaInicial), date_create($fechaFinal));
            if($diff->format('%a') > 90){
                throw new Exception('No es posible consultar mas de 90 dias');
            }


            $meliDetaMetricaVisor = MeliDetaMetricaVisor::where('id_meli_metrica_visor','=',$idMeliMetricaVisor)
            ->whereDate('fecha_consulta', '>=', $fechaInicial)
            ->whereDate('fecha_consulta', '<=', $fechaFinal)            
            ->orderBy('fecha_consulta', 'asc')
            ->get();
            ;

            return [
                'xstatus'=>true,              
                'metricas'=> $meliDetaMetricaVisor
            ];            
        }catch (\Exception $e) {
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }        
        
    }



    /**
     * 
     * 
     * 
     */
    public function busquedaMeli(Request $request){
        $response = array();
        $totalPublicaciones = 0;


        $q = urlencode($request->q);
        $page = urlencode($request->page);
        $idMeliMetricaProyecto = $request->idMeliMetricaProyecto;
        $tipoBusqueda = $request->tipoBusqueda;
        

        
        $limit = 50;
        $offset = ($page-1) * $limit;

        //$offset = $offset + $limit;    

        $cuenta = CuentaTienda::where('usuario','=','SHOP-CONECTA2')->first();
        $token = $cuenta->att_access_token;

        $appId = Config::get('zicandi.meli.appId');
        $secretKey = Config::get('zicandi.meli.secretKey');
        $redirectURI = Config::get('zicandi.meli.redirectURI');
        $siteId = Config::get('zicandi.meli.siteId');

        if($token!=null){
            $meli = new Meli($appId, $secretKey);
            
            if($tipoBusqueda == "NORMAL"){
                $params = array('access_token' => $token,'q' => $q,'offset' => $offset,'limit' => $limit);
            }elseif($tipoBusqueda == "VENDEDOR"){
                $params = array('access_token' => $token,'nickname' => $q,'offset' => $offset,'limit' => $limit);
            }elseif($tipoBusqueda == "ID"){
                $params = array('access_token' => $token,'ids' => $q,'offset' => $offset,'limit' => $limit);
            }

            if($tipoBusqueda == "NORMAL" || $tipoBusqueda == "VENDEDOR"){
                $result = $meli->get('/sites/'.$siteId.'/search', $params);    
            }else{
                $result = $meli->get('/items', $params);
                
                if($result['httpCode']=="200"){
                    $salida = $total = new \stdClass();                    
                    $total->total =  count($result['body']);
                    $salida->paging = $total;
                    $listaPub = array();
                    for($ix=0; $ix<count($result['body']); $ix++){
                        array_push($listaPub, $result['body'][$ix]->body);
                    }
                    $salida->results = $listaPub;
                    $result['body'] = $salida;
                }
            }
            
            //~Refresh Token
            if($result['httpCode']=="401"){                
                $request->usuario = $cuenta->usuario;
                app(TiendasController::class)->refreshTokenMeli($request);

                $cuenta = CuentaTienda::where('usuario','=','SHOP-CONECTA2')->first();
                $token = $cuenta->att_access_token;

                $params = array('access_token' => $token,
                'q' => $q,
                'offset' => $offset,
                'limit' => $limit);

                $result = $meli->get('/sites/'.$siteId.'/search', $params);  
            }

            if($result['httpCode']=="200"){            
                $totalPublicaciones = $result['body']->paging->total;


                //Crea arreglo de salida                
                for($i=0; $i < count($result['body']->results); $i++){
                    $publicacion = $result['body']->results[$i];  
                    
                    //~Buscar si ya existe la publicacion registrada en MeliMetricaVisor
                    $metricaVisor = MeliMetricaVisor::where('id_publicacion_tienda','=', $publicacion->id)
                    ->where('estatus','=','ACT')
                    ->first();

                    $idMeliMetricaVisor = 0;
                    $meliMetricaVisorProyecto = null;
                    if($metricaVisor!=null){
                        $idMeliMetricaVisor = $metricaVisor->id_meli_metrica_visor;


                        //~Determina si pertenece al proyecto                
                        $meliMetricaVisorProyecto = MeliMetricaVisorProyecto::where('id_meli_metrica_proyecto','=', $idMeliMetricaProyecto)
                        ->where('id_meli_metrica_visor','=', $metricaVisor->id_meli_metrica_visor)
                        ->first();
                    }

                    

                    //~Determina si el producto pertenece a una tienda local (nunduva / conecta2)
                    $publicacionLocal = Publicacion::with('getCuentaTienda')
                    ->where('id_publicacion_tienda','=', $publicacion->id)
                    ->first();


                    array_push($response, array('foto'=>$publicacion->thumbnail,
                                                'url'=>$publicacion->permalink,
                                                'titulo'=>$publicacion->title,
                                                'idPublicacionTienda'=>$publicacion->id,
                                                'precio'=>$publicacion->price,
                                                'envioGratis'=>$publicacion->shipping->free_shipping,
                                                'tipoLogistica'=>$publicacion->shipping->logistic_type,
                                                'idMeliMetricaVisor'=> $idMeliMetricaVisor,
                                                'check'=> $idMeliMetricaVisor > 0 ? true: false,
                                                'publicacionLocal' => $publicacionLocal == null ? '': 'LOCAL',
                                                'perteneceProyecto' => $meliMetricaVisorProyecto == null ? 'N' : 'S'
                    ));
                }
            }

        }else{
            $response = array('httpCode'=>'NO_SESSION');
        }
                
        return array('publicaciones'=>$response, 'totalResultados'=>$totalPublicaciones);
    }



    /***
     * Registra nuevo proyecto
     * 
     * 
     */
    public function registrarNuevoProyecto(Request $request){        
        try{

            $imagen = array(    
                'nombre'=>$request->imagen_nombre,
                'size'=>$request->imagen_size,
                'type'=>$request->imagen_type,
                'b64'=>$request->imagen_local
            );


            $nombre = $request->nombre;
            $idMeliMetricaProyecto = $request->idMeliMetricaProyecto;

            $url_imagen= null;
            try{
                $procesadorImagenes = new ProcesadorImagenes();
                $url_imagen = $procesadorImagenes->publicaImagenMiniMetrica($imagen); 
            }catch (\Exception $e) {
                Log::error( 'No fue posible cargar/publicar la imagen' );
                Log::error( $e->getTraceAsString() );
            }
            
            if($idMeliMetricaProyecto>0){
                $meliMetricaProyecto = MeliMetricaProyecto::findOrFail($idMeliMetricaProyecto);
                $meliMetricaProyecto->nombre = $nombre;

                if($url_imagen!=null){
                    $meliMetricaProyecto->foto = $url_imagen;
                }

                $meliMetricaProyecto->update();
            }else{
                $meliMetricaProyecto = new MeliMetricaProyecto();
                $meliMetricaProyecto->nombre = $nombre;
                $meliMetricaProyecto->foto = $url_imagen;
                $meliMetricaProyecto->graph_visitas = '';
                $meliMetricaProyecto->graph_ventas = '';
                $meliMetricaProyecto->tendencia = 0;
                $meliMetricaProyecto->xstatus ='1';
                $meliMetricaProyecto->save();
            }                    
            
                
            return [ 'xstatus'=>true ];
        }catch (\Exception $e) {
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }        
        
    }


    /**
     * Consulta proyectos metricas
     * 
     * 
     */
    public function getProyectoMetricaVisor(Request $request){        
        try{
            $estatus = $request->estatus;
            $filtro = $request->filtro;

            $tipoRespuesta = null;
            if(isset($request->tipo)){
                $tipoRespuesta = $request->tipo;
            }



            $meliMetricaProyecto = MeliMetricaProyecto::where('xstatus','=',$estatus);

            if($filtro!=null){
                $meliMetricaProyecto = $meliMetricaProyecto->where('nombre','like', '%' . $filtro . '%');
            }

            $meliMetricaProyecto = $meliMetricaProyecto->orderBy('id_meli_metrica_proyecto', 'desc');

            if($tipoRespuesta==null){
                $meliMetricaProyecto = $meliMetricaProyecto->paginate(30);
            

                return [
                    'xstatus'=>true,
                    'pagination' => [
                        'total'         => $meliMetricaProyecto->total(),
                        'current_page'         => $meliMetricaProyecto->currentPage(),
                        'per_page'         => $meliMetricaProyecto->perPage(),
                        'last_page'         => $meliMetricaProyecto->lastPage(),
                        'from'         => $meliMetricaProyecto->firstItem(),
                        'to'         => $meliMetricaProyecto->lastItem()
                    ],
                    'proyectos'=> $meliMetricaProyecto
                ];   
            }else{
                $meliMetricaProyecto = $meliMetricaProyecto->get();
                return [
                    'xstatus'=>true,                    
                    'proyectos'=> $meliMetricaProyecto
                ];
            }         
        }catch (\Exception $e) {
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }        
        
    }


    /**
     * Cambia el estatus del proyecto metrica
     * 
     * 
     * 
     */
    public function cambiaEstatusProyectoMetrica(Request $request){        
        try{
            $xstatus = $request->xstatus;
            $idMeliMetricaProyecto = $request->idMeliMetricaProyecto;
            $meliMetricaProyecto = MeliMetricaProyecto::findOrFail($idMeliMetricaProyecto);

            $meliMetricaProyecto->update(['xstatus'=> $xstatus]);

            return [ 'xstatus'=>true ];
        }catch (\Exception $e) {
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }        
        
    }

    /**
     * Lista todas los proyectos
     */
    public function selectProyecto(Request $request){
        if(!$request->ajax())return redirect('/');

        $proyectos = MeliMetricaProyecto::where('xstatus','=','1')
        ->select('id_meli_metrica_proyecto','nombre')
        ->orderBy('nombre', 'asc')
        ->get();

        return ['proyectos' => $proyectos];
    }

    /**
     * Liga el proyecto con la publicacion uno a uno
     * 
     * 
     */
    public function ligarPublicacionConProyecto(Request $request){
        try{
            $accion = $request->accion;

            //~Determina si pertenece al proyecto                
            $meliMetricaVisorProyecto = MeliMetricaVisorProyecto::where('id_meli_metrica_proyecto','=', $request->idMeliMetricaProyecto)
            ->where('id_meli_metrica_visor','=', $request->idMeliMetricaVisor)
            ->first();

            if($meliMetricaVisorProyecto == null && $accion == "+"){
                $meliMetricaVisorProyecto = new MeliMetricaVisorProyecto();
                $meliMetricaVisorProyecto->id_meli_metrica_proyecto = $request->idMeliMetricaProyecto;
                $meliMetricaVisorProyecto->id_meli_metrica_visor = $request->idMeliMetricaVisor;
                $meliMetricaVisorProyecto->save();
            }else if($meliMetricaVisorProyecto != null && $accion == "-"){
                $meliMetricaVisorProyecto->delete();
            }
            

            return ['xstatus' => true];
        }catch (\Exception $e) {
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }      

    }

}