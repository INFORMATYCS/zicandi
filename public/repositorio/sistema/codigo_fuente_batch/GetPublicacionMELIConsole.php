<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

$logFisico = fopen("zicandi.log", 'a+') or die("Se produjo un error al crear el archivo");

Console::log('ZICANDI Consulta publicaciones en mercadolibre', 'white', true, 'blue', $logFisico);

Console::log('Recuperando cuentas activas...', 'green', true, 'black', $logFisico);
$tiendas = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/tienda/cuentasActivasMeli'));

$idTienda = $tiendas->idTienda;
$cuentas = $tiendas->cuentas;

foreach ($cuentas as $cuenta){
    
    $idCuentaTienda = $cuenta->idCuentaTienda;
    $usuario = $cuenta->usuario;
    $estatus = $cuenta->estatus;
    $httpCode = $cuenta->httpCode;

    Console::log('Comieza... Recuperando publicaciones para '.$usuario, 'yellow', true, 'black', $logFisico);
    $publicaciones = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/tienda/getPublicaciones?idCuentaTienda='.$idCuentaTienda));

    if($publicaciones->httpCode==200){
        Console::log('Publicaciones recuperadas: '.count($publicaciones->lista), 'red', true, 'black', $logFisico);
        $listaPub = $publicaciones->lista;
        $fragmentos = array_chunk($listaPub, 20);

        foreach ($fragmentos as $bloque){
            Console::log('Procesando bloque (20 pub)', 'green', false, 'black', $logFisico);
            $cadenaProcesa = implode (",", $bloque);
            $resp = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/tienda/getDetallePublicacion?idCuentaTienda='.$idCuentaTienda.'&publicaciones20='.$cadenaProcesa));
            if(isset($resp->resultado)){
                if($resp->resultado=="OK"){
                    Console::log($resp->resultado, 'red', true, 'black', $logFisico);
                }else{
                    Console::log('Ocurrio un error: '.$resp->msg, 'red', true, 'black', $logFisico);
                }                
            }else{                
                Console::log('Ocurrio un error desconocido', 'red', true, 'black', $logFisico);            
            }
            
            
        }
    }else{
        Console::log('No fue posible recuperar listado de publicaiones', 'red', true, 'black', $logFisico);
    }
    
}

fclose($logFisico); 
?>