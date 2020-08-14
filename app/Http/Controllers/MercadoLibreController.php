<?php

namespace App\Http\Controllers;
use View;
use Session;
use Illuminate\Http\Request;
use App\Http\Lib\Meli;
use App\Http\Lib\Constantes;

class MercadoLibreController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function login(Request $request){        
        $c = new Constantes();
        $appId = $c->meli_appId;       
        $secretKey = $c->meli_secretKey;
        $redirectURI = $c->meli_redirectURI;
        $siteId = $c->meli_siteId;

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

                    return View::make("loginmeli");
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


    public function getAsynCODE(Request $request){
        $code = $request->code;

        /* Your Application Id */
        $appId = '3145687774408719';

        /* Your Secret Key */
        $secretKey = 'sQcT6u43C7J6UQtjVCJmYjEYG3ve77d3';

        /* The Redirect url */
        $redirectURI = 'http://localhost/zicandi/public/meli/code';

        $siteId = 'MLM';

        $meli = new Meli($appId, $secretKey);
        $user = $meli->authorize($code, $redirectURI);
			
        Session::put('access_token', $user['body']->access_token);
        Session::put('expires_in', time() + $user['body']->expires_in);
        Session::put('refresh_token', $user['body']->refresh_token);


        return View::make("loginmeli");
    }

    public function me(Request $request){
        $c = new Constantes();
        $appId = $c->meli_appId;       
        $secretKey = $c->meli_secretKey;
        $redirectURI = $c->meli_redirectURI;
        $siteId = $c->meli_siteId;

        if(Session::get('access_token')!=null){
            $meli = new Meli($appId, $secretKey);

            $params = array('access_token' => Session::get('access_token'));
            $result = $meli->get('/users/me', $params);
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


}
