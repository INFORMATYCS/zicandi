<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('frames/contenido_main');
});

Route::get('/loginmeli', function () {
    return view('loginMELI');
});


// - Rutas para Proveedores
Route::get('/proveedores', 'ProveedorController@index');
Route::post('/proveedores/registrar', 'ProveedorController@store');
Route::post('/proveedores/actualizar', 'ProveedorController@update');
Route::post('/proveedores/desactivar', 'ProveedorController@desactivar');
Route::post('/proveedores/activar', 'ProveedorController@activar');
Route::get('/proveedores/selectProveedor', 'ProveedorController@selectProveedor');

// - Rutas para Productos
Route::get('/productos', 'ProductoController@index');
Route::post('/productos/registrar', 'ProductoController@store');
Route::post('/productos/actualizar', 'ProductoController@update');
Route::post('/productos/desactivar', 'ProductoController@desactivar');
Route::post('/productos/activar', 'ProductoController@activar');
Route::get('/productos/procesaimg', 'ProductoController@procesaImagen');
Route::post('/productos/getProveedoresByProducto', 'ProductoController@getProveedoresByProducto');
Route::post('/productos/storeProveedoresByProducto', 'ProductoController@storeProveedoresByProducto');


// - Rutas para Categorias
Route::get('/categoria/selectCategoria', 'CategoriaController@selectCategoria');


// - Rutas para Parametria
Route::post('parametria/getProceso', 'ParametriaController@getParametriaByProceso');
Route::get('parametria/seqProductoCodigo_nextval', 'ParametriaController@seqProductoCodigo_nextval');
Route::get('parametria/seqFolioCompra_nextval', 'ParametriaController@seqFolioCompra_nextval');

// - Rutas para Almacen
Route::get('/almacenes', 'AlmacenController@index');
Route::post('/almacenes/registrar', 'AlmacenController@store');
Route::post('/almacenes/actualizar', 'AlmacenController@update');
Route::post('/almacenes/desactivar', 'AlmacenController@desactivar');
Route::post('/almacenes/activar', 'AlmacenController@activar');


// - Rutas para Compras
Route::get('/compras', 'ComprasController@index');
Route::post('/compras/detalle', 'ComprasController@getDetalleCompra');
Route::post('/compras/registrar', 'ComprasController@store');

Route::post('/compras/actualizar', 'ComprasController@update');
Route::post('/compras/desactivar', 'ComprasController@desactivar');
Route::post('/compras/activar', 'ComprasController@activar');

// - Rutas para UpLoad de archivos
Route::post('/uploadfile', 'UploadFileController@index');
Route::post('/uploadfile/getAdjuntosByCarpeta', 'UploadFileController@getAdjuntosByCarpeta');
Route::post('/uploadfile/delete', 'UploadFileController@delete');
Route::post('/uploadfile/nuevaCarpeta', 'UploadFileController@nuevaCarpeta');

// - Rutas multifondos
Route::post('/mf2/liquidarCompra', 'MultiFondosController@liquidarCompra');

// - Rutas API mercadolibre
Route::get('/meli/login', 'MercadoLibreController@login');
Route::get('/meli/logout', 'MercadoLibreController@logout');
Route::get('/meli/me', 'MercadoLibreController@me');
Route::get('/meli/refresh', 'MercadoLibreController@refreshToken');

// - Rutas API betterware
Route::get('/bett/get', 'BetterwareController@getPage');
Route::get('/bett/resumen', 'BetterwareController@resumenMigracion');
Route::get('/bett/limpia', 'BetterwareController@limpiaTablaTemporal');
Route::get('/bett/migracion', 'BetterwareController@migracionProductos');

// ~  Rutas Tiendas
Route::get('/tienda/getcuentas', 'TiendasController@index');
Route::get('/tienda/getSelectTiendas', 'TiendasController@selectTienda');
Route::get('/tienda/getSelectCuentaTiendas', 'TiendasController@selectCuentaTienda');
Route::post('/tienda/storeCuentaTienda', 'TiendasController@storeCuentaTienda');
Route::post('/tienda/eliminarCuenta', 'TiendasController@eliminarCuentaTienda');
Route::get('/tienda/registraCuentaActiva', 'TiendasController@registraCuentaActiva');
Route::post('/tienda/getPublicaciones', 'TiendasController@getPublicaciones');
Route::get('/tienda/refreshMeli', 'TiendasController@refreshTokenMeli');

// - Rutas para Publicaciones
Route::get('/publicaciones', 'PublicacionesController@index');
Route::post('/publicaciones/guardarProductos', 'PublicacionesController@saveProductosLigados');

// - Rutas para procesos BATCH
Route::get('/batch/tareas', 'BatchController@getTareas');
Route::get('/batch/descarga', 'BatchController@descargaFuente');
Route::get('/batch/test', 'BatchController@test');
Route::get('/batch/termino', 'BatchController@setTermino');
Route::get('/batch/procesos', 'BatchController@getProcesosAll');
Route::post('/batch/store', 'BatchController@storeProceso');
Route::post('/batch/update', 'BatchController@updateProceso');



