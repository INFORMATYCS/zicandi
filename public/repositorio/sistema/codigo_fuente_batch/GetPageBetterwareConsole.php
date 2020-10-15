<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

$logFisico = fopen("zicandi.log", 'a+') or die("Se produjo un error al crear el archivo"); 

Console::log('ZICANDI Obtener catalogo betterware', 'white', true, 'blue', $logFisico);

Console::log('Limpiando tabla temporal', 'green', true, 'black', $logFisico);
Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/bett/limpia');

getCatalogoByCategoria("productos-lavanderia-y-limpieza", $logFisico);
getCatalogoByCategoria("productos-nuevos", $logFisico);
getCatalogoByCategoria("productos-cocina", $logFisico);
getCatalogoByCategoria("productos-hogar", $logFisico);
getCatalogoByCategoria("productos-bw-contigo", $logFisico);
getCatalogoByCategoria("productos-recamara", $logFisico);
getCatalogoByCategoria("productos-bano", $logFisico);
getCatalogoByCategoria("productos-ultima-llamada", $logFisico);


$respServidor = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/batch/termino?archivo=GetPageBetterwareConsole.php');

function getCatalogoByCategoria($cat, $logFisico){
    Console::log('', 'green', true, 'black', $logFisico);
    Console::log('Inicia carga '.$cat, 'green', true, 'black', $logFisico);
    for($pag=1; $pag<=10; $pag++){    
        $resp = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/bett/get', array("url" => "https://betterware.com.mx/".$cat."?pagina=".$pag));
        if($resp=="OK"){
            Console::log('.', 'yellow', false, 'black', $logFisico);
        }else{
            Console::log($resp, 'red', false, 'black', $logFisico);
        }
        
    }
}


fclose($logFisico); 
?>