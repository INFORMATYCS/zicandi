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
    $cadenaProcesa = "";
    $bloqSize = 100;
    $contadorBloqSize = 0;
    $contadorEjecucion = 1;
    $contadorTotal = 0;
    
    Console::log('Total de publicaciones a procesar '.$totalPublicaciones, 'white', true, 'black', $logFisico);
    

    foreach ($publicaciones->metricas as $pub){

        $cadenaProcesa= $cadenaProcesa . $pub->id_meli_metrica_visor . ",";        
        $contadorBloqSize++;
        $contadorTotal++;

        if($contadorBloqSize >= $bloqSize || $contadorTotal == count($publicaciones->metricas)){

            if($contadorTotal == count($publicaciones->metricas)){
                $final = 1;
            }else{
                $final = 0;
            }

            Console::log('Se envia bloque num '.$contadorEjecucion.' con '.$bloqSize.' publicaciones a procesar: ', 'yellow', false, 'black', $logFisico);            
            $resp = json_decode(Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/meli/metricas/visor/metrica?ListMeliMetricaVisor='.$cadenaProcesa . '&ultimoBloque='.$final.'&bloque='.$contadorEjecucion));
            $contadorEjecucion++;

            if($resp->xstatus){                            
                Console::log('OK', 'yellow', false, 'black', $logFisico);                
            }else{
                Console::log($resp->error, 'red', true, 'black', $logFisico);
            }

            $cadenaProcesa="";
            $contadorBloqSize = 0;
        }        
    }
}else{
    Console::log('[SE DETIENE PROCESO] '.$publicaciones->error, 'red', true, 'black', $logFisico);        
}

fclose($logFisico);  
?>