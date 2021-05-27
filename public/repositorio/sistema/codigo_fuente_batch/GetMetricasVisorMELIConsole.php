<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

$logFisico = fopen("zicandi.log", 'a+') or die("Se produjo un error al crear el archivo"); 

Console::log('ZICANDI METRICAS Visor MeLi', 'white', true, 'blue', $logFisico);

Console::log('Recuperando publicaciones activas...', 'green', true, 'black', $logFisico);
$publicaciones = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/meli/metricas/visor?estatus=ACT&tipo=all'));

if($publicaciones->xstatus){
    $totalPublicaciones = count($publicaciones->metricas);
    Console::log('Total de publicaciones a procesar '.$totalPublicaciones, 'white', true, 'black', $logFisico);

    foreach ($publicaciones->metricas as $pub){
        $resp = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/meli/metricas/visor/metrica?idMeliMetricaVisor='.$pub->id_meli_metrica_visor.'&url='.$pub->url));

        if($resp->xstatus){            
            Console::log($pub->id_publicacion_tienda.' [', 'green', false, 'black', $logFisico);
            Console::log('OK', 'yellow', false, 'black', $logFisico);
            Console::log(']', 'green', true, 'black', $logFisico);
        }else{
            Console::log($pub->id_publicacion_tienda.' [ERR]: '.$resp->error, 'red', true, 'black', $logFisico);
        }
    }
}else{
    Console::log('[SE DETIENE PROCESO] '.$publicaciones->error, 'red', true, 'black', $logFisico);        
}

fclose($logFisico);  
?>