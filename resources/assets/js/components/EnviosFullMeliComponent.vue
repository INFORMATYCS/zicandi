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
                            <th>Fecha Cita</th>
                            <th>Hora Cita</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="envio in enviosList.envios30" :key="envio.id_meli_envio_full">
                            <td>
                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('proveedor','actualizar', proveedor)">
                                    <i class="icon-pencil"></i>
                                </button> &nbsp;                                
                            </td>
                            <td v-text="envio.cuentatienda.usuario"></td>
                            <td >
                                <a href="#" @click="showModal('envios','detalle', envio)" v-text="envio.folio_full" ></a>
                            </td>
                            <td v-text="envio.referencia"></td>
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
                isLoading: 0
                
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
                        }
                    }
                }
            },
            closeModal(){
                this.modalNuevoFolioEnvio.modal = 0;
                this.modalNuevoFolioEnvio.tituloModal = '';
                this.modalDetalleNuevoFolioEnvio.modal = 0;
                this.modalDetalleNuevoFolioEnvio.tituloModal = '';                             
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
                    
                    if(response.data.xstatus){   
                        me.modalNuevoFolioEnvio.erroresMsjList = [];
                        me.modalNuevoFolioEnvio.error = 0;
                        for(let i=0; i<response.data.zpl.length; i++){
                            let msg = response.data.zpl[i];

                            if(msg.xstatus == false){
                                me.modalNuevoFolioEnvio.error = 1;
                                me.modalNuevoFolioEnvio.erroresMsjList.push(msg.codigoBarrasFull + '=> '+ msg.error);
                                bandExito = false;
                            }
                        }

                        if(bandExito){
                            util.AVISO('Perfecto, registro correcto', util.tipoOk);  

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
        },
        mounted() {
            this.modalNuevoFolioEnvio.fechaCita = new Date();
            this.selectTienda();
            this.listaFoliosEnvio(true);
        }
    }
</script>