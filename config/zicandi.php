<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Generales
    |--------------------------------------------------------------------------
    |
    | Configuracion general
    | 
    |
    */
    'version'       => 'BETA',
    'entorno'       => 'pruebas', //pruebas | produccion
    'url_public'    => 'http://localhost/zicandi/public/',

    /*
    |--------------------------------------------------------------------------
    | API MeLi
    |--------------------------------------------------------------------------
    |
    | Configuracion para conectarse a la aplicacion ZICANDI
    | MercadoLibre API
    |
    */
    'meli'  => [
        'appId'                 => '3145687774408719',
        'secretKey'             => 'sQcT6u43C7J6UQtjVCJmYjEYG3ve77d3',
        'redirectURI'           => 'http://localhost/zicandi/public/meli/login',
        'siteId'                => 'MLM'        
    ],

    /*
    |--------------------------------------------------------------------------
    | Mapeos rutas / repositorios
    |--------------------------------------------------------------------------
    |
    | Mapeos de repositorios publicos
    | 
    |
    */
    'repositorio'   => [
        'entrada'   => [
            'producto_mini'     => 'repositorio/entrada/productos/mini/',
            'productos'         => 'repositorio/entrada/productos/',
            'adjuntos'          => 'repositorio/entrada/adjuntos/'
        ],
        'salida'    => [

        ],
        'img'       => [
            'tmp'               => 'img/tmp/'
        ],

    ],

    /*
    |--------------------------------------------------------------------------
    | API BETTERWARE
    |--------------------------------------------------------------------------
    |
    | Consulta de productos betterware.com
    | 
    |
    */
    'betterware'  => [
        'path'                  => 'https://betterware.com.mx'
    ],

];
