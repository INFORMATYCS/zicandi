<?php

namespace App\Http\Lib;

class Constantes{

    /**
     * Mapeo de repositorios
     * 
     * En base al index.php
     */
    public $repositorio_entrada_productos_mini = 'repositorio/entrada/productos/mini/';
    public $repositorio_tmp_imagenes = 'img/tmp/';
    public $repositorio_entrada_productos = 'repositorio/entrada/productos/';

    //~Carpetas y adjuntos global
    public $repositorio_entrada_adjuntos = 'repositorio/entrada/adjuntos/';

    //~Configuracion API mercadolibre
    public $meli_appId = '3145687774408719';        
    public $meli_secretKey = 'sQcT6u43C7J6UQtjVCJmYjEYG3ve77d3';
    public $meli_redirectURI = 'http://localhost/zicandi/public/meli/login';
    public $meli_siteId = 'MLM';
}
