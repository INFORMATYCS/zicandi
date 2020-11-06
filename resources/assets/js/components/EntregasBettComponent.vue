<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Catalogos</li>
            <li class="breadcrumb-item active">Asociadas</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card" v-if="tipoNavegador=='escritorio'">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('semana','registrar')">
                        <i class="icon-plus"></i>&nbsp;Nueva semana
                    </button> 
                    <button type="button" class="btn btn-secondary" @click="showModal('orden','registrar')">
                        <i class="icon-plus"></i>&nbsp;Nueva orden de entrega
                    </button>
                    <button type="button" class="btn btn-secondary" @click="onImprimirResumen()">
                        <i class="icon-plus"></i>&nbsp;Reporte resumen
                    </button>                        
                </div>   
            </div>
            
            <div class="card-body">

                <div class="row">
                    <div class="col-sm-6">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Semana</h5>
                            <p class="card-text">
                                <select class="form-control col-md-3" v-model="oOrdenEntrega.idSemana">
                                    <option value="0" disabled>Seleccione...</option>
                                    <option v-for="semana in listaSemanas" :key="semana.id_semana" :value="semana.id_semana" v-text="semana.semana"></option>
                                </select>                                
                            </p>
                            <h5 class="card-title">Grupo de entrega</h5>
                            <p class="card-text">                                
                                <select class="form-control col-md-3" v-model="oOrdenEntrega.grupoEntrega">
                                    <option value="%">Todos</option>
                                    <option v-for="grupo in grupoEntrega" :key="grupo.llave" :value="grupo.llave" v-text="grupo.valor"></option>
                                </select>                                                                                                     
                            </p>
                            <a href="#" class="btn btn-primary" @click="onListarOrdenesEntrega()">Consultar</a>
                        </div>
                        </div>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Ordenes</h5>
                            
                            <!-- Listado de ordenes por asociada-->
                            <div class="card" v-for="orden in listaOrdenes" :key="orden.id_bett_orden_entrega">                                                                                    
                                <div class="card-header" @click="onMostrarOrden(orden)">
                                    
                                    <i v-if="orden.estatus=='ENTREGADO'" class="icon-like"></i>
                                    <i v-if="orden.estatus=='POSPONE'" class="icon-dislike"></i>
                                    <strong v-text="orden.nombre_asociada"></strong>                                    
                                </div>            
                                <ul class="list-group list-group-flush" style="display: none;" :class="{'abrir-deta' : orden.visible}">
                                    <li class="list-group-item">                                        
                                        <div class="row">                                                                                                                                                                       
                                            <div class="col-sm-12">
                                                Productos: <strong v-text="orden.total_productos"></strong>
                                            </div>
                                        </div>

                                        <div class="row">                                                                                       
                                            <div class="col-sm-6">
                                                Recibir: <strong v-text="toMoneda(orden.monto_cobrar)"></strong>                                                 
                                            </div>
                                            <div class="col-sm-6">                                                
                                                <input type="number" class="form-control" placeholder="Monto Cobrado" v-model="orden.monto_recibido">
                                            </div>                                        
                                        </div>
                                        <div class="row">                                                                                                                                   
                                            <div class="col-sm-6">
                                                Bolsas: <strong v-text="orden.bolsas_entregar"></strong> |  <span v-text="orden.bolsas_recibir"></span>
                                            </div>
                                            <div class="col-sm-6">                                                
                                                <input type="number" class="form-control" placeholder="Bolsas recibidas" v-model="orden.bolsas_recibir">
                                            </div>
                                        </div>
                                        <div class="row">                                                                                                                                   
                                            <div class="col-sm-12">
                                                <select class="form-control" v-model="orden.metodo_pago">
                                                    <option value="EFE">Efectivo</option>
                                                    <option value="DEP">Deposito</option>
                                                    <option value="NO">No Pago</option>
                                                </select>
                                            </div>                                            
                                        </div> 
                                        <div class="row">                                                                                                                                   
                                            <div class="col-sm-12">
                                                <footer class="blockquote-footer"><cite title="comentarios" v-text="orden.comentarios_entrega"></cite></footer>
                                                <input type="text" class="form-control" placeholder="Comentarios de entrega..." v-model="orden.comentarios_recibidos">
                                            </div>                                            
                                        </div>                                        
                                        
                                    </li>

                                </ul>  
                                 <div class="card-body" style="display: none;" :class="{'abrir-deta' : orden.visible}">                                   
                                    <a href="#" class="btn btn-primary" @click="onFinalizaOrden(orden, 'ENTREGADO')" v-if="orden.estatus=='EN CURSO'">Entregado</a>
                                    &nbsp;&nbsp;&nbsp;
                                    <a href="#" class="btn btn-secondary"  @click="onFinalizaOrden(orden, 'POSPONE')" v-if="orden.estatus=='EN CURSO'">Posponer</a>

                                    <a href="#" class="btn btn-secondary"  @click="showModal('orden','actualizar', orden)" v-if="tipoNavegador=='escritorio'">Modificar</a>
                                    
                                </div>                              
                            </div>

                        </div>
                        </div>
                    </div>
                </div>


                
                
            </div>
        </div>
            
        



        <!--Inicio del modal nueva semana-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalSemana.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalSemana.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Semana</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Semana" v-model="oSemana.semana">                                    
                                </div>
                            </div>
                            
                            <div v-show="modalSemana.error" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalSemana.erroresMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalSemana.tipoAccion==1" @click="onRegistrarSemana();">Guardar</button>                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->  



        <!--Inicio del modal nueva orden-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalOrdenEntrega.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalOrdenEntrega.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Asociada</label>
                                <div class="col-md-9">
                                    <select class="form-control" v-model="oOrdenEntrega.idBettAsociada">
                                        <option value="0" disabled>Seleccione...</option>
                                        <option v-for="aso in asociadasOrden" :key="aso.id_bett_asociada" :value="aso.id_bett_asociada" v-text="aso.nombre"></option>
                                    </select>                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Grupo Entrega</label>
                                <div class="col-md-9">
                                    <select class="form-control" v-model="oOrdenEntrega.grupoEntrega">
                                        <option value="0" disabled>Seleccione...</option>
                                        <option v-for="grupo in grupoEntrega" :key="grupo.llave" :value="grupo.llave" v-text="grupo.valor"></option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Total productos</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Total" v-model="oOrdenEntrega.totalProductos">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Cobro</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="x Cobrar" v-model="oOrdenEntrega.montoCobrar">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Bolsas</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" placeholder="x Entregar" v-model="oOrdenEntrega.bolsasEntregar">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" placeholder="x Recibir" v-model="oOrdenEntrega.bolsasRecibir">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Prioridad</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="" v-model="oOrdenEntrega.prioridadEntrega">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Comentarios</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="" v-model="oOrdenEntrega.comentariosEntrega">
                                </div>
                            </div>

                            <div v-show="modalOrdenEntrega.error" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalOrdenEntrega.erroresMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalOrdenEntrega.tipoAccion==1" @click="onRegistrarOrden();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="modalOrdenEntrega.tipoAccion==2" @click="onActualizarAsociada();">Actualizar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->       

        <!--Inicio del modal modificar orden-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalOrdenEntrega.modalUpdate}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalOrdenEntrega.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Asociada</label>
                                <label class="col-md-3 form-control-label" v-text="oOrdenEntrega.nombreAsociada"></label>                                    
                                
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Grupo Entrega</label>
                                <div class="col-md-9">
                                    <select class="form-control" v-model="oOrdenEntrega.grupoEntrega">
                                        <option value="0" disabled>Seleccione...</option>
                                        <option v-for="grupo in grupoEntrega" :key="grupo.llave" :value="grupo.llave" v-text="grupo.valor"></option>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Total productos</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Total" v-model="oOrdenEntrega.totalProductos">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Cobro</label>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" placeholder="x Cobrar" v-model="oOrdenEntrega.montoCobrar">
                                </div>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" placeholder="x Cobrado" v-model="oOrdenEntrega.montoRecibido">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Bolsas</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" placeholder="x Entregar" v-model="oOrdenEntrega.bolsasEntregar">
                                </div>
                                <div class="col-md-4">
                                    <input type="text" class="form-control" placeholder="x Recibir" v-model="oOrdenEntrega.bolsasRecibir">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Metodo de pago</label>
                                <div class="col-md-9">
                                    
                                    <select class="form-control" v-model="oOrdenEntrega.metodoPago">
                                        <option value="EFE">Efectivo</option>
                                        <option value="DEP">Deposito</option>
                                        <option value="NO">No Pago</option>
                                    </select>

                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Prioridad</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="" v-model="oOrdenEntrega.prioridadEntrega">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Comentarios</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="" v-model="oOrdenEntrega.comentariosEntrega">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Comentarios</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="" v-model="oOrdenEntrega.comentariosRecibidos">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Estatus</label>
                                <div class="col-md-9">
                                    
                                    <select class="form-control" v-model="oOrdenEntrega.estatus">
                                        <option value="EN CURSO">En curso</option>
                                        <option value="ENTREGADO">Entregado</option>
                                        <option value="POSPONE">Pospuesto</option>
                                    </select>

                                </div>
                            </div>

                            <div v-show="modalOrdenEntrega.error" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalOrdenEntrega.erroresMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-secondary" @click="onActualizaOrden(oOrdenEntrega, true);">Eliminar</button>
                        <button type="button" class="btn btn-primary" @click="onActualizaOrden(oOrdenEntrega, false);">Actualizar</button>
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
                modalSemana: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    error: 0,
                    erroresMsjList: [],
                },
                modalOrdenEntrega: {
                    modal: 0,
                    modalUpdate: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    error: 0,
                    erroresMsjList: [],
                },
                oSemana: {
                    semana: ''
                },
                oOrdenEntrega:{
                    idBettOrdenEntrega: 0,
                    idSemana: 0,                    
                    idBettAsociada:0,
                    nombreAsociada:'',
                    grupoEntrega:'',
                    totalProductos:0,
                    montoCobrar:0,
                    montoRecibido:0,
                    bolsasEntregar:0,
                    bolsasRecibir:0,
                    comentariosEntrega:'',
                    comentariosRecibidos:'',
                    metodoPago:0,
                    prioridadEntrega:0,
                    estatus:''
                },
                pagination: {
                    total : 0,
                    current_page  : 0,
                    per_page : 0,
                    last_page : 0,
                    from : 0,
                    to : 0                    
                },                
                isLoading: 0,
                listaSemanas:   [],
                grupoEntrega:   [],
                formaPago:      [],
                asociadasOrden: [],
                listaOrdenes:   [],
                tipoNavegador: ''
            }
        },
        computed:{
            isActived: function(){
                return this.pagination.current_page;
            },
            pagesNumber: function(){
               return  paginador.getPagesNumber(this.pagination);                
            }
        },
        methods:{
            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'semana':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.modalSemana.modal = 1;
                                this.oSemana.semana = '';                                
                                this.modalSemana.tituloModal = 'Nueva semana';
                                this.modalSemana.tipoAccion = 1;

                                break;
                            }                        
                        }
                    break;    
                    }
                    case 'orden':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                if(this.oOrdenEntrega.idSemana == '' || this.oOrdenEntrega.idSemana == 0){
                                    util.MSG('Elije la semana por favor.', util.tipoErr);
                                    break;
                                }
                                
                                this.modalOrdenEntrega.modal = 1;                                
                                this.modalOrdenEntrega.tituloModal = 'Nueva orden de entrega';
                                this.modalOrdenEntrega.tipoAccion = 1;
                                
                                
                                this.oOrdenEntrega.idBettAsociada = '';
                                this.oOrdenEntrega.nombreAsociada = '';
                                this.oOrdenEntrega.grupoEntrega = '';
                                this.oOrdenEntrega.totalProductos = '';
                                this.oOrdenEntrega.montoCobrar = '';
                                this.oOrdenEntrega.montoRecibido = '';
                                this.oOrdenEntrega.bolsasEntregar = '';
                                this.oOrdenEntrega.bolsasRecibir = '';
                                this.oOrdenEntrega.comentariosEntrega = '';
                                this.oOrdenEntrega.comentariosRecibidos = '';
                                this.oOrdenEntrega.metodoPago = '';
                                this.oOrdenEntrega.prioridadEntrega = 1.1;
                                this.oOrdenEntrega.estatus = '';

                                //~Metodos
                                this.onSelectAsociada();


                                break;
                            }
                            case 'actualizar':
                            {
                                this.modalOrdenEntrega.modalUpdate = 1;                                
                                this.modalOrdenEntrega.tituloModal = 'Actualizar orden de entrega';
                                this.modalOrdenEntrega.tipoAccion = 2;

                                this.oOrdenEntrega.idBettOrdenEntrega = data['id_bett_orden_entrega'];
                                this.oOrdenEntrega.idBettAsociada = data['id_bett_asociada'];
                                this.oOrdenEntrega.nombreAsociada = data['nombre_asociada'];
                                this.oOrdenEntrega.grupoEntrega = data['grupo_entrega'];
                                this.oOrdenEntrega.totalProductos = data['total_productos'];
                                this.oOrdenEntrega.montoCobrar = data['monto_cobrar'];
                                this.oOrdenEntrega.montoRecibido = data['monto_recibido'];
                                this.oOrdenEntrega.bolsasEntregar = data['bolsas_entregar'];
                                this.oOrdenEntrega.bolsasRecibir = data['bolsas_recibir'];
                                this.oOrdenEntrega.comentariosEntrega = data['comentarios_entrega'];
                                this.oOrdenEntrega.comentariosRecibidos = data['comentarios_recibidos'];
                                this.oOrdenEntrega.metodoPago = data['metodo_pago'];
                                this.oOrdenEntrega.prioridadEntrega = data['prioridad_entrega'];
                                this.oOrdenEntrega.estatus = data['estatus'];
                                
                            }
                        }
                    break;
                    }
                }
            },
            closeModal(){
                this.modalSemana.modal = 0;
                this.modalSemana.tituloModal = '';
                this.oSemana.semana = '';   
                
                this.modalOrdenEntrega.modal = 0;
                this.modalOrdenEntrega.modalUpdate = 0;
                this.modalOrdenEntrega.tituloModal = '';
                
            },
            onRegistrarSemana(){
                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/bett/nueva_semana',{
                    'semana': this.oSemana.semana
                })
                .then(function (response) {                                        
                    if(response.data.xstatus){
                        me.isLoading = 0;
                        me.closeModal();
                        me.onSelectSemanas();
                        me.oOrdenEntrega.idSemana = response.data.id_semana;
                        
                        util.AVISO('Perfecto, registro correcto', util.tipoOk);
                    }else{
                        throw new Error(response.data.error);
                    }                                        
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onSelectSemanas(){                
                let me=this;                
                var url= '/zicandi/public/bett/semanas';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.listaSemanas = respuesta.semanas;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onSelectGrupo(){                
                let me=this;                
                let url= '/zicandi/public/parametria/getProceso';
                axios.post(url,{'clave_proceso': 'GPO_ENTREGA'})
                .then(function (response) {                    
                    let respuesta = response.data;  

                    me.grupoEntrega = respuesta.parametria;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onFormaPago(){                
                let me=this;                
                let url= '/zicandi/public/parametria/getProceso';
                axios.post(url,{'clave_proceso': 'MTD_PAGO'})
                .then(function (response) {                    
                    let respuesta = response.data;  

                    me.formaPago = respuesta.parametria;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onSelectAsociada(){                
                let me=this;                
                let url= '/zicandi/public/bett/asociadas_orden?id_bett_semana='+this.oOrdenEntrega.idSemana;
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    console.log(respuesta);
                    me.asociadasOrden = respuesta.asociadas;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onRegistrarOrden(){                
                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/bett/nueva_orden',{                    
                    'idSemana': this.oOrdenEntrega.idSemana,
                    'idBettAsociada': this.oOrdenEntrega.idBettAsociada,                    
                    'grupoEntrega': this.oOrdenEntrega.grupoEntrega,
                    'totalProductos': this.oOrdenEntrega.totalProductos,
                    'montoCobrar': this.oOrdenEntrega.montoCobrar,
                    'bolsasEntregar': this.oOrdenEntrega.bolsasEntregar,
                    'bolsasRecibir': this.oOrdenEntrega.bolsasRecibir,
                    'comentariosEntrega': this.oOrdenEntrega.comentariosEntrega,
                    'prioridadEntrega': this.oOrdenEntrega.prioridadEntrega
                })
                .then(function (response) {                                        
                    if(response.data.xstatus){
                        me.isLoading = 0;
                        me.closeModal();
                        me.onListarOrdenesEntrega();
                        util.AVISO('Perfecto, registro correcto', util.tipoOk);
                    }else{
                        throw new Error(response.data.error);
                    }                                        
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onFinalizaOrden(orden, estatus){
                //Valida informacion                
                if(estatus=="ENTREGADO"){
                    if(orden.metodo_pago==null){                        
                        util.MSG('Algo salio Mal!','Defina el metodo de pago', util.tipoErr);
                        return;
                    }
                    
                    if(orden.metodo_pago=="EFE" && (orden.monto_recibido==0 || orden.monto_recibido==null)){
                        util.MSG('Algo salio Mal!','Falta monto recibido', util.tipoErr);
                        return;
                    }
                }else if(estatus=="POSPONE"){
                    if(orden.comentarios_recibidos=="" || orden.comentarios_recibidos==null){                        
                        util.MSG('Algo salio Mal!','Comentarios...', util.tipoErr);
                        return;
                    }
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/bett/finaliza_ordenes',{                    
                    'idBettOrdenEntrega': orden.id_bett_orden_entrega,
                    'montoRecibido': orden.monto_recibido,
                    'bolsasRecibir': orden.bolsas_recibir,
                    'comentariosRecibidos': orden.comentarios_recibidos,
                    'metodoPago': orden.metodo_pago,                    
                    'estatus': estatus
                    
                })
                .then(function (response) {                                        
                    if(response.data.xstatus){
                        me.isLoading = 0;
                        orden.visible = 0;
                        orden.estatus = estatus;

                        me.onOrdenarOrden();
                        util.AVISO('Perfecto, registro correcto', util.tipoOk);
                    }else{
                        throw new Error(response.data.error);
                    }                                        
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onActualizaOrden(orden, ordenEliminar){
                console.log(orden);
                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/bett/update_ordenes',{                    
                    'idBettOrdenEntrega': orden.idBettOrdenEntrega,
                    'grupoEntrega': orden.grupoEntrega,
                    'totalProductos': orden.totalProductos,
                    'montoCobrar': orden.montoCobrar,
                    'montoRecibido': orden.montoRecibido,                    
                    'bolsasEntregar': orden.bolsasEntregar,
                    'bolsasRecibir': orden.bolsasRecibir,
                    'comentariosEntrega': orden.comentariosEntrega,
                    'comentariosRecibidos': orden.comentariosRecibidos,
                    'metodoPago': orden.metodoPago,
                    'prioridadEntrega': orden.prioridadEntrega,
                    'estatus': orden.estatus,
                    'eliminar': ordenEliminar
                })
                .then(function (response) {                                        
                    if(response.data.xstatus){
                        me.isLoading = 0;
                        util.AVISO('Perfecto, registro correcto', util.tipoOk);
                    }else{
                        throw new Error(response.data.error);
                    }                                        
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onListarOrdenesEntrega(){
            
                let me = this;
                this.isLoading = 1;
                axios.get('/zicandi/public/bett/ordenes?idSemana='+this.oOrdenEntrega.idSemana+'&grupoEntrega='+this.oOrdenEntrega.grupoEntrega)
                .then(function (response) {                                        
                    if(response.data.xstatus){
                        me.isLoading = 0;                                                
                        let ordenes = response.data.ordenes;
                                            
                        for (let i = 0; i < ordenes.length; i++) {                            
                            ordenes[i].visible = 0;                            
                        }

                        me.listaOrdenes = ordenes;

                        me.onOrdenarOrden();
                    }else{
                        throw new Error(response.data.error);
                    }                                        
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            toMoneda(valor){
                let val = (valor/1).toFixed(2).replace(',', '.');        
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            onMostrarOrden(orden){                
                for (let i = 0; i < this.listaOrdenes.length; i++) {                            
                    this.listaOrdenes[i].visible = 0;                            
                }

                orden.visible = 1;
            },
            onOrdenarOrden(){
                let listaProcesado = [];
                let listaPendiente = [];
                for (let i = 0; i < this.listaOrdenes.length; i++) {   
                    if(this.listaOrdenes[i].estatus=="EN CURSO"){
                        listaPendiente.push(this.listaOrdenes[i]);
                    }else{
                        listaProcesado.push(this.listaOrdenes[i]);
                    }                    
                }

                this.listaOrdenes = [];
                for (let i = 0; i < listaPendiente.length; i++) {   
                    this.listaOrdenes.push(listaPendiente[i]);
                }
                for (let i = 0; i < listaProcesado.length; i++) {   
                    this.listaOrdenes.push(listaProcesado[i]);
                }
            },
            onDetectarTipoDisp(){
                if( navigator.userAgent.match(/Android/i)
                    || navigator.userAgent.match(/webOS/i)
                    || navigator.userAgent.match(/iPhone/i)
                    || navigator.userAgent.match(/iPad/i)
                    || navigator.userAgent.match(/iPod/i)
                    || navigator.userAgent.match(/BlackBerry/i)
                    || navigator.userAgent.match(/Windows Phone/i) ){                    
                    this.tipoNavegador = 'mobile';
                }else{
                    this.tipoNavegador = 'escritorio';
                }
            },
            onImprimirResumen(){                
                let me=this;                                
                axios({
                    url: '/zicandi/public/bett/resumen_ordenes?id_bett_semana='+this.oOrdenEntrega.idSemana,
                    method: 'GET',
                    responseType: 'blob', // important
                })
                .then(function (response) {                    
       
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'resumenOrdenEntrega.pdf');
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            }
        },
        mounted() {
            this.onDetectarTipoDisp();
            this.onSelectSemanas();
            this.onSelectGrupo();
            this.onFormaPago();                        
        }
    }
</script>

<style>
    .abrir-deta{
        display: block !important;        
    }
</style>