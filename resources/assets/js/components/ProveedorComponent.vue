<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Catalogos</li>
            <li class="breadcrumb-item active">Proveedores</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('proveedor','registrar')">
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
                                <option value="nombre_corto">Alias</option>
                                <option value="nombre">Nombre</option>
                                <option value="pagina_web">Pagina Web</option>
                                <option value="contacto">Contacto</option>
                            </select>
                            <input type="text" v-model="buscador.textoBuscar" @keyup.enter="listarProveedores(1, buscador.textoBuscar, buscador.criterio, true)" class="form-control" placeholder="Texto a buscar">
                            <button type="submit" class="btn btn-primary" @click="listarProveedores(1, buscador.textoBuscar, buscador.criterio, true)"><i class="fa fa-search"></i> Buscar</button>
                        </div>
                    </div>
                </div>


                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Alias</th>
                            <th>Nombre</th>
                            <th>Pagina Web</th>
                            <th>Contacto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="proveedor in listaProveedor" :key="proveedor.id_proveedor">
                            <td>
                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('proveedor','actualizar', proveedor)">
                                    <i class="icon-pencil"></i>
                                </button> &nbsp;
                                <template v-if="proveedor.xstatus">
                                    <button type="button" class="btn btn-danger btn-sm" @click="desactivarProveedor(proveedor.id_proveedor)">
                                        <i class="icon-trash"></i>
                                    </button>
                                </template>

                                <template v-else>
                                    <button type="button" class="btn btn-info btn-sm" @click="activarProveedor(proveedor.id_proveedor)">
                                        <i class="icon-check"></i>
                                    </button>
                                </template>
                            </td>
                            <td v-text="proveedor.nombre_corto">Equipos</td>
                            <td v-text="proveedor.nombre">Equipos</td>
                            <td v-text="proveedor.pagina_web">Equipos</td>
                            <td v-text="proveedor.contacto">Equipos</td>                                
                            <td>
                                <div v-if="proveedor.xstatus">
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
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalProveedor.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalProveedor.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Alias</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Alias" v-model="oProveedor.nombre_corto">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Nombre del proveedor" v-model="oProveedor.nombre">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Pagina Web</label>
                                <div class="col-md-9">
                                    <input type="email" class="form-control" placeholder="Pagina web" v-model="oProveedor.pagina_web">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Contacto</label>
                                <div class="col-md-9">
                                    <input type="email" class="form-control" placeholder="Nombre Contacto y/o Telefono" v-model="oProveedor.contacto">
                                </div>
                            </div>

                            <div v-show="modalProveedor.errorProveedor" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalProveedor.erroresProveedorMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalProveedor.tipoAccion==1" @click="registrarProveedor();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="modalProveedor.tipoAccion==2" @click="actualizarProveedor();">Actualizar</button>
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
                oProveedor: {
                    id_proveedor: 0,
                    nombre_corto: '',
                    nombre: '',
                    pagina_web: '',
                    contacto: '',
                },                
                listaProveedor: [],
                modalProveedor: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    errorProveedor: 0,
                    erroresProveedorMsjList: [],
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
                    criterio: 'nombre_corto',
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
            listarProveedores(page, buscar, criterio, aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                let url= '/zicandi/public/proveedores?page=' + page +'&buscar=' + buscar + '&criterio=' + criterio;
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    me.isLoading = 0;
                    me.listaProveedor = respuesta.proveedor.data;
                    me.pagination = respuesta.pagination;                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            registrarProveedor(){
                if(this.validarProveedor()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/proveedores/registrar',{
                    'nombre_corto': this.oProveedor.nombre_corto,
                    'nombre':       this.oProveedor.nombre,
                    'pagina_web':   this.oProveedor.pagina_web,
                    'contacto':     this.oProveedor.contacto,
                })
                .then(function (response) {                    
                    me.buscador.textoBuscar = '';
                    me.isLoading = 0;
                    me.closeModal();
                    util.AVISO('Perfecto, registro correcto', util.tipoOk);
                    me.listarProveedores(1, '', 'nombre_corto');
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            actualizarProveedor(){
                if(this.validarProveedor()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/proveedores/actualizar',{
                    'id_proveedor': this.oProveedor.id_proveedor,
                    'nombre_corto': this.oProveedor.nombre_corto,
                    'nombre':       this.oProveedor.nombre,
                    'pagina_web':   this.oProveedor.pagina_web,
                    'contacto':     this.oProveedor.contacto,
                })
                .then(function (response) {                    
                    me.closeModal();
                    me.isLoading = 0;
                    util.AVISO('Actualizacion correcta!', util.tipoOk);                
                    me.listarProveedores(me.pagination.current_page, me.buscador.textoBuscar, me.buscador.criterio);
                })
                .catch(function (error) {
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            desactivarProveedor(id_proveedor){     
                util.MSG_SI_NO('Deseas desactivarlo','No podras usarlo...',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/proveedores/desactivar',{
                            'id_proveedor': id_proveedor
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Desactivado!!!', util.tipoOk);                                       
                            me.listarProveedores(me.pagination.current_page, me.buscador.textoBuscar, me.buscador.criterio);
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });                                               

            },
            activarProveedor(id_proveedor){
                util.MSG_SI_NO('Deseas activarlo','Mientras no lo actives no estara disponible para usarse',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/proveedores/activar',{
                            'id_proveedor': id_proveedor
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Activado!!!', util.tipoOk);                    
                            me.listarProveedores(me.pagination.current_page, me.buscador.textoBuscar, me.buscador.criterio);
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
                    case 'proveedor':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.modalProveedor.modal = 1;
                                this.oProveedor.nombre_corto = '';
                                this.oProveedor.nombre = '';
                                this.oProveedor.pagina_web = '';
                                this.oProveedor.contacto = '';
                                this.modalProveedor.tituloModal = 'Registrar nuevo proveedor';
                                this.modalProveedor.tipoAccion = 1;

                                break;
                            }
                            case 'actualizar':
                            {
                                this.modalProveedor.modal = 1;
                                this.modalProveedor.tituloModal = 'Actualizar proveedor'
                                this.modalProveedor.tipoAccion = 2;

                                this.oProveedor.nombre_corto = data['nombre_corto'];
                                this.oProveedor.nombre = data['nombre'];
                                this.oProveedor.pagina_web = data['pagina_web'];
                                this.oProveedor.contacto = data['contacto'];
                                this.oProveedor.id_proveedor = data['id_proveedor'];


                                console.log(data);
                            }
                        }
                    }
                }
            },
            closeModal(){
                this.modalProveedor.modal = 0;
                this.nombre_corto = '';
                this.nombre = '';
                this.pagina_web = '';
                this.contacto = '';
                this.modalProveedor.tituloModal = '';
            },
            validarProveedor(){
                this.modalProveedor.errorProveedor = 0;
                this.modalProveedor.erroresProveedorMsjList = [];

                if(!this.oProveedor.nombre_corto) this.modalProveedor.erroresProveedorMsjList.push("Se requiere el nombre corto o alias del proveedor");

                if(!this.oProveedor.nombre) this.modalProveedor.erroresProveedorMsjList.push("Define el nombre del proveedor");

                if(this.modalProveedor.erroresProveedorMsjList.length) this.modalProveedor.errorProveedor = 1;

                return this.modalProveedor.errorProveedor;
            },
            cambiarPagina(page, buscar, criterio){
                let me = this;

                me.pagination.current_page = page;

                me.listarProveedores(page, buscar, criterio, true);
            }
        },
        mounted() {
            this.listarProveedores(1, this.buscador.textoBuscar, this.buscador.criterio, true);
        }
    }
</script>