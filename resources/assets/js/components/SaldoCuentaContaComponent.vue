<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Conta</li>
            <li class="breadcrumb-item active">Saldos</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('plantilla','registrar')">
                        <i class="icon-plus"></i>&nbsp;Nuevo ejercicio
                    </button>                                         

                    <button type="button" class="btn btn-secondary" @click="onUpdateSaldosPlantilla()" v-if="saldosPlantillaList.length>0">
                        <i class="icon-plus"></i>&nbsp;Guardar saldos
                    </button> 
                </div>   
            </div>

            <!-- Buscador -->
            <div class="form-group row">
                <div class="col-md-4">
                    <div class="input-group">                                                     
                        <span>Ejercicio</span>&nbsp;&nbsp;        
                        <input type="text" class="form-control" placeholder="ddaaaa" maxlength="30" v-model="buscador.ejercicio">                        
                        
                    </div>
                </div>

                <div class="col-md-4">
                    <div class="input-group">                                                        
                        Empresa: 
                        <select class="form-control" v-model="buscador.id_conta_empresa">
                            <option value="0" disabled>Seleccione...</option>
                            <option v-for="empresa in buscador.listaEmpresas" :key="empresa.id_conta_empresa" :value="empresa.id_conta_empresa" v-text="empresa.nombre"></option>
                        </select>                        
                    </div>
                </div> 

                <div class="col-md-4">
                    <div class="input-group">                                                        
                        <button type="submit" class="btn btn-primary" @click="onConsultaPlantilla()"><i class="fa fa-search"></i> buscar</button>                                      
                    </div>
                </div>  


                
            </div>


            <div class="card">
            <div class="card-header">
                <div class="row">
                        <div class="col-md-4">
                            <strong>CUENTA</strong>
                        </div>
                        <div class="col-md-4">                            
                            <strong>SUB CUENTA</strong>
                        </div>
                        <div class="col-md-4">
                            <strong>SALDO CIERRE</strong>
                        </div>
                    
                    </div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item" v-for="subcuenta in saldosPlantillaList" :key="subcuenta.id_conta_subcuenta">
                    <div class="form-group row">
                        <div class="col-md-4">
                            <div class="input-group">                                                     
                                <small class="text-muted" v-text="subcuenta.codigo_cuenta"></small>                                  
                                &nbsp;&nbsp;
                                <span v-text="subcuenta.cuenta"></span> 
                                
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="input-group">                                                     
                                <small class="text-muted" v-text="subcuenta.codigo_subcuenta"></small>                                  
                                &nbsp;&nbsp;
                                <span v-text="subcuenta.subcuenta"></span>                                
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="input-group">                                                     
                                <input type="text" class="form-control text-right" placeholder="0.00" maxlength="30" v-model="subcuenta.saldo_cierre" @keyup="onResumenSaldosPlantilla()">                        
                            </div>
                        </div>
                    
                    </div>
                </li>
                <li class="list-group-item">
                    <div class="form-group row">
                        <div class="col-md-8">
                            <div class="input-group">                                                                        
                                TOTAL
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="text-right" width="100%">                                                                                     
                                <h1 v-text="saldoGlobal"></h1>                                
                            </div>
                        </div>                      
                    
                    </div>
                </li>
                
            </ul>
            </div>
            
            
            <upload-component ref="adjuntos"></upload-component>
            
            
        </div>    




        <!--Inicio del modal agregar/actualizar-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalNuevo.modal}">
        <div class="modal-dialog modal-primary modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title" v-text="modalNuevo.tituloModal"></h4>
                    <button type="button" class="close" aria-label="Close" @click="closeModal();">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                        <div class="form-group row">
                            <label class="col-md-3 form-control-label" for="text-input">Ejercicio</label>
                            <div class="col-md-9">
                                <input type="text" class="form-control" placeholder="ddaaaa" v-model="modalNuevo.ejercicio">                                    
                            </div>
                        </div>

                        <div class="form-group row">
                            <label class="col-md-3 form-control-label" for="text-input">Empresa</label>
                            <div class="col-md-9">
                                <select class="form-control" v-model="modalNuevo.id_conta_empresa">
                                    <option value="0" disabled>Seleccione...</option>
                                    <option v-for="empresa in buscador.listaEmpresas" :key="empresa.id_conta_empresa" :value="empresa.id_conta_empresa" v-text="empresa.nombre"></option>
                                </select>   
                            </div>
                        </div>

                        
                

                        <div v-show="modalNuevo.error" class="form-group row div-error">
                            <div class="text-center text-error">
                                <div v-for="error in modalNuevo.erroresMsjList" :key="error" v-text="error"></div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                    <button type="button" class="btn btn-primary" v-if="modalNuevo.tipoAccion==1" @click="onCrearPlantilla();">Crear</button>                    
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
                buscador: {
                    id_conta_empresa: 0,                    
                    ejercicio: '',
                    listaEmpresas: []
                },    
                saldosPlantillaList:[],    
                saldoGlobal: 0,
                idCarpetaAdjuntos: 0,      
                modalNuevo: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    error: 0,
                    erroresMsjList: [],
                    id_conta_empresa: 0,                    
                    ejercicio: '',
                },
                isLoading: 0
                
            }
        },
        computed:{
            
            
        },
        methods:{
            /**
             * 
             * 
             * 
             */
            onSelectEmpresas(){                
                let me=this;                
                var url= '/zicandi/public/conta/select_empresa';
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data; 
                    me.buscador.listaEmpresas = respuesta.empresas;                                                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
 
            },
            /**
             * 
             * 
             * 
             */
            onConsultaPlantilla(){                
                let me=this;  
                this.isLoading = 1;              
                var url= '/zicandi/public/conta/plantilla?id_conta_empresa='+this.buscador.id_conta_empresa+'&ejercicio='+this.buscador.ejercicio;
                axios.get(url)
                .then(function (response) {
                    me.isLoading = 0;

                    if(response.data.xstatus){
                        let respuesta = response.data; 
                        me.saldosPlantillaList = respuesta.plantilla;

                        me.onResumenSaldosPlantilla();

                        me.onCargaComponenteUpload();
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
             * 
             * 
             * 
             */
            onResumenSaldosPlantilla(){
                let saldosPlantillaList = this.saldosPlantillaList;

                this.saldoGlobal=0;
                let saldoAcum = 0;

                if(saldosPlantillaList.length>0){
                    for(let i=0; i<saldosPlantillaList.length; i++){
                        let saldo = saldosPlantillaList[i];
                        
                        if(parseFloat(saldo.saldo_cierre) >= 0){
                            saldoAcum+=parseFloat(saldo.saldo_cierre);                                            
                        }

                        this.idCarpetaAdjuntos = saldo.id_carpeta_adjuntos;
                    }

                    this.saldoGlobal=this.toMoneda(saldoAcum);
                }
            },

            /**
             * 
             * 
             * 
             */
            toMoneda(valor){
                let val = (valor/1).toFixed(2).replace(',', '.');        
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },

            /**
             * 
             * 
             * 
             */
            onCargaComponenteUpload(){
                if(this.idCarpetaAdjuntos > 0){                                
                    this.$refs.adjuntos.onLoadAdjuntos(this.idCarpetaAdjuntos);
                }
                
            },

            /**
             * 
             * 
             * 
             */
            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'plantilla':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.modalNuevo.modal = 1;
                                this.modalNuevo.id_conta_empresa = 0;
                                this.modalNuevo.ejercicio = '';                                
                                this.modalNuevo.tituloModal = 'Registrar Ejercicio';
                                this.modalNuevo.tipoAccion = 1;

                                break;
                            }
                        }
                    }
                }
            },
            /**
             * 
             * 
             * 
             * 
             */
            closeModal(){
                this.modalNuevo.modal = 0;                
                this.ubicacion = '';
                this.nota = '';                
                this.modalNuevo.tituloModal = '';
            },
            /**
             * 
             * 
             * 
             */
            onCrearPlantilla(){
                if(this.validarNuevoEjercicio()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/conta/ejercicio/crear',{
                    'id_conta_empresa': this.modalNuevo.id_conta_empresa,
                    'ejercicio': this.modalNuevo.ejercicio
                })
                .then(function (response) {  
                    me.isLoading = 0;                    
                    if(response.data.xstatus){
                        let totalCreados = response.data.totalCreados;
                        me.idCarpetaAdjuntos = response.data.idCarpetaAdjunto;
                        
                        util.AVISO('Perfecto, se creo el ejercicio', util.tipoOk);  

                        me.buscador.id_conta_empresa=me.modalNuevo.id_conta_empresa;
                        me.buscador.ejercicio=me.modalNuevo.ejercicio;
                        me.onConsultaPlantilla();


                        me.closeModal();
                        
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
             * 
             * 
             * 
             */
            onUpdateSaldosPlantilla(){                
                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/conta/ejercicio/update_saldo',{
                    'id_conta_empresa': this.buscador.id_conta_empresa,
                    'detalle_saldos': this.saldosPlantillaList
                })
                .then(function (response) {  
                    me.isLoading = 0;                    
                    if(response.data.xstatus){                                                
                        util.AVISO('Perfecto, actualizacion de saldos OK', util.tipoOk);  
                        
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
             * 
             * 
             * 
             */
            validarNuevoEjercicio(){
                this.modalNuevo.error = 0;
                this.modalNuevo.erroresMsjList = [];

                if(!this.modalNuevo.ejercicio) this.modalNuevo.erroresMsjList.push("Se requiere el ejericio");
                if(this.modalNuevo.id_conta_empresa<=0) this.modalNuevo.erroresMsjList.push("Elegir la empresa");
                
                if(this.modalNuevo.erroresMsjList.length) this.modalNuevo.error = 1;

                return this.modalNuevo.error;
            },
        },
        mounted() {
            this.onSelectEmpresas();
        }
    }
</script>