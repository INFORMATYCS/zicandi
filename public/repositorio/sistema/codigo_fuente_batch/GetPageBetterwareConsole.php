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

Console::log('Se localizaron '.count($cat->productos).' productos por procesar', 'green', true, 'black', $logFisico);

if($xstatus == true){
    $productosList = $cat->productos;
    $cadenaProcesa = "";
    $bloqSize = 100;
    $contadorBloqSize = 0;
    $contadorEjecucion = 1;
    $contadorTotal = 0;

    foreach ($productosList as $c) {
        $idTempCatBett = $c[0];
        $producto = $c[1];

        $cadenaProcesa= $cadenaProcesa . $idTempCatBett . ",";
        
        $contadorBloqSize++;
        $contadorTotal++;

        if($contadorBloqSize >= $bloqSize || $contadorTotal == count($productosList)){
            Console::log('Se envia bloque num '.$contadorEjecucion.' con '.$bloqSize.' productos a procesar: ', 'yellow', false, 'black', $logFisico);
            $contadorEjecucion++;

            $jsonProcesa = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/bett/migracion?id_temp_cat_bett='.$cadenaProcesa);
            $resp = json_decode($jsonProcesa);
            if($resp->xstatus == true){
                Console::log(' OK ', 'green', true, 'black', $logFisico);
            }else{
                Console::log(' OK ', 'red', true, 'black', $logFisico);
                Console::log($resp->error , 'red', true, 'black', $logFisico);
            }


            $cadenaProcesa="";
            $contadorBloqSize = 0;
        }
        
        
    }
}else{
    Console::log('Error grave al consumir servicio ', 'red', true, 'black', $logFisico);
    Console::log($cat->error , 'red', true, 'black', $logFisico);
}




fclose($logFisico); 
?>