<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';


Console::log('ZICANDI Test de servicios OK', 'yellow', true, 'black');
$respServidor = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/batch/test');
Console::log('Respuesta servidor: ', 'yellow', false, 'black');
Console::log($respServidor, 'red');


$respServidor = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/batch/termino?archivo=test.php');
?>