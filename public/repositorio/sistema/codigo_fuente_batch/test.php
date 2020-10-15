<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

$logFisico = fopen("zicandi.log", 'w') or die("Se produjo un error al crear el archivo");      

Console::log('ZICANDI Test de servicios OK', 'yellow', true, 'black', $logFisico);
$respServidor = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/batch/test');
Console::log('Respuesta servidor: ', 'yellow', false, 'black', $logFisico);
Console::log($respServidor, 'red', true, 'black', $logFisico);


$respServidor = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/batch/termino?archivo=test.php');

fclose($logFisico);  
?>