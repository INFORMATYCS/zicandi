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

// - Rutas para MAIN
Route::get('/main/entorno', 'MainController@getEntorno');
Route::get('/main/version', 'MainController@getVersionApp');

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
Route::post('/almacenes/movimiento', 'AlmacenController@movimientoAlmacen');
Route::get('/almacenes/export', 'AlmacenController@exportar');
Route::get('/almacenes/resumen', 'AlmacenController@resumenAlmacen');
Route::get('/almacenes/resumen/detalle', 'AlmacenController@resumenDetalleProductosAlmacen');
Route::get('/almacenes/resumen/movimientos', 'AlmacenController@detalleMovAlmacen');
Route::get('/almacenes/resumen/genera_lote', 'AlmacenController@generaLoteAlmacen');
Route::get('/almacenes/resumen/exporta_ticket', 'AlmacenController@exportTicketOrden');
Route::get('/almacenes/map', 'AlmacenController@selectAlmacen');
Route::get('/almacenes/map_ubicacion', 'AlmacenController@selectAlmacenUbicaciones');
Route::post('/almacenes/carga_masiva', 'AlmacenController@cargaTempArchivoXLS');
Route::post('/almacenes/aplica/carga_masiva', 'AlmacenController@aplicaCargaExcel');
Route::get('/almacenes/exportDetalle', 'AlmacenController@resumenAlmacenReporte');

Route::post('/almacenes/cat_ubica/store', 'AlmacenController@storeUbicacion');
Route::post('/almacenes/cat_ubica/unifica', 'AlmacenController@unificaUbicacion');
Route::get('/almacenes/cat_ubica/resumen', 'AlmacenController@resumenUbicacion');
Route::post('/almacenes/cat_ubica/remove', 'AlmacenController@removeUbicacion');
Route::get('/almacenes/filter_ubicacion', 'AlmacenController@filterAlmacenUbicaciones');





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
Route::post('/uploadfile/generico', 'UploadFileController@uploadGenerico');

// - Rutas multifondos
Route::post('/mf2/liquidarCompra', 'MultiFondosController@liquidarCompra');

// - Rutas API mercadolibre
Route::get('/meli/login', 'MercadoLibreController@login');
Route::get('/meli/logout', 'MercadoLibreController@logout');
Route::get('/meli/me', 'MercadoLibreController@me');
Route::get('/meli/refresh', 'MercadoLibreController@refreshToken');

Route::get('/meli/envios/get', 'MercadoLibreController@get30FoliosEnviosMeli');
Route::post('/meli/envios/crear', 'MercadoLibreController@creaFolioEnvioMeli');
Route::get('/meli/envios/deta', 'MercadoLibreController@getDetalleFolioEnvioMeli');
Route::post('/meli/envios/print', 'MercadoLibreController@imprimeEtiquetaEnvioFull');
Route::post('/meli/envios/reprint', 'MercadoLibreController@reimprimeEtiquetaEnvioFull');
Route::get('/meli/envios/socket', 'MercadoLibreController@socketPortPrint');

Route::get('/meli/metricas/visor', 'MercadoLibreController@getPublicacionMetricaVisor');
Route::get('/meli/metricas/visor/detalle', 'MercadoLibreController@getDetalleMetricaVisor');
Route::post('/meli/metricas/visor/save', 'MercadoLibreController@registraPublicacionVisor');
Route::get('/meli/metricas/visor/metrica', 'MercadoLibreController@metricaPublicacionVisor');
Route::post('/meli/metricas/visor/edit_estatus', 'MercadoLibreController@cambiaEstatusMetricaVisor');
Route::post('/meli/metricas/proyecto/save', 'MercadoLibreController@registrarNuevoProyecto');
Route::get('/meli/metricas/proyecto/buscar', 'MercadoLibreController@getProyectoMetricaVisor');
Route::post('/meli/metricas/proyecto/ligar', 'MercadoLibreController@ligarPublicacionConProyecto');
Route::get('/meli/metricas/proyecto/select', 'MercadoLibreController@selectProyecto');


Route::get('/meli/buscador', 'MercadoLibreController@busquedaMeli');


// - Rutas API betterware
Route::get('/bett/get', 'BetterwareController@getPage');
Route::get('/bett/resumen', 'BetterwareController@resumenMigracion');
Route::get('/bett/limpia', 'BetterwareController@limpiaTablaTemporal');
Route::get('/bett/asociadas', 'BetterwareController@listadoAsociadas');
Route::post('/bett/nueva_asociada', 'BetterwareController@nuevaAsociada');
Route::post('/bett/update_asociada', 'BetterwareController@actualizaAsociada');
Route::post('/bett/activar_asociada', 'BetterwareController@activarAsociada');
Route::post('/bett/desactivar_asociada', 'BetterwareController@desactivarAsociada');
Route::post('/bett/nueva_semana', 'BetterwareController@nuevaSemana');
Route::get('/bett/semanas', 'BetterwareController@selectSemana');
Route::get('/bett/asociadas_orden', 'BetterwareController@selectAsociada');
Route::post('/bett/nueva_orden', 'BetterwareController@nuevaOrden');
Route::get('/bett/ordenes', 'BetterwareController@getOrdenesEntrega');
Route::post('/bett/update_ordenes', 'BetterwareController@actualizaOrden');
Route::post('/bett/finaliza_ordenes', 'BetterwareController@finalizaOrden');
Route::get('/bett/resumen_ordenes', 'BetterwareController@creaResumenPDF');
Route::get('/bett/get/productos', 'BetterwareController@getProductosBett');
Route::get('/bett/migracion', 'BetterwareController@procesaTempProducto');


// ~  Rutas Tiendas
Route::get('/tienda/getcuentas', 'TiendasController@index');
Route::get('/tienda/getSelectTiendas', 'TiendasController@selectTienda');
Route::get('/tienda/getSelectCuentaTiendas', 'TiendasController@selectCuentaTienda');
Route::post('/tienda/storeCuentaTienda', 'TiendasController@storeCuentaTienda');
Route::post('/tienda/eliminarCuenta', 'TiendasController@eliminarCuentaTienda');
Route::get('/tienda/registraCuentaActiva', 'TiendasController@registraCuentaActiva');
Route::get('/tienda/getPublicaciones', 'TiendasController@getPublicaciones');
Route::get('/tienda/getDetallePublicacion', 'TiendasController@getDetallePublicacion');
Route::get('/tienda/refreshMeli', 'TiendasController@refreshTokenMeli');
Route::get('/tienda/cuentasActivasMeli', 'TiendasController@getCuentasActivasMELI');
Route::get('/tienda/ultimaventameli', 'TiendasController@getUltimaVentaMeli');
Route::get('/tienda/registraControlVenta', 'TiendasController@registraControlVenta');
Route::get('/tienda/ventas', 'TiendasController@consultaVentasMeli');
Route::get('/tienda/calculaEstadistica', 'TiendasController@calculaVentaEstadistica');
Route::get('/tienda/ventasList', 'TiendasController@getListaVentas');
Route::get('/tienda/ventas/export', 'TiendasController@exportar');
Route::get('/tienda/calculadora', 'TiendasController@simuladorCalculadoraPublicacion');

// - Rutas para Publicaciones
Route::get('/publicaciones', 'PublicacionesController@index');
Route::post('/publicaciones/guardarProductos', 'PublicacionesController@saveProductosLigados');
Route::get('/publicaciones/exportar', 'PublicacionesController@exportar');
Route::get('/publicaciones/get', 'PublicacionesController@getPublicacion');

// - Rutas para procesos BATCH
Route::get('/batch/tareas', 'BatchController@getTareas');
Route::get('/batch/descarga', 'BatchController@descargaFuente');
Route::get('/batch/test', 'BatchController@test');
Route::get('/batch/termino', 'BatchController@setTermino');
Route::get('/batch/procesos', 'BatchController@getProcesosAll');
Route::post('/batch/store', 'BatchController@storeProceso');
Route::post('/batch/update', 'BatchController@updateProceso');


// - Notificador
Route::get('/notificador/batch_termino', 'NotificadorController@mailTerminoBatch');



//~ Contabilidad
Route::get('/conta/plantilla', 'ContabilidadController@plantillaByEmpresa');
Route::post('/conta/ejercicio/crear', 'ContabilidadController@crearEjercicio');
Route::post('/conta/ejercicio/update_saldo', 'ContabilidadController@updateSaldo');
Route::get('/conta/select_empresa', 'ContabilidadController@selectEmpresa');