<?php

namespace App\Http\Controllers;
Use Config;
Use Exception;
Use Log;
use DB;
use Illuminate\Http\Request;
use App\CuentaTienda;
use App\Tienda;
use App\Publicacion;
use App\ConfigPublicacion;
use App\ControlVentasMeli;
use App\VentaMeli;
use App\Producto;
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
        try{
            if(!$request->ajax())return redirect('/');

            $tiendas = Tienda::select('id_tienda','nombre')
            ->orderBy('nombre', 'asc')
            ->get();

            return ['tiendas' => $tiendas];
        }catch (\Exception $e) {
            \Log::error($e->getTraceAsString());            
            return ['exception' => $e->getMessage()];
        }   
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
        $cuenta->att_refresh_token = $request->usuario;        
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
                    CuentaTienda::where('usuario','=', $usuario)
                    ->update([  'estatus' => 'NO_CONECTADO'  ]);
                    
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

    /**
     * Recupera la ultima consulta de ventas
     * Importante, debe entrar como parametro el id_cuenta_tienda
     * API: /tienda/ultimaventameli
     * 
     */
    public function getUltimaVentaMeli(Request $request){
        try{
            $idCuentaTienda = $request->id_cuenta_tienda;

            $sql= " SELECT DATE_FORMAT(MAX(FECHA_FINAL)-1,'%Y-%m-%d') AS fecha 
                    FROM control_ventas_meli 
                    WHERE id_cuenta_tienda = $idCuentaTienda AND estatus = 'TER'";        

            $rs = DB::select( $sql );

            if(count($rs)>0){
                $fechaUltima = $rs[0]->fecha;                

                if($fechaUltima == null){
                    $fechaUltima = Config::get('zicandi.meli.fechaInicialConsultaVentas');
                }
            }else{
                $fechaUltima = Config::get('zicandi.meli.fechaInicialConsultaVentas');
            }

            $fechaActual = date('Y-m-d');
            
            return [ 'xstatus'=>true, 'fechaInicialMeli'=>$fechaUltima, 'fechaFinalMeli'=>$fechaActual];

        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Registra la consulta de venta en mercadolibre
     * 
     * API: /tienda/registraControlVenta
     * 
     */
    public function registraControlVenta(Request $request){
        try{
            $idCuentaTienda = $request->id_cuenta_tienda;

            $fechas = $this->getUltimaVentaMeli($request);
            $fechaInicial = $fechas['fechaInicialMeli'];
            $fechaFinal = $fechas['fechaFinalMeli'];

            $cuentaTienda = CuentaTienda::findOrFail($idCuentaTienda);//~Se busca en base al ID entrante

            $idUsuario = $cuentaTienda->att_id;

            //~Registra
            $controlVentasMeli = new ControlVentasMeli();
            $controlVentasMeli->id_cuenta_tienda= $idCuentaTienda;
            $controlVentasMeli->fecha_inicial= $fechaInicial;
            $controlVentasMeli->fecha_final= $fechaFinal;
            $controlVentasMeli->total_registros= 0;
            $controlVentasMeli->fecha_consulta= date('Y-m-d');
            $controlVentasMeli->estatus= 'PEN';
            $controlVentasMeli->save();

            return [    'xstatus'=>true, 
                        'fechaInicial'=>$fechaInicial.'T00:00:00.000-00:00', 
                        'fechaFinal'=>$fechaFinal.'T00:00:00.000-00:00',
                        'idControlVenta'=>$controlVentasMeli->id_control_ventas_meli];

        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Consulta todas las ventas en mercadolibre
     * 
     * API: /tienda/ventas
     * 
     */
    public function consultaVentasMeli(Request $request){
        try{
            $cntErrores = 0;
            $idControlVentas = $request->idControlVenta;
            $fechaInicial = $request->fechaInicial;
            $fechaFinal = $request->fechaFinal;
  
            //~Consulta bitacora control
            $controlVentasMeli = ControlVentasMeli::findOrFail($idControlVentas);//~Se busca en base al ID entrante
            $idCuentaTienda = $controlVentasMeli->id_cuenta_tienda;

            $controlVentasMeli->estatus = 'PRO';            
            $controlVentasMeli->update();
        
            //~Detalle de la tienda
            $cuentaTienda = CuentaTienda::findOrFail($idCuentaTienda);//~Se busca en base al ID entrante
            $ventas = app(MercadoLibreController::class)->ventas($cuentaTienda->att_id, $cuentaTienda->att_access_token, $fechaInicial, $fechaFinal);

            if($ventas['httpCode']==200){
                $listaVentas = $ventas['lista'];                
                foreach ($listaVentas as $venta) {
                    $id = $venta->id;
                    try{    
                        $idPaquete = $venta->pack_id;                                                
                        $idPublicacion = $venta->order_items[0]->item->id;
                        $idVariante = $venta->order_items[0]->item->variation_id;
                        $titulo = $venta->order_items[0]->item->title;
                        $cantidad = $venta->order_items[0]->quantity;
                        
                        $comision = ($venta->order_items[0]->sale_fee) * $cantidad;

                        foreach ($venta->payments as $pago) {
                            if($pago->status == "approved"){
                                $idPago = $pago->id;
                                $precioVenta = $pago->transaction_amount;
                                $montoPagado = $pago->total_paid_amount;                                
                                $iva = ($precioVenta / 1.16)*.08;
                                $fechaPago = substr($pago->date_approved, 0, 10);
                            }
                        }

                        $nombreCliente = substr($venta->buyer->first_name.' '.$venta->buyer->last_name.'['.$venta->buyer->nickname.']',0,40);
                        $idEnvio = $venta->shipping->id;                        
                        
                        $nota = $venta->comments;
                        $statusMeli = $venta->status;

                        //~Valida si ya existe la orden
                        $ventaMeli = VentaMeli::where('id_orden_meli','=',$id)->get();  
                        $existeVenta = true; 
                        
                        //~Inserta como PENDIENTE la venta
                        if($ventaMeli->isEmpty()){
                            $ventaMeli = new VentaMeli();
                            $existeVenta = false; 
                        }else{
                            $ventaMeli = VentaMeli::findOrFail($ventaMeli[0]->id_venta_meli);
                        }

                        $ventaMeli->id_control_ventas_meli=$idControlVentas;
                        $ventaMeli->id_cuenta_tienda=$idCuentaTienda;
                        $ventaMeli->id_paquete_meli=$idPaquete;
                        $ventaMeli->id_orden_meli=$id;
                        $ventaMeli->id_publicacion=$idPublicacion;
                        $ventaMeli->id_variante=$idVariante;
                        $ventaMeli->titulo=$titulo;
                        $ventaMeli->id_pago=$idPago;
                        $ventaMeli->fecha_pago=$fechaPago;
                        $ventaMeli->monto_pagado=$montoPagado;
                        $ventaMeli->cantidad=$cantidad;
                        $ventaMeli->precio_venta=$precioVenta;
                        $ventaMeli->comision=$comision;                        
                        $ventaMeli->iva=$iva;
                        $ventaMeli->id_envio=$idEnvio;
                        $venta->costo_envio_cliente=0;
                        $venta->costo_envio_empresa=0;
                        $ventaMeli->nombre_cliente=$nombreCliente;                        
                        $ventaMeli->nota=$nota;
                        $ventaMeli->estatus_meli=$statusMeli;
                        $ventaMeli->estatus='PEN';

                        if($existeVenta){
                            $ventaMeli->update();
                        }else{
                            $ventaMeli->save();                            
                        }

                    }catch(Exception $e){
                        Log::error( 'No fue posible procesar la venta '.$id. 'id Cuenta Tienda = '.$idCuentaTienda.': '.$e->getMessage() );                        
                        Log::error( $e->getTraceAsString() );
                        $cntErrores++;
                        //~Actualiza control ventas
                        $controlVentasMeli->estatus = 'ERR';
                        $controlVentasMeli->update();
                    }

                        
                }
            }else{
                throw new Exception('No fue posible recuperar la lista de ventas '.$ventas['httpCode']);
            }


            //~Borra las publicaciones al existir un solo error
            if($cntErrores>0){
                VentaMeli::where('id_control_ventas_meli','=',$idControlVentas)->delete();                
            }
  
            

            return [    'xstatus'=>true, 
                        'totalProcesados'=>count($listaVentas),
                        'totalErrores'=>$cntErrores
                    ];

        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }

    /**
     * Realiza el calculo de la utilidad y factores
     * 
     * API: /tienda/calculaEstadistica
     * 
     */
    public function calculaVentaEstadistica(Request $request){
        DB::beginTransaction();
        try{
            $idControlVentas = $request->idControlVenta;
            
            //~Consulta bitacora control
            $controlVentasMeli = ControlVentasMeli::findOrFail($idControlVentas);//~Se busca en base al ID entrante
            $idCuentaTienda = $controlVentasMeli->id_cuenta_tienda;
            
            //~Detalle de la tienda
            $cuentaTienda = CuentaTienda::findOrFail($idCuentaTienda);//~Se busca en base al ID entrante

            $ventas = VentaMeli::where('id_control_ventas_meli','=',$idControlVentas)->get();   

            $cntVentaProcesada = 0;
            foreach ($ventas as $venta) {
                try{
                    $idVentaMeli = $venta->id_venta_meli;
                    $idPublicacion = $venta->id_publicacion;
                    $idVariante = $venta->id_variante_publicacion;

                    if($idVentaMeli==201 || $idVentaMeli==126 || $idVentaMeli==130){
                        $detener=true;
                    }
                    
                    //Completa el envio
                    $idEnvio = $venta->id_envio;
                    $envio = app(MercadoLibreController::class)->envioDetalle($idEnvio, $cuentaTienda->att_access_token);
                    if($envio['httpCode'] == 200){
                        $tipoEnvio = $envio['body']->logistic_type;
                        $direccion = $envio['body']->receiver_address->city->name. ', '.$envio['body']->receiver_address->street_name. ' '.$envio['body']->receiver_address->street_number;                                            
                        $costoEnvioCargoEmpresa = $envio['body']->shipping_option->list_cost;
                        $costoEnvioCargoCliente = $envio['body']->shipping_option->cost;
                    }else{
                        $tipoEnvio = 'NoDef';
                        $direccion = 'NoDef';
                        $costoEnvioCargoEmpresa = 0;
                        $costoEnvioCargoCliente = 0;
                    }

                    $idPago = $venta->id_pago;
                    $pago = app(MercadoLibreController::class)->pagoDetalle($idPago, $cuentaTienda->att_access_token);

                    $detalleTransaccion = $pago->transaction_details;
                                        
                    $neto = $detalleTransaccion->net_received_amount - (($venta->monto_pagado - $venta->precio_venta) + ($costoEnvioCargoEmpresa-$costoEnvioCargoCliente));
            
                    $isr = ($venta->precio_venta - ($costoEnvioCargoEmpresa-$costoEnvioCargoCliente)- $venta->comision - $venta->iva) - $neto;
                    
                    if($idVariante!=null){
                        $publicacion = Publicacion::where('id_publicacion_tienda','=',$idPublicacion)->where('id_variante_publicacion','=',$idVariante)->get();
                    }else{
                        $publicacion = Publicacion::where('id_publicacion_tienda','=',$idPublicacion)->get();
                    }

                    if($publicacion->isEmpty()){
                        $precioCompra = 0;
                    }else{
                        $idPub = $publicacion[0]->id_publicacion;
                        $configPublicacion = ConfigPublicacion::where('id_publicacion','=',$publicacion[0]->id_publicacion)->get();

                        if($configPublicacion->isEmpty()){
                            $precioCompra = 0;
                        }else{
                            $precioCompra=0;                        
                            foreach ($configPublicacion as $config) {
                                $producto = Producto::findOrFail($config->id_producto);
                                $precioCompra+= $producto->ultimo_precio_compra;
                            }
                            
                        }
                    }

                    $utilidadMonto = $neto - $precioCompra;
                    if($precioCompra==0){
                        $utilidadPorcentaje = 0;
                    }else{
                        $utilidadPorcentaje = $utilidadMonto / $precioCompra;
                    }


                    $venta->isr=$isr;
                    $venta->neto=$neto;
                    $venta->precio_compra=$precioCompra;
                    $venta->utl_monto=$utilidadMonto;
                    $venta->utl_porcentaje=$utilidadPorcentaje;
                    $venta->direccion_entrega=$direccion;
                    $venta->metodo_envio=$tipoEnvio;
                    $venta->costo_envio_cliente=$costoEnvioCargoCliente;
                    $venta->costo_envio_empresa=$costoEnvioCargoEmpresa;
                    $venta->estatus='TER';
                    $venta->update();
                    
                    $cntVentaProcesada++;

                }catch(Exception $e){
                    DB::rollBack();
                    Log::error( 'No fue posible procesar la venta '.$idVentaMeli.': '.$e->getMessage() );                        
                    Log::error( $e->getTraceAsString() );
                    
                    //~Actualiza control ventas
                    $controlVentasMeli->estatus = 'ERR';
                    $controlVentasMeli->update();
                    DB::commit();
                    throw new Exception('No fue posible procesar la venta '.$idVentaMeli.': '.$e->getMessage());
                }
            
            }

            //~Actualiza control ventas
            $controlVentasMeli->estatus = 'TER';
            $controlVentasMeli->update();

            DB::commit();
            
            return [    'xstatus'=>true, 
                        'totalProcesados'=>$cntVentaProcesada
                   ];        
        }catch(Exception $e){
            DB::rollBack();
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }


    

}
