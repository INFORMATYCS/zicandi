<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CuentaTienda;
use App\Tienda;
use App\Publicacion;
use Session;
use App\EstadisticaPublicacion;


class TiendasController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
        if(!$request->ajax())return redirect('/');

        $cuentas = CuentaTienda::with('tienda')
        ->join('tienda','cuenta_tienda.id_tienda','=','tienda.id_tienda')        
        ->orderBy('estatus','asc')->get();

        return ['resultado'=> $cuentas];
    }

    public function selectTienda(Request $request){
        if(!$request->ajax())return redirect('/');

        $tiendas = Tienda::select('id_tienda','nombre')
        ->orderBy('nombre', 'asc')
        ->get();

        return ['tiendas' => $tiendas];
    }

    public function storeCuentaTienda(Request $request){
        if($request->usuario==""){
            abort(585, 'Se requiere del usuario');
        }

        if($request->id_tienda==0){
            abort(585, 'Seleccione la tienda');
        }

        $cuenta = new CuentaTienda();
        $cuenta->id_tienda = $request->id_tienda;
        $cuenta->usuario = $request->usuario;
        $cuenta->estatus = 'NO_CONECTADO';
        $cuenta->save();

        return $cuenta->id_tienda_cuenta;
    }


    public function eliminarCuentaTienda(Request $request){
        $id= $request->id_cuenta_tienda;
        $cuenta = CuentaTienda::findOrFail($id);//~Se busca en base al ID entrante
        
        $cuenta->delete();

        return 'OK';
    }

    /*
    public function registraCuentaActiva(Request $request){
        $salida = 0;

        $sesion = app(MercadoLibreController::class)->me($request);             

        //~Tienda mercadolibre
        $ml = Tienda::where('codigo','=','MLM')->get();

        //~Desconecta todas las cuentas
        CuentaTienda::where('id_tienda','=',$ml[0]->id_tienda)
        ->update(['estatus' => 'NO_CONECTADO']);

        if($sesion['httpCode']=="NO_SESSION"){
            $salida = 0;
        }else if($sesion['httpCode']=="200"){               
            //~Conecta la cuenta activa
            $nickname = $sesion['body']->nickname;
            $fechaExpira = date("Y-m-d H:i:s", Session::get('expires_in'));
            CuentaTienda::where('usuario','=',$nickname)
            ->update([  'estatus' => 'CONECTADO',
                        'att_id' => $sesion['body']->id,
                        'correo' => $sesion['body']->email,
                        'telefono' => $sesion['body']->phone->area_code.$sesion['body']->phone->number,
                        'att_access_token' => Session::get('access_token'),                        
                        'att_expira_token' => $fechaExpira ]);


            return ['cuenta' => $nickname, 'id' => $sesion['body']->id];
        }
        

        
    }*/

    public function getDetallePublicacion(Request $request){ 
    try{           
        $publicaciones20 = $request->publicaciones20;
        $idCuentaTienda = $request->idCuentaTienda;
        $cuenta = CuentaTienda::findOrFail($idCuentaTienda);
        $idTienda = $cuenta->id_tienda;
        $idUsuarioMELI = $cuenta->att_id;
        $usuarioMELI = $cuenta->usuario;
        $token = $cuenta->att_access_token;        


        //********* Consulta detalle de la publicacion **********
        $p = app(MercadoLibreController::class)->items($publicaciones20, $token);

        $offset = 0;
        $limit = 100;
        $listaPublicacionesDeta = array();
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
        $v = app(MercadoLibreController::class)->visitas($publicaciones20, $token);
        if($v['httpCode']=="200"){                
            
            foreach ($v['body'] as $id => $visitas) {
                for($g=0; $g<count($listaPublicacionesDeta); $g++){
                    if($listaPublicacionesDeta[$g]['id'] == $id){
                        $listaPublicacionesDeta[$g]['visitas'] = $visitas;
                    }
                }

            }


        }


        //~Persiste en BD
        foreach ($listaPublicacionesDeta as $pub) {
            $idPublicacion = $pub['id'];

            if(isset($pub['idVariante'])){
                $publicacion = Publicacion::where('id_publicacion_tienda','=',$pub['id'])
                ->where('id_variante_publicacion','=',$pub['idVariante'])
                ->get()->first();
            }else{
                $publicacion = Publicacion::where('id_publicacion_tienda','=',$pub['id'])                    
                ->get()->first();
            }

            //~Inserta
            if($publicacion==null){
                $publicacion = new Publicacion();

                $publicacion->id_tienda = $idTienda;
                $publicacion->id_cuenta_tienda = $idCuentaTienda;
                $publicacion->id_publicacion_tienda = $pub['id'];
                $publicacion->id_variante_publicacion = (isset($pub['idVariante']) ? $pub['idVariante'] : null);
                $publicacion->titulo = (isset($pub['titulo']) ? $pub['titulo'] : null);
                $publicacion->nombre_variante = (isset($pub['nombreVariante']) ? $pub['nombreVariante'] : null);
                $publicacion->precio = (isset($pub['precio']) ? $pub['precio'] : null);
                $publicacion->stock = (isset($pub['stock']) ? $pub['stock'] : null);
                $publicacion->ventas = (isset($pub['ventas']) ? $pub['ventas'] : null);
                $publicacion->visitas = (isset($pub['visitas']) ? $pub['visitas'] : null);                    
                $publicacion->envio_gratis = (isset($pub['envioGratis']) ? $pub['envioGratis'] : null);
                $publicacion->full = ($pub['tipoEnvio'] == 'fulfillment' ? true : false);
                $publicacion->link = (isset($pub['link']) ? $pub['link'] : null);
                $publicacion->foto_mini = (isset($pub['fotoMini']) ? $pub['fotoMini'] : null);
                $publicacion->fecha_consulta = new \DateTime();
                $publicacion->estatus = (isset($pub['estatus']) ? $pub['estatus'] : null);

                $publicacion->save();                    
            }else{                    
                $publicacion->titulo = (isset($pub['titulo']) ? $pub['titulo'] : null);
                $publicacion->nombre_variante = (isset($pub['nombreVariante']) ? $pub['nombreVariante'] : null);
                $publicacion->precio = (isset($pub['precio']) ? $pub['precio'] : null);
                $publicacion->stock = (isset($pub['stock']) ? $pub['stock'] : null);
                $publicacion->ventas = (isset($pub['ventas']) ? $pub['ventas'] : null);
                $publicacion->envio_gratis = (isset($pub['envioGratis']) ? $pub['envioGratis'] : null);
                $publicacion->full = ($pub['tipoEnvio'] == 'fulfillment' ? true : false);
                $publicacion->link = (isset($pub['link']) ? $pub['link'] : null);
                $publicacion->foto_mini = (isset($pub['fotoMini']) ? $pub['fotoMini'] : null);
                $publicacion->fecha_consulta = new \DateTime();
                $publicacion->estatus = (isset($pub['estatus']) ? $pub['estatus'] : null);

                $publicacion->update();
            }

            //~Agrega estadisticas
            $estadisticaPublicacion = new EstadisticaPublicacion();
            $estadisticaPublicacion->id_publicacion = $publicacion->id_publicacion;
            $estadisticaPublicacion->stock = (isset($pub['stock']) ? $pub['stock'] : null);
            $estadisticaPublicacion->ventas = (isset($pub['ventas']) ? $pub['ventas'] : null);
            $estadisticaPublicacion->visitas = (isset($pub['visitas']) ? $pub['visitas'] : null); 
            $estadisticaPublicacion->fecha_consulta = new \DateTime();

            $estadisticaPublicacion->save();
            


        }

        return ['resultado'=>'OK'];    
    }catch (\Exception $e) {
        $ERROR = $e->getMessage();
        return ['resultado'=>'ERR', 'msg'=>$e->getMessage()];
    }
    
    }


    public function getPublicaciones(Request $request){     
        
        $idCuentaTienda = $request->idCuentaTienda;
        $cuenta = CuentaTienda::findOrFail($idCuentaTienda);
        $idUsuarioMELI = $cuenta->att_id;
        $usuarioMELI = $cuenta->usuario;
        $token = $cuenta->att_access_token;

        $publicaciones = app(MercadoLibreController::class)->publicaciones($idUsuarioMELI, $token);

        return $publicaciones;
        
    }

    public function selectCuentaTienda(Request $request){
        if(!$request->ajax())return redirect('/');

        $tiendas = CuentaTienda::select('id_cuenta_tienda','usuario')
        ->orderBy('usuario', 'asc')
        ->get();

        return ['tiendas' => $tiendas];
    }


    public function refreshTokenMeli(Request $request){  
        //~Busca la cuenta
        $cuenta = CuentaTienda::where('usuario','=',$request->usuario)->get();
        $refreshToken = $cuenta[0]->att_refresh_token;
                
        $sesion = app(MercadoLibreController::class)->refreshToken($refreshToken);                     

        if($sesion['httpCode']=="NO_SESSION"){
            $salida = 0;
        }else if($sesion['httpCode']=="200"){               
            //~Conecta la cuenta activa            
            $fechaExpira = date("Y-m-d H:i:s", Session::get('expires_in'));
            CuentaTienda::where('usuario','=',$cuenta[0]->usuario)
            ->update([  'estatus' => 'CONECTADO',                        
                        'att_access_token' => Session::get('access_token'),
                        'att_expira_token' => $fechaExpira ]);


            return ['cuenta' => $cuenta[0]->usuario, 'id' => $cuenta[0]->att_id];
        }
        

        
    }


    /**
     * Recupera todas las cuentas activas de mercadolibre
     * Deben tener token y refresh token
     */
    public function getCuentasActivasMELI(Request $request){  
        $response = array();

        $tiendaMLM = Tienda::where('codigo', '=' , 'MLM')->get();
        $idTiendaMeli = $tiendaMLM[0]->id_tienda;        
        
        $response['idTienda'] = $idTiendaMeli;
        
        //~Busca la cuenta
        $cuentas = CuentaTienda::where('id_tienda','=',$idTiendaMeli)
        ->whereNotNull('att_access_token')
        ->whereNotNull('att_refresh_token')
        ->get();

        $detalleCuentas = array();
        //~Solicita el refresh del token
        foreach ($cuentas as $cuenta) {
            $idCuentaTienda = $cuenta->id_cuenta_tienda;
            $usuario = $cuenta->usuario;
            $accessToken = $cuenta->att_access_token;
            $refreshToken = $cuenta->att_refresh_token;
            $expiraToken = $cuenta->att_expira_token;                        

            $request->accessToken = $accessToken;            
            $sesion = app(MercadoLibreController::class)->me($request);        

            if($sesion['httpCode']=="NO_SESSION"){
                //~Actualiza la sesion con un nuevo token
                $sesionToken = app(MercadoLibreController::class)->refreshToken($refreshToken);
                if( $sesionToken['httpCode']!="NO_SESSION" ){
                    $fechaExpira = date("Y-m-d H:i:s", $sesionToken['body']->expires_in);
                    CuentaTienda::where('usuario','=', $usuario)
                    ->update([  'estatus' => 'CONECTADO',                        
                        'att_access_token' => $sesionToken['body']->access_token,
                        'att_refresh_token' => $sesionToken['body']->refresh_token,
                        'att_expira_token' => $fechaExpira ]);

                    array_push($detalleCuentas, array('idCuentaTienda'=>$idCuentaTienda, 'usuario'=>$usuario, 'estatus'=>'Cuenta activa, Se refresco la sesion', 'httpCode' => '200'));    
                }else{
                    array_push($detalleCuentas, array('idCuentaTienda'=>$idCuentaTienda, 'usuario'=>$usuario, 'estatus'=>'No fue posible refrescar la sesion', 'httpCode' => 'NO_SESSION'));
                }

            }else if($sesion['httpCode']=="200"){ 
                //~Conecta la cuenta activa                                
                CuentaTienda::where('usuario','=', $sesion['body']->nickname)
                ->update([  'estatus' => 'CONECTADO',
                            'att_id' => $sesion['body']->id,
                            'correo' => $sesion['body']->email,
                            'telefono' => $sesion['body']->phone->area_code.$sesion['body']->phone->number]
                        );
                array_push($detalleCuentas, array('idCuentaTienda'=>$idCuentaTienda, 'usuario'=>$usuario, 'estatus'=>'Cuenta activa, sesion vigente', 'httpCode' => '200'));                
            }



        }

        $response['cuentas'] = $detalleCuentas;


        return $response;
    }
    

}
