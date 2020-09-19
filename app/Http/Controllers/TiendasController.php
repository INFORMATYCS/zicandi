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
        

        
    }


    public function getPublicaciones(Request $request){        
        $publicaciones = app(MercadoLibreController::class)->Ipublicaciones($request->id);

        $cuenta = new CuentaTienda();
        $cuentaLogin = $cuenta->getCuentaLogeadaMELI();

        if($cuentaLogin!=null){
            $idCuentaTienda = $cuentaLogin->id_cuenta_tienda;
            $idTienda = $cuentaLogin->id_tienda;
            
            foreach ($publicaciones as $pub) {
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
            



        }
        
        return $publicaciones;
        
    }

    public function selectCuentaTienda(Request $request){
        if(!$request->ajax())return redirect('/');

        $tiendas = CuentaTienda::select('id_cuenta_tienda','usuario')
        ->orderBy('usuario', 'asc')
        ->get();

        return ['tiendas' => $tiendas];
    }
    

}
