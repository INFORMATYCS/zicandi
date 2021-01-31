<template>
    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Escritorio</a></li>
            <li class="breadcrumb-item">Catalogos</li>
            <li class="breadcrumb-item active">Productos</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('producto','registrar')">
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
                                <option value="nombre">Nombre</option>               
                                <option value="codigo">Codigo</option>                 
                            </select>
                            <input type="text" v-model="buscar" @keyup.enter="listarProductos(1, buscar, criterio, true)" class="form-control" placeholder="Texto a buscar">
                            <button type="submit" class="btn btn-primary" @click="listarProductos(1, buscar, criterio, true)"><i class="fa fa-search"></i> Buscar</button>
                        </div>
                    </div>
                </div>

                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th width="10%;">Opciones</th>
                            <th>Producto</th>                            
                            <th>Precios Compra</th>
                            <th>Especificaciones</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="producto in listaProductos" :key="producto.id_producto">
                            <td>
                                
                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('producto','actualizar', producto)">
                                    <i class="icon-pencil"></i>
                                </button> &nbsp;
                                <template v-if="producto.xstatus">
                                    <button type="button" class="btn btn-danger btn-sm" @click="desactivarProveedor(producto.id_producto)">
                                        <i class="icon-trash"></i>
                                    </button>
                                </template>

                                <template v-else>
                                    <button type="button" class="btn btn-info btn-sm" @click="activarProveedor(producto.id_producto)">
                                        <i class="icon-check"></i>
                                    </button>
                                </template>

                                &nbsp;
                                
                                <button type="button" class="btn btn-info btn-sm" @click="showModal('proveedor','actualizar', producto)">
                                    <i class="icon-tag"></i>
                                </button> &nbsp;
                            </td>
                            <td>               
                                <div class="row">                 
                                    <div class="col-3">
                                        <img :src="producto.url_imagen" alt="dog"> 
                                    </div>
                                    <div class="col-9">
                                        <h6 v-text="producto.nombre"></h6>
                                        <small class="text-muted" v-text="producto.codigo"></small>                                    
                                    </div>          
                                </div>
                            </td>                            
                            <td>
                                <div>
                                    <small class="text-muted">Promedio:</small> <div class="badge badge-pill badge-primary">$<span v-text="producto.promedio_precio_compra"></span></div>
                                </div>
                                <div>
                                    <small class="text-muted">Ultimo:</small> <div class="badge badge-pill badge-secondary"> $<span v-text="producto.ultimo_precio_compra"></span></div>
                                </div>
                                                                                       
                                
                            </td>
                            <td>
                                <ul>
                                    <li  v-for="atributo in producto.atributos" :key="atributo.id_define_producto">
                                        <span v-text="atributo.atributo"></span> : <span v-text="atributo.valor"></span>
                                    </li>
                                </ul>
                            </td>                                
                            <td>
                                <div v-if="producto.xstatus">
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
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none; bottom: -500px;" aria-hidden="true" :class="{'mostrar' : modalProducto.modal}">            
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalProducto.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <upload-component ref="adjuntos"></upload-component>
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Categoria</label>
                                <div class="col-md-9">
                                    <select class="form-control" v-model="oProducto.id_categoria">
                                        <option value="0" disabled>Seleccione...</option>
                                        <option v-for="categoria in listaCategorias" :key="categoria.id_categoria" :value="categoria.id_categoria" v-text="categoria.nombre"></option>
                                    </select>                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Codigo</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Codigo unico o de barras" maxlength="20" v-model="oProducto.codigo">                                                                        
                                    <barcode :value="oProducto.codigo" :options="{format: 'EAN-13'}" height=25>
                                        Generando codigo de barras...    
                                    </barcode>
                                </div>                                
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                                <div class="col-md-9">
                                    <input type="text" class="form-control" placeholder="Nombre del producto" maxlength="30" v-model="oProducto.nombre">                                    
                                </div>
                            </div>


                            <div class="form-group">                                                 
                               
                                <div class="row">
                                    <label class="col-md-3 form-control-label" for="text-input">Imagen referencia</label>                                    
                                    <div class="col-md-3">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="customFileLangLocal" lang="es" accept="image/png, .jpeg, .jpg, image/gif" @change="getImagenLocal">
                                            <label class="btn btn-primary custom-file-label" for="customFileLangLocal">Seleccionar Archivo</label>                                            
                                        </div>

                                    </div>
                                    <div class="col-md-3"><img :src="oProducto.imagen.local" alt="Imagen del producto" contain height="100px" width="100px"></div>
                                </div>

                            </div>          
                            <div class="form-group row">                                
                                <div class="col-md-12">
                                    <div class="card">
                                        <div class="card-header">
                                            Caracteristicas del producto...
                                        </div>
                                        <div class="card-body">
                                            <span class="badge badge-pill badge-light" v-for="especificacion in oProducto.especificacionList" :key="especificacion.llave">                                                
                                                <div v-if="especificacion.xstatus">
                                                    <div v-if="!especificacion.edicion" style="font-size:14px;" @dblclick="especificacion.edicion=true;">                                                                                                                    
                                                            <span class="text-primary" v-text="especificacion.llave"></span> : <span class="font-weight-normal" v-text="especificacion.valor"></span>
                                                            <button type="button" class="close" aria-label="Close" style="float: right; padding-left: 10px; font-size:10px;" @click="especificacion.xstatus=false;"><span aria-hidden="true">&times;</span></button>                                                                                                                
                                                    </div>

                                                    <div v-if="especificacion.edicion" style="margin:10px 10px 10px 10px;">
                                                      

                                                        <select class="form-control" style="background: rgba(0, 0, 0, 0); border: none; font-size:10px;" v-model="especificacion.llave">
                                                            <option value="0" disabled>Seleccione...</option>
                                                            <option v-for="atributo in atributosProducto" :key="atributo.llave" :value="atributo.llave" v-text="atributo.valor"></option>
                                                        </select>   

                                                        <input type="text" class="form-control" placeholder="valor" maxlength="200" style="background: rgba(0, 0, 0, 0); border: none; font-size:10px;" v-model="especificacion.valor">

                                                        <button type="button" class="btn btn-primary" style="font-size:10px;" @click="especificacion.edicion=false;">Aceptar</button>
                                                        <button type="button" class="btn btn-secondary" style="font-size:10px;" @click="especificacion.edicion=false;">Cancelar</button>
                                                    </div>

                                                </div>
                                            </span>

                                            <button type="button" class="btn badge badge-pill badge-light" @click="crearEspecificacion();"><h3 class="text-secondary">+</h3></button>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>                  

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Notas</label>
                                <div class="col-md-9">
                                    <textarea class="form-control" rows="5" maxlength="300" v-model="oProducto.nota"></textarea>                                    
                                </div>
                            </div>

                            <div v-show="modalProducto.errorProducto" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalProducto.erroresProductoMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalProducto.tipoAccion==1" @click="registrarProducto();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="modalProducto.tipoAccion==2" @click="actualizarProducto();">Actualizar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->       

        <!--Inicio del modal proveedores-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none; bottom: -500px;" aria-hidden="true" :class="{'mostrar' : modalProveedor.modal}">
            <div class="modal-dialog modal-primary" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalProveedor.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="card" style="width: 100%;">                            
                            <ul class="list-group list-group-flush">                 
                                <div v-for="proveedor in oDetaProveedorProducto.listaProveedorProducto" :key="proveedor.codigo.id_deta_proveedor_producto">
                                    <li class="list-group-item" v-if="proveedor.xstatus">
                                    
                                        <div class="row">
                                            <div class="col-12">
                                                <button type="button" class="close " aria-label="Close">
                                                    <span aria-hidden="true" @click="proveedor.xstatus=false;">&times;</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-8">
                                                <h5 class="card-title" v-text="proveedor.nombre"></h5>
                                                
                                            </div>
                                            <div class="col-md-4">
                                                <span>
                                                    <a v-bind:href="''+proveedor.pagina_web+''" target="_blank">Visita su pagina</a>
                                                </span>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">
                                                <h6 class="card-subtitle mb-2 text-muted" v-text="proveedor.nombre_corto">BETT</h6>
                                            </div>
                                            <div class="col-md-8">                                            
                                                <input type="text" class="form-control" placeholder="Codigo barras" maxlength="30" v-model="proveedor.codigo.codigo_barras">
                                            </div>
                                        </div>                                                                                                             
                                    </li>     
                                </div>                           
                                
                            </ul>
                        </div>

                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Proveedor</label>
                                <div class="col-md-6">
                                    <select class="form-control" v-model="oDetaProveedorProducto.selectProveedor">
                                        <option value="0" disabled>Seleccione...</option>
                                        <option v-for="proveedor in listaProveedores" :key="proveedor.id_proveedor" v-bind:value="{ id_proveedor: proveedor.id_proveedor, nombre: proveedor.nombre, nombre_corto: proveedor.nombre_corto, pagina_web: proveedor.pagina_web }">
                                            {{ proveedor.nombre }}
                                        </option>


                                    </select>                                    
                                </div>
                                <div class="col-md-3">
                                    <button type="button" class="btn btn-primary"  @click="addProveedorProducto();">Agregar</button>
                                </div>
                            </div>

                   
                            <div v-show="modalProveedor.errorProducto" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalProveedor.erroresProductoMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <p class="font-weight-light">Ingresa el codigo unico asignado por cada proveedor para este producto
                            Puedes tener mas de un codigo por proveedor
                        </p>                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="storeProveedores();">Guardar</button>                        
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
    import VueBarcode from 'vue-barcode';

    export default {
        data(){
            return{               
                oProducto: {
                    id_producto: 0,
                    id_categoria:0,
                    codigo_categoria:'',
                    codigo: '',
                    nombre:'',
                    url_imagen: '',                                        
                    promedio_precio_compra: 0,
                    ultimo_precio_compra: 0,                
                    nota: '',
                    especificacionList: [],
                    imagen: {
                        local: '',
                        nombre: '',
                        size: 0,
                        type: ''
                    },
                    codigoNextVal: 0,
                    id_carpeta_adjuntos: 0
                },     
                oDetaProveedorProducto:{
                    selectProveedor:'',
                    listaProveedorProducto: []                    
                },
                listaProductos: [],
                modalProducto: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    errorProducto: 0,
                    erroresProductoMsjList: []
                },
                modalProveedor: {
                    modal: 0,
                    tituloModal: '',                    
                    errorProducto: 0,
                    erroresProductoMsjList: []                    
                },   
                pagination: {
                    total : 0,
                    current_page  : 0,
                    per_page : 0,
                    last_page : 0,
                    from : 0,
                    to : 0
                },
                offset : 3,
                criterio: 'nombre',
                buscar: '',
                isLoading: 0,
                listaCategorias: [],
                listaProveedores: [],
                atributosProducto: []
            }
        },
        components: {
            'barcode': VueBarcode
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
            },
            imagen(){
                return this.oProducto.imagen.local;
            }
        },
        methods:{
            listarProductos(page, buscar, criterio, aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                var url= '/zicandi/public/productos?page=' + page +'&buscar=' + buscar + '&criterio=' + criterio;
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  
                    me.isLoading = 0;
                    me.listaProductos = respuesta.producto.data;
                    me.pagination = respuesta.pagination;                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            registrarProducto(){
                if(this.validarProducto()){
                    return;
                }                                

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/productos/registrar',{
                    'id_categoria': this.oProducto.id_categoria,
                    'codigo': this.oProducto.codigo,
                    'nombre': this.oProducto.nombre,                    
                    'nota': this.oProducto.nota,
                    'especificaciones': {especificaciones: this.oProducto.especificacionList},
                    'imagen_local': this.oProducto.imagen.local,
                    'imagen_nombre': this.oProducto.imagen.nombre,
                    'imagen_size': this.oProducto.imagen.size,
                    'imagen_type': this.oProducto.imagen.type,
                    'id_carpeta_adjuntos': this.oProducto.id_carpeta_adjuntos
                })
                .then(function (response) {                    
                    me.buscar = '';
                    me.isLoading = 0;
                    me.closeModal();
                    util.AVISO('Perfecto, registro correcto', util.tipoOk);
                    me.listarProductos(1, '', 'codigo');
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            actualizarProducto(){
                if(this.validarProducto()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/productos/actualizar',{
                    'id_producto': this.oProducto.id_producto,
                    'id_categoria': this.oProducto.id_categoria,
                    'codigo': this.oProducto.codigo,
                    'nombre': this.oProducto.nombre,                    
                    'nota': this.oProducto.nota,
                    'url_imagen': this.oProducto.url_imagen,
                    'especificaciones': {especificaciones: this.oProducto.especificacionList},
                    'imagen_local': this.oProducto.imagen.local,
                    'imagen_nombre': this.oProducto.imagen.nombre,
                    'imagen_size': this.oProducto.imagen.size,
                    'imagen_type': this.oProducto.imagen.type,
                    'id_carpeta_adjuntos': this.oProducto.id_carpeta_adjuntos
                })
                .then(function (response) {                    
                    me.closeModal();
                    me.isLoading = 0;
                    util.AVISO('Actualizacion correcta!', util.tipoOk);                
                    me.listarProductos(me.pagination.current_page, me.buscar, me.criterio);
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

                        axios.post('/zicandi/public/proveedores/activar',{
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
                    case 'producto':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.seqCodigoProductoNextval();
                                this.modalProducto.tituloModal = 'Registrar nuevo producto';
                                this.modalProducto.tipoAccion = 1;
                                this.modalProducto.modal = 1;

                                this.oProducto.id_producto=0;
                                this.oProducto.id_categoria=0;
                                this.oProducto.codigo_categoria='';
                                this.oProducto.codigo= 0;
                                this.oProducto.nombre='';
                                this.oProducto.nota= '';
                                this.oProducto.imagen.local='repositorio/sistema/no_disponible.png';
                                this.oProducto.imagen.nombre='';
                                this.oProducto.imagen.size=0;
                                this.oProducto.imagen.type='';                                
                                this.oProducto.especificacionList = [];

                                this.onCargaComponenteUpload();

                                break;
                            }
                            case 'actualizar':
                            {
                                this.modalProducto.modal = 1;
                                this.modalProducto.tituloModal = 'Actualizar producto'
                                this.modalProducto.tipoAccion = 2;
                                
                                this.oProducto.id_producto=     data['id_producto'];
                                this.oProducto.id_categoria=    data['id_categoria'];
                                this.oProducto.id_carpeta_adjuntos = data['id_carpeta_adjuntos'];
                                this.oProducto.codigo_categoria=data['codigo_categoria'];
                                this.oProducto.codigo=          data['codigo'];
                                this.oProducto.nombre=          data['nombre'];
                                this.oProducto.nota=            data['nota']; 
                                this.oProducto.url_imagen=      data['url_imagen'];  
                                this.oProducto.imagen.local=    data['url_imagen'];  
                                this.oProducto.imagen.nombre='';
                                this.oProducto.imagen.size=0;
                                this.oProducto.imagen.type='';                                
                                this.oProducto.especificacionList = [];                                 
                                
                                for (let i = 0; i < data['atributos'].length; i++) {
                                    let att = data['atributos'][i];
                                    let especificacion= {llave:att['atributo'], valor:att['valor'], edicion: false, xstatus: true};
                                    this.oProducto.especificacionList.push(especificacion);                                    
                                };

                                //~Carga documentos adjuntos
                                this.onCargaComponenteUpload();
                            }
                        }

                        break;
                    }

                    case 'proveedor':
                    {
                        switch(accion){                            
                            case 'actualizar':
                            {
                                this.modalProveedor.modal = 1;
                                this.modalProveedor.tituloModal = 'Proveedores de este producto';                                

                                this.oProducto.id_producto=     data['id_producto'];
                                
                                this.getProveedoresByProducto();
                                this.selectProveedor();                                                                
                            }
                        }

                        break;
                    }
                }                
            },
            closeModal(){
                
                //~Producto
                this.oProducto.id_producto=0;
                this.oProducto.id_categoria=0;
                this.oProducto.codigo_categoria='';
                this.oProducto.codigo= '';
                this.oProducto.nombre='';
                this.oProducto.url_imagen= '';
                this.oProducto.promedio_precio_compra= 0;
                this.oProducto.ultimo_precio_compra= 0;                
                this.oProducto.nota= '';

                this.modalProducto.modal = 0;                
                this.modalProducto.tituloModal = '';


                //~Detalle de proveedores
                this.oDetaProveedorProducto.selectProveedor= '';
                this.oDetaProveedorProducto.listaProveedorProducto= [];

                this.modalProveedor.modal = 0;                
                this.modalProveedor.tituloModal = '';


                
            },
            validarProducto(){
                this.modalProducto.errorProducto = 0;
                this.modalProducto.erroresProductoMsjList = [];

                if(!this.oProducto.nombre) this.modalProducto.erroresProductoMsjList.push("Se requiere el nombre del Producto");

                if(this.oProducto.id_categoria==0) this.modalProducto.erroresProductoMsjList.push("Se requiere elegir una categoria");

                if(!this.oProducto.codigo) this.modalProducto.erroresProductoMsjList.push("Define el nombre del Producto");

                if(this.modalProducto.erroresProductoMsjList.length) this.modalProducto.errorProducto = 1;

                return this.modalProducto.errorProducto;
            },
            cambiarPagina(page, buscar, criterio){
                let me = this;

                me.pagination.current_page = page;

                me.listarProductos(page, buscar, criterio, true);
            },
            selectCategoria(){                
                let me=this;                
                var url= '/zicandi/public/categoria/selectCategoria';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.listaCategorias = respuesta.categorias;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            selectProveedor(){                
                let me=this;                
                var url= '/zicandi/public/proveedores/selectProveedor';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.listaProveedores = respuesta.proveedores;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            selectAtributosProducto(){                
                let me=this;                
                var url= '/zicandi/public/parametria/getProceso';
                axios.post(url,{'clave_proceso': 'ATT_PROD'})
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.atributosProducto = respuesta.parametria;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            seqCodigoProductoNextval(){                
                let me=this;                
                var url= '/zicandi/public/parametria/seqProductoCodigo_nextval';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.oProducto.codigoNextVal = respuesta;
                    me.oProducto.codigo= me.oProducto.codigoNextVal;
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            getImagenLocal(e){                       
                let file = e.target.files[0];
                this.oProducto.imagen.nombre = file.name;
                this.oProducto.imagen.size = file.size;
                this.oProducto.imagen.type = file.type;                
                            
                let reader = new FileReader();

                reader.onload = (e) => {
                    this.oProducto.imagen.local = e.target.result;                    
                }
                reader.readAsDataURL(file);
            },
            crearEspecificacion(){
                let especificacion= {llave:"", valor:"", edicion: true, xstatus: true};

                this.oProducto.especificacionList.push(especificacion);
            },
            getProveedoresByProducto(){                
                let me=this;                
                var url= '/zicandi/public/productos/getProveedoresByProducto';

                this.isLoading = 1;
                axios.post(url,{
                    'id_producto': this.oProducto.id_producto
                })
                .then(function (response) {   
                    me.isLoading = 0;                 
                    var respuesta = response.data;  

                    me.oDetaProveedorProducto.listaProveedorProducto = respuesta.proveedores;                                  
                })
                .catch(function (error) {  
                    me.isLoading = 0;                                      
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            addProveedorProducto(){                
                let proveedor= {    id_proveedor:this.oDetaProveedorProducto.selectProveedor.id_proveedor, 
                                    nombre:this.oDetaProveedorProducto.selectProveedor.nombre, 
                                    nombre_corto: this.oDetaProveedorProducto.selectProveedor.nombre_corto, 
                                    pagina_web: this.oDetaProveedorProducto.selectProveedor.pagina_web,
                                    xstatus: 1, 
                                    codigo: {
                                        id_producto: this.oProducto.id_producto,
                                        codigo_barras:""
                                    }
                                };
                
                if(!this.oDetaProveedorProducto.selectProveedor.id_proveedor){                    
                    this.modalProveedor.errorProducto = 1;
                    this.modalProveedor.erroresProductoMsjList = [];

                    this.modalProveedor.erroresProductoMsjList.push("Se requiere elegir un proveedor");                    
                }else{
                    this.modalProveedor.errorProducto = 0;
                    this.oDetaProveedorProducto.listaProveedorProducto.push(proveedor);
                }                                                
            },
            storeProveedores(){
            
                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/productos/storeProveedoresByProducto',{
                    'id_producto': this.oProducto.id_producto,                    
                    'proveedores': {proveedores: this.oDetaProveedorProducto.listaProveedorProducto}
                })
                .then(function (response) {                    
                    me.closeModal();
                    me.isLoading = 0;
                    util.AVISO('Actualizacion correcta!', util.tipoOk);                                    
                })
                .catch(function (error) {
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onCargaComponenteUpload(){
                if(this.oProducto.id_carpeta_adjuntos==0 || this.oProducto.id_carpeta_adjuntos==null){
                    let me = this;                    
                    axios.post('/zicandi/public/uploadfile/nuevaCarpeta',{
                        'nombre': 'carpeta_producto'                   
                    })
                    .then(function (response) {                                                                
                        console.log(response);

                        me.oProducto.id_carpeta_adjuntos=response.data;
                        me.$refs.adjuntos.onLoadAdjuntos(me.oProducto.id_carpeta_adjuntos);
                    })
                    .catch(function (error) {                               
                        util.MSG('Algo salio Mal','Error al crear la carpeta: '.util.getErrorMensaje(error), util.tipoErr);
                    });
                }else{
                    this.$refs.adjuntos.onLoadAdjuntos(this.oProducto.id_carpeta_adjuntos);
                }
                
            },

        },
        mounted() {
            this.listarProductos(1, this.buscar, this.criterio, true);
            this.selectAtributosProducto();
            this.selectCategoria();            
        }
    }
</script>