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


// - Rutas para Proveedores
Route::get('/proveedores', 'ProveedorController@index');
Route::post('/proveedores/registrar', 'ProveedorController@store');
Route::put('/proveedores/actualizar', 'ProveedorController@update');
Route::put('/proveedores/desactivar', 'ProveedorController@desactivar');
Route::put('/proveedores/activar', 'ProveedorController@activar');
