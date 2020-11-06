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
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('asociada','registrar')">
                        <i class="icon-plus"></i>&nbsp;Nuevo
                    </button>                    
                </div>   
            </div>
            
            <div class="card-body">

                <!-- Buscador -->
                <div class="form-group row">
                    <div class="col-md-6">
                        <div class="input-group">
                            <select class="form-control col-md-3" v-model="buscador.criterio">                               
                                <option value="nombre">Nombre</option>
                                <option value="codigo">Codigo</option>
                                <option value="telefono">Telefono</option>
                                <option value="direccion">Direccion</option>
                            </select>
                            <input type="text" v-model="buscador.textoBuscar" @keyup.enter="listarAsociadas(1, buscador.textoBuscar, buscador.criterio, true)" class="form-control" placeholder="Texto a buscar">
                            <button type="submit" class="btn btn-primary" @click="listarAsociadas(1, buscador.textoBuscar, buscador.criterio, true)"><i class="fa fa-search"></i> Buscar</button>
                        </div>
                    </div>
                </div>


                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Telfono</th>
                            <th>Direccion</th>
                            <th>Tipo</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="asociada in listaAsociadas" :key="asociada.id_bett_asociada">
                            <td>
                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('asociada','actualizar', asociada)">
                                    <i class="icon-pencil"></i>
                                </button> &nbsp;
                                <template v-if="asociada.xstatus">
                                    <button type="button" class="btn btn-danger btn-sm" @click="onDesactivarAsociada(asociada.id_bett_asociada)">
                                        <i class="icon-trash"></i>
                                    </button>
                                </template>

                                <template v-else>
                                    <button type="button" class="btn btn-info btn-sm" @click="onActivarAsociada(asociada.id_bett_asociada)">
                                        <i class="icon-check"></i>
                                    </button>
                                </template>
                            </td>
                            <td v-text="asociada.codigo"></td>
                            <td v-text="asociada.nombre"></td>
                            <td v-text="asociada.telefono"></td>
                            <td v-text="asociada.direccion"></td>
                            <td v-text="asociada.tipo"></td>
                            <td>
                                <div v-if="asociada.xstatus">
                                    <span class="badge badge-success">Activo</span>
                                </div>
                                <div v-else>
                                    <span class="badge badge-danger">Desactivado</span>
                                </div>
                                
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
            
        






        <!--Inicio del modal agregar/actualizar-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalAsociada.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalAsociada.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Codigo</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Codigo" v-model="oAsociada.codigo">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Nombre del asociada" v-model="oAsociada.nombre">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Telefono</label>
                                <div class="col-md-9">
                                    <input type="email" class="form-control" placeholder="Telefono" v-model="oAsociada.telefono">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Direccion</label>
                                <div class="col-md-9">
                                    <input type="email" class="form-control" placeholder="Direccion de entrega" v-model="oAsociada.direccion">
                                </div>
                            </div>
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Tipo</label>
                                <div class="col-md-9">
                                    <select class="form-control col-md-3" v-model="oAsociada.tipo">                               
                                        <option value="Asociada">Asociada</option>
                                        <option value="Distribuidora">Distribuidora</option>
                                        <option value="Cliente">Cliente</option>                                        
                                    </select>
                                </div>
                            </div>

                            <div v-show="modalAsociada.error" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalAsociada.erroresMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalAsociada.tipoAccion==1" @click="onRegistrarAsociada();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="modalAsociada.tipoAccion==2" @click="onActualizarAsociada();">Actualizar</button>
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
                oAsociada: {
                    id_bett_asociada: 0,
                    codigo: '',
                    nombre: '',
                    telefono: '',
                    direccion: '',
                    tipo: ''
                },                
                listaAsociadas: [],
                modalAsociada: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    error: 0,
                    erroresMsjList: [],
                },
                pagination: {
                    total : 0,
                    current_page  : 0,
                    per_page : 0,
                    last_page : 0,
                    from : 0,
                    to : 0                    
                },
                buscador:{
                    criterio: 'nombre',
                    textoBuscar: ''                    
                },
                isLoading: 0
                
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
            listarAsociadas(page, buscar, criterio, aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                let url= '/zicandi/public/bett/asociadas?page=' + page +'&buscar=' + buscar + '&criterio=' + criterio;
                axios.get(url)
                .then(function (response) {         
                    console.log(response);           
                    let respuesta = response.data;  
                    me.isLoading = 0;
                    me.listaAsociadas = respuesta.asociadas.data; 
                    me.pagination = respuesta.pagination;                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onRegistrarAsociada(){
                if(this.onValidarAsociada()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/bett/nueva_asociada',{
                    'codigo': this.oAsociada.codigo,
                    'nombre':       this.oAsociada.nombre,
                    'telefono':   this.oAsociada.telefono,
                    'direccion':     this.oAsociada.direccion,
                    'tipo':     this.oAsociada.tipo
                })
                .then(function (response) {                    
                    me.buscador.textoBuscar = '';
                    me.isLoading = 0;
                    me.closeModal();
                    util.AVISO('Perfecto, registro correcto', util.tipoOk);
                    me.listarAsociadas(1, '', 'codigo');
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onActualizarAsociada(){
                if(this.onValidarAsociada()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/bett/update_asociada',{
                    'id_bett_asociada': this.oAsociada.id_bett_asociada,
                    'codigo': this.oAsociada.codigo,
                    'nombre':       this.oAsociada.nombre,
                    'telefono':   this.oAsociada.telefono,
                    'direccion':     this.oAsociada.direccion,
                    'tipo':     this.oAsociada.tipo
                })
                .then(function (response) {                    
                    me.closeModal();
                    me.isLoading = 0;
                    util.AVISO('Actualizacion correcta!', util.tipoOk);                
                    me.listarAsociadas(me.pagination.current_page, me.buscador.textoBuscar, me.buscador.criterio);
                })
                .catch(function (error) {
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onDesactivarAsociada(id_bett_asociada){     
                util.MSG_SI_NO('Deseas desactivarlo','No podras usarlo...',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/bett/desactivar_asociada',{
                            'id_bett_asociada': id_bett_asociada
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Desactivado!!!', util.tipoOk);                                       
                            me.listarAsociadas(me.pagination.current_page, me.buscador.textoBuscar, me.buscador.criterio);
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });                                               

            },
            onActivarAsociada(id_bett_asociada){
                util.MSG_SI_NO('Deseas activarlo','Mientras no lo actives no estara disponible para usarse',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/bett/activar_asociada',{
                            'id_bett_asociada': id_bett_asociada
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Activado!!!', util.tipoOk);                    
                            me.listarAsociadas(me.pagination.current_page, me.buscador.textoBuscar, me.buscador.criterio);
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
                    case 'asociada':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.modalAsociada.modal = 1;
                                this.oAsociada.codigo = '';
                                this.oAsociada.nombre = '';
                                this.oAsociada.telefono = '';
                                this.oAsociada.direccion = '';
                                this.modalAsociada.tituloModal = 'Registrar nuevo asociada';
                                this.modalAsociada.tipoAccion = 1;

                                break;
                            }
                            case 'actualizar':
                            {
                                this.modalAsociada.modal = 1;
                                this.modalAsociada.tituloModal = 'Actualizar asociada'
                                this.modalAsociada.tipoAccion = 2;

                                this.oAsociada.codigo = data['codigo'];
                                this.oAsociada.nombre = data['nombre'];
                                this.oAsociada.telefono = data['telefono'];
                                this.oAsociada.direccion = data['direccion'];
                                this.oAsociada.tipo = data['tipo'];
                                this.oAsociada.id_bett_asociada = data['id_bett_asociada'];


                                console.log(data);
                            }
                        }
                    }
                }
            },
            closeModal(){
                this.modalAsociada.modal = 0;
                this.codigo = '';
                this.nombre = '';
                this.telefono = '';
                this.direccion = '';
                this.modalAsociada.tituloModal = '';
            },
            onValidarAsociada(){
                this.modalAsociada.error = 0;
                this.modalAsociada.erroresMsjList = [];                

                if(!this.oAsociada.nombre) this.modalAsociada.erroresMsjList.push("Define el nombre del asociado");
                if(!this.oAsociada.codigo) this.modalAsociada.erroresMsjList.push("Define el codigo del asociado");

                if(this.modalAsociada.erroresMsjList.length) this.modalAsociada.error = 1;

                return this.modalAsociada.error;
            },
            cambiarPagina(page, buscar, criterio){
                let me = this;

                me.pagination.current_page = page;

                me.listarAsociadas(page, buscar, criterio, true);
            }
        },
        mounted() {
            this.listarAsociadas(1, this.buscador.textoBuscar, this.buscador.criterio, true);
        }
    }
</script>