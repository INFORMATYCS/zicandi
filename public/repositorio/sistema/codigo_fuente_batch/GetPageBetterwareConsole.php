<?php
include 'lib/Restfull.php';
include 'lib/Param.php';
include 'lib/Console.php';

Console::log('ZICANDI Obtener catalogo betterware', 'white', true, 'blue');

Console::log('Limpiando tabla temporal', 'green', true, 'black');
Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/bett/limpia');

getCatalogoByCategoria("productos-lavanderia-y-limpieza");
getCatalogoByCategoria("productos-nuevos");
getCatalogoByCategoria("productos-cocina");
getCatalogoByCategoria("productos-hogar");
getCatalogoByCategoria("productos-bw-contigo");
getCatalogoByCategoria("productos-recamara");
getCatalogoByCategoria("productos-bano");
getCatalogoByCategoria("productos-ultima-llamada");


$respServidor = Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/batch/termino?archivo=GetPageBetterwareConsole.php');

function getCatalogoByCategoria($cat){
    Console::log('', 'green', true, 'black');
    Console::log('Inicia carga '.$cat, 'green', true, 'black');
    for($pag=1; $pag<=10; $pag++){    
        Restfull::sendGet(Param::$_BASE_PATH_API.'zicandi/public/bett/get', array("url" => "https://betterware.com.mx/".$cat."?pagina=".$pag));
        Console::log('.', 'yellow', false, 'black');
    }
}

?>