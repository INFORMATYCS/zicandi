<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

$logFisico = fopen("zicandi.log", 'a+') or die("Se produjo un error al crear el archivo"); 

Console::log('ZICANDI Consulta VENTAS en mercadolibre', 'white', true, 'blue', $logFisico);

Console::log('Recuperando cuentas activas...', 'green', true, 'black', $logFisico);
$tiendas = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/tienda/cuentasActivasMeli'));

$idTienda = $tiendas->idTienda;
$cuentas = $tiendas->cuentas;

foreach ($cuentas as $cuenta){
    
    $idCuentaTienda = $cuenta->idCuentaTienda;
    $usuario = $cuenta->usuario;
    $estatus = $cuenta->estatus;
    $httpCode = $cuenta->httpCode;

    Console::log('Comieza... Recuperando VENTAS para '.$usuario, 'yellow', true, 'black', $logFisico);
    Console::log('Calculando fechas de consulta', 'yellow', true, 'black', $logFisico);
    $controlVenta = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/tienda/registraControlVenta?id_cuenta_tienda='.$idCuentaTienda));
    $fechaInicial = $controlVenta->fechaInicial;
    $fechaFinal = $controlVenta->fechaFinal;
    $idControlVenta = $controlVenta->idControlVenta;

    Console::log('Consulta ventas [Fecha Inicial = '.$fechaInicial.' Fecha final = '.$fechaFinal.' ID control venta = '.$idControlVenta.']', 'yellow', true, 'black', $logFisico);
    $resulConsultaVentas = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/tienda/ventas?idControlVenta='.$idControlVenta.'&fechaInicial='.$fechaInicial.'&fechaFinal='.$fechaFinal));

    if($resulConsultaVentas->totalErrores>0){
        Console::log('Se encontraron errores, nos es posible continuar: '.$resulConsultaVentas->totalErrores.' errores.', 'red', true, 'black', $logFisico);
        Console::log('Revisar log...', 'red', true, 'black', $logFisico);
    }else{
        Console::log('Se procesador '.$resulConsultaVentas->totalProcesados.' ventas correctamente', 'green', true, 'black', $logFisico);
        Console::log('Continuando con el calculo de estadisticas', 'yellow', true, 'black', $logFisico);
        $resulConsultaVentas = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/tienda/calculaEstadistica?idControlVenta='.$idControlVenta));


    }


    
}

fclose($logFisico);  
?>