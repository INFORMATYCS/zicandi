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
    'version'       => 'BETA-0.401',
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
        'appId'                         => '343517584154462',
        'secretKey'                     => '6MjDqFND2NzLWsDVFlamGZ3xq2p6eu08',
        'redirectURI'                   => 'http://localhost/zicandi/public/meli/login',
        'siteId'                        => 'MLM',
        'fechaInicialConsultaVentas'    => '2020-10-01'       
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
            'adjuntos'          => 'repositorio/entrada/adjuntos/',
            'log_batch'         => 'repositorio/entrada/log_batch/',
            'bettimg'           => 'repositorio/entrada/productos/better_alta_resolucion/',
            'tmp'               => 'repositorio/entrada/tmp/',
            'metricas'          => 'repositorio/entrada/metrica/proyectos/',
            'grafico_metricas'  => 'repositorio/entrada/metrica/graficos/',
            'codigo-qr'         => 'repositorio/entrada/qr/',
        ],
        'salida'    => [

        ],
        'img'       => [
            'tmp'               => 'img/tmp/'
        ]

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
        'path'                  => 'https://betterware.com.mx',
        'factorConversion'     => .8135
    ],
 

];
