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

        $c = new Constantes();
        $appId = $c->meli_appId;       
        $secretKey = $c->meli_secretKey;
        $redirectURI = $c->meli_redirectURI;
        $siteId = $c->meli_siteId;
        

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

    public function publicaciones($id, $offset, $limit){
        $c = new Constantes();
        $appId = $c->meli_appId;       
        $secretKey = $c->meli_secretKey;
        $redirectURI = $c->meli_redirectURI;
        $siteId = $c->meli_siteId;

        $publicaciones = array();
        $result = array('httpCode'=>'NO_SESSION');

        if(Session::get('access_token')!=null){
            $meli = new Meli($appId, $secretKey);
            $offset = 0;
            $limit = 100;

            do{
                $params = array('access_token' => Session::get('access_token'),
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

    public function Ipublicaciones($idUsuario){
        $offset = 0;
        $limit = 100;
        $listaPublicacionesDeta = array();

        $publicaciones = app(MercadoLibreController::class)->publicaciones($idUsuario, $offset, $limit);
        if($publicaciones['httpCode']=="200"){            
            $lista = $publicaciones['lista'];            

            $fragmentos = array_chunk($lista, 20);
            
            for($i=0; $i<count($fragmentos); $i++){
            //for($i=0; $i<1; $i++){
                $procesa = $fragmentos[$i];

                //$procesa = array('MLM663467907','MLM649661298','MLM723780404','MLM598745299','MLM657472310');
                
                
                $cadenaProcesa = implode (",", $procesa);

                //********* Consulta detalle de la publicacion **********
                $p = app(MercadoLibreController::class)->items($cadenaProcesa);
                if($p['httpCode']=="200"){
                    $listaPublicaciones = $p['body'];

                    for($b=0; $b<count($listaPublicaciones); $b++){
                        $publicacion = $listaPublicaciones[$b]->body;
                        $id             = $publicacion->id;
                        $titulo         = $publicacion->title;
                        $precio         = $publicacion->price;
                        $stock          = $publicacion->available_quantity;
                        $ventas         = $publicacion->sold_quantity;
                        $estatus        = $publicacion->status;
                        $link           = $publicacion->permalink;
                        $fotoMini       = $publicacion->thumbnail;
                        
                        $shipping       = $publicacion->shipping;
                        $envioGratis    = $shipping->free_shipping;
                        $tipoEnvio      = $shipping->logistic_type;

                        $variations     = $publicacion->variations;
                        if(count($variations)>0){
                            for($v=0; $v<count($variations); $v++){
                                $variante = $variations[$v];
                                $idVariante     = $variante->id;
                                $stockVariante  = $variante->available_quantity;
                                $ventasVariante = $variante->sold_quantity;
                                $atributos      = $variante->attribute_combinations;
                                $nombreVariante = $atributos[0]->name.':'.$atributos[0]->value_name;

                                $publicacionSalida = array(
                                    'id'=>$id,
                                    'titulo'=>$titulo,
                                    'precio'=>$precio,
                                    'stock'=>$stockVariante,
                                    'ventas'=>$ventasVariante,
                                    'estatus'=>$estatus,
                                    'link'=>$link,
                                    'fotoMini'=>$fotoMini,
                                    'envioGratis'=>$envioGratis,
                                    'tipoEnvio'=>$tipoEnvio,
                                    'idVariante'=>$idVariante,
                                    'nombreVariante'=>$nombreVariante
                                );

                                array_push($listaPublicacionesDeta, $publicacionSalida);
                            }
                        }else{
                            $publicacionSalida = array(
                                'id'=>$id,
                                'titulo'=>$titulo,
                                'precio'=>$precio,
                                'stock'=>$stock,
                                'ventas'=>$ventas,
                                'estatus'=>$estatus,
                                'link'=>$link,
                                'fotoMini'=>$fotoMini,
                                'envioGratis'=>$envioGratis,
                                'tipoEnvio'=>$tipoEnvio
                            );

                            array_push($listaPublicacionesDeta, $publicacionSalida);
                        }

                    }
                }

                //********* Consulta VISITAS de la publicacion **********
                $v = app(MercadoLibreController::class)->visitas($cadenaProcesa);
                if($v['httpCode']=="200"){                
                    
    
                    foreach ($v['body'] as $id => $visitas) {
                        for($g=0; $g<count($listaPublicacionesDeta); $g++){
                            if($listaPublicacionesDeta[$g]['id'] == $id){
                                $listaPublicacionesDeta[$g]['visitas'] = $visitas;
                            }
                        }

                    }


                }

                
            }

        }   
        
        return $listaPublicacionesDeta;
    }


    public function items($its){
        $c = new Constantes();
        $appId = $c->meli_appId;       
        $secretKey = $c->meli_secretKey;
        $redirectURI = $c->meli_redirectURI;
        $siteId = $c->meli_siteId;

        if(Session::get('access_token')!=null){
            $meli = new Meli($appId, $secretKey);

            $params = array('access_token' => Session::get('access_token'),
                            'ids' => $its);
            $result = $meli->get('/items', $params);
        }else{
            $result = array('httpCode'=>'NO_SESSION');
        }
        
        return $result;
    }

    public function visitas($its){
        $c = new Constantes();
        $appId = $c->meli_appId;       
        $secretKey = $c->meli_secretKey;
        $redirectURI = $c->meli_redirectURI;
        $siteId = $c->meli_siteId;

        if(Session::get('access_token')!=null){
            $meli = new Meli($appId, $secretKey);

            $params = array('access_token' => Session::get('access_token'),
                            'ids' => $its);
            $result = $meli->get('/visits/items', $params);
        }else{
            $result = array('httpCode'=>'NO_SESSION');
        }
        
        return $result;
    }


}
