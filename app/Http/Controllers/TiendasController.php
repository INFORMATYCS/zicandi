<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\CuentaTienda;
use App\Tienda;
use Session;


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


            return ['cuenta' => $nickname];
        }
        

        
    }

}
