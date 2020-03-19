<template>
    <main class="main">
        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item"><a href="#">Admin</a></li>
            <li class="breadcrumb-item active">Dashboard</li>
        </ol>
        
        <div class="container-fluid">
            <!-- Ejemplo de tabla Listado -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Categorías
                    <button type="button" class="btn btn-secondary" @click="showModal('proveedor','registrar')">
                        <i class="icon-plus"></i>&nbsp;Nuevo
                    </button>
                </div>
                <div class="card-body">
                    <div class="form-group row">
                        <div class="col-md-6">
                            <div class="input-group">
                                <select class="form-control col-md-3" id="opcion" name="opcion">
                                    <option value="nombre">Nombre</option>
                                    <option value="descripcion">Descripción</option>
                                </select>
                                <input type="text" id="texto" name="texto" class="form-control" placeholder="Texto a buscar">
                                <button type="submit" class="btn btn-primary"><i class="fa fa-search"></i> Buscar</button>
                            </div>
                        </div>
                    </div>
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
                            <li class="page-item">
                                <a class="page-link" href="#">Ant</a>
                            </li>
                            <li class="page-item active">
                                <a class="page-link" href="#">1</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">2</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">3</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">4</a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#">Sig</a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
            <!-- Fin ejemplo de tabla Listado -->
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
                erroresProveedorMsjList: []
            }
        },
        methods:{
            listarProveedores(){
                let me=this;

                axios.get('/zicandi/public/proveedores')
                .then(function (response) {                    
                    me.listaProveedor = response.data;
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            },
            registrarProveedor(){
                if(this.validarProveedor()){
                    return;
                }

                let me = this;

                axios.post('/zicandi/public/proveedores/registrar',{
                    'nombre_corto': this.nombre_corto,
                    'nombre': this.nombre,
                    'pagina_web': this.pagina_web,
                    'contacto': this.contacto,
                })
                .then(function (response) {                    
                    me.closeModal();
                    me.listarProveedores();
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            },
            actualizarProveedor(){
                if(this.validarProveedor()){
                    return;
                }

                let me = this;

                axios.put('/zicandi/public/proveedores/actualizar',{
                    'id_proveedor': this.id_proveedor,
                    'nombre_corto': this.nombre_corto,
                    'nombre': this.nombre,
                    'pagina_web': this.pagina_web,
                    'contacto': this.contacto,
                })
                .then(function (response) {                    
                    me.closeModal();
                    me.listarProveedores();
                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                });
            },
            desactivarProveedor(id_proveedor){                
                const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                title: 'Estas seguro de eliminar?',
                text: "Este proceso inactivara el proveedor",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, borrar',
                cancelButtonText: 'No, cancelar',
                reverseButtons: true
                }).then((result) => {
                if (result.value) {
                    let me = this;

                    axios.put('/zicandi/public/proveedores/desactivar',{
                        'id_proveedor': id_proveedor
                    })
                    .then(function (response) {                    
                        me.listarProveedores();

                        swalWithBootstrapButtons.fire(
                        'Desactivado!',
                        'Registro desactivado correctamente.',
                        'success'
                        );                        
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);

                        swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)'+error,
                        'error'
                        );

                    });

                    
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    
                }
                });

            },
            activarProveedor(id_proveedor){
                const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
                })

                swalWithBootstrapButtons.fire({
                title: 'Estas seguro de activar?',
                text: "Este proceso inactivara el proveedor",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, activar',
                cancelButtonText: 'No, cancelar',
                reverseButtons: true
                }).then((result) => {
                if (result.value) {
                    let me = this;

                    axios.put('/zicandi/public/proveedores/activar',{
                        'id_proveedor': id_proveedor
                    })
                    .then(function (response) {                    
                        me.listarProveedores();

                        swalWithBootstrapButtons.fire(
                        'Desactivado!',
                        'Registro activado correctamente.',
                        'success'
                        );                        
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);

                        swalWithBootstrapButtons.fire(
                        'Cancelled',
                        'Your imaginary file is safe :)'+error,
                        'error'
                        );

                    });

                    
                } else if (
                    /* Read more about handling dismissals below */
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    
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
            }
        },
        mounted() {
            this.listarProveedores();
        }
    }
</script>

<style>
    .modal-content{
        width: 100% !important;
        position: absolute !important;
    }
    .mostrar{
        display: list-item !important;
        opacity: 1 !important;
        position: absolute !important;
        background-color: #3c29297a !important;
    }
    .div-error{
        display: flex;
        justify-content: center;
    }
    .text-error{
        color: red !important;
        font-weight: bold;
    }
</style>