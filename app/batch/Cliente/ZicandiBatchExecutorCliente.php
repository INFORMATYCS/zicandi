<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

Console::log('ZICANDI BATCH', 'white', true, 'blue');

Console::log('Conectandose a: ' . Param::$_BASE_PATH_API.'zicandi/public/batch/tareas', 'white', true, 'blue');

$tareas = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/batch/tareas');

$arrayCodigos = json_decode($tareas);

//Escribe archivo BAT para windows
$archivoLineaComandos = "@ECHO OFF \n";
for($i=0; $i<count($arrayCodigos); $i++){
	$tarea = $arrayCodigos[$i];
	Console::log('Descargando codigo fuente para windows...'.$tarea, 'green', true, 'black');
	Restfull::descargaFuente(Param::$_BASE_PATH_API.'zicandi/public/batch/descarga', $tarea);	

	$archivoLineaComandos.= Param::$_BASE_PATH_PHP." bin\\".$tarea."\n";
}

$file = fopen("run.bat", "w");
fwrite($file,$archivoLineaComandos . PHP_EOL);
fclose($file);

//~Escribe archivo SH para linux
$archivoLineaComandos = "";
for($i=0; $i<count($arrayCodigos); $i++){
	$tarea = $arrayCodigos[$i];
	Console::log('Descargando codigo fuente para synology...'.$tarea, 'green', true, 'black');
	Restfull::descargaFuente(Param::$_BASE_PATH_API.'zicandi/public/batch/descarga', $tarea);	

	$archivoLineaComandos.= Param::$_BASE_PATH_PHP_SYNOLOGY." bin/".$tarea."\n";
}

$file = fopen("run.sh", "w");
fwrite($file,$archivoLineaComandos . PHP_EOL);
fclose($file);


Console::log('Termina la descarga de los codigos...', 'white', true, 'black');
?>