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
Route::put('/proveedores/actualizar', 'ProveedorController@update');
Route::put('/proveedores/desactivar', 'ProveedorController@desactivar');
Route::put('/proveedores/activar', 'ProveedorController@activar');
Route::get('/proveedores/selectProveedor', 'ProveedorController@selectProveedor');

// - Rutas para Productos
Route::get('/productos', 'ProductoController@index');
Route::post('/productos/registrar', 'ProductoController@store');
Route::put('/productos/actualizar', 'ProductoController@update');
Route::put('/productos/desactivar', 'ProductoController@desactivar');
Route::put('/productos/activar', 'ProductoController@activar');
Route::get('/productos/procesaimg', 'ProductoController@procesaImagen');
Route::put('/productos/getProveedoresByProducto', 'ProductoController@getProveedoresByProducto');
Route::put('/productos/storeProveedoresByProducto', 'ProductoController@storeProveedoresByProducto');


// - Rutas para Categorias
Route::get('/categoria/selectCategoria', 'CategoriaController@selectCategoria');


// - Rutas para Parametria
Route::post('parametria/getProceso', 'ParametriaController@getParametriaByProceso');
Route::get('parametria/seqProductoCodigo_nextval', 'ParametriaController@seqProductoCodigo_nextval');
Route::get('parametria/seqFolioCompra_nextval', 'ParametriaController@seqFolioCompra_nextval');

// - Rutas para Almacen
Route::get('/almacenes', 'AlmacenController@index');
Route::post('/almacenes/registrar', 'AlmacenController@store');
Route::put('/almacenes/actualizar', 'AlmacenController@update');
Route::put('/almacenes/desactivar', 'AlmacenController@desactivar');
Route::put('/almacenes/activar', 'AlmacenController@activar');


// - Rutas para Compras
Route::get('/compras', 'ComprasController@index');
Route::post('/compras/detalle', 'ComprasController@getDetalleCompra');
Route::post('/compras/registrar', 'ComprasController@store');


Route::put('/compras/actualizar', 'ComprasController@update');
Route::put('/compras/desactivar', 'ComprasController@desactivar');
Route::put('/compras/activar', 'ComprasController@activar');

// - Rutas para UpLoad de archivos
Route::post('/uploadfile', 'UploadFileController@index');
Route::post('/uploadfile/getAdjuntosByCarpeta', 'UploadFileController@getAdjuntosByCarpeta');
Route::put('/uploadfile/delete', 'UploadFileController@delete');
Route::put('/uploadfile/nuevaCarpeta', 'UploadFileController@nuevaCarpeta');

// - Rutas multifondos
Route::post('/mf2/liquidarCompra', 'MultiFondosController@liquidarCompra');

// - Rutas API mercadolibre
Route::get('/meli/login', 'MercadoLibreController@login');

// - Rutas API betterware
Route::get('/bett/get', 'BetterwareController@getPage');
Route::get('/bett/resumen', 'BetterwareController@resumenMigracion');
Route::get('/bett/limpia', 'BetterwareController@limpiaTablaTemporal');
Route::get('/bett/migracion', 'BetterwareController@migracionProductos');
