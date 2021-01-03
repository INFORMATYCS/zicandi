<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

$logFisico = fopen("zicandi.log", 'a+') or die("Se produjo un error al crear el archivo"); 

Console::log('ZICANDI Obtener catalogo betterware', 'white', true, 'blue', $logFisico);

Console::log('Obteniendo catalogo BETTERWARE, espere...', 'green', true, 'black', $logFisico);
$scat = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/bett/get/productos');
$cat = json_decode($scat);
$xstatus = $cat->xstatus;

if($xstatus == true){
    $productosList = $cat->productos;

    foreach ($productosList as $c) {
        $idTempCatBett = $c[0];
        $producto = $c[1];

        Console::log(substr($producto,0,20), 'yellow', false, 'black', $logFisico);

        $jsonProcesa = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/bett/migracion?id_temp_cat_bett='.$idTempCatBett);
        $resp = json_decode($jsonProcesa);
        if($resp->xstatus == true){
            Console::log(' OK ', 'green', true, 'black', $logFisico);
        }else{
            Console::log(' OK ', 'red', true, 'black', $logFisico);
            Console::log($resp->error , 'red', true, 'black', $logFisico);
        }
        

        
        
    }
}else{
    Console::log('Error grave al consumir servicio ', 'red', true, 'black', $logFisico);
    Console::log($cat->error , 'red', true, 'black', $logFisico);
}




fclose($logFisico); 
?>