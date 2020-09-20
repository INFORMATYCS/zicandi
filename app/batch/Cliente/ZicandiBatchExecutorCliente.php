<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

Console::log('ZICANDI BATCH', 'white', true, 'blue');


$tareas = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/batch/tareas');
$arrayCodigos = json_decode($tareas);


$archivoLineaComandos = "@ECHO OFF \n";
for($i=0; $i<count($arrayCodigos); $i++){
	$tarea = $arrayCodigos[$i];
	Console::log('Descargando codigo fuente...'.$tarea, 'green', true, 'black');
	Restfull::descargaFuente(Param::$_BASE_PATH_API.'zicandi/public/batch/descarga', $tarea);	

	$archivoLineaComandos.= Param::$_BASE_PATH_PHP." bin\\".$tarea."\n";
}

$file = fopen("run.bat", "w");
fwrite($file,$archivoLineaComandos . PHP_EOL);
fclose($file);


Console::log('Termina la descarga de los codigos...', 'white', true, 'black');
?>