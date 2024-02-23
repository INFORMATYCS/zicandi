<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Tiendas</li>
            <li class="breadcrumb-item active">Envios Full</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('envios','registrar')">
                        <i class="icon-plus"></i>&nbsp;Nuevo
                    </button>                    
                </div>   
            </div>
            
            <div class="card-body">

               


                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Cuenta Meli</th>
                            <th>Folio Envio</th>
                            <th>Referencia</th>
                            <th>Foto Stock</th>
                            <th>Fecha Cita</th>
                            <th>Hora Cita</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="envio in enviosList.envios30" :key="envio.id_meli_envio_full">
                            <td>                                
                                <button type="button" class="btn btn-primary btn-sm" @click="showModal('envios','surtir', envio)">
                                    <i class="icon-social-dropbox"></i>
                                </button> &nbsp;                                
                            </td>
                            <td v-text="envio.cuentatienda.usuario"></td>
                            <td >
                                <a href="#" @click="showModal('envios','detalle', envio)" v-text="envio.folio_full" ></a>
                            </td>
                            <td v-text="envio.referencia"></td>
                            <td>
                                <a href="#" @click="showModal('envios','deta-foto-stock', envio)" v-text="envio.foto_stock_surtir" ></a>
                            </td>                            
                            <td v-text="envio.fecha_cita"></td>                                
                            <td v-text="envio.hora_cita"></td>
                            <td v-text="envio.estatus"></td>                                                            
                        </tr>                            
                    </tbody>
                </table>
                
            </div>
        </div>
            
        
        <!--Inicio del modal agregar folio envio-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalNuevoFolioEnvio.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalNuevoFolioEnvio.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Tienda</label>
                                <div class="col-md-9">
                                    <select class="form-control" v-model="modalNuevoFolioEnvio.idCuentaTienda">
                                        <option value="0" disabled>Seleccione...</option>
                                        <option v-for="cuenta in modalNuevoFolioEnvio.CuentasTiendaList" :key="cuenta.id_cuenta_tienda" :value="cuenta.id_cuenta_tienda" v-text="cuenta.usuario"></option>
                                    </select> 

                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Folio Envio</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Folio envio Full" v-model="modalNuevoFolioEnvio.folioFull">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Referencia</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Referencia" v-model="modalNuevoFolioEnvio.referencia">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Fecha Cita</label>
                                <div class="col-md-9">
                                    <datepicker v-model="modalNuevoFolioEnvio.fechaCita"></datepicker>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Hora Cita</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Hora cita" v-model="modalNuevoFolioEnvio.horaCita">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Archivo ZPL</label>
                                <div class="col-md-9">
                                    <label class="btn btn-primary custom-file-label" for="customFileLangLocal">Examinar</label>
                                    <span v-text="modalNuevoFolioEnvio.nombreArchivo"></span>
                                    <input type="file" class="custom-file-input" id="customFileLangLocal" lang="es" accept=".txt" @change="onUploadZpl()">
                                </div>
                                
                            </div>

                            <div v-show="modalNuevoFolioEnvio.error" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalNuevoFolioEnvio.erroresMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalNuevoFolioEnvio.tipoAccion==1" @click="onCreaNuevoFolioEnvio();">Guardar</button>                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->       


        <!--Inicio del modal detalle envio-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetalleNuevoFolioEnvio.modal}">
            <div class="modal-dialog modal-primary" style="max-width: 90% !important;" role="document">
                <div class="modal-content" style="height: 700px;">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalDetalleNuevoFolioEnvio.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 120px); overflow-y: scroll;">
                        

                        <div class="row">
                            <div class="col-md-8">
                                <input type="text" class="form-control form-control-lg" maxlength="30"  @focus="$event.target.select()" v-model="modalDetalleNuevoFolioEnvio.filtro" @keyup.enter="onGetDetalleEnvioFull(modalDetalleNuevoFolioEnvio.folioFull);">
                            </div>
                            <div class="col-md-3">
                                <div class="form-check">
                                    <div>
                                    <input class="form-check-input" type="radio" v-model="modalDetalleNuevoFolioEnvio.opcionFiltro" id="exampleRadios1" value="TODO" checked>
                                    <label class="form-check-label" for="exampleRadios1">
                                        Todos
                                    </label>
                                    </div>

                                    <input class="form-check-input" type="radio" v-model="modalDetalleNuevoFolioEnvio.opcionFiltro" id="exampleRadios2" value="PENDIENTE">
                                    <label class="form-check-label" for="exampleRadios2">
                                        Pendientes
                                    </label>
                                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <input class="form-check-input" type="radio" v-model="modalDetalleNuevoFolioEnvio.opcionFiltro" id="exampleRadios3" value="COMPLETO">
                                    <label class="form-check-label" for="exampleRadios3">
                                        Terminados
                                    </label>
                                </div>

                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-primary"  @click="onGetDetalleEnvioFull(modalDetalleNuevoFolioEnvio.folioFull);">Buscar</button>
                            </div>
                        </div>
                        
                        
                        
                        <div class="row">                    
                            <div class="col-md-2"><small class="text-muted">PUBLICACION</small></div>
                            <div class="col-md-2"><small class="text-muted">CODIGO FULL</small></div>
                            <div class="col-md-2"><small class="text-muted">ID PUBLICACION</small></div>
                            <div class="col-md-1"><small class="text-muted">TOTAL</small></div>
                            <div class="col-md-1"><small class="text-muted">IMPRESAS</small></div>
                            <div class="col-md-2"><small class="text-muted">PENDIENTES</small></div>
                            <div class="col-md-1"></div>
                        </div>
                        <div v-for="deta in modalDetalleNuevoFolioEnvio.detalleEnvioFull" :key="deta.id_deta_meli_envio_full">
                            

                            <div class="card-header row" v-if="deta.visible">                    
                                <div class="col-md-2">
                                    <img :src="deta.publicacion[0].foto_mini" alt="dog">
                                </div>
                                <div class="col-md-2">
                                    <span v-text="deta.codigo_barras_full"></span>
                                    <p>
                                        <small v-text="deta.publicacion[0].titulo"></small>
                                    </p>
                                </div>
                                <div class="col-md-2">
                                    <span v-text="deta.id_publicacion_tienda"></span>
                                    <p>
                                        <a href="#" @click="onVerDetalleProductos(deta);">Ver Productos</a>
                                    </p>
                                </div>
                                <div class="col-md-1">
                                    <span v-text="deta.total_etiquetas"></span>
                                </div>
                                <div class="col-md-1">
                                    <span v-text="deta.etiquetas_impresas"></span>
                                </div>
                                <div class="col-md-2">
                                    <div style="width:50px; border: 1px solid; height:50px; text-align: center;">
                                        <h2 v-text="deta.etiquetas_pendientes"></h2>
                                    </div>
                                    
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-info" @click="showModal('envios','printer', deta)">
                                        <i class="icon-printer"></i>
                                    </button>
                                    <a href="#" @click="showModal('envios','reprinter', deta)">Reimprimir</a>
                                </div>
                            </div>
                            <div v-show="deta.mostrarDetalle==1">
                                <div class="form-group row" v-for="config in deta.config" :key="config.id_config_meli_envio_full">                    
                                    <div class="col-md-2">                                            
                                        
                                    </div>
                                    <div class="col-md-2">
                                        <img :src="config.producto.url_imagen" alt="dog" width="50">
                                    </div>
                                    <div class="col-md-3">
                                        <strong>
                                            <span v-text="config.codigo_producto"></span>
                                        </strong>
                                    </div>
                                    <div class="col-md-3">
                                        <span v-text="config.producto.nombre"></span>
                                    </div>
                                    <div class="col-md-2">
                                        x <span v-text="config.total_piezas"></span>                                            
                                    </div>
                                </div>
                            </div>

                        </div>
                        

                        <div v-show="modalDetalleNuevoFolioEnvio.error" class="form-group row div-error">
                            <div class="text-center text-error">
                                <div v-for="error in modalDetalleNuevoFolioEnvio.erroresMsjList" :key="error" v-text="error"></div>
                            </div>
                        </div>

                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalNuevoFolioEnvio.tipoAccion==1" @click="onCreaNuevoFolioEnvio();">Guardar</button>                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->      

        <!--Inicio del modal surtir envio-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalSurtirFolioEnvio.modal}">
            <div class="modal-dialog modal-primary modal-lg" style="max-width: 90% !important;" role="document">
                <div class="modal-content" :style="{height: modalSurtirFolioEnvio.h}">
                    <div class="modal-header">
                        <div class="row" style="width: 100%;">
                            <div class="col-md-6">
                                <h4 class="modal-title" v-text="modalSurtirFolioEnvio.tituloModal"></h4>
                            </div>
                            <div class="col-md-2">
                                <button type="button" class="btn btn-primary"  @click="onAddFilterSurtir();">Add</button>
                                |
                                <button type="button" class="btn btn-primary"  @click="onCleanFilterSurtir();">Clean</button>
                            </div>
                            <div class="col-md-4">                                
                                <div>
                                    <button type="button" class="btn btn-danger" @click="onGeneraMovimientosSurtirEnvio();">Generar lote movimientos</button>
                                    &nbsp;&nbsp;&nbsp;
                                    <button type="button" class="close" aria-label="Close" @click="closeModal();">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>        
                            </div>
                        </div>                                                
                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 10px); overflow-y: scroll;">                        
                        <div class="row">
                            <div class="col-md-3">                                
                                <button type="button" :class="[modalSurtirFolioEnvio.tipoBusqueda ==0 ? 'btn btn-primary': 'btn btn-outline-primary']" @click="onChangeTipoBusqueda(0);">Ubicacion</button>
                                <button type="button" :class="[modalSurtirFolioEnvio.tipoBusqueda ==1 ? 'btn btn-primary': 'btn btn-outline-primary']" @click="onChangeTipoBusqueda(1);">Producto</button>
                                <button type="button" :class="[modalSurtirFolioEnvio.tipoBusqueda ==2 ? 'btn btn-primary': 'btn btn-outline-primary']" @click="onChangeTipoBusqueda(2);">Todo</button>                                
                            </div>
                            <div class="col-md-7">
                                <input type="text" class="form-control form-control-lg" maxlength="30" ref="filtroTxt" @focus="$event.target.select()" v-model="modalSurtirFolioEnvio.filtro" @keyup.enter="onGetDetalleSurtirEnvioFull();">
                            </div>
                            <div class="col-md-1">
                                <div class="form-check" v-if="modalSurtirFolioEnvio.tipoBusqueda ==2">                                    
                                    <input class="form-check-input" type="radio" v-model="modalSurtirFolioEnvio.opcionFiltro" id="exampleRadios1" value="TODO" checked>
                                    <label class="form-check-label" for="exampleRadios1">
                                        Todos
                                    </label>
                                    <br/>
                                    <input class="form-check-input" type="radio" v-model="modalSurtirFolioEnvio.opcionFiltro" id="exampleRadios2" value="PENDIENTE">
                                    <label class="form-check-label" for="exampleRadios2">
                                        Pendientes
                                    </label>
                                </div>
                                <div class="form-check" v-if="modalSurtirFolioEnvio.tipoBusqueda ==0">                                    
                                    <input class="form-check-input" type="radio" v-model="modalSurtirFolioEnvio.opcionFiltroUbica" id="exampleRadios3" value="TODO">
                                    <label class="form-check-label" for="exampleRadios3">
                                        Todos
                                    </label>
                                    <br/>
                                    <input class="form-check-input" type="radio" v-model="modalSurtirFolioEnvio.opcionFiltroUbica" id="exampleRadios4" value="PENDIENTE" checked>
                                    <label class="form-check-label" for="exampleRadios4">
                                        Pendientes
                                    </label>
                                </div>

                            </div>
                            <div class="col-md-1">
                                <button type="button" class="btn btn-primary"  @click="onGetDetalleSurtirEnvioFull();">Buscar</button>
                            </div>
                        </div>
                        <div class="row">                    
                            <div class="col-md-1"><small class="text-muted">IMG</small></div>
                            <div class="col-md-2"><small class="text-muted">PUBLICACION</small></div>
                            <div class="col-md-2"><small class="text-muted">PRODUCTO</small></div>
                            <div class="col-md-1"><small class="text-muted">PIEZAS SURTIR</small></div>
                            <div class="col-md-1"><small class="text-muted">SURTIDAS</small></div>
                            <div class="col-md-1"><small class="text-muted">PEN SURTIR</small></div>
                            <div class="col-md-2"><small class="text-muted">ESTADO</small></div>
                            <div class="col-md-2"><small class="text-muted">UBICACIONES</small></div>
                        </div>
                        <div v-for="deta in modalSurtirFolioEnvio.detalleEnvioFull" :key="deta.id_surtir_config_envio_full">
                            <div class="card-header row" style="border-top: 1px solid #c2cfd6; border-bottom: none;">
                                <div class="col-md-1">
                                    <img :src="(deta.id_producto == 0 ? 'repositorio/sistema/no_disponible.png' : deta.producto[0].url_imagen)" alt="dog">
                                </div>
                                <div class="col-md-2">
                                    <span v-text="deta.id_publicacion_tienda"></span>
                                    <p>
                                        <small v-text="(deta.id_producto == 0 ? '00000' : deta.producto[0].codigo)"></small>
                                    </p>
                                    <p>
                                        <small v-text="deta.referencia" style="color: gray"></small>
                                    </p>   
                                    <p style="margin-top: 40px;" v-if="deta.detaSurtido.length>0">
                                        <a href="#" @click="onShowDetaSurtir(deta)" v-if="deta.showDetalleSurtido==1">Ocultar detalle surtido</a>
                                        <a href="#" @click="onShowDetaSurtir(deta)" v-else>Mostrar detalle surtido</a>
                                    </p>
                                </div>
                                <div class="col-md-2">
                                    <span v-text="(deta.id_producto == 0 ? 'No localizado' : deta.producto[0].nombre)"></span>
                                </div>
                                <div class="col-md-1">
                                    <span style="font-weight: bold; font-size: 2rem;" v-text="deta.total_piezas_surtir"></span>
                                </div>
                                <div class="col-md-1">
                                    <span style="font-weight: bold; font-size: 2rem;" v-text="deta.total_piezas_surtidas"></span>
                                </div>
                                <div class="col-md-1">
                                    <span style="font-weight: bold; font-size: 2rem; color:green;" v-text="(deta.total_piezas_surtir - deta.total_piezas_surtidas)"></span>
                                </div>
                                <div class="col-md-2">
                                    <span v-text="deta.estatus"></span>
                                </div>                            
                                <div class="col-md-2">
                                    <div v-text="deta.ubicacion_1" style="font-weight: bold;"></div>
                                    <div v-text="deta.ubicacion_2"></div>
                                    <div v-text="deta.ubicacion_3"></div>                      
                                    <a href="#" @click="showModal('envios','deta-ubicaciones', deta)">mas...</a>
                                </div>
                            </div>
                            <!--Stock frame-->
                            <div class="card-header row" style="background-color: #e9eef2; padding: 1px 10px 1px 10px;" v-for="detaStock in deta.stock" :key="detaStock.id_surtir_foto_stock_envio_full">
                                <div class="col-md-2">
                                    <h5 v-text="detaStock.codigo_ubicacion" style="color:gray; padding-top: 15px;"></h5>
                                </div>
                                <div class="col-md-1">
                                    <small class="text-muted">stock</small>
                                    <h4 v-text="detaStock.stock"></h4>
                                </div>
                                <div class="col-md-1">
                                    <small class="text-muted">retenido</small>
                                    <h4 v-text="detaStock.retenido"></h4>
                                </div>                                        
                                <div class="col-md-1">
                                    <small class="text-muted">disponible</small>
                                    <h4 v-text="detaStock.disponible"></h4>
                                </div>                                        
                                <div class="col-md-2">                                    
                                    <input type="text" class="form-control form-control-lg" style="margin-top: 3px;" maxlength="4" 
                                    v-model="detaStock.totalPiezas" value="0"
                                    @focus="$event.target.select()" @keyup.enter="onAddMovimientoSurtir(deta, detaStock);">
                                </div>
                                <div class="col-md-1">
                                    <button type="button" class="btn btn-success" style="margin-top: 10px;" :disabled="btnAplicarEstado" @click="onAddMovimientoSurtir(deta, detaStock);">
                                        <i class="icon-check"></i>
                                    </button>
                                </div>
                                <div class="col-md-4">
                                    
                                </div>
                            </div>
                            <!--Detalle surtido-->
                            <div v-if="deta.showDetalleSurtido==1">
                                <div    class="card-header row" style="background-color: #d7dee3; margin-left: 10px;" 
                                        v-for="detaSurtido in deta.detaSurtido" :key="detaSurtido.id_surtir_deta_envio_full">
                                    <div class="col-md-1">
                                        <button type="button" class="btn btn-danger" @click="onDeleteMovimientoSurtir(deta, detaSurtido);">
                                            <i class="icon-trash"></i>
                                        </button>
                                    </div>
                                    <div class="col-md-2">
                                        <span v-text="detaSurtido.codigo_ubicacion"></span> (<span v-text="detaSurtido.id_almacen"></span>)
                                    </div>
                                    <div class="col-md-4">
                                        <span v-text="detaSurtido.total_piezas"></span>
                                    </div>                                        
                                    <div class="col-md-5">
                                        
                                    </div>                                                                
                                </div>
                            </div>
                        </div>
                        <div v-show="modalSurtirFolioEnvio.error" class="form-group row div-error">
                            <div class="text-center text-error">
                                <div v-for="error in modalSurtirFolioEnvio.erroresMsjList" :key="error" v-text="error"></div>
                            </div>
                        </div>
                    </div>                    
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->   


        <!--Inicio del modal imprimir-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalPrinter.modal}">
            <div class="modal-dialog modal-primary modal-dialog-centered" style="margin: 20vh auto 0px auto" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalPrinter.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="modalPrinter.modal = 0;">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">                                                
                        <div class="row">
                            <div class="col-md-3">
                                <img :src="modalPrinter.foto_mini" alt="dog">
                            </div>
                            <div class="col-md-6">
                                <span v-text="modalPrinter.titulo"></span>
                            </div>
                            <div class="col-md-3">
                                <strong><span v-text="modalPrinter.idPublicacion"></span></strong>                                
                            </div>
                        </div>
                        <input type="text" class="form-control form-control-lg" maxlength="5" v-model="modalPrinter.etiquetasImprimir" @focus="$event.target.select()">
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="modalPrinter.modal=0">Cerrar</button>
                        <button type="button" class="btn btn-primary"  @click="onImprimirEtiquetas();">Imprimir</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->    

        <!--Inicio del Detalle Ubicacion Disponible Surtir-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetaUbicaDisponible.modal}">
            <div class="modal-dialog modal-primary modal-dialog-centered" style="margin: 20vh auto 0px auto" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalDetaUbicaDisponible.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="modalDetaUbicaDisponible.modal = 0;">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">                                                
                        <div class="card-header row">
                            <div class="col-md-3">
                                Ubicacion
                            </div>
                            <div class="col-md-3">
                                Almacen
                            </div>
                            <div class="col-md-2">
                                Stk
                            </div>
                            <div class="col-md-2">
                                Ret
                            </div>
                            <div class="col-md-2">
                                Dis
                            </div>                       
                        </div>
                        <div class="row" v-for="detaUbica in modalDetaUbicaDisponible.detalleUbicaciones" :key="detaUbica.id_surtir_foto_stock_envio_full">                
                            <div class="col-md-3">
                                <strong><span v-text="detaUbica.codigo_ubicacion"></span></strong>
                            </div>
                            <div class="col-md-3">
                                <span v-text="detaUbica.almacen[0].nombre.substring(0,5)"></span> (<span v-text="detaUbica.id_almacen"></span>)
                            </div>
                            <div class="col-md-2">
                                <span v-text="detaUbica.stock"></span>
                            </div>
                            <div class="col-md-2">
                                <span v-text="detaUbica.retenido"></span>
                            </div>
                            <div class="col-md-2">
                                <span v-text="detaUbica.disponible"></span>
                            </div>                            
                        </div>                        
                    </div>                    
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->    

        <!--Inicio del Detalle Foto Stock-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetaFotoStock.modal}">
            <div class="modal-dialog modal-primary modal-dialog-centered" style="max-width: 70% !important;" role="document">
                <div class="modal-content" style="height: 650px;">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalDetaFotoStock.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="modalDetaFotoStock.modal = 0;">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 50px); overflow-y: scroll;">                                                
                        <div class="card-header row">
                            <div class="col-md-3">
                                Almacen
                            </div>
                            <div class="col-md-2">
                                Ubicacion
                            </div>
                            <div class="col-md-4">
                                Producto
                            </div>
                            <div class="col-md-1">
                                Stock
                            </div>
                            <div class="col-md-1">
                                Retenido
                            </div>
                            <div class="col-md-1">
                                Disponible
                            </div>   
                        </div>
                        <div class="row" v-for="detaFotoStock in modalDetaFotoStock.detalleStock" :key="detaFotoStock.id_surtir_foto_stock_envio_full">                
                            <div class="col-md-3">
                                <span v-text="detaFotoStock.almacen[0].nombre"></span> (<span v-text="detaFotoStock.id_almacen"></span>)
                            </div>
                            <div class="col-md-2">
                                <span v-text="detaFotoStock.codigo_ubicacion"></span>
                            </div>
                            <div class="col-md-4">
                                <span v-text="detaFotoStock.codigo_producto"></span> <span v-text="detaFotoStock.producto[0].nombre"></span>
                            </div>
                            <div class="col-md-1">
                                <span v-text="detaFotoStock.stock"></span>
                            </div>
                            <div class="col-md-1">
                                <span v-text="detaFotoStock.retenido"></span>
                            </div>
                            <div class="col-md-1">
                                <span v-text="detaFotoStock.disponible"></span>
                            </div>                            
                        </div>                        
                    </div>
                    <div class="modal-footer">
                        <div class="container">
                            <div class="row">
                                <div class="col-5">                                    
                                    <button type="button" class="btn btn-danger"  @click="onRefreshFotoStock();">Refresh</button>
                                    <small>Ultima carga: </small><small v-text="modalDetaFotoStock.ultimaActualizacion"></small>
                                </div>
                                <div class="col-1">                                
                                </div>
                                <div class="col-6">
                                    <div class="row" style="width: 100%;">
                                        <div class="col-10">
                                            <input type="text" class="form-control" placeholder="Ligar a foto existente" v-model="modalDetaFotoStock.renameFotoStock">
                                        </div>
                                        <div class="col-2">
                                            <button type="button" class="btn btn-info"  @click="onLigarFotoStock();">Ligar foto</button>
                                        </div>
                                    </div>                                                                        
                                </div>                                         
                            </div>                 
                        </div>                               
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
    import Datepicker from 'vuejs-datepicker';

    export default {
        data(){
            return{               
                enviosList:{
                    envios30: []
                },
                modalNuevoFolioEnvio: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    idCuentaTienda: 0,
                    folioFull: 0,
                    referencia: '',
                    fechaCita: '',
                    horaCita: '',
                    estatus: 'REG',
                    CuentasTiendaList: [],
                    fileSeleccion: '',
                    nombreArchivo: '',
                    error: 0,
                    erroresMsjList: [],
                },
                modalDetalleNuevoFolioEnvio: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,     
                    folioFull: 0,
                    detalleEnvioFull: [],     
                    filtro: '',        
                    opcionFiltro : 'TODO',
                    error: 0,
                    erroresMsjList: [],
                },
                modalSurtirFolioEnvio: {
                    modal: 0,
                    tituloModal: '',
                    tipoBusqueda: 0,
                    tipoAccion: 0,
                    folioFull: 0,
                    detalleEnvioFull: [],
                    filtro: '',
                    folioFullBuscador: '',
                    opcionFiltro : 'TODO',
                    opcionFiltroUbica: 'PENDIENTE',
                    error: 0,
                    erroresMsjList: [],
                    h: (window.innerHeight-50)+'px'
                },                
                modalPrinter:{
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    etiquetasImprimir: 0,
                    foto_mini: '',
                    titulo:'',
                    idPublicacion: '',
                    idDetaMeliEnvioFull: 0,
                    reimpresion: 0,
                    error: 0,
                    erroresMsjList: [],
                },
                modalDetaUbicaDisponible:{
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    detalleUbicaciones: [],
                    error: 0,
                    erroresMsjList: [],
                },
                modalDetaFotoStock:{
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    folioFull: '',
                    nameFotoStock:'',
                    detalleStock: [],
                    renameFotoStock: '',
                    ultimaActualizacion: '',
                    error: 0,
                    erroresMsjList: [],
                },
                isLoading: 0,
                btnAplicarEstado: false                
            }
        },
        computed:{
            
        },
        components: {      
            Datepicker      
        },
        methods:{
            listaFoliosEnvio(aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                let url= '/zicandi/public/meli/envios/get';
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    me.isLoading = 0;
                    me.enviosList.envios30 = respuesta.envios;            
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'envios':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.modalNuevoFolioEnvio.modal = 1;                                
                                this.modalNuevoFolioEnvio.tituloModal = 'Registrar nuevo folio de envio';
                                this.modalNuevoFolioEnvio.tipoAccion = 1;

                                this.modalNuevoFolioEnvio.fileSeleccion = null;
                                this.modalNuevoFolioEnvio.nombreArchivo = '';
                                this.modalNuevoFolioEnvio.idCuentaTienda = 0;
                                this.modalNuevoFolioEnvio.folioFull = null;
                                this.modalNuevoFolioEnvio.referencia = null;
                                this.modalNuevoFolioEnvio.fechaCita = new Date();
                                this.modalNuevoFolioEnvio.horaCita = null;

                                this.modalNuevoFolioEnvio.error = 0;
                                this.modalNuevoFolioEnvio.erroresMsjList = [];



                                break;
                            }   
                            
                            case 'detalle':
                            {
                                this.modalDetalleNuevoFolioEnvio.modal = 1;                                
                                this.modalDetalleNuevoFolioEnvio.tituloModal = 'Detalle envio full ' + data.folio_full;
                                this.modalDetalleNuevoFolioEnvio.tipoAccion = 1;                
                                this.modalDetalleNuevoFolioEnvio.folioFull = data.folio_full;                
                                
                                this.modalDetalleNuevoFolioEnvio.error = 0;
                                this.modalDetalleNuevoFolioEnvio.erroresMsjList = [];
                                

                                this.onGetDetalleEnvioFull(data.folio_full);
                                break;
                            }

                            case 'printer':
                            {
                                this.modalPrinter.modal = 1;                                
                                this.modalPrinter.tituloModal = 'Imprimir etiqueta';
                                this.modalPrinter.tipoAccion = 1;                    
                                this.modalPrinter.error = 0;
                                this.modalPrinter.erroresMsjList = [];
                                this.modalPrinter.etiquetasImprimir = data.etiquetas_pendientes;
                                this.modalPrinter.foto_mini = data.publicacion[0].foto_mini;
                                this.modalPrinter.titulo = data.publicacion[0].titulo;
                                this.modalPrinter.idPublicacion = data.publicacion[0].id_publicacion_tienda;
                                this.modalPrinter.idPublicacion = data.publicacion[0].id_publicacion_tienda;
                                this.modalPrinter.idDetaMeliEnvioFull = data.id_deta_meli_envio_full;                            
                                this.modalPrinter.reimpresion = 0;

                                
                        
                                break;
                            }

                            case 'reprinter':
                            {
                                this.modalPrinter.modal = 1;                                
                                this.modalPrinter.tituloModal = 'Reimprimir etiqueta';
                                this.modalPrinter.tipoAccion = 1;                    
                                this.modalPrinter.error = 0;
                                this.modalPrinter.erroresMsjList = [];
                                this.modalPrinter.etiquetasImprimir = data.etiquetas_pendientes;
                                this.modalPrinter.foto_mini = data.publicacion[0].foto_mini;
                                this.modalPrinter.titulo = data.publicacion[0].titulo;
                                this.modalPrinter.idPublicacion = data.publicacion[0].id_publicacion_tienda;
                                this.modalPrinter.idPublicacion = data.publicacion[0].id_publicacion_tienda;
                                this.modalPrinter.idDetaMeliEnvioFull = data.id_deta_meli_envio_full;
                                this.modalPrinter.reimpresion = 1;                            
                        
                                break;
                            }

                            case 'surtir':
                            {
                                this.modalSurtirFolioEnvio.modal = 1;                                
                                this.modalSurtirFolioEnvio.tituloModal = 'Surtir envio full ' + this.onGetLocalStorageSurtir(data.folio_full);
                                this.modalSurtirFolioEnvio.tipoAccion = 1;
                                this.modalSurtirFolioEnvio.folioFull = data.folio_full;
                                this.modalSurtirFolioEnvio.folioFullBuscador = this.onGetLocalStorageSurtir(data.folio_full);
                                this.modalSurtirFolioEnvio.error = 0;
                                this.modalSurtirFolioEnvio.erroresMsjList = [];
                                this.onChangeTipoBusqueda(2);
                                break;
                            }

                            case 'deta-ubicaciones':
                            {
                                this.modalDetaUbicaDisponible.modal = 1;                                
                                this.modalDetaUbicaDisponible.tituloModal = 'Ubicaciones stock disponible';
                                this.modalDetaUbicaDisponible.tipoAccion = 1;                    
                                this.modalDetaUbicaDisponible.error = 0;
                                this.modalDetaUbicaDisponible.erroresMsjList = [];             
                                this.onConsultaUbicaDeta(data.id_producto, data.folio_full);
                        
                                break;
                            }

                            case 'deta-foto-stock':
                            {
                                this.modalDetaFotoStock.modal = 1;                                
                                this.modalDetaFotoStock.tituloModal = 'Detalle foto stock: ' + data.foto_stock_surtir;
                                this.modalDetaFotoStock.tipoAccion = 1;                    
                                this.modalDetaFotoStock.error = 0;
                                this.modalDetaFotoStock.erroresMsjList = [];
                                this.modalDetaFotoStock.nameFotoStock= data.foto_stock_surtir;
                                this.modalDetaFotoStock.folioFull= data.folio_full;
                                this.onCargaDetalleFotoStock(data.foto_stock_surtir);
                                break;
                            }
                        }
                    }
                }
            },
            closeModal(){
                this.modalNuevoFolioEnvio.modal = 0;
                this.modalNuevoFolioEnvio.tituloModal = '';
                this.modalDetalleNuevoFolioEnvio.modal = 0;
                this.modalDetalleNuevoFolioEnvio.tituloModal = '';
                this.modalSurtirFolioEnvio.modal = 0;0
            },

            selectTienda(){                
                let me=this;                
                var url= '/zicandi/public/tienda/getSelectCuentaTiendas';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.modalNuevoFolioEnvio.CuentasTiendaList = respuesta.tiendas;     
                                
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
 
            },

            onUploadZpl(){
                let me = this;
                

                for(let i=0; i<event.target.files.length; i++){
                    this.modalNuevoFolioEnvio.fileSeleccion = event.target.files[i];
                }
                
                let nombreArchivo = this.modalNuevoFolioEnvio.fileSeleccion.name;                               
                this.modalNuevoFolioEnvio.nombreArchivo = nombreArchivo;

            },
            
            onCreaNuevoFolioEnvio(){
                let me = this;

                 if(this.validaRegistroFolio()){
                    return;
                }

                let nombreArchivo = this.modalNuevoFolioEnvio.fileSeleccion.name; 

                let fechaCita = this.modalNuevoFolioEnvio.fechaCita.getFullYear()+"-"+(this.modalNuevoFolioEnvio.fechaCita.getMonth() + 1)+"-"+this.modalNuevoFolioEnvio.fechaCita.getDate();

                const fd = new FormData();
                fd.append('archivo_zpl', this.modalNuevoFolioEnvio.fileSeleccion, nombreArchivo);
                fd.append('id_cuenta_tienda', this.modalNuevoFolioEnvio.idCuentaTienda);
                fd.append('folio_full', this.modalNuevoFolioEnvio.folioFull);
                fd.append('referencia', this.modalNuevoFolioEnvio.referencia);
                fd.append('fecha_cita', fechaCita);
                fd.append('hora_cita', this.modalNuevoFolioEnvio.horaCita);
                
                
                this.isLoading = 1;
                axios.post('/zicandi/public/meli/envios/crear',fd)
                .then(function (response) {  
                    me.isLoading = 0;   
                    let bandExito = true;        
                    console.log(response);
                    if(response.data.xstatus){   
                        me.modalNuevoFolioEnvio.erroresMsjList = [];
                        me.modalNuevoFolioEnvio.error = 0;
                        let surteEnvioOk= response.data.surtirEnvioOk;
                        let surteEnvioErr= response.data.surtirEnvioErr;
                        for(let i=0; i<response.data.zpl.length; i++){
                            let msg = response.data.zpl[i];

                            if(msg.xstatus == false){
                                me.modalNuevoFolioEnvio.error = 1;
                                me.modalNuevoFolioEnvio.erroresMsjList.push(msg.codigoBarrasFull + '=> '+ msg.error);
                                bandExito = false;
                            }
                        }

                        if(bandExito){
                            util.MSG('Envio registrado correctamente', 'Preparacion del envio '+surteEnvioOk+' ok, '+surteEnvioErr+' Err. Revise el detalle', util.tipoOk);  
                            me.listaFoliosEnvio();
                            me.closeModal();
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

            validaRegistroFolio(){
                this.modalNuevoFolioEnvio.error = 0;
                this.modalNuevoFolioEnvio.erroresMsjList = [];

                if(this.modalNuevoFolioEnvio.idCuentaTienda<=0) this.modalNuevoFolioEnvio.erroresMsjList.push("Eliga la cuenta o tienda");

                if(!this.modalNuevoFolioEnvio.folioFull) this.modalNuevoFolioEnvio.erroresMsjList.push("Defina folio de envio");

                if(!this.modalNuevoFolioEnvio.horaCita) this.modalNuevoFolioEnvio.erroresMsjList.push("Defina hora de cita");

                if(!this.modalNuevoFolioEnvio.nombreArchivo) this.modalNuevoFolioEnvio.erroresMsjList.push("Debe subir un archivo ZPL valido");

                if(this.modalNuevoFolioEnvio.erroresMsjList.length) this.modalNuevoFolioEnvio.error = 1;

                return this.modalNuevoFolioEnvio.error;
            },

            onGetDetalleEnvioFull(folioFull){
                let me = this;
                this.isLoading = 1;

                let filtro = this.modalDetalleNuevoFolioEnvio.filtro;
                let opcionFiltro = this.modalDetalleNuevoFolioEnvio.opcionFiltro;

                

                axios.get('/zicandi/public/meli/envios/deta?folio_full='+folioFull+'&filtro='+filtro+'&opcion_filtro='+opcionFiltro)
                .then(function (response) {  
                    me.isLoading = 0;                 
                    if(response.data.xstatus){   
                        
                        me.modalDetalleNuevoFolioEnvio.detalleEnvioFull = response.data.detalle;
                        
                    }else{
                        throw new Error(response.data.error);
                    } 
                                      
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onVerDetalleProductos(deta){
                console.log(deta);
                if(deta.mostrarDetalle == 1){
                    deta.mostrarDetalle = 0;
                }else{
                    deta.mostrarDetalle = 1;
                }
                
                this.$forceUpdate();
            },


            onImprimirEtiquetas(){
                let me = this;
                let reimpresion = this.modalPrinter.reimpresion;
                
                let url = '/zicandi/public/meli/envios/print';
                if(reimpresion==1){
                    url = '/zicandi/public/meli/envios/reprint';
                }

                this.isLoading = 1;
                axios.post(url,{
                    'id_deta_meli_envio_full': this.modalPrinter.idDetaMeliEnvioFull,
                    'total_etiqueta_imprime': this.modalPrinter.etiquetasImprimir
                })
                .then(function (response) {  
                    me.isLoading = 0;   
                   
                    console.log(response);
                    if(response.data.xstatus){   
                        
                       util.AVISO('Perfecto, se envio impresion', util.tipoOk);  
                       me.modalPrinter.modal = 0; 

                       if(reimpresion==0){
                            let resp = response.data.detalle;
                            for(let i=0; i<me.modalDetalleNuevoFolioEnvio.detalleEnvioFull.length; i++){
                                let deta = me.modalDetalleNuevoFolioEnvio.detalleEnvioFull[i];

                                if(deta.id_deta_meli_envio_full == resp.id_deta_meli_envio_full){
                                    me.modalDetalleNuevoFolioEnvio.detalleEnvioFull[i].etiquetas_impresas = resp.etiquetas_impresas;
                                    me.modalDetalleNuevoFolioEnvio.detalleEnvioFull[i].etiquetas_pendientes = resp.etiquetas_pendientes;
                                    me.modalDetalleNuevoFolioEnvio.detalleEnvioFull[i].estatus = resp.estatus;
                                }
                            }
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

            onChangeTipoBusqueda(tipo){
                this.modalSurtirFolioEnvio.filtro="";
                this.modalSurtirFolioEnvio.tipoBusqueda= tipo;
                this.modalSurtirFolioEnvio.detalleEnvioFull= [];

                if(tipo==2){
                    this.onGetDetalleSurtirEnvioFull();
                }
            },

            onGetDetalleSurtirEnvioFull(){
                let me = this;
                this.isLoading = 1;

                let filtro = this.modalSurtirFolioEnvio.filtro;
                let opcionFiltroAll = this.modalSurtirFolioEnvio.opcionFiltro;
                let opcionFiltroUbica= this.modalSurtirFolioEnvio.opcionFiltroUbica;
                let tipoBusqueda = "ALL";
                if(this.modalSurtirFolioEnvio.tipoBusqueda==1){
                    tipoBusqueda = "PRODUCTO";
                }else if(this.modalSurtirFolioEnvio.tipoBusqueda==0){
                    tipoBusqueda = "UBICACION";
                }

                let folioFull= this.modalSurtirFolioEnvio.folioFull;
                let folioFullBuscador= this.modalSurtirFolioEnvio.folioFullBuscador;

                axios.get('/zicandi/public/meli/surtir/envio/detalle?folio_full='+folioFull+'&filtro='+filtro+'&criterio='+tipoBusqueda+'&folios_full_complete='+folioFullBuscador)
                .then(function (response) {  
                    me.isLoading = 0;                 
                    if(response.data.xstatus){
                        let deta= response.data.deta;

                        if((tipoBusqueda=="UBICACION" && opcionFiltroUbica=="PENDIENTE") || (tipoBusqueda=="ALL" && opcionFiltroAll=="PENDIENTE")){
                            deta= [];
                            console.log("Filter");
                            response.data.deta.forEach( function(valor, indice) {
                                if(valor.estatus!="SUR"){
                                    deta.push(valor);
                                }
                            });
                        }
                        me.modalSurtirFolioEnvio.detalleEnvioFull= deta;                        
                    }else{
                        throw new Error(response.data.error);
                    } 
                                      
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });                                

                this.$refs.filtroTxt.select();
            },

            onShowDetaSurtir(deta){
                if(deta.showDetalleSurtido==1){
                    deta.showDetalleSurtido=0;
                }else{
                    deta.showDetalleSurtido=1;
                }
                
                this.$forceUpdate();
            },

            onAddMovimientoSurtir(deta, detaStock){
                this.btnAplicarEstado=true;
                let me= this;

                setInterval(()=>{ me.btnAplicarEstado= false; }, 3000);

                let piezasPendientes= deta.total_piezas_surtir-deta.total_piezas_surtidas;
                let totalPiezasAplicar= detaStock.totalPiezas;                

                let stock= detaStock.stock;
                let retenido= detaStock.retenido;
                let disponible= detaStock.disponible;

                if(totalPiezasAplicar<=0){
                    this.btnAplicarEstado=false;
                    return;
                }

                if(totalPiezasAplicar>piezasPendientes){
                    this.btnAplicarEstado=false;
                    util.MSG('Algo salio Mal!','Se supera la cantidad de piezas esperadas', util.tipoErr);
                    return;
                }

                if(totalPiezasAplicar>disponible){
                    this.btnAplicarEstado=false;
                    util.MSG('Algo salio Mal!','Stock disponible insuficiente', util.tipoErr);
                    return;
                }

                let fdSurtirAdd = new FormData();
                fdSurtirAdd.append('folio_full', deta.folio_full);
                fdSurtirAdd.append('id_surtir_config_envio_full', deta.id_surtir_config_envio_full);
                fdSurtirAdd.append('codigo_producto', detaStock.codigo_producto);
                fdSurtirAdd.append('codigo_ubicacion', detaStock.codigo_ubicacion);
                fdSurtirAdd.append('total_piezas', totalPiezasAplicar);                
                
                this.isLoading = 1;
                axios.post('/zicandi/public/meli/surtir/envio/add/movimiento',fdSurtirAdd)
                .then(function (response) {
                    me.btnAplicarEstado=false;
                    me.isLoading = 0;   
                    let bandExito = true;        
                    console.log(response);
                    
                    if(response.data.xstatus){
                        //~Actualiza montos
                        me.onCalculaStockPersisteMov(deta, response.data.detaSurtido, totalPiezasAplicar, response.data.stockFoto);
                        detaStock.totalPiezas="";
                        deta.showDetalleSurtido= 1;
                        me.$forceUpdate();

                    }else{
                        throw new Error(response.data.error);
                    } 
                    
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;
                    me.btnAplicarEstado=false;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
                
            },

            onDeleteMovimientoSurtir(deta, detaSurtido){
                util.MSG_SI_NO('Deseas borrar el movimiento','Asegurarte de regresarlo a su caja',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;
                        console.log(deta);
                        console.log(detaSurtido);
                        
                        axios.post('/zicandi/public/meli/surtir/envio/del/movimiento',{
                            'folio_full': detaSurtido.folio_full,
                            'id_surtir_config_envio_full': detaSurtido.id_surtir_config_envio_full,
                            'id_surtir_deta_envio_full': detaSurtido.id_surtir_deta_envio_full
                        })
                        .then(function (response) {
                            me.isLoading = 0;                        
                            if(response.data.xstatus){
                                //~Actualiza montos                                
                                me.onCalculaStockPersisteMov(deta, response.data.detaSurtido, detaSurtido.total_piezas*-1, response.data.stockFoto);                                                                
                                util.AVISO('Eliminado!!!', util.tipoOk);                                                                       
                                me.$forceUpdate();
                            }else{
                                throw new Error(response.data.error);
                            }
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });
                        
                    }

                });  

                
                
            },

            onCalculaStockPersisteMov(deta, detaSurtido, totalPiezas, detaStock){                
                //~Sumariza el nuevo stock surtido
                let totalPiezasSurtidas= 0;
                detaSurtido.forEach( function(valor, indice) {
                    totalPiezasSurtidas+=valor.total_piezas;
                });
                
                //~Actualiza total
                deta.total_piezas_surtidas= totalPiezasSurtidas;
                if(totalPiezasSurtidas==0){
                    deta.estatus= "PEN";
                    deta.showDetalleSurtido= 0;
                }else if(deta.total_piezas_surtir==deta.total_piezas_surtidas){
                    deta.estatus= "SUR";
                }
                else{
                    deta.estatus= "PRO";
                }
                
                //~Actualiza stock
                if(deta.stock){
                    console.log("si hay stock");
                    detaStock.forEach( function(valor, indice) {
                        deta.stock[0].retenido=valor.retenido;
                        deta.stock[0].disponible=valor.disponible;
                    });                    
                }

                //~Reemplaza el detalle
                deta.detaSurtido= detaSurtido;
                
                //~Evalua si existe la misma ubicacion y producto para replicar el nuevo stock
                this.modalSurtirFolioEnvio.detalleEnvioFull.forEach( function(gralDetaSur, indice) {
                    if(gralDetaSur.stock){
                        if(gralDetaSur.codigo_producto == deta.codigo_producto){
                            detaStock.forEach( function(valor, indice) {
                                gralDetaSur.stock[0].retenido=valor.retenido;
                                gralDetaSur.stock[0].disponible=valor.disponible;
                            }); 
                        }
                    }
                });
            },

            onConsultaUbicaDeta(idProducto, folioFull){
                let me = this;
                this.isLoading = 1;               

                axios.get('/zicandi/public/meli/surtir/envio/ubicaciones/all?folio_full='+folioFull+'&id_producto='+idProducto)
                .then(function (response) {  
                    me.isLoading = 0;                 
                    if(response.data.xstatus){                        
                        me.modalDetaUbicaDisponible.detalleUbicaciones= response.data.ubicaciones;
                    }else{
                        me.modalDetaUbicaDisponible.detalleUbicaciones=[];
                        throw new Error(response.data.error);
                    } 
                                      
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onCargaDetalleFotoStock(nameFotoStock){
                let me = this;
                this.isLoading = 1;
                console.log(nameFotoStock);                

                axios.get('/zicandi/public/meli/surtir/envio/foto/get?nameFotoStock='+nameFotoStock)
                .then(function (response) {  
                    me.isLoading = 0;                 
                    if(response.data.xstatus){                        
                        me.modalDetaFotoStock.detalleStock= response.data.deta;                        
                        if(response.data.deta.length>0){
                            me.modalDetaFotoStock.ultimaActualizacion=response.data.deta[0].created_at;                                                        
                        }
                    }else{
                        me.modalDetaFotoStock.detalleStock=[];
                        throw new Error(response.data.error);
                    }                                       
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onRefreshFotoStock(){                
                let nameFotoStock= this.modalDetaFotoStock.nameFotoStock;
                let folioFull= this.modalDetaFotoStock.folioFull;

                util.MSG_SI_NO('Actualizar stock','Al actualizar se borran todos los cambios realizados',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/meli/surtir/envio/foto/refresh',{
                            'folioFull': folioFull,
                            'nameFotoStock': nameFotoStock,
                        })
                        .then(function (response) {
                            me.isLoading = 0;                        
                            if(response.data.xstatus){                                
                                me.onCargaDetalleFotoStock(nameFotoStock)                                
                                util.AVISO('Foto actualizada!!!', util.tipoOk);
                            }else{
                                throw new Error(response.data.error);
                            }
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });
            },
            onLigarFotoStock(){                
                let nameFotoStock= this.modalDetaFotoStock.nameFotoStock;
                let folioFull= this.modalDetaFotoStock.folioFull;
                let renameFotoStock= this.modalDetaFotoStock.renameFotoStock;

                util.MSG_SI_NO('Ligar a foto stock','Estas seguro de ligarlo a otra foto de stock?',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/meli/surtir/envio/foto/ligar',{
                            'folioFull': folioFull,
                            'nameFotoStock': nameFotoStock,
                            'renameFotoStock': renameFotoStock
                        })
                        .then(function (response) {
                            me.isLoading = 0;                        
                            if(response.data.xstatus){                                
                                me.onCargaDetalleFotoStock(response.data.nameFotoStock)   
                                me.modalDetaFotoStock.tituloModal = 'Detalle foto stock: ' + response.data.nameFotoStock;
                                me.modalDetaFotoStock.renameFotoStock= '';
                                util.AVISO('Ligado al la nueva foto, ok!!!', util.tipoOk);
                                me.listaFoliosEnvio();
                            }else{
                                throw new Error(response.data.error);
                            }
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });
            },
            onGetLocalStorageSurtir(folioFull){                
                let folio=localStorage.getItem(folioFull);                
                if(folio==null){
                    localStorage.setItem(folioFull, folioFull);
                    return folioFull;
                }

                return folio;
            },
            onAddFilterSurtir(){
                let nuevoFolio = prompt('Nuevo folio para filtrar:');
                console.log(nuevoFolio);
                if(nuevoFolio!='' && nuevoFolio!=null){
                    let folioFull= this.modalSurtirFolioEnvio.folioFull;
                    let folioFullLS = this.onGetLocalStorageSurtir(folioFull);

                    localStorage.setItem(folioFull, folioFullLS + "," + nuevoFolio);
                    this.modalSurtirFolioEnvio.folioFullBuscador= this.onGetLocalStorageSurtir(folioFull);
                    this.modalSurtirFolioEnvio.tituloModal = 'Surtir envio full ' + this.onGetLocalStorageSurtir(folioFull);

                    this.onChangeTipoBusqueda(2);
                }

            },
            onCleanFilterSurtir(){           
                //~En caso de ya existir detalle surtido no se permite el borrado                
                let folioFullAnfitrion= this.modalSurtirFolioEnvio.folioFull;
                let isDetalleInvitado = false;

                this.modalSurtirFolioEnvio.detalleEnvioFull.forEach( function(gralDetaSur, indice) {                    
                    if(gralDetaSur.folio_full != folioFullAnfitrion){
                        console.log(gralDetaSur.folio_full);
                        console.log(folioFullAnfitrion);
                        
                        if(gralDetaSur.detaSurtido.length>0){
                            console.log(gralDetaSur.detaSurtido);
                            isDetalleInvitado=true;
                            return;
                        }
                    }                    
                });

                if(isDetalleInvitado){
                    util.MSG('Algo salio Mal!','Ya se surtieron algunos productos del folio invitado', util.tipoErr);
                    return null;
                }
                
                let folioFull= this.modalSurtirFolioEnvio.folioFull;
                this.modalSurtirFolioEnvio.folioFullBuscador=folioFull;
                localStorage.setItem(folioFull, folioFull);
                this.modalSurtirFolioEnvio.tituloModal = 'Surtir envio full ' + this.onGetLocalStorageSurtir(folioFull);

                this.onChangeTipoBusqueda(2);
            },
            onGeneraMovimientosSurtirEnvio(){
                util.MSG_SI_NO('Generar movimientos','Estas seguro de generar movimientos para los siguientes folios: '+this.modalSurtirFolioEnvio.folioFullBuscador ,util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/meli/surtir/envio/lote/generar',{
                            'folios_full': this.onGetLocalStorageSurtir(this.modalSurtirFolioEnvio.folioFull)                            
                        })
                        .then(function (response) {
                            me.isLoading = 0;                        
                            if(response.data.xstatus){                                                                
                                util.MSG('Lotes generados y listos para aplicarse', response.data.cadenaLotes, util.tipoOk);
                            }else{
                                throw new Error(response.data.error);
                            }
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });
                    }
                });
            }
        },
        mounted() {
            this.modalNuevoFolioEnvio.fechaCita = new Date();
            this.selectTienda();
            this.listaFoliosEnvio(true);
        }
    }
</script>