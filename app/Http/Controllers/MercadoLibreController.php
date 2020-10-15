<?php

namespace App\Http\Controllers;
use Config;
Use Log;
use View;
use Session;
use Illuminate\Http\Request;
use App\Http\Lib\Meli;
use App\CuentaTienda;

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


}
