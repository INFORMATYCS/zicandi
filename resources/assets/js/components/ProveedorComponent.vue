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
                            <select class="form-control col-md-3" v-model="criterio">
                                <option value="nombre_corto">Alias</option>
                                <option value="nombre">Nombre</option>
                                <option value="pagina_web">Pagina Web</option>
                                <option value="contacto">Contacto</option>
                            </select>
                            <input type="text" v-model="buscar" @keyup.enter="listarProveedores(1, buscar, criterio, true)" class="form-control" placeholder="Texto a buscar">
                            <button type="submit" class="btn btn-primary" @click="listarProveedores(1, buscar, criterio, true)"><i class="fa fa-search"></i> Buscar</button>
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
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page-1, buscar, criterio)">Ant</a>
                        </li>
                        <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(page, buscar, criterio)" v-text="page"></a>
                        </li>                           
                        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page+1, buscar, criterio)">Sig</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
            
        






        <!--Inicio del modal agregar/actualizar-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Alias</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Alias" v-model="nombre_corto">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Nombre del proveedor" v-model="nombre">                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Pagina Web</label>
                                <div class="col-md-9">
                                    <input type="email" class="form-control" placeholder="Pagina web" v-model="pagina_web">
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Contacto</label>
                                <div class="col-md-9">
                                    <input type="email" class="form-control" placeholder="Nombre Contacto y/o Telefono" v-model="contacto">
                                </div>
                            </div>

                            <div v-show="errorProveedor" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in erroresProveedorMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="tipoAccion==1" @click="registrarProveedor();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="tipoAccion==2" @click="actualizarProveedor();">Actualizar</button>
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
                id_proveedor: 0,
                nombre_corto: '',
                nombre: '',
                pagina_web: '',
                contacto: '',
                listaProveedor: [],
                modal: 0,
                tituloModal: '',
                tipoAccion: 0,
                errorProveedor: 0,
                erroresProveedorMsjList: [],
                pagination: {
                    'total' : 0,
                    'current_page'  : 0,
                    'per_page' : 0,
                    'last_page' : 0,
                    'from' : 0,
                    'to' : 0
                },
                offset : 3,
                criterio: 'nombre_corto',
                buscar: '',
                isLoading: 0
            }
        },
        computed:{
            isActived: function(){
                return this.pagination.current_page;
            },
            pagesNumber: function(){
                if(!this.pagination.to){
                    return [];
                }

                var from = this.pagination.current_page - this.offset;
                if(from < 1){
                    from = 1;
                }

                var to = from + (this.offset * 2);
                if(to >= this.pagination.last_page){
                    to = this.pagination.last_page;
                }

                var pageArray = [];
                while(from <= to){
                    pageArray.push(from);
                    from++;
                }

                return pageArray;
            }
        },
        methods:{
            listarProveedores(page, buscar, criterio, aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                var url= '/zicandi/public/proveedores?page=' + page +'&buscar=' + buscar + '&criterio=' + criterio;
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  
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
                    'nombre_corto': this.nombre_corto,
                    'nombre': this.nombre,
                    'pagina_web': this.pagina_web,
                    'contacto': this.contacto,
                })
                .then(function (response) {                    
                    me.buscar = '';
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
                axios.put('/zicandi/public/proveedores/actualizar',{
                    'id_proveedor': this.id_proveedor,
                    'nombre_corto': this.nombre_corto,
                    'nombre': this.nombre,
                    'pagina_web': this.pagina_web,
                    'contacto': this.contacto,
                })
                .then(function (response) {                    
                    me.closeModal();
                    me.isLoading = 0;
                    util.AVISO('Actualizacion correcta!', util.tipoOk);                
                    me.listarProveedores(me.pagination.current_page, me.buscar, me.criterio);
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

                        axios.put('/zicandi/public/proveedores/desactivar',{
                            'id_proveedor': id_proveedor
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Desactivado!!!', util.tipoOk);                                       
                            me.listarProveedores(me.pagination.current_page, me.buscar, me.criterio);
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

                        axios.put('/zicandi/public/proveedores/activar',{
                            'id_proveedor': id_proveedor
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Activado!!!', util.tipoOk);                    
                            me.listarProveedores(me.pagination.current_page, me.buscar, me.criterio);
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
                                this.modal = 1;
                                this.nombre_corto = '';
                                this.nombre = '';
                                this.pagina_web = '';
                                this.contacto = '';
                                this.tituloModal = 'Registrar nuevo proveedor';
                                this.tipoAccion = 1;

                                break;
                            }
                            case 'actualizar':
                            {
                                this.modal = 1;
                                this.tituloModal = 'Actualizar proveedor'
                                this.tipoAccion = 2;

                                this.nombre_corto = data['nombre_corto'];
                                this.nombre = data['nombre'];
                                this.pagina_web = data['pagina_web'];
                                this.contacto = data['contacto'];
                                this.id_proveedor = data['id_proveedor'];


                                console.log(data);
                            }
                        }
                    }
                }
            },
            closeModal(){
                this.modal = 0;
                this.nombre_corto = '';
                this.nombre = '';
                this.pagina_web = '';
                this.contacto = '';
                this.tituloModal = '';
            },
            validarProveedor(){
                this.errorProveedor = 0;
                this.erroresProveedorMsjList = [];

                if(!this.nombre_corto) this.erroresProveedorMsjList.push("Se requiere el nombre corto o alias del proveedor");

                if(!this.nombre) this.erroresProveedorMsjList.push("Define el nombre del proveedor");

                if(this.erroresProveedorMsjList.length) this.errorProveedor = 1;

                return this.errorProveedor;
            },
            cambiarPagina(page, buscar, criterio){
                let me = this;

                me.pagination.current_page = page;

                me.listarProveedores(page, buscar, criterio, true);
            }
        },
        mounted() {
            this.listarProveedores(1, this.buscar, this.criterio, true);
        }
    }
</script>