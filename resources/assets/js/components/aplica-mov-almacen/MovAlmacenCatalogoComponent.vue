<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Catalogos</li>
            <li class="breadcrumb-item active">Lotes aplica movimientos almacen</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('lote','detalle')">
                        <i class="icon-list"></i>&nbsp;Nuevo
                    </button> 
                    <button type="button" class="btn btn-secondary" @click="onExportarPublicaciones()">
                        <i class="icon-plus"></i>&nbsp;Exportar Detalle Excel
                    </button>                     
                </div>   
            </div>
            
            <div class="card-body">
                <!-- Buscador -->
                <div class="form-group row"> 
                    <div class="col-md-8">
                        <div class="input-group">                            
                            <input type="text" v-model="filterLote" @keyup.enter="listar()" @focus="$event.target.select()" class="form-control" style="font-size:30px;" placeholder="Prefijo Lote" autofocus>
                        </div>                
                    </div>                    
                </div>

                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Lote</th>
                            <th>Referencia</th>
                            <th>Fecha Operacion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="lote in detaCatalogo" :key="lote.lote_referencia">
                            <td>
                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('lote','detalle', lote)">
                                    <i class="icon-list"></i>
                                </button> &nbsp;
                                <button type="button" class="btn btn-danger btn-sm" @click="onEliminar(lote.lote_referencia)">
                                    <i class="icon-trash"></i>
                                </button>
                            </td>
                            <td v-text="lote.lote_referencia"></td>
                            <td v-text="lote.referencia"></td>
                            <td v-text="lote.fecha_operacion"></td>
                            <td>
                                <span v-if="lote.estado_error>0">CON ERRORES</span>
                                <span v-else-if="lote.estado_pendiente>0">PENDIENTE DE APLICAR</span>
                                <span v-else>APLICADO OK</span>
                            </td>
                        </tr>                            
                    </tbody>
                </table>               
            </div>
        </div>

        <!--Inicio del modal DETALLE lote-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetalleLote.modal}">
            <div class="modal-dialog modal-primary modal-lg" style="max-width: 90% !important;" role="document">
                <div class="modal-content" :style="{height: modalDetalleLote.h}">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalDetalleLote.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 10px); overflow-y: scroll;">
                        <table class="table table-bordered table-striped table-sm">
                            <thead>
                                <tr>
                                    <th>Opciones</th>
                                    <th>Referencia</th>
                                    <th>Fecha</th>
                                    <th>Almacen</th>
                                    <th>Ubicacion</th>
                                    <th>Codigo</th>
                                    <th>Nombre producto</th>
                                    <th>Tipo Mov</th>
                                    <th>Cantidad</th>
                                    <th>Estado</th>
                                    <th>Msg</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="deta in modalDetalleLote.loteOperacionProcesosDeta" :key="deta.id_lote_operacion">
                                    <td>
                                        <button type="button" v-if="deta.estado=='P' || deta.estado=='E'" class="btn btn-warning btn-sm" @click="showModal('lote','edit', deta)">
                                            <i class="icon-pencil"></i>
                                        </button> &nbsp;
                                        <button type="button" v-if="deta.estado=='P' || deta.estado=='E'" class="btn btn-danger btn-sm" @click="onEliminar(deta.id_lote_operacion)">
                                            <i class="icon-trash"></i>
                                        </button>
                                        <button type="button" v-if="deta.estado=='A'" class="btn btn-primary btn-sm" @click="showModal('lote','deta-mov', deta)">
                                            <i class="icon-list"></i>
                                        </button>
                                    </td>
                                    <td v-text="deta.referencia"></td>
                                    <td v-text="deta.fecha_operacion"></td>                                    
                                    <td v-text="deta.nombre_almacen"></td>
                                    <td v-text="deta.codigo_ubicacion"></td>
                                    <td v-text="deta.codigo_producto" style="text-decoration: underline blue; cursor: pointer;" @click="mostrarImagenProd(deta.url_img_producto, deta.nombre_producto);"></td>
                                    <td v-text="deta.nombre_producto"></td>
                                    <td v-text="deta.tipo_movimiento"></td>
                                    <td v-text="deta.cantidad"></td>
                                    <td v-text="deta.estado"></td>
                                    <td v-text="deta.msg_error"></td>
                                </tr>                            
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-danger" v-if="modalDetalleLote.regPendientesCnt > 0" @click="onAplicaLote();">Aplicar pendientes o con error</button>                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->


        <!--Inicio del modal EDIT lote-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalEditReg.modal}">
            <div class="modal-dialog modal-secondary modal-lg" style="max-width: 50% !important;" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalEditReg.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeSubModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Almacen</label>
                                <div class="col-md-9">
                                    <input type="text" disabled="disabled" class="form-control" placeholder="Alias - Nombre" v-model="modalEditReg.data.nombre_almacen">                                    
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Ubicacion</label>
                                <div class="col-md-9">
                                    <input type="text" disabled="disabled" class="form-control" placeholder="Alias - Nombre" v-model="modalEditReg.data.codigo_ubicacion">                                    
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Codigo producto</label>
                                <div class="col-md-9">
                                    <input type="text" disabled="disabled" class="form-control" placeholder="Alias - Nombre" v-model="modalEditReg.data.codigo_producto">                                    
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Producto</label>
                                <div class="col-md-9">
                                    <input type="text" disabled="disabled" class="form-control" placeholder="Alias - Nombre" v-model="modalEditReg.data.nombre_producto">                                    
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Tipo movimiento</label>
                                <div class="col-md-9">
                                    <select class="form-control" v-model="modalEditReg.data.tipo_movimiento">                                        
                                        <option value="RET">Retiro</option>
                                        <option value="ING">Ingreso</option>                                        
                                    </select>                                     
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Cantidad</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Alias - Nombre" v-model="modalEditReg.data.cantidad">                                    
                                </div>
                            </div>

                            
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeSubModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalEditReg.tipoAccion==1" @click="updateRegLote(modalEditReg.data);">Guardar</button>                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->

        <!--Inicio del modal detalle de movimientos-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetalleMovimientos.modal}">
            <div class="modal-dialog modal-secondary" style="max-width: 60% !important;" role="document">
                <div class="modal-content" style="height: 700px;">
                    <div class="modal-header">

                        <h4 class="modal-title" v-text="modalDetalleMovimientos.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeSubModal();">
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
                                    <td>
                                        <span v-if="modalDetalleLote.loteSeleccionado == detaMov.lote_referencia" style="color:red;" v-text="detaMov.lote_referencia"></span>
                                        <span v-else v-text="detaMov.lote_referencia"></span>
                                    </td>
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
                    </div>                    
                    <div class="modal-footer">                        
                        <button type="button" class="btn btn-secondary" @click="closeSubModal();">Cerrar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>

    </main>    
</template>

<script>
    export default {
        data(){
            return{
                isLoading: 0,
                isProcessBackend: false,
                filterLote:'',
                detaCatalogo:[],
                modalDetalleLote: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    loteSeleccionado: '',
                    loteOperacionProcesosDeta: [],
                    regPendientesCnt: 0,
                    error: 0,
                    erroresMsjList: [],
                    h: (window.innerHeight-50)+'px'
                },
                modalEditReg: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    data: [],                    
                    error: 0,
                    erroresMsjList: []
                },
                modalDetalleMovimientos: {
                    modal: 0,
                    tituloModal: '',                    
                    error: 0,
                    erroresMsjList: [],
                    detalleMovimientos: [],
                    producto: null
                },
            }
        },
        computed:{            
        },
        methods:{
            listar(){                
                this.isLoading = 1;                

                let me=this;                
                let url= '/zicandi/public/lop/get-catalog-lotes?prefix_lote=' + this.filterLote;
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    me.isLoading = 0;
                    me.detaCatalogo = respuesta.result;                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onEliminar(lote){
                util.MSG_SI_NO('Eliminar?','El borrar el lote no elimina los movimientos aplicados',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/lop/elimina-lote',{
                            'lote_referencia': lote
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Eliminado!!!', util.tipoOk);                                       
                            me.listar();
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });      
            },
            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'lote':
                    {
                        switch(accion){
                            case 'detalle':
                            {
                                this.modalDetalleLote.modal = 1;                                
                                this.modalDetalleLote.tituloModal = 'Detalle lote: ' + data['lote_referencia'];
                                this.modalDetalleLote.tipoAccion = 1;                                

                                this.modalDetalleLote.loteSeleccionado= data['lote_referencia'];
                                this.modalDetalleLote.loteOperacionProcesosDeta=[];
                                this.modalDetalleLote.regPendientesCnt=0;

                                this.onGetDetalleLote(data['lote_referencia']);
                                break;
                            }

                            case 'edit':
                            {
                                this.modalEditReg.modal = 1;                                
                                this.modalEditReg.tituloModal = 'Editar registro pendiente o con error';
                                this.modalEditReg.tipoAccion = 1;
                                this.modalEditReg.data= data;                                
                                break;
                            }

                            case 'deta-mov':
                            {
                                this.modalDetalleMovimientos.modal = 1;                                
                                this.modalDetalleMovimientos.tituloModal = 'Detalle de movimientos, ' + data.nombre_almacen + ' - ' + data.nombre_producto;
                                this.onDetalleMovimientosProducto(data);
                                break;
                            }                            
                        }
                    }
                }
            },

            closeModal(){                
                this.modalDetalleLote.modal = 0;                              
                this.modalDetalleLote.tituloModal = '';                
                this.modalDetalleLote.loteSeleccionado='';
                this.modalDetalleLote.loteOperacionProcesosDeta=[];
                this.modalDetalleLote.regPendientesCnt=0;
            },

            closeSubModal(){
                this.modalEditReg.modal = 0;                              
                this.modalEditReg.tituloModal = ''; 
                this.modalDetalleMovimientos.modal = 0;                              
                this.modalDetalleMovimientos.tituloModal = '';
            },

            onGetDetalleLote(idLote){                
                let me=this;  
                this.idLoteActual = idLote;
                this.isLoading = 1;              
                let url= '/zicandi/public/lop/get-detalle-lote?lote_referencia='+this.idLoteActual;
                axios.get(url)
                .then(function (response) {                    
                    me.isLoading = 0;
                    let respuesta = response.data;                      
                    me.modalDetalleLote.loteOperacionProcesosDeta = respuesta.deta;

                    respuesta.deta.forEach( function(valor, indice) {
                        if(valor.estado=='P' || valor.estado=='E'){
                            me.modalDetalleLote.regPendientesCnt++;
                        }
                    });

                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            updateRegLote(data){
                this.isLoading = 1;
                let me = this;

                axios.post('/zicandi/public/lop/update-reg-lote',{
                    'id_lote_operacion': data.id_lote_operacion,
                    'tipo_movimiento': data.tipo_movimiento,
                    'cantidad': data.cantidad
                })
                .then(function (response) {
                    me.isLoading = 0;
                    util.AVISO('Actualizado: ' + response.data.xstatus, util.tipoOk);                                       
                    me.onGetDetalleLote(data.lote_referencia);
                })
                .catch(function (error) {
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
                
            },

            onAplicaLote(){
                let me=this;

                if(this.isProcessBackend){
                    return;
                }
  
                this.isLoading = 1;
                this.isProcessBackend = true;
                axios.post('/zicandi/public/lop/aplica-lote',{
                    'lote_referencia': this.modalDetalleLote.loteSeleccionado
                })
                .then(function (response) {  
                    me.isLoading = 0;
                    me.isProcessBackend = false;
                    me.modalDetalleLote.loteOperacionProcesosDeta = response.data.deta;

                    let totalErrCtn=0;
                    response.data.deta.forEach( function(valor, indice) {
                        if(valor.estado=='E'){
                            totalErrCtn++;
                        }                                     
                    });

                    if(totalErrCtn==0){
                        me.modalDetalleLote.regPendientesCnt=0;
                        util.MSG('Bien!','Lote se aplico correctamente y completo', util.tipoOk);
                    }else{
                        util.MSG('Algo salio Mal!','Valide, hay '+totalErrCtn+' errores. El resto se aplicó CORRECTAMENTE', util.tipoErr);
                    }
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            mostrarImagenProd(img, dato){                
                util.POPUP_IMG(img, dato);
            },

            /**
             * Detalle de movimientos
             * 
             * 
             */
             onDetalleMovimientosProducto(data){                
                let me = this;
                this.isLoading = 1;
                let page = 1;
                let idAlmacenSeleccion= data.id_almacen;
                let id_producto= data.id_producto;
                let url = '/zicandi/public/almacenes/resumen/movimientos?page=' + page + '&id_almacen='+idAlmacenSeleccion+ '&id_producto='+id_producto;                
        
                axios.get(url)
                .then(function (response) {  
                    me.isLoading = 0;       
                    console.log(response);
                    if(response.data.xstatus){ 
                        me.modalDetalleMovimientos.detalleMovimientos = response.data.detalle.data;                                                                    
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
        mounted() {
            this.listar();
        }
    }
</script>