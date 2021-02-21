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
use App\Parametria;
use Session;
use App\EstadisticaPublicacion;
use App\Exports\VentasExport;


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

        

        //~Tasas de impuestos
        $parametria = Parametria::where('xstatus','=','1')->where('clave_proceso','=','IMPUESTO')->where('llave','=','TASA_IVA')->select('valor')->first();
        $tasaIva = floatval($parametria->valor);

        $parametria = Parametria::where('xstatus','=','1')->where('clave_proceso','=','IMPUESTO')->where('llave','=','TASA_ISR')->select('valor')->first();
        $tasaIsr = floatval($parametria->valor);


        //********* Consulta detalle de la publicacion **********
        $p = app(MercadoLibreController::class)->items($publicaciones20, $token);

        $offset = 0;
        $limit = 100;
        $listaPublicacionesDeta = array();
        if($p['httpCode']=="200"){
            $listaPublicaciones = $p['body'];

            for($b=0; $b<count($listaPublicaciones); $b++){
                $publicacion    = $listaPublicaciones[$b]->body;
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
                $idCategoria    = $publicacion->category_id;
                $tipoListing    = $publicacion->listing_type_id;
                $envioGratis    = $publicacion->shipping->free_shipping;

                //~Calcula la comision por venta del producto
                $comisionVenta = app(MercadoLibreController::class)->precioVentaCategoria($idCategoria, $tipoListing, $precio);                
                
                //~Calcula impuestos aplicables
                $baseGravable = $precio / 1.16;
                $iva = $baseGravable * $tasaIva;
                $isr = $baseGravable * $tasaIsr;

                //~Precio del envio en caso de aplicar
                if($envioGratis){
                    $costoEnvio = app(MercadoLibreController::class)->costoEnvioGratis($id, $idUsuarioMELI);
                }else{
                    $costoEnvio = 0;
                }

                $final = $precio - $comisionVenta - $iva - $isr - $costoEnvio;                

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
                            'nombreVariante'=>$nombreVariante,
                            'comisionVenta'=>$comisionVenta,
                            'tipoListing'=>$tipoListing,
                            'iva'=>$iva,
                            'isr'=>$isr,
                            'costoEnvio'=>$costoEnvio,
                            'final'=>$final
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
                        'tipoEnvio'=>$tipoEnvio,
                        'comisionVenta'=>$comisionVenta,
                        'tipoListing'=>$tipoListing,
                        'iva'=>$iva,
                        'isr'=>$isr,
                        'costoEnvio'=>$costoEnvio,
                        'final'=>$final
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

            $visitas = 0;
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

                $publicacion->tipo_listing = (isset($pub['tipoListing']) ? $pub['tipoListing'] : null);
                $publicacion->costo_envio = 0;
                $publicacion->comision_venta = 0;
                $publicacion->iva = 0;
                $publicacion->isr = 0;
                $publicacion->neto_venta_final = 0;
                $publicacion->ultimo_precio_compra = 0;


                $publicacion->save();                    
            }else{
                if($publicacion->id_publicacion=="MLM826977288"){
                    $pause=true;
                }


                //~Calcula precio de compra
                $configPublicacion = ConfigPublicacion::where('id_publicacion','=',$publicacion->id_publicacion)->get();
                $precioCompra = 0;
                if($configPublicacion->isEmpty()){
                    $precioCompra = 0;
                }else{                    
                    foreach ($configPublicacion as $config) {
                        $producto = Producto::findOrFail($config->id_producto);
                        $cantidad = $config->cantidad;
                        $precioCompra+= ($producto->ultimo_precio_compra)*$cantidad;
                    }
                    
                }
                

                $visitas = $publicacion->visitas;              
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
                $publicacion->visitas = (isset($pub['visitas']) ? $pub['visitas'] : $visitas);   
                
                $publicacion->tipo_listing = (isset($pub['tipoListing']) ? $pub['tipoListing'] : null);
                $publicacion->costo_envio = (isset($pub['costoEnvio']) ? $pub['costoEnvio'] : 0);
                $publicacion->comision_venta = (isset($pub['comisionVenta']) ? $pub['comisionVenta'] : 0);
                $publicacion->iva = (isset($pub['iva']) ? $pub['iva'] : 0);
                $publicacion->isr = (isset($pub['isr']) ? $pub['isr'] : 0);
                $publicacion->neto_venta_final = (isset($pub['final']) ? $pub['final'] : 0);
                $publicacion->ultimo_precio_compra = $precioCompra;

                $publicacion->update();
            }

            //~Agrega estadisticas
            $estadisticaPublicacion = new EstadisticaPublicacion();
            $estadisticaPublicacion->id_publicacion = $publicacion->id_publicacion;
            $estadisticaPublicacion->stock = (isset($pub['stock']) ? $pub['stock'] : null);
            $estadisticaPublicacion->ventas = (isset($pub['ventas']) ? $pub['ventas'] : null);
            $estadisticaPublicacion->visitas = (isset($pub['visitas']) ? $pub['visitas'] : $visitas); 
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
        DB::beginTransaction();

        $idCuentaTienda = $request->idCuentaTienda;
        $cuenta = CuentaTienda::findOrFail($idCuentaTienda);
        $idUsuarioMELI = $cuenta->att_id;
        $usuarioMELI = $cuenta->usuario;
        $token = $cuenta->att_access_token;

        $publicaciones = app(MercadoLibreController::class)->publicaciones($idUsuarioMELI, $token);

        //~Depura todas aquellas publicaciones que no estan registradas en mercadolibre
        $sql= "select distinct id_publicacion_tienda as id_publicacion_tienda from publicacion where id_cuenta_tienda = ".$idCuentaTienda;
        $rsPublicacionesActuales = DB::select( $sql );
        $publicacionesActuales = array();
        foreach ($rsPublicacionesActuales as $publicacion) {
            array_push($publicacionesActuales, $publicacion->id_publicacion_tienda);
        }        
        $publicacionesMl = $publicaciones['lista'];

        $resultado = array_diff($publicacionesActuales, $publicacionesMl);
        foreach ($resultado as $publicacion) {
            $regUpdate = Publicacion::where('id_publicacion_tienda','=',$publicacion)
                        ->where('id_cuenta_tienda','=',$idCuentaTienda)
                        ->update(['estatus'=>'eliminado']);
        }
        

        DB::commit();
        
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

            $sql= " SELECT DATE_FORMAT(DATE_SUB(MAX(FECHA_FINAL),INTERVAL 1 DAY),'%Y-%m-%d') AS fecha 
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

            $fechaActual = date('Y-m-d', strtotime("+1 day"));
            
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
                        $fechaVenta = new \DateTime($venta->date_created);
                        
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
                        $ventaMeli->fecha_venta=$fechaVenta;
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
                                $cantidad = $config->cantidad;
                                $precioCompra+= ($producto->ultimo_precio_compra)*$cantidad;
                            }
                            
                        }
                    }

                    //~Multiplica por la cantidad de piezas vendidas
                    $precioCompra = $precioCompra * $venta->cantidad;

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


    /**
     * Enlistas todas las ventas segun filtros
     * 
     * API: /tienda/ventasList
     * 
     */
    public function getListaVentas(Request $request){
        try{
            $idCuentaTienda = $request->idCuentaTienda;
            $fechaInicial = $request->fechaInicial;
            $fechaFinal = $request->fechaFinal;
            $page = $request->page;
            $buscar = $request->buscar;
            $color = $request->color;

            $sqlBuscar ="";
            if($buscar!=null){
                $sqlBuscar ="and (titulo like '%".$buscar."%' or id_publicacion like'%".$buscar."%' or nombre_cliente like '%".$buscar."%')";
            }

            $sqlColor ="";
            if($color!="todos"){
                if($color=="verde"){
                    $sqlColor =" and utl_porcentaje >= .20 ";
                }elseif($color=="naranja"){
                    $sqlColor =" and (utl_porcentaje >= .05 and utl_porcentaje < .20) ";
                }else{
                    $sqlColor =" and utl_porcentaje  < .05 ";
                }
            }

            $sql= "select 	id_venta_meli idVentaMeli, 			
                            IF(id_paquete_meli>0, (	select count(*) 
                                                    from venta_meli vaux 
                                                    where vaux.id_control_ventas_meli = vmeli.id_control_ventas_meli 
                                                    and vaux.id_cuenta_tienda = vmeli.id_cuenta_tienda 
                                                    and vaux.id_paquete_meli = vmeli.id_paquete_meli), 1) totalPaquete,
                            id_paquete_meli idPaqueteMeli, 
                            id_orden_meli idOrdenMeli,         
                            DATE_FORMAT(fecha_venta,'%d/%m%/%Y') fechaVenta, 
                            id_publicacion idPublicacion, 
                            id_variante idVariante, 
                            titulo, 
                            id_pago idPago, 
                            DATE_FORMAT(fecha_pago,'%d/%m%/%Y') fechaPago, 
                            monto_pagado montoPagoCliente, 
                            cantidad, 
                            precio_venta precioVenta, 
                            comision, 
                            isr, 
                            iva, 
                            neto, 
                            precio_compra ultimoPrecioCompra, 
                            utl_monto utlMonto, 
                            utl_porcentaje utlPorcentaje, 
                            id_envio idEnvio,  
                            nombre_cliente nombreCliente, 
                            direccion_entrega direccionEntrega, 
                            metodo_envio metodoEnvio, 
                            costo_envio_cliente costoEnvioCliente, 
                            costo_envio_empresa costoEnvioEmpresa, 
                            nota nota, 
                            estatus_meli estatusVentaMeli        
                    from venta_meli vmeli
                    where id_cuenta_tienda = $idCuentaTienda
                    and estatus = 'TER'
                    $sqlBuscar
                    $sqlColor
                    and DATE(fecha_venta) between STR_TO_DATE('$fechaInicial', '%Y-%m-%d') and STR_TO_DATE('$fechaFinal', '%Y-%m-%d')
                    order by id_paquete_meli";        

            $rs = DB::select( $sql );
            $collect = collect($rs);                    
            $size=100;
            
            $paginationData = new  \Illuminate\Pagination\LengthAwarePaginator(
                $collect->forPage($page, $size),
                $collect->count(), 
                $size, 
                $page
              );

            return [                
                'pagination' => $paginationData,
                'xstatus'=>true, 
                'ventas'=>$rs
            ];

        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
    }



    /**
     * Exporta a excel ventas conforme a los filtros de pantalla
     * API: /tienda/ventas/export
     * 
     */
    public function exportar(Request $request){
        try{

            $param = json_decode($request->param);

            $idCuentaTienda = $param->idCuentaTienda;
            $fechaInicial = $param->fechaInicial;
            $fechaFinal = $param->fechaFinal;            
            $buscar = $param->buscar;
            $color = $param->color;
            $nombreSalida = 'ventas_'.uniqid().'_reporte.xlsx';


            return (new VentasExport)->define($buscar, $fechaInicial, $fechaFinal, $idCuentaTienda, $color)->download($nombreSalida);
        }catch(Exception $e){
            Log::error( $e->getTraceAsString() );            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        
    }


    
    

}
