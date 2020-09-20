<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Catalogos</li>
            <li class="breadcrumb-item active">Almacenes</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('almacen','registrar')">
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
                            <th>Nombre</th>
                            <th>Ubicacion</th>
                            <th>Notas</th>                            
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="almacen in listaAlmacen" :key="almacen.id_almacen">
                            <td>
                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('almacen','actualizar', almacen)">
                                    <i class="icon-pencil"></i>
                                </button> &nbsp;
                                <template v-if="almacen.xstatus">
                                    <button type="button" class="btn btn-danger btn-sm" @click="desactivar(almacen.id_almacen)">
                                        <i class="icon-trash"></i>
                                    </button>
                                </template>

                                <template v-else>
                                    <button type="button" class="btn btn-info btn-sm" @click="activar(almacen.id_almacen)">
                                        <i class="icon-check"></i>
                                    </button>
                                </template>
                            </td>
                            <td v-text="almacen.nombre"></td>
                            <td v-text="almacen.ubicacion"></td>
                            <td v-text="almacen.nota"></td>                            
                            <td>
                                <div v-if="almacen.xstatus">
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
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page-1)">Ant</a>
                        </li>
                        <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(page)" v-text="page"></a>
                        </li>                           
                        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page+1)">Sig</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
            
        






        <!--Inicio del modal agregar/actualizar-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalAlmacen.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalAlmacen.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Alias - Nombre" v-model="oAlmacen.nombre">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Ubicacion</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Lugar de ubicacion" v-model="oAlmacen.ubicacion">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Notas</label>
                                <div class="col-md-9">                                    
                                    <textarea class="form-control" rows="5" maxlength="300" v-model="oAlmacen.nota"></textarea>
                                </div>
                            </div>
                    

                            <div v-show="modalAlmacen.error" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalAlmacen.erroresMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalAlmacen.tipoAccion==1" @click="registrar();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="modalAlmacen.tipoAccion==2" @click="actualizar();">Actualizar</button>
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
                oAlmacen: {
                    id_almacen: 0,                    
                    nombre: '',
                    ubicacion: '',
                    nota: '',
                },                
                listaAlmacen: [],
                modalAlmacen: {
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
            listar(page, aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                let url= '/zicandi/public/almacenes?page=' + page;
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    me.isLoading = 0;
                    me.listaAlmacen = respuesta.almacen.data;
                    me.pagination = respuesta.pagination;                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            registrar(){
                if(this.validarAlmacen()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/almacenes/registrar',{
                    'nombre': this.oAlmacen.nombre,
                    'ubicacion': this.oAlmacen.ubicacion,
                    'nota':   this.oAlmacen.nota                    
                })
                .then(function (response) {                                        
                    me.isLoading = 0;
                    me.closeModal();
                    util.AVISO('Perfecto, registro correcto', util.tipoOk);
                    me.listar(1);
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            actualizar(){
                if(this.validarAlmacen()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.p('/zicandi/public/almacenes/actualizar',{
                    'id_almacen': this.oAlmacen.id_almacen,
                    'nombre': this.oAlmacen.nombre,
                    'ubicacion': this.oAlmacen.ubicacion,
                    'nota':   this.oAlmacen.nota 
                })
                .then(function (response) {                    
                    me.closeModal();
                    me.isLoading = 0;
                    util.AVISO('Actualizacion correcta!', util.tipoOk);                
                    me.listar(me.pagination.current_page);
                })
                .catch(function (error) {
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            desactivar(id_almacen){     
                util.MSG_SI_NO('Deseas desactivarlo','No podras usarlo...',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.p('/zicandi/public/almacenes/desactivar',{
                            'id_almacen': id_almacen
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Desactivado!!!', util.tipoOk);                                       
                            me.listar(me.pagination.current_page);
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });                                               

            },
            activar(id_almacen){
                util.MSG_SI_NO('Deseas activarlo','Mientras no lo actives no estara disponible para usarse',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.p('/zicandi/public/almacenes/activar',{
                            'id_almacen': id_almacen
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Activado!!!', util.tipoOk);                    
                            me.listar(me.pagination.current_page);
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
                    case 'almacen':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.modalAlmacen.modal = 1;
                                this.oAlmacen.nombre = '';
                                this.oAlmacen.ubicacion = '';
                                this.oAlmacen.nota = '';                                
                                this.modalAlmacen.tituloModal = 'Registrar nuevo almacen';
                                this.modalAlmacen.tipoAccion = 1;

                                break;
                            }
                            case 'actualizar':
                            {
                                this.modalAlmacen.modal = 1;
                                this.modalAlmacen.tituloModal = 'Actualizar almacen'
                                this.modalAlmacen.tipoAccion = 2;
                                
                                this.oAlmacen.nombre = data['nombre'];
                                this.oAlmacen.ubicacion = data['ubicacion'];
                                this.oAlmacen.nota = data['nota'];
                                this.oAlmacen.id_almacen = data['id_almacen'];
                            }
                        }
                    }
                }
            },
            closeModal(){
                this.modalAlmacen.modal = 0;                
                this.ubicacion = '';
                this.nota = '';                
                this.modalAlmacen.tituloModal = '';
            },
            validarAlmacen(){
                this.modalAlmacen.error = 0;
                this.modalAlmacen.erroresMsjList = [];

                if(!this.oAlmacen.nombre) this.modalAlmacen.erroresMsjList.push("Se requiere el nombre del almacen");
                
                if(this.modalAlmacen.erroresMsjList.length) this.modalAlmacen.error = 1;

                return this.modalAlmacen.error;
            },
            cambiarPagina(page){
                let me = this;

                me.pagination.current_page = page;

                me.listar(page, true);
            }
        },
        mounted() {
            this.listar(1, true);
        }
    }
</script>