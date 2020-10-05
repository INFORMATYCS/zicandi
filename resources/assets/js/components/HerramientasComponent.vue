<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Herramientas</li>            
        </ol>

         
        <div class="container-fluid">           

            <div class="card-body">
                <ul class="nav nav-tabs nav-justified">
                    <li class="nav-item">
                        <a class="nav-link" @click="setActive('nota_remision')" :class="{ active: isActive('nota_remision') }" href="#nota_remision">Remision Betterware</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="setActive('cat_bett')" :class="{ active: isActive('cat_bett') }" href="#cat_bett">Catalogo Betterware</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="setActive('batch')" :class="{ active: isActive('batch') }" href="#contact">BATCH</a>
                    </li>
                </ul>
                <div class="tab-content py-3" id="myTabContent">
                    
                    <div class="tab-pane fade" :class="{ 'active show': isActive('nota_remision') }" id="nota_remision">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            
                            <div class="form-group row">                                
                                <div class="col-md-12">
                                    <div class="card">

                                        
                                        <label class="btn btn-primary" for="customFileLang">Subir archivo</label>

                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="tab-pane fade" :class="{ 'active show': isActive('cat_bett') }" id="cat_bett">
                        <div class="card-body">
                            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                                <div class="form-group row">
                                    <label class="col-md-5 form-control-label" for="text-input">Total de productos</label>
                                    <div class="col-md-7" v-text="catBett.totalRegResumen">
                                        
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-5 form-control-label" for="text-input">Existentes (Update)</label>
                                    <div class="col-md-7" v-text="catBett.updateRegResumen">
                                        
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-5 form-control-label" for="text-input">Nuevos</label>
                                    <div class="col-md-7" v-text="catBett.nuevoRegResumen">
                                        
                                    </div>
                                </div>


                            </form>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-primary" @click="onMigracionCatProductos();">Aplicar</button>                                            
                        </div>    
                    </div>


                    <div class="tab-pane fade" :class="{ 'active show': isActive('batch') }" id="batch">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            
                            <div class="form-group row">                                
                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-body">
                                            <h5 class="card-title">Catalogo Procesos BATCH</h5>
                                            <table class="table table-bordered table-striped table-sm">
                                                <thead>
                                                    <tr>
                                                        <th>Opciones</th>
                                                        <th>Archivo Php</th>
                                                        <th>Descripcion</th>
                                                        <th>Fecha ultima ejecucion</th>
                                                        <th>Estatus</th>                                                        
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr v-for="proceso in catProcesosBatch.listaProcesosBatch" :key="proceso.id_batch_proceso">
                                                        <td>
                                                            <button type="button" class="btn btn-warning btn-sm" @click="showModal('batch','actualizar', proceso)">
                                                                <i class="icon-pencil"></i>
                                                            </button> &nbsp;                                                            
                                                        </td>
                                                        <td v-text="proceso.archivo_php"></td>
                                                        <td v-text="proceso.descripcion"></td>
                                                        <td v-text="proceso.fecha_ultima_exec"></td>

                                                        <td>
                                                            <div v-if="proceso.estatus=='A'">
                                                                <span class="badge badge-success">Activo</span>
                                                            </div>
                                                            <div v-else>
                                                                <span class="badge badge-danger">Desactivado</span>
                                                            </div>
                                                            
                                                        </td>
                                                    </tr>                            
                                                </tbody>
                                            </table>



                                        </div>
                                        
                                        

                                        
                                        
                                    </div>
                                    <div class="card-footer">
                                        <button type="button" class="btn btn-secondary" @click="showModal('batch','registrar')">
                                            <i class="icon-plus"></i>&nbsp;Nuevo
                                        </button>                                          
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>



                    
                </div>



            </div>
        </div>




         <!--Inicio del modal agregar/actualizar Procesos Batch-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : catProcesosBatch.modalBatch.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="catProcesosBatch.modalBatch.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Nombre archivo PHP</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Archivo Php" v-model="catProcesosBatch.archivo_php">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Descripcion</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Descripcion del proceso (Funcionalidad)" v-model="catProcesosBatch.descripcion">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Estatus</label>
                                <div class="col-md-9">
                                    <select class="form-control" v-model="catProcesosBatch.estatus">
                                        <option>A</option>
                                        <option>P</option>                                        
                                    </select>
                                </div>
                            </div>

                           
                            <div v-show="catProcesosBatch.modalBatch.error" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in catProcesosBatch.modalBatch.erroresMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="catProcesosBatch.modalBatch.tipoAccion==1" @click="registrarProcesoBatch();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="catProcesosBatch.modalBatch.tipoAccion==2" @click="actualizarProcesoBatch();">Actualizar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal proceso Batch-->    

    </main>    
</template>

<script>
    export default {
        data(){
            return{               
                activeItem: 'nota_remision',
                catBett:{
                    totalRegResumen: 0,
                    updateRegResumen: 0,
                    nuevoRegResumen: 0
                },
                catProcesosBatch:{
                    listaProcesosBatch: [],
                    modalBatch: {
                        modal: 0,
                        tituloModal: '',
                        tipoAccion: 0,
                        error: 0,
                        erroresMsjList: []
                    },
                    id_batch_proceso:0,
                    archivo_php:'',
                    descripcion:'',
                    estatus:''
                },
                
                isLoading: 0                
            }
        },
        computed:{
           
        },
        methods:{
            isActive (menuItem) {
                return this.activeItem === menuItem
            },
            setActive (menuItem) {
                this.activeItem = menuItem

                if(menuItem=="cat_bett"){
                    this.onResumenMigracionBett();
                }

                if(menuItem=="batch"){
                    this.onGetProcesosBatch();
                }
            },
            
            onResumenMigracionBett(){                
                this.isLoading = 1;                

                let me=this;                
                var url= '/zicandi/public/bett/resumen';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  
                    me.isLoading = 0;
                    console.log(respuesta);

                     
                    me.catBett.totalRegResumen= respuesta.total;
                    me.catBett.updateRegResumen= respuesta.update;
                    me.catBett.nuevoRegResumen= respuesta.nuevo;
                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onMigracionCatProductos(){                
                this.isLoading = 1;                
                
                let me=this;                
                var url= '/zicandi/public/bett/migracion';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  
                    me.isLoading = 0;
                    console.log(respuesta);           
                    
                    if(respuesta==1){
                        util.AVISO('Perfecto, migracion de productos terminada', util.tipoOk);
                    }
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onGetProcesosBatch(){
                
                this.isLoading = 1;                

                let me=this;                
                let url= '/zicandi/public/batch/procesos';
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    me.isLoading = 0;
                    me.catProcesosBatch.listaProcesosBatch = respuesta.listaProcesos;                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'batch':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.catProcesosBatch.modalBatch.modal = 1;
                                this.catProcesosBatch.archivo_php = '';
                                this.catProcesosBatch.descripcion = '';
                                this.catProcesosBatch.estatus = 'P';
                                this.catProcesosBatch.modalBatch.tituloModal = 'Registrar nuevo proceso';
                                this.catProcesosBatch.modalBatch.tipoAccion = 1;

                                break;
                            }
                            case 'actualizar':
                            {
                                this.catProcesosBatch.modalBatch.modal = 1;
                                this.catProcesosBatch.modalBatch.tituloModal = 'Actualizar proceso'
                                this.catProcesosBatch.modalBatch.tipoAccion = 2;

                                this.catProcesosBatch.id_batch_proceso = data['id_batch_proceso'];
                                this.catProcesosBatch.archivo_php = data['archivo_php'];
                                this.catProcesosBatch.descripcion = data['descripcion'];
                                this.catProcesosBatch.estatus = data['estatus'];

                            }
                        }
                    }
                }
            },
            closeModal(){
                this.catProcesosBatch.modalBatch.modal = 0;
                this.catProcesosBatch.archivo_php = '';
                this.catProcesosBatch.descripcion = '';
                this.catProcesosBatch.estatus = '';
                this.catProcesosBatch.modalBatch.tituloModal = '';
            },
            registrarProcesoBatch(){

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/batch/store',{
                    'archivo_php': this.catProcesosBatch.archivo_php,
                    'descripcion':       this.catProcesosBatch.descripcion,
                    'estatus':   this.catProcesosBatch.estatus                    
                })
                .then(function (response) {                                        
                    me.isLoading = 0;
                    me.closeModal();
                    util.AVISO('Perfecto, registro correcto', util.tipoOk);
                    me.onGetProcesosBatch();
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            actualizarProcesoBatch(){
                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/batch/update',{
                    'id_batch_proceso': this.catProcesosBatch.id_batch_proceso,
                    'archivo_php':  this.catProcesosBatch.archivo_php,
                    'descripcion':  this.catProcesosBatch.descripcion,
                    'estatus':      this.catProcesosBatch.estatus
                })
                .then(function (response) {                    
                    me.closeModal();
                    me.isLoading = 0;
                    util.AVISO('Actualizacion correcta!', util.tipoOk);                
                    me.onGetProcesosBatch();
                })
                .catch(function (error) {
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            }

            
        },
        mounted() {
            
        }
    }
</script>