<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Catalogos</li>
            <li class="breadcrumb-item active">Stock</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('orden_entrada_salida','mostrar')">
                        <i class="icon-plus"></i>&nbsp;Orden Entrada / Salida
                    </button> 
                    <button type="button" class="btn btn-secondary" @click="showModal('orden_entrada_salida','mostrarUbicaciones')">
                        <i class="icon-plus"></i>&nbsp;Ubicaciones
                    </button>                     
                    <button type="button" class="btn btn-secondary" @click="onReiniciarCapturaOrden()">
                        <i class="icon-plus"></i>&nbsp;Reiniciar
                    </button>                     
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-info" @click="showModal('carga_masiva','mostrar')">
                        <i class="icon-plus"></i>&nbsp;Carga masiva
                    </button>
                    <button type="button" class="btn btn-info" @click="showModal('carga_captura_estandar','mostrar')">
                        <i class="icon-energy"></i>&nbsp;Captura Estandar
                    </button>
                </div>   
            </div>

            <div class="card-body">
                <!-- Buscador -->

                <div class="card small">
                    <div class="card-body">
                        <div class="row">                            
                            <div class="col-5">
                                <h5 class="card-title">Almacen</h5>                            
                                <p class="card-text">                                    
                                    <select class="form-control" v-model="idAlmacenSeleccion" @change="onResumenAlmacen()">
                                        <option value="0" disabled>Seleccione...</option>
                                        <option v-for="almacen in mapAlmacen" :key="almacen.id_almacen" :value="almacen.id_almacen" v-text="almacen.nombre"></option>                                        
                                    </select> 
                                </p>                  
                            </div>

                            <div class="col-5">                           
                                  
                                    <div class="row">                 
                                        <div class="col-7">
                                            ID
                                        </div>
                                        <div class="col-5">                                            
                                            <h6 v-text="idAlmacenSeleccion"></h6>
                                        </div>          
                                    </div>
                                    <div class="row">                 
                                        <div class="col-7">
                                            Total de productos
                                        </div>
                                        <div class="col-5">                                            
                                            <h6 v-text="resumenAlmacenSeleccion.totalProductos"></h6>
                                        </div>          
                                    </div>

                                    <div class="row">                 
                                        <div class="col-7">
                                            Total de unidades
                                        </div>
                                        <div class="col-5">                                            
                                            <h6 v-text="resumenAlmacenSeleccion.totalStock"></h6>
                                        </div>          
                                    </div>

                                    <div class="row">                 
                                        <div class="col-7">
                                            Valor
                                        </div>
                                        <div class="col-5">
                                            <h6 v-text="resumenAlmacenSeleccion.totalPesos"></h6>
                                        </div>          
                                    </div>                  
                            </div>
                            <div class="col-1">
                                <button type="button" class="btn btn-info" @click="onGenerarDetalleAlmacen()">
                                    <i class="icon-notebook"></i>
                                </button>               
                            </div>
                        </div>        
                    </div>
                </div>

                <div class="form-group row">                    
                    <div class="col-md-12">                            
                        <buscador-producto-component @setProducto="getProduccionSeleccion" ></buscador-producto-component> 
                    </div>
                </div>                

                <!-- Lista -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Imagen</th>
                            <th>Producto</th>
                            <th>Stock</th>
                            <th>Retenido</th>
                            <th>Disponible</th>
                            <th>Ubicacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="detalle in detalleAlmacenSeleccion" :key="detalle.id_stock_producto">
                            <td>
                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('detalle_movimiento','mostrar', detalle)">
                                    <i class="icon-list"></i>
                                </button> &nbsp;  
                                <button v-if="detalle.seleccion == 'si'" type="button" class="btn btn-primary btn-sm" @click="removeDetalleSeleccion(detalle)">
                                    <i class="icon-close"></i>
                                </button>   
                                <button v-if="detalle.seleccion == null" type="button" class="btn btn-light btn-sm" @click="addDetalleSeleccion(detalle)">
                                    <i class="icon-plus"></i>
                                </button> &nbsp;  
                            </td>
                            <td>
                                <img :src="detalle.url_imagen" alt="dog">
                            </td>
                            <td>
                                <div v-text="detalle.nombre"></div>
                                <span v-text="detalle.codigo"></span>
                                <br>
                                <span class="badge badge-pill badge-danger" v-if="detalle.fuera_almacen == 'si'">No registrado</span>
                            </td>                            
                            <td v-text="detalle.stock"></td>
                            <td v-text="detalle.retenido"></td>                                
                            <td v-text="detalle.disponible"></td>
                            <td>
                                <ul>
                                    <li style="list-style:none;" v-for="ubicacion in detalle.ubicacion_stock" :key="ubicacion.id_stock_ubica_producto">                                        
                                        <span class="badge badge-pill badge-info" v-text="ubicacion.stock"></span>
                                        <span v-text="ubicacion.codigo_ubica"></span>                                        
                                    </li>
                                </ul>
                               
                               
                            </td>
                        </tr>                            
                    </tbody>
                </table>
                <nav>
                    <ul class="pagination">
                        <li class="page-item" v-if="pagination.current_page > 1">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page-1, buscador.textoBuscar, buscador.criterio)">Ant</a>
                        </li>
                        <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(page, buscador.textoBuscar, buscador.criterio)" v-text="page"></a>
                        </li>                           
                        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page+1, buscador.textoBuscar, buscador.criterio)">Sig</a>
                        </li>
                    </ul>
                </nav>
                
            </div>
        </div>
            
        

        <!--Inicio del modal detalle de movimientos-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetalleMovimientos.modal}">
            <div class="modal-dialog modal-primary" style="max-width: 60% !important;" role="document">
                <div class="modal-content" style="height: 700px;">
                    <div class="modal-header">

                        <h4 class="modal-title" v-text="modalDetalleMovimientos.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 120px); overflow-y: scroll;">
                        
                        <!-- Lista -->
                        <table class="table table-bordered table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Fecha</th>
                                    <th>Lote</th>
                                    <th>Tipo movimiento</th>
                                    <th>Ubicacion</th>
                                    <th>Cantidad</th>
                                    <th>Stock</th>
                                    <th>Estatus</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="detaMov in modalDetalleMovimientos.detalleMovimientos" :key="detaMov.id_movimiento_almacen">                                                      
                                    <td v-text="detaMov.fecha_aplicacion"></td>
                                    <td v-text="detaMov.lote_referencia"></td>
                                    <td>
                                        <span v-if="detaMov.tipo_movimiento=='ING'">Ingreso</span>
                                        <span v-if="detaMov.tipo_movimiento=='RET'">Retiro</span>
                                    </td>
                                    <td v-text="detaMov.ubicacion"></td>
                                    <td style="text-align: right;">                                        
                                        <span v-if="detaMov.tipo_movimiento=='RET'">-</span>
                                        <span v-text="detaMov.cantidad"></span>                                        
                                    </td>
                                    <td style="text-align: right;" v-text="detaMov.stock"></td>
                                    <td v-text="detaMov.estatus_movimientos"></td>                                    
                                </tr>                            
                            </tbody>
                        </table>
                        <nav>
                            <ul class="pagination">
                                <li class="page-item" v-if="modalDetalleMovimientos.pagination.current_page > 1">
                                    <a class="page-link" href="#" @click.prevent="cambiarPaginaDM(modalDetalleMovimientos.pagination.current_page-1)">Ant</a>
                                </li>
                                <li class="page-item" v-for="page in pagesNumberDM" :key="page" :class="[page == isActivedDM ? 'active' : '']">
                                    <a class="page-link" href="#" @click.prevent="cambiarPaginaDM(page)" v-text="page"></a>
                                </li>                           
                                <li class="page-item" v-if="modalDetalleMovimientos.pagination.current_page < modalDetalleMovimientos.pagination.last_page">
                                    <a class="page-link" href="#" @click.prevent="cambiarPaginaDM(modalDetalleMovimientos.pagination.current_page+1)">Sig</a>
                                </li>
                            </ul>
                        </nav>
                       
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="onAplicaArrastreStock();">Aplicar arrastre de stock historico</button>
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>


        <!--Inicio del modal tareas ubicacion-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalTareasUbicacion.modal}">
            <div class="modal-dialog modal-primary" style="max-width: 70% !important;" role="document">
                <div class="modal-content">
                    <div class="modal-header">

                        <h4 class="modal-title" v-text="modalTareasUbicacion.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="modal-body">
                        <ul class="nav nav-tabs nav-justified">
                            <li class="nav-item">
                                <a class="nav-link" @click="setActive('cat_ubica')" :class="{ active: isActive('cat_ubica') }" href="#cat_ubica">Catalogo</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" @click="setActive('unificacion')" :class="{ active: isActive('unificacion') }" href="#unificacion">Unificar</a>
                            </li>
                        </ul>

                        <div class="tab-content py-3" id="myTabContent">
                    
                            <div class="tab-pane fade" :class="{ 'active show': isActive('cat_ubica') }" id="cat_ubica">
                                <div class="row">
                                    <div class="col-4">
                                        <button type="button" class="btn btn-warning btn-sm" @click="onGenerateQrUbicacion()">
                                            <i class="icon-tag"></i>
                                        </button>

                                        <button type="button" class="btn btn-light btn-sm" @click="onGenerateQrOnLine()">
                                            <i class="icon-grid"></i>
                                        </button>

                                        <button type="button" class="btn btn-warning btn-sm" @click="onCargaDetalleUbicacion('origen','ticket')">
                                            <i class="icon-printer"></i>
                                        </button>

                                        <button type="button" class="btn btn-danger btn-sm" @click="onEliminarUbicacion()">
                                            <i class="icon-trash"></i>
                                        </button>
                                        <button type="button" class="btn btn-primary btn-sm" @click="showModal('cat_ubicacion','mostrar')">
                                            <i class="icon-plus"></i>
                                        </button>
                                    </div>
                                    <div class="col-4"> 
                                        Almacen: <span v-text="modalTareasUbicacion.almacenNombre"></span>
                                        <button type="button" class="btn btn-light btn-sm" @click="onSetAlmacenByUbicacion()">
                                            <i class="icon-pencil"></i>
                                        </button>
                                    </div>
                                    <div class="col-4"> 
                                        <buscador-ubicacion-component @setUbicacion="getUbicacionSeleccionOrigen" ></buscador-ubicacion-component>
                                    </div>                                                                                                            
                                </div>

                                <div class="row">                                    
                                    <div class="col-12">
                                        <div class="row pre-scrollable">
                                            <div class="col-md-12">
                                                <ul class="list-group">
                                                    <li class="list-group-item">
                                                        <div class="row">
                                                            <div class="col-3"><strong>Codigo</strong></div>
                                                            <div class="col-6"><strong>Producto</strong></div>
                                                            <div class="col-3"><strong>Stock</strong></div>
                                                        </div>
                                                    </li>                                

                                                    <li class="list-group-item" v-for="detalle in modalTareasUbicacion.detalleOrigen" :key="detalle.codigo">                                    
                                                        <div class="row">
                                                            <div class="col-3" v-text="detalle.codigo"></div>
                                                            <div class="col-6" v-text="detalle.nombre"></div>
                                                            <div class="col-3" v-text="detalle.stock"></div>
                                                        </div>
                                                    </li>                                                               
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                                                        
                                </div>

                            </div>

                            <div class="tab-pane fade" :class="{ 'active show': isActive('unificacion') }" id="unificacion">
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-1">
                                            <button type="button" class="btn btn-warning btn-sm" @click="onCargaDetalleUbicacion('origen','ticket')">
                                                <i class="icon-printer"></i>
                                            </button>
                                        </div>
                                        <div class="col-4">
                                            <buscador-ubicacion-component @setUbicacion="getUbicacionSeleccionOrigen" ></buscador-ubicacion-component>                                             
                                        </div>
                                        <div class="col-2">
                                            <h1>=></h1>
                                        </div>
                                        <div class="col-1">
                                            <button type="button" class="btn btn-warning btn-sm" @click="onCargaDetalleUbicacion('destino','ticket')">
                                                <i class="icon-printer"></i>
                                            </button>
                                        </div>
                                        <div class="col-4">
                                            <buscador-ubicacion-component @setUbicacion="getUbicacionSeleccionDestino" ></buscador-ubicacion-component>                                        
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-5 pre-scrollable">
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <div class="row">
                                                        <div class="col-3"><strong>Codigo</strong></div>
                                                        <div class="col-6"><strong>Producto</strong></div>
                                                        <div class="col-3"><strong>Stock</strong></div>
                                                    </div>
                                                </li>                                

                                                <li class="list-group-item" v-for="detalle in modalTareasUbicacion.detalleOrigen" :key="detalle.codigo">                                    
                                                    <div class="row">
                                                        <div class="col-3" v-text="detalle.codigo"></div>
                                                        <div class="col-6" v-text="detalle.nombre"></div>
                                                        <div class="col-3" v-text="detalle.stock"></div>
                                                    </div>
                                                </li>                                                               
                                            </ul>
                                        </div>
                                    
                                        <div class="col-md-2">
                                        
                                        </div>
                                        <div class="col-md-5 pre-scrollable">
                                            <ul class="list-group">
                                                <li class="list-group-item">
                                                    <div class="row">
                                                        <div class="col-3"><strong>Codigo</strong></div>
                                                        <div class="col-6"><strong>Producto</strong></div>
                                                        <div class="col-3"><strong>Stock</strong></div>
                                                    </div>
                                                </li>                                

                                                <li class="list-group-item" v-for="detalle in modalTareasUbicacion.detalleDestino" :key="detalle.codigo">                                    
                                                    <div class="row">
                                                        <div class="col-3" v-text="detalle.codigo"></div>
                                                        <div class="col-6" v-text="detalle.nombre"></div>
                                                        <div class="col-3" v-text="detalle.stock"></div>
                                                    </div>
                                                </li>                                                               
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-footer">
                                    <button type="button" class="btn btn-primary" @click="onUnificarUbicaciones();">Unificar</button>                                            
                                </div>    
                            </div>


                            
                        </div>

                    </div>
                    
                    <div class="modal-footer">                        
                        <button v-if="modalTareasUbicacion.mostrarBotonReporteQr" type="button" class="btn btn-secondary" @click="onDepurarDirQr();">Limpiar y generar nuevo reporte</button>
                        <button v-if="modalTareasUbicacion.mostrarBotonReporteQr" type="button" class="btn btn-secondary" @click="onImprimirCodigosQr();">Imprimir codigos QR</button>
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->

        <!--Inicio del modal Orden entrada y salida-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalOrdenEntradaSalida.modal}">
            <div class="modal-dialog modal-primary" style="max-width: 90% !important;" role="document">
                <div class="modal-content" style="height: 700px;">
                    <div class="modal-header">

                        <h4 class="modal-title" v-text="modalOrdenEntradaSalida.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 120px); overflow-y: scroll;">
                        <div class="list-group">                            
                            <div class="list-group-item list-group-item-action" v-for="orden in detalleSeleccion" :key="orden.id_stock_producto">
                                <div class="row">                    
                                    <div class="col-md-6">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <img :src="orden.url_imagen" alt="dog">
                                            </div>
                                            <div class="col-md-5">
                                                <div v-text="orden.nombre"></div>
                                                <div><strong v-text="orden.codigo"></strong></div>
                                            </div>
                                            <div class="col-md-4">
                                                <span v-text="orden.disponible"></span>&nbsp;/&nbsp;<span class="text-muted" v-text="orden.retenido"></span>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    
                                    <div class="col-md-6">
                                        
                                            <div v-for="ubica in orden.ubicacion_stock" :key="ubica.codigo_ubica">
                                                <div class="row">
                                                    <div class="col-1">                                                        
                                                        <a href="#" class="badge badge-pill badge-danger" v-if="ubica.isMovimientoProcesado && ubica.xstatus == false" @click="onShowResultadoMov(ubica)">Err</a>

                                                        <a href="#" class="badge badge-pill badge-success" v-if="ubica.isMovimientoProcesado && ubica.xstatus == true" @click="onShowResultadoMov(ubica)">Ok</a>
                                                    </div>
                                                    <div class="col-3">
                                                        <strong v-text="ubica.codigo_ubica"></strong>&nbsp;<span class="text-muted" v-text="ubica.stock"></span>
                                                    </div>
                                                    <div class="col-3">                                                        
                                                        <input type="text" style="width:100%;" class="form-control" v-model="ubica.nuevoStock">
                                                    </div>
                                                    <div class="col-3">
                                                        <input type="text" style="width:100%;" class="form-control" v-model="ubica.setStock" v-if="chkModoSet" @keyup.enter="onCaculaNuevoStock(ubica)">
                                                    </div>
                                                    <div class="col-2">
                                                        <div class="badge badge-pill badge-danger" v-if="ubica.nuevoStock<0">RETIRO</div>
                                                        <div class="badge badge-pill badge-success" v-if="ubica.nuevoStock>0">INGRESO</div>
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>
                                            <div>     
                                                <div class="row">
                                                    <div class="col-1">
                                                        <button type="button" class="btn btn-warning btn-sm" @click="showModal('cat_ubicacion','mostrar')">
                                                        <i class="icon-plus"></i>
                                                    </button>
                                                    </div>
                                                    <div class="col-11">
                                                        <buscador-ubicacion-component @setUbicacion="getUbicacionSeleccionInOut" :data=orden></buscador-ubicacion-component>                                                
                                                    </div>
                                                </div>
                                                                                                                                                    
                                            </div>
                                        
                                    </div>
                                </div>   

                                
                            </div>
                            
                        
                        </div>
  
                       
                       
                    </div>
                    <div class="modal-footer justify-content-start">
                        <div style="padding-left:30px;">                            
                            <input type="checkbox" class="form-check-input" v-model="chkModoSet">
                            <label class="form-check-label" for="exampleCheck1">Activar modo SET</label>
                        </div>
                                    
                    </div>                                        
                    <div class="modal-footer">
    
                        <button type="button" class="btn btn-secondary" v-if="modalOrdenEntradaSalida.resultadoProcesaLote == 0 || modalOrdenEntradaSalida.resultadoProcesaLote == 1" @click="onAplicarOrden();" :disabled="btnAplicarEstado">Aplicar</button>
                        <button type="button" class="btn btn-secondary" v-if="modalOrdenEntradaSalida.resultadoProcesaLote >= 1" @click="onGenerarReporte();">Generar reporte</button>
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>                            
                                    
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->


        <!--Inicio modal craear ubicacion-->
        <div class="modal fade" :class="{'mostrar' : modalCatUbicacion.modal}" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" v-text="modalCatUbicacion.tituloModal"></h5>
                <button type="button" class="close" aria-label="Close" @click="closeModal();">
                    <span aria-hidden="true">×</span>
                </button>                
            </div>
            <div class="modal-body">
                <small v-text="modalCatUbicacion.catUbicacionesLastStr"></small>
                
                <form>
                <div class="form-group">
                    <label for="recipient-name" class="col-form-label">Codigo:</label>
                    <input type="text" class="form-control" v-model="modalCatUbicacion.codigo" @keyup="modalCatUbicacion.nombre=modalCatUbicacion.codigo">
                </div>
                <div class="form-group">
                    <label for="message-text" class="col-form-label">Nombre:</label>
                    <input type="text" class="form-control" v-model="modalCatUbicacion.nombre">
                </div>
                <div class="form-group">
                    <label for="message-text" class="col-form-label">ID Almacen:</label>
                    <select class="form-control" v-model="modalCatUbicacion.idAlmacenSeleccion">
                        <option value="0" disabled>Seleccione...</option>
                        <option v-for="almacen in modalCatUbicacion.mapAlmacen" :key="almacen.id_almacen" :value="almacen.id_almacen" v-text="almacen.nombre"></option>                                        
                    </select>
                </div>
                </form>
            </div>
            <div class="modal-footer">                
                <button type="button" class="btn btn-primary" @click="onStoreUbicacionAlmacen()">Guardar</button>
            </div>
            </div>
        </div>
        </div>

        <!--Inicio del modal carga masiva-->
        <div class="modal fade" :class="{'mostrar' : modalCargaMasiva.modal}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
            <div class="modal-dialog modal-primary" style="max-width: 70% !important;" role="document">
                <div class="modal-content" style="height: 700px;">
                    <div class="modal-header">

                        <h4 class="modal-title" v-text="modalCargaMasiva.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 120px); overflow-y: scroll;">
                        <input type="file" class="custom-file-input" id="customFileLangLocal" lang="es" accept=".xls, .xlsx" @change="onUploadExcel()">
                        <div class="row" v-if="modalCargaMasiva.cargaTemporal.length==0">                            
                            <div class="col-4">                                                                 
                                <a href="repositorio/sistema/plantillas_excel/PlantillaSetStockUbicacion.xlsx">Descargar plantilla</a>
                            </div>                            
                            <div class="col-4">                                
                                <label class="btn btn-primary custom-file-label" for="customFileLangLocal">Examinar</label>                                            
                            </div>
                            
                        </div>

                        <div class="row" v-for="temp in modalCargaMasiva.cargaTemporal" :key="temp.id_temp_carga_stock">                            
                            <div class="col-2">                                                                                                 
                                <img :src="temp.producto.url_imagen" alt="dog"> 
                            </div>                            
                            <div class="col-2">                                
                                <div><strong><span v-text="temp.producto.codigo"></span></strong></div>
                                <div v-text="temp.producto.nombre"></div>                                
                            </div>
                            <div class="col-2">                                
                                <div><span v-text="temp.tipo_movimiento"></span></div>
                                <div >[<span v-text="temp.almacen.nombre"></span>] <span v-text="temp.codigo_ubicacion"></span></div>
                                <div><span v-text="temp.cantidad"></span> <span class="text-muted">piezas</span></div>                                
                            </div>                            
                            <div class="col-3" v-if="temp.estatus=='ACE' || temp.estatus=='ERR'"> 
                                <div><span class="text-muted">Actual</span> <span v-text="temp.stock_actual"></span></div>  
                                <div><span class="text-muted">Operar</span> <span v-text="temp.piezas_operar"></span></div>                                  
                                <div><span class="text-muted">Nuevo</span> <span v-text="temp.stock_nuevo"></span></div>                                 
                            </div>
                            <div class="col-3" v-if="temp.estatus=='APL'"> 
                                <div><span class="text-muted">Stock</span> <span v-text="temp.movimiento.stockUbicacion.stock"></span></div>
                            </div>
                            <div class="col-3" v-if="temp.estatus=='EPL'"> 
                                
                            </div>
                            <div class="col-2"> 
                                <div class="blockquote-footer" v-text="temp.lote_referencia"></div>                               

                                <div v-if="temp.estatus=='ACE'" v-text="temp.estatus" style="color: green;"></div>
                                <div v-if="temp.estatus=='APL'" v-text="temp.estatus" style="color: blue;"></div>
                                <div v-if="temp.estatus=='EPL'" v-text="temp.estatus" style="color: red;" data-toggle="tooltip" data-placement="top" :title="temp.diagnostico"></div>
                                <div v-if="temp.estatus=='ERR'" v-text="temp.estatus" style="color: red;" data-toggle="tooltip" data-placement="top" :title="temp.diagnostico"></div>
                            </div>                            
                           
                        </div>
                        
                       
                    </div>
                    
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" v-if="modalCargaMasiva.cargaTemporal.length>0" @click="onAplicarMovimientoTemp();">Aplicar movimientos</button>                        
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->


        <!--Inicio modal captura estandar-->
        <div class="modal fade" :class="{'mostrar' : modalCapturaEstandar.modal}" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true">
            
            <div class="modal-dialog modal-primary" style="max-width: 90% !important;" role="document">
                <div class="modal-content" :style="{height: modalCapturaEstandar.h}">
                    <div class="modal-header" style="height: 30px;">
                        <h5 class="modal-title" v-text="modalCapturaEstandar.tituloModal"></h5>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>                        
                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 10px); overflow-y: scroll;">
                        <captura-estandar-component></captura-estandar-component> 
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->

        </div>
        <!--Fin del modal-->


    </main>    
</template>

<script>
    export default {
        data(){
            return{       
                activeItem: 'cat_ubica',
                isLoading: 0,        
                mapAlmacen:[],
                mapUbicaciones:[],
                idAlmacenSeleccion: 0,
                buscador: '',
                resumenAlmacenSeleccion:{
                    totalProductos: 0,
                    totalStock:0,
                    totalPesos:0,
                    almacen:null                    
                },              
                detalleAlmacenSeleccion:[],
                modalDetalleMovimientos: {
                    modal: 0,
                    tituloModal: '',                    
                    error: 0,
                    erroresMsjList: [],
                    detalleMovimientos: [],
                    producto: null,
                    pagination: {
                        total : 0,
                        current_page  : 0,
                        per_page : 0,
                        last_page : 0,
                        from : 0,
                        to : 0                    
                    }
                },
                detalleSeleccion:[],
                modalOrdenEntradaSalida: {
                    modal: 0,
                    tituloModal: '',                    
                    error: 0,
                    erroresMsjList: [],
                    resultadoProcesaLote: 0
                },
                modalTareasUbicacion: {
                    modal: 0,
                    tituloModal: '',                    
                    error: 0,
                    erroresMsjList: [],
                    codigoOrigen: '',
                    codigoDestino: '',
                    detalleOrigen: [],
                    detalleDestino: [],                    
                    mostrarBotonReporteQr: false,
                    almacenNombre: ''
                },
                pagination: {
                    total : 0,
                    current_page  : 0,
                    per_page : 0,
                    last_page : 0,
                    from : 0,
                    to : 0                    
                },
                modalCatUbicacion: {
                    modal: 0,
                    tituloModal: '',                    
                    error: 0,
                    erroresMsjList: [],
                    codigo:'',
                    nombre:'',
                    mapAlmacen:[],
                    idAlmacenSeleccion: 0,
                    catUbicacionesLastStr: '',
                    catUbicaciones: []
                },
                loteReferencia: '',
                chkModoSet: false,
                modalCargaMasiva: {
                    modal: 0,
                    tituloModal: '',                    
                    error: 0,
                    erroresMsjList: [],
                    fileSeleccion: null,
                    fileServidor: '',
                    cargaTemporal: []
                },
                modalCapturaEstandar: {
                    modal: 0,
                    tituloModal: '',
                    h: (window.innerHeight-50)+'px'                
                },                
                btnAplicarEstado: false
            }
        },
        computed:{
            isActived: function(){
                return this.pagination.current_page;
            },
            pagesNumber: function(){
               return  paginador.getPagesNumber(this.pagination);                
            },
            isActivedDM: function(){
                return this.modalDetalleMovimientos.pagination.current_page;
            },
            pagesNumberDM: function(){
               return  paginador.getPagesNumber(this.modalDetalleMovimientos.pagination);                
            }
        },
        methods:{
            /**
             * Recupera el map de almacenes
             * 
             */
            onGetMapAlmacen(){                
                let me=this;                
                let url= '/zicandi/public/almacenes/map';
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;                      
                    me.mapAlmacen = respuesta.almacen;
                    me.modalCatUbicacion.mapAlmacen = respuesta.almacen;
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            /**
             * Recupera el map de ubicaciones
             * 
             */
            onGetMapAlmacenUbicacion(){                
                let me=this;                
                let url= '/zicandi/public/almacenes/map_ubicacion';
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;                      
                    me.mapUbicaciones = respuesta.ubicaciones;
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            /**
             * Recupera el map de ubicaciones
             * 
             */
            onGeneraLoteReferencia(){                
                let me=this;                
                let url= '/zicandi/public/almacenes/resumen/genera_lote';
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;                      
                    me.loteReferencia = respuesta.lote;
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            /**
             * Recupera el resumen por almacen seleccionado
             * 
             * 
             */
            onResumenAlmacen(){                
                let me = this;
                this.isLoading = 1;
                axios.get('/zicandi/public/almacenes/resumen?id_almacen='+this.idAlmacenSeleccion)
                .then(function (response) {  
                    me.isLoading = 0;                 
                    if(response.data.xstatus){                                                
                        me.resumenAlmacenSeleccion.totalProductos = response.data.totalProductos;
                        me.resumenAlmacenSeleccion.totalStock = response.data.totalStock;
                        me.resumenAlmacenSeleccion.totalPesos = "$ "+util.toMoneda(response.data.totalPesos);
                        me.resumenAlmacenSeleccion.almacen = response.data.almacen;
                        
                        me.onResumenDetalleAlmacen(1, null);
                        
                    }else{
                        throw new Error(response.data.error);
                    } 
                                      
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            /**
             * Recupera el resumen y detalle por almacen
             * 
             * 
             */
            onResumenDetalleAlmacen(page, id_producto){                
                let me = this;
                this.isLoading = 1;
                let url = '/zicandi/public/almacenes/resumen/detalle?page=' + page + '&id_almacen='+this.idAlmacenSeleccion;
                if(id_producto!=null){
                    url = url + '&id_producto='+id_producto;
                }                

                axios.get(url)
                .then(function (response) {  
                    me.isLoading = 0;                                             
             
                    if(response.data.xstatus){ 
                        //~Marca si ya fue seleccionado
                        let resultado = response.data.detalle.data;
                        for(let i=0; i<=resultado.length-1; i++){
                            let deta = resultado[i];                            

                            for(let x=0; x<=me.detalleSeleccion.length-1; x++){
                                let seleccion = me.detalleSeleccion[x];

                                if(deta.id_producto == seleccion.id_producto){
                                    resultado[i].seleccion = 'si';
                                    break;
                                }

                            }                        
                        }

                        me.detalleAlmacenSeleccion = resultado;                                            
                        me.pagination = response.data.pagination;

                        if( me.detalleAlmacenSeleccion.length == 0 && me.buscador.id_producto!=null){
                            let registro = {
                                codigo:me.buscador.codigo, 
                                disponible:0,
                                id_almacen: me.idAlmacenSeleccion,
                                id_producto: me.buscador.id_producto,
                                id_stock_producto: 0,
                                nombre: me.buscador.nombre,
                                retenido: 0,
                                stock: 0,
                                ubicacion_stock: [],
                                ultimo_precio_compra: 0,
                                url_imagen: me.buscador.url_imagen,
                                fuera_almacen: 'si'                                
                            };

                            //~Marca si ya fue seleccionado                        
                            for(let x=0; x<=me.detalleSeleccion.length-1; x++){
                                let seleccion = me.detalleSeleccion[x];

                                if(seleccion.id_producto == me.buscador.id_producto){
                                    registro.seleccion = 'si';
                                    break;
                                }

                            }
                                                    
                            me.detalleAlmacenSeleccion.push(registro);
                        }

                    }else{
                        throw new Error(response.data.error);
                    } 
                                      
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            /**
             * Producto seleccion en buscador
             * 
             */
            getProduccionSeleccion(producto){     
                console.log(producto);
                this.buscador = producto;                           
                this.onResumenDetalleAlmacen(1, producto.id_producto);
            },

            /**
             * Ubicacion seleccion en buscador
             * 
             */
             getUbicacionSeleccionOrigen(resp){ 
                let ubicacion = resp.ubicacion;

                if(ubicacion!=null){
                    this.modalTareasUbicacion.codigoOrigen = ubicacion.codigo;
                    this.onCargaDetalleUbicacion('origen','consulta');
                    this.onGetAlmacenByUbicacion();
                }else{
                    this.modalTareasUbicacion.codigoOrigen = null;
                    this.modalTareasUbicacion.detalleOrigen = [];
                }
            },

            /**
             * Ubicacion seleccion en buscador Destino
             * 
             */
             getUbicacionSeleccionDestino(resp){                                                     
                let ubicacion = resp.ubicacion;
                
                if(ubicacion!=null){
                    this.modalTareasUbicacion.codigoDestino = ubicacion.codigo;
                    this.onCargaDetalleUbicacion('destino','consulta');
                }else{
                    this.modalTareasUbicacion.codigoDestino = null;
                    this.modalTareasUbicacion.detalleDestino = [];
                }
            },

            /**
             * Ubicacion seleccion en buscador Destino
             * 
             */
             getUbicacionSeleccionInOut(resp){                                                     
                let ubicacion = resp.ubicacion;
        
                if(ubicacion!=null){                    
                    resp.data.nuevaUbicacionSelect = ubicacion.codigo;
                    this.onNuevaUbicacionOrden(resp.data);
                }
            },

            /**
             * Detalle de movimientos
             * 
             * 
             */
            onDetalleMovimientosProducto(page, id_producto){                
                let me = this;
                this.isLoading = 1;
                let url = '/zicandi/public/almacenes/resumen/movimientos?page=' + page + '&id_almacen='+this.idAlmacenSeleccion+ '&id_producto='+id_producto;                
        
                axios.get(url)
                .then(function (response) {  
                    me.isLoading = 0;       
                    console.log(response);
                    if(response.data.xstatus){ 
                        me.modalDetalleMovimientos.detalleMovimientos = response.data.detalle.data;                                            
                        me.modalDetalleMovimientos.pagination = response.data.pagination;
                    }else{
                        throw new Error(response.data.error);
                    } 
                                      
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            /**
             * Cambio de pagina
             * 
             * 
             */
            cambiarPagina(page){
                let me = this;

                me.modalDetalleMovimientos.pagination.current_page = page;

                me.onResumenDetalleAlmacen(page, null);
            },

            /**
             * Cambio de pagina detalle de movimientos
             * 
             * 
             */
            cambiarPaginaDM(page){
                let me = this;

                me.modalDetalleMovimientos.pagination.current_page = page;

                me.onDetalleMovimientosProducto(page, me.modalDetalleMovimientos.producto.id_producto);
            },

            /***
             * Abre modales
             * 
             * 
             */
            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'detalle_movimiento':
                    {
                        switch(accion){
                            case 'mostrar':
                            {                                
                                this.modalDetalleMovimientos.tituloModal = 'Detalle de movimientos';
                                this.modalDetalleMovimientos.tipoAccion = 1;
                                this.modalDetalleMovimientos.modal = 1;
                                this.modalDetalleMovimientos.detalleMovimientos = null;                                
                                this.modalDetalleMovimientos.producto = data;      
                                
                                this.onDetalleMovimientosProducto(1, data.id_producto);
                                
                                break;
                            }
                        }

                        break;
                    }
                    case 'orden_entrada_salida':
                    {
                        switch(accion){
                            case 'mostrar':
                            {                                
                                if(this.detalleSeleccion.length>0){
                                    this.modalOrdenEntradaSalida.tituloModal = 'Orden de entrada y salida al almacen: '+this.loteReferencia;
                                    this.modalOrdenEntradaSalida.tipoAccion = 1;
                                    this.modalOrdenEntradaSalida.modal = 1;                                
                                }else{
                                    util.MSG('Algo salio Mal!','Sin productos seleccionados', util.tipoErr);
                                }
                                
                                break;
                            }
                            case 'mostrarUbicaciones':
                            {                                
                                
                                this.modalTareasUbicacion.tituloModal = 'Tareas ubicaciones';
                                this.modalTareasUbicacion.tipoAccion = 1;
                                this.modalTareasUbicacion.modal = 1;                                
                                
                                break;
                            }
                            
                        }

                        break;
                    }      
                    case 'cat_ubicacion':
                    {
                        switch(accion){
                            case 'mostrar':
                            {                                
                                this.modalCatUbicacion.tituloModal = 'Nueva ubicacion';
                                this.modalCatUbicacion.tipoAccion = 1;
                                this.modalCatUbicacion.modal = 1;   
                                this.modalCatUbicacion.idAlmacenSeleccion= 22;
                                let diaHoy = new Date();
                                let prefixUbica= (diaHoy.getFullYear()+"").substring(2) + ("0" + (diaHoy.getMonth()+1)).slice (-2) +"-";
                                this.modalCatUbicacion.codigo= prefixUbica;
                                this.modalCatUbicacion.nombre= prefixUbica;
                                this.onLastUbicaCat_async();
                                break;
                            }
                            
                        }

                        break;
                    }
                    case 'carga_masiva':
                    {
                        switch(accion){
                            case 'mostrar':
                            {                                                                
                                this.modalCargaMasiva.tituloModal = 'Carga masiva de stock';
                                this.modalCargaMasiva.tipoAccion = 1;
                                this.modalCargaMasiva.modal = 1;   
                                this.modalCargaMasiva.fileSeleccion = null;   
                                this.modalCargaMasiva.fileServidor = '';   
                                this.modalCargaMasiva.cargaTemporal = [];  
                                this.modalCargaMasiva.cargaServidorExitosa = false;
                                break;
                            }
                            
                        }

                        break;
                    }
                    case 'carga_captura_estandar':
                    {
                        switch(accion){
                            case 'mostrar':
                            {                                                                                                
                                this.modalCapturaEstandar.modal = 1;
                                this.modalCapturaEstandar.tituloModal = 'Captura estandar (rapida)';
                                break;
                            }
                            
                        }

                        break;
                    }  
                }                
            },
            /**
             * Cierre modales
             * 
             * 
             */
            closeModal(){

                this.modalDetalleMovimientos.modal = 0;                
                this.modalDetalleMovimientos.tituloModal = '';

                this.modalOrdenEntradaSalida.modal = 0;                
                this.modalOrdenEntradaSalida.tituloModal = '';

                this.modalTareasUbicacion.modal = 0;                
                this.modalTareasUbicacion.tituloModal = '';

                this.modalCatUbicacion.modal = 0;                
                this.modalCatUbicacion.tituloModal = '';

                this.modalCargaMasiva.modal = 0;                
                this.modalCargaMasiva.tituloModal = '';

                this.modalCapturaEstandar.modal = 0;                
                this.modalCapturaEstandar.tituloModal = '';
            },

            addDetalleSeleccion(data){   
                data.seleccion ='si';             
                this.detalleSeleccion.push(data);
                this.$forceUpdate();

            },

            removeDetalleSeleccion(data){                   
                data.seleccion = null;  
                let detalleSeleccionAux = [];

                for(let x=0; x<=this.detalleSeleccion.length-1; x++){
                    if(this.detalleSeleccion[x].id_producto!=data.id_producto){
                        detalleSeleccionAux.push(this.detalleSeleccion[x]);
                    }
                }      
                this.detalleSeleccion = detalleSeleccionAux;
                this.$forceUpdate();
            },

            //~Crea nueva ubicacion
            onNuevaUbicacionOrden(orden){     

                if(orden.nuevaUbicacionSelect=="_new_"){
                    this.showModal('cat_ubicacion','mostrar');
                    return;
                }

                let ubicacion = orden.ubicacion_stock;
                console.log('Selecciona actual del combio: ' + orden);
                console.log(orden);
                let existe = false;
                for(let i=0; i<=ubicacion.length-1; i++){
                    if(ubicacion[i].codigo_ubica == orden.nuevaUbicacionSelect){
                        existe = true;
                    }
                }
                
                if(!existe){
                    let registro = {
                        codigo_ubica: orden.nuevaUbicacionSelect, 
                        id_producto: orden.id_producto,
                        id_stock_producto: orden.id_stock_producto,
                        id_stock_ubica_producto: 0,
                        stock: '',
                        nuevo: 'si'
                    };                    
                    orden.ubicacion_stock.push(registro);                    

                }

            },
            //~Reinicia todos los componentes
            onReiniciarCapturaOrden(){
                
                //this.idAlmacenSeleccion=  0;
                this.buscador= '';                
                this.resumenAlmacenSeleccion.totalProductos= 0;
                this.resumenAlmacenSeleccion.totalStock=0;
                this.resumenAlmacenSeleccion.totalPesos=0;
                this.resumenAlmacenSeleccion.almacen=null;
                this.detalleAlmacenSeleccion=[];                
                this.detalleSeleccion=[];
                this.loteReferencia = '';
                this.chkModoSet = false;
                
                this.modalDetalleMovimientos.modal=0;
                this.modalDetalleMovimientos.tituloModal='';
                this.modalDetalleMovimientos.error=0;
                this.modalDetalleMovimientos.erroresMsjList=[];
                this.modalDetalleMovimientos.detalleMovimientos=[];
                this.modalDetalleMovimientos.producto=null;                

                this.modalOrdenEntradaSalida.modal=0;
                this.modalOrdenEntradaSalida.tituloModal='';
                this.modalOrdenEntradaSalida.error=0;
                this.modalOrdenEntradaSalida.erroresMsjList=[];
                this.modalOrdenEntradaSalida.resultadoProcesaLote=0;

                this.onGetMapAlmacen();
                this.onGetMapAlmacenUbicacion();
                this.onGeneraLoteReferencia();
                this.onResumenAlmacen();


            },
            /***
             * Aplica el movimiento en el almacen
             * 
             * 
             */
            onAplicarMovimientos(orden){                
                return new Promise(function (resolve, reject) {                    
                    axios.post('/zicandi/public/almacenes/movimiento',{
                        'idAlmacen': orden.idAlmacen,
                        'idProducto': orden.idProducto,
                        'tipoMovimiento': orden.tipoMovimiento,
                        'cantidad': orden.cantidad,                    
                        'ubicacion': orden.ubicacion,
                        'loteReferencia': orden.loteReferencia                    
                    })
                    .then(function (response) {                         
                        resolve(response.data);
                    })
                    .catch(function (error) {                        
                        reject(error);
                    });
                });

            },

            /**
             * De manera secuencial aplica todos los movimientos de la orden
             * 
             * 
             */
            onAplicarOrden(){
                this.btnAplicarEstado = true;

                let pilaTrabajo = [];                
                let me = this;

                //~ Construye la pila de trabajo
                for(let i=0; i<=this.detalleSeleccion.length-1; i++){
                    let orden = this.detalleSeleccion[i];
                    let ubicacion = orden.ubicacion_stock;
                    for(let n=0; n<=ubicacion.length-1; n++){
                    
                        let ubicacionStock = ubicacion[n];
                        let tipoMovimiento = 'INGRESO';
                        if(parseFloat(ubicacionStock.nuevoStock)<0){
                            tipoMovimiento = 'RETIRO';                            
                        }

                        let registro = {
                            'indiceOrden': i,
                            'indiceUbicacion': n,
                            'idAlmacen': orden.id_almacen,
                            'idProducto': orden.id_producto,
                            'tipoMovimiento': tipoMovimiento,
                            'cantidad': parseFloat(ubicacionStock.nuevoStock) < 0 ? parseFloat(ubicacionStock.nuevoStock) * -1: parseFloat(ubicacionStock.nuevoStock),                
                            'ubicacion': ubicacionStock.codigo_ubica,
                            'loteReferencia': this.loteReferencia
                        };

                        if(!(ubicacionStock.isMovimientoProcesado && ubicacionStock.xstatus)){
                            console.log(registro);
                            if(parseFloat(registro.cantidad)!=0 && !isNaN(registro.cantidad)){                            
                                pilaTrabajo.push(registro);
                                ubicacionStock.isMovimientoProcesado = false;
                            }
                            
                        }
                        
                    }
                    
                }
                
                let procesaOk = 0;
                let procesaErr = 0;
                //~Procesa la pila de trabajo
                pilaTrabajo.reduce(
                    function (sequence, datosVO) {
                        return sequence.then(function() {
                            //~Proceso a ejecutar               
                            return me.onAplicarMovimientos(datosVO);
                        }).then(function(response) {
                            console.log('Termina ejecucion de proceso');
                            console.log(response);

                            //~Envia resultado a arreglo origen
                            me.detalleSeleccion[datosVO.indiceOrden].ubicacion_stock[datosVO.indiceUbicacion].isMovimientoProcesado = true;
                            me.detalleSeleccion[datosVO.indiceOrden].ubicacion_stock[datosVO.indiceUbicacion].xstatus = response.xstatus;
                            me.detalleSeleccion[datosVO.indiceOrden].ubicacion_stock[datosVO.indiceUbicacion].error = response.error;

                            if(response.xstatus == true){
                                me.detalleSeleccion[datosVO.indiceOrden].ubicacion_stock[datosVO.indiceUbicacion].movimiento = response.movimiento;
                                me.detalleSeleccion[datosVO.indiceOrden].stock = response.stockProducto.stock;
                                me.detalleSeleccion[datosVO.indiceOrden].retenido = response.stockProducto.retenido;
                                me.detalleSeleccion[datosVO.indiceOrden].disponible = response.stockProducto.disponible;

                                me.detalleSeleccion[datosVO.indiceOrden].ubicacion_stock[datosVO.indiceUbicacion].stock = response.stockUbicacion.stock;

                                procesaOk++;                
                            }else{
                                procesaErr++;
                            }
                                                        
                            me.$forceUpdate();                                                       
                        });
                    },
                    Promise.resolve()
                ).then(function() {
                    //~Termina la ejecucion de toda la pila
                    util.AVISO('Termina ejecucion', util.tipoOk);
                    me.btnAplicarEstado = false;

                    if(procesaOk > 0 && procesaErr == 0){
                        me.modalOrdenEntradaSalida.resultadoProcesaLote= 2;
                    }else if(procesaOk > 0 || procesaErr > 0){
                        me.modalOrdenEntradaSalida.resultadoProcesaLote= 1;
                    }

                    
                    
                });
            },

            /**
             * Muestra en pantalla el resultado de la aplicacion del mov en almacen
             * 
             * 
             */
            onShowResultadoMov(resultado){                       
                if(resultado.xstatus == false){                    
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(resultado.error), util.tipoErr);
                }
            },

            /**
             * Muestras pdf ticket en pantalla
             * 
             */
            onGenerarReporte(){             
                let url = '/zicandi/public/almacenes/resumen/exporta_ticket?lote_referencia=' + this.loteReferencia;                
                Swal.fire({
                    title: 'Ticket',
                    html: '<embed src="'+url+'" type="application/pdf" width="100%" height="300px" />',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false                    
                });       
            },

            /**
             * Realiza el calculo del nuevo stock
             * 
             */
            onCaculaNuevoStock(ubica){                
                let stock = parseFloat(ubica.stock);
                let setStock = parseFloat(ubica.setStock);
                if(setStock<0){
                    setStock = stock;
                }

                let complemento = setStock - stock;
                ubica.nuevoStock = complemento;

                this.$forceUpdate();
            },


            /**
             * Carga el detalle actual por ubicacion
             * 
             * 
             */
            onCargaDetalleUbicacion(tag, tipoSalida){
                let me = this;                
                let codigoOrigen = this.modalTareasUbicacion.codigoOrigen;
                let codigoDestino = this.modalTareasUbicacion.codigoDestino;         
                
                if(tag=="origen"){
                    url = '/zicandi/public/almacenes/cat_ubica/resumen?opcion='+tipoSalida+'&codigoUbicacion='+codigoOrigen;
                }else{
                    url = '/zicandi/public/almacenes/cat_ubica/resumen?opcion='+tipoSalida+'&codigoUbicacion='+codigoDestino;
                }

                console.log(url);

                if(tipoSalida=="ticket"){
                    if((me.modalTareasUbicacion.detalleOrigen.length > 0 && tag == "origen") || (me.modalTareasUbicacion.detalleDestino.length > 0 && tag == "destino"))
                    Swal.fire({
                        title: 'Ticket',
                        html: '<embed src="'+url+'" type="application/pdf" width="100%" height="300px" />',
                        showCloseButton: false,
                        showCancelButton: false,
                        focusConfirm: false                    
                    });
                }else{
                    this.isLoading = 1;

                    axios.get(url)
                    .then(function (response) {  
                        me.isLoading = 0;                           
                        if(response.data.xstatus){ 
                            if(tag=="origen"){
                                me.modalTareasUbicacion.detalleOrigen = response.data.detalleUbicacion;                                            
                            }else{
                                me.modalTareasUbicacion.detalleDestino = response.data.detalleUbicacion;                                            
                            }                                                
                        }else{
                            throw new Error(response.data.error);
                        } 
                                        
                    })
                    .catch(function (error) {       
                        me.isLoading = 0;             
                        util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                    });
                }

            },


            /***
             * Realiza la unificacion de ubicaciones
             * 
             * 
             */
            onUnificarUbicaciones(){
                let me = this;                
                let codigoOrigen = this.modalTareasUbicacion.codigoOrigen;
                let codigoDestino = this.modalTareasUbicacion.codigoDestino; 

                if(codigoOrigen==null || codigoDestino==null){
                    util.MSG('Algo salio Mal!', 'Selecciona una ubicacion origen y destino', util.tipoErr);
                    return;
                }

                if(codigoOrigen==codigoDestino){
                    util.MSG('Algo salio Mal!', 'No puedes inificar la misma ubicacion', util.tipoErr);
                    return;
                }

                if(me.modalTareasUbicacion.detalleOrigen.length <= 0){
                    util.MSG('Algo salio Mal!', 'Sin registros origen que unificar', util.tipoErr);
                    return;
                }

                this.isLoading = 1;
                axios.post('/zicandi/public/almacenes/cat_ubica/unifica',{
                        'ubicacionOrigen': codigoOrigen,
                        'ubicacionDestino': codigoDestino                       
                })
                .then(function (response) {  
                    me.isLoading = 0;
                    if(response.data.xstatus){ 
                        me.isLoading = 1;
                        /*
                        Aplica el lote
                        */
                        axios.post('/zicandi/public/lop/aplica-lote',{
                            'lote_referencia': response.data.lote
                        })
                        .then(function (responseApl) {  
                            me.isLoading = 0;                            
                            me.loteOperacionProcesosDeta = responseApl.data.deta;
                            let totalErrCtn=0;
                            responseApl.data.deta.forEach( function(valor, indice) {
                                if(valor.estado=='E'){
                                    totalErrCtn++;
                                }                                     
                            });

                            me.onCargaDetalleUbicacion('origen', 'consulta');
                            me.onCargaDetalleUbicacion('detino', 'consulta');                            

                            if(totalErrCtn==0){                        
                                me.aplicaLoteBtnVisible=0;                                
                                util.MSG('Bien!','Unificacion exitosa!. Lote se aplico correctamente y completo', util.tipoOk);
                            }else{
                                util.MSG('Algo salio Mal!','Valide, hay '+totalErrCtn+' errores. El resto se aplicó CORRECTAMENTE', util.tipoErr);
                            }
                        })
                        .catch(function (error) {       
                            me.isLoading = 0;             
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });
                       
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });

            },

            onEliminarUbicacion(){
                let me = this;                
                let codigoOrigen = this.modalTareasUbicacion.codigoOrigen;                

                if(me.modalTareasUbicacion.detalleOrigen.length > 0){
                    util.MSG('Algo salio Mal!', 'La ubicacion no esta vacia', util.tipoErr);
                    return;
                }


                this.isLoading = 1;
                axios.post('/zicandi/public/almacenes/cat_ubica/remove',{
                        'ubicacion': codigoOrigen                      
                })
                .then(function (response) {  
                    me.isLoading = 0;           
                    console.log(response);                
                    if(response.data.xstatus){ 
                        me.onGetMapAlmacenUbicacion();
                        util.AVISO('Perfecto, se borro la ubicacion', util.tipoOk);                       
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });

            },

            onStoreUbicacionAlmacen(){
                let me = this;                
                this.isLoading = 1;
                axios.post('/zicandi/public/almacenes/cat_ubica/store',{
                        'codigo': this.modalCatUbicacion.codigo.toUpperCase(),
                        'nombre': this.modalCatUbicacion.nombre.toUpperCase(),
                        'id_almacen': this.modalCatUbicacion.idAlmacenSeleccion
                })
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){ 
                        let ubicacion = response.data.ubicacion;
                        me.mapUbicaciones.push(ubicacion);
                        me.$forceUpdate();
                        me.modalCatUbicacion.modal = 0;                
                        me.modalCatUbicacion.tituloModal = '';            
                        me.onLastUbicaCat_async();            
                        util.MSG_SI_NO('Etiqueta', 'Deseas imprimir la etiqueta?', util.tipoPreg).
                        then((result) => {
                            if(result==util.btnSi){
                                me.modalTareasUbicacion.codigoOrigen= me.modalCatUbicacion.codigo.toUpperCase();
                                me.onGenerateQrOnLine();

                                util.AVISO('Se registro nueva ubicacion, Impresion OK', util.tipoOk);
                            }else{
                                util.AVISO('Se registro nueva ubicacion, seleccionala...', util.tipoOk);
                            }
                        });
                       
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });

            },

            onUploadExcel(){
                let me = this;
                this.isLoading = 1;

                for(let i=0; i<event.target.files.length; i++){
                    this.modalCargaMasiva.fileSeleccion = event.target.files[i];
                }
                
                let nombreArchivo = this.modalCargaMasiva.fileSeleccion.name;
                
                const fd = new FormData();
                fd.append('file', this.modalCargaMasiva.fileSeleccion, nombreArchivo);                

                
                me.modalCargaMasiva.cargaServidorExitosa = false;
                axios.post('/zicandi/public/almacenes/carga_masiva', fd)
                .then(function (response) {                                                                                
                    me.modalCargaMasiva.cargaServidorExitosa = true;
                    
                    me.modalCargaMasiva.cargaTemporal = response.data.carga;

                    me.isLoading = 0;

                })
                .catch(function (error) {       
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });

            },

            /**
             * Genera reporte en excel del detalle del almacen
             * 
             * 
             */
            onGenerarDetalleAlmacen(){
                 window.open('/zicandi/public/almacenes/exportDetalle?idAlmacen='+this.idAlmacenSeleccion);
            },


            onAplicarMovimientoTemp(){
                let me = this;                
                

                this.isLoading = 1;
                axios.post('/zicandi/public/almacenes/aplica/carga_masiva')
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){ 
                        let respuesta = response.data.carga;

                        

                        for(let x=0; x<me.modalCargaMasiva.cargaTemporal.length; x++){
                            
                            for(let i=0; i<respuesta.length; i++){
                                let cargaTemporal = respuesta[i];
                                
                                if( cargaTemporal.id_temp_carga_stock == me.modalCargaMasiva.cargaTemporal[x].id_temp_carga_stock ){
                                    me.modalCargaMasiva.cargaTemporal[x].estatus = cargaTemporal.estatus;
                                    me.modalCargaMasiva.cargaTemporal[x].diagnostico = cargaTemporal.diagnostico;
                                    me.modalCargaMasiva.cargaTemporal[x].movimiento = cargaTemporal.movimiento;                                    
                                }
                            
                            }    
                        }

                        console.log(me.modalCargaMasiva.cargaTemporal);

                        
                        console.log('Todo ok');
                       
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });

            },
            isActive (menuItem) {
                return this.activeItem === menuItem
            },
            setActive (menuItem) {
                this.activeItem = menuItem


                this.modalTareasUbicacion.codigoOrigen = null;
                this.modalTareasUbicacion.detalleOrigen = [];
                this.modalTareasUbicacion.codigoDestino = null;
                this.modalTareasUbicacion.detalleDestino = [];


                if(menuItem=="cat_ubica"){
                    //this.onResumenMigracionBett();
                }

                if(menuItem=="unificacion"){
                    //this.onGetProcesosBatch();
                }
            },

            /**
             * Ejecuta el arrastre de stock a peticion
             * 
             */
            onAplicaArrastreStock(){
                let me = this;                            
                this.isLoading = 1;
                let idProducto = me.modalDetalleMovimientos.producto.id_producto;

                axios.post('/zicandi/public/almacenes/arrastreStock',{
                        'idProducto': idProducto
                })
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){
                        me.onDetalleMovimientosProducto(1, idProducto);
                        
                        util.AVISO('Perfecto, se relizo el arrastre, valide posibles cambios de stock!', util.tipoOk);
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            /**
             * Genera codigo QR
             * 
             */
            onGenerateQrUbicacion(){
                let me = this;                            
                this.isLoading = 1;                
                let codigoOrigen = this.modalTareasUbicacion.codigoOrigen;

                axios.post('/zicandi/public/almacenes/cat_ubica/generate-qr',{
                        'text': codigoOrigen
                })
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){
                        me.modalTareasUbicacion.mostrarBotonReporteQr=true;
                        
                        util.AVISO('Codigo QR generado', util.tipoOk);
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            /**
             * Genera reporte con QR almacenados
             * 
             */
            onImprimirCodigosQr(){                
                let url = '/zicandi/public/almacenes/cat_ubica/report-qr';

                Swal.fire({
                    title: 'Ticket',
                    html: '<embed src="'+url+'" type="application/pdf" width="100%" height="300px" />',
                    showCloseButton: false,
                    showCancelButton: false,
                    focusConfirm: false                    
                });       
            },

            /**
             * Depura directorio con QR almacenados previamente
             * 
             * 
             */
            onDepurarDirQr(){
                let me = this;                            
                this.isLoading = 1;

                axios.get('/zicandi/public/almacenes/cat_ubica/depura/report-qr')
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){
                        me.modalTareasUbicacion.mostrarBotonReporteQr=false;                        
                        util.AVISO('Perfecto, se limpio el repositorio de QR local', util.tipoOk);
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onGenerateQrOnLine(){
                let me = this;                            
                
                let codigoOrigen = this.modalTareasUbicacion.codigoOrigen;

                if(codigoOrigen==null || codigoOrigen==''){
                    util.MSG('Algo salio Mal!','Selecciona una ubicacion', util.tipoErr);
                    return;
                }                

                this.isLoading = 1;                
                axios.post('/zicandi/public/almacenes/cat_ubica/generate-qr-label',{
                        'text': codigoOrigen
                })
                .then(function (response) {  
                    me.isLoading = 0;           
  
                    if(response.data.xstatus){                        
                        util.AVISO('Codigo QR generado, imprimiendo...', util.tipoOk);
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            /**
             * Consulta el almacen ligado a la ubicacion
             * 
             */
             onGetAlmacenByUbicacion(){                
                let me = this;
                this.isLoading = 1;
                let codigo= this.modalTareasUbicacion.codigoOrigen;
                let url = '/zicandi/public/almacenes/cat_ubica/get-almacen?codigo='+codigo;
        
                axios.get(url)
                .then(function (response) {
                    console.log(response);
                    me.isLoading = 0;                           
                    if(response.data.xstatus){
                        if(response.data.almacen!=null){
                            me.modalTareasUbicacion.almacenNombre= response.data.almacen.nombre;
                        }else{
                            me.modalTareasUbicacion.almacenNombre= "";
                        }
                    }else{
                        me.modalTareasUbicacion.almacenNombre= "";
                    } 
                                      
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onSetAlmacenByUbicacion(){
                let me = this;                
                let codigo= this.modalTareasUbicacion.codigoOrigen;
                let idAlmacen = prompt("Id Almacen", this.idAlmacenSeleccion);
                if(idAlmacen!=undefined){                                    
                    this.isLoading = 1;
                    axios.post('/zicandi/public/almacenes/cat_ubica/set-almacen',{
                            'codigo': codigo,
                            'id_almacen': idAlmacen                       
                    })
                    .then(function (response) {  
                        me.isLoading = 0;           
                        
                        if(response.data.xstatus){ 
                            me.onDetalleMovimientosProducto();                       
                        }else{
                            throw new Error(response.data.error);
                        } 
                                        
                    })
                    .catch(function (error) {       
                        me.isLoading = 0;             
                        util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                    });
                }
            },

            onLastUbicaCat_async(){
                let me = this;                            
                this.isLoading = 1;

                axios.get('/zicandi/public/almacenes/cat_ubica/get-last-ubica')
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){
                        me.modalCatUbicacion.catUbicacionesLastStr=response.data.lastUbicaStr;
                        me.modalCatUbicacion.catUbicaciones=response.data.catUbicacion;                        
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },



        },
        mounted() {
            this.onGetMapAlmacen();
            this.onGetMapAlmacenUbicacion();
            this.onGeneraLoteReferencia();
        }
    }
</script>


