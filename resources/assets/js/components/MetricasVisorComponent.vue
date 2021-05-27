<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Tiendas</li>
            <li class="breadcrumb-item active">Visor metricas</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-primary" @click="showModal('metrica','registrar')">
                        <i class="icon-plus"></i>&nbsp;Nueva metrica
                    </button>             
                    &nbsp;&nbsp;   
                    <button type="button" class="btn btn-secondary" @click="showModal('metrica','proyecto')">
                        <i class="icon-plus"></i>&nbsp;Nuevo Proyecto
                    </button>     
                </div>   
            </div>
            
            <div class="card-body">

                <!-- Buscador -->
                <div class="form-group row">
                    <div class="col-md-6">
                        <div class="input-group">   
                            <select class="form-control col-md-3" v-model="buscadorGrid.criterio">
                                <option value="1">Activas</option>
                                <option value="0">Canceladas</option>                                
                            </select>                         
                            <input type="text" v-model="buscadorGrid.textoBuscar" @keyup.enter="buscarProyectos(1, buscadorGrid.textoBuscar, buscadorGrid.criterio, true)" class="form-control" placeholder="Texto a buscar">
                            <button type="submit" class="btn btn-primary" @click="buscarProyectos(1, buscadorGrid.textoBuscar, buscadorGrid.criterio, true)"><i class="fa fa-search"></i> Buscar proyecto</button>
                        </div>
                    </div>
                </div>


                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th style="width:10px">Opciones</th>                            
                            <th>Proyecto</th>
                            <th>Metrica</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="proyectos in buscadorGrid.proyectos" :key="proyectos.id_meli_metrica_proyecto">
                            <td>
                               
                                <template v-if="proyectos.xstatus=='1'">
                                    <button type="button" class="btn btn-danger btn-sm" @click="onActivaDesactivaProyecto(proyectos.id_meli_metrica_proyecto, proyectos.xstatus)">
                                        <i class="icon-trash"></i>
                                    </button>
                                </template>

                                <template v-else>
                                    <button type="button" class="btn btn-info btn-sm" @click="onActivaDesactivaProyecto(proyectos.id_meli_metrica_proyecto, proyectos.xstatus)">
                                        <i class="icon-check"></i>
                                    </button>
                                </template>

                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('metrica','proyecto_edit', proyectos)">
                                    <i class="icon-pencil"></i>
                                </button> &nbsp;
                            </td>                            
                            <td>
                                <div>                                
                                    <a href="#" @click="showModal('metrica','deta_publicacion_proyecto', proyectos)"><img :src="proyectos.foto" alt="dog" width="50px" height="50px"></a>                                

                                </div>
                                <span v-text="proyectos.nombre"></span>
                            </td>
                            <td>Aqui va la metrica</td>
                            
                        </tr>                            
                    </tbody>
                </table>
                <nav>
                    <ul class="pagination">
                        <li class="page-item" v-if="pagination.current_page > 1">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page-1, buscadorGrid.textoBuscar, buscadorGrid.criterio)">Ant</a>
                        </li>
                        <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(page, buscadorGrid.textoBuscar, buscadorGrid.criterio)" v-text="page"></a>
                        </li>                           
                        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page+1, buscadorGrid.textoBuscar, buscadorGrid.criterio)">Sig</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
            
        
        <!--Inicio del modal agregar/actualizar-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalRegistraPublicacion.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalRegistraPublicacion.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">URL</label>
                                <div class="col-md-9">                                    
                                    <textarea  rows="4" cols="50" class="form-control" placeholder="URL" v-model="modalRegistraPublicacion.url">
                                    </textarea>
                                </div>
                            </div>

                            

                            <div v-show="modalRegistraPublicacion.errorProveedor" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalRegistraPublicacion.erroresProveedorMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalRegistraPublicacion.tipoAccion==1" @click="onRegistrarPublicacion();">Guardar</button>                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->    


        <!--Inicio del modal agregar/actualizar PROYECTO METRICA-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalRegistraProyecto.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalRegistraProyecto.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Nombre</label>
                                <div class="col-md-9">                                                                        
                                    <input type="text" class="form-control" placeholder="Nombre del proyecto" maxlength="30" v-model="modalRegistraProyecto.nombre">                                    
                                </div>
                            </div>

                            <div class="form-group">                                                 
                               
                                <div class="row">
                                    <label class="col-md-3 form-control-label" for="text-input">Avatar</label>                                    
                                    <div class="col-md-3">
                                        <div class="custom-file">
                                            <input type="file" class="custom-file-input" id="customFileLangLocal" lang="es" accept="image/png, .jpeg, .jpg, image/gif" @change="getImagenLocal">
                                            <label class="btn btn-primary custom-file-label" for="customFileLangLocal">Seleccionar Archivo</label>                                            
                                        </div>

                                    </div>
                                    <div class="col-md-3"><img :src="modalRegistraProyecto.imagen.local" alt="Imagen del producto" contain height="100px" width="100px"></div>
                                </div>

                            </div> 

                            

                            <div v-show="modalRegistraProyecto.errorProveedor" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalRegistraProyecto.erroresProveedorMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalRegistraProyecto.tipoAccion==1" @click="onRegistrarProyecto();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="modalRegistraProyecto.tipoAccion==2" @click="onRegistrarProyecto();">Modificar</button>
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal--> 

        <!-- Inicio del modal publicaciones dentro del proyecto -->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetalleVisorProyecto.modal}">
            <div class="modal-dialog modal-primary" style="max-width: 90% !important;" role="document">
                <div class="modal-content" style="height: 700px;">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalDetalleVisorProyecto.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 120px); overflow-y: scroll;">
                        

                        

                            <div class="form-group row">
                                <div class="col-md-6">
                                    <div class="input-group">   
                                        <select class="form-control col-md-3" v-model="modalDetalleVisorProyecto.criterio">
                                            <option value="ACT">Activas</option>
                                            <option value="CAN">Canceladas</option>                                
                                        </select>                         
                                        <input type="text" v-model="modalDetalleVisorProyecto.textoBuscar" @keyup.enter="buscarPublicaciones(1, modalDetalleVisorProyecto.textoBuscar, modalDetalleVisorProyecto.criterio, true)" class="form-control" placeholder="Texto a buscar">
                                        <button type="submit" class="btn btn-primary" @click="buscarPublicaciones(1, modalDetalleVisorProyecto.textoBuscar, modalDetalleVisorProyecto.criterio, true)"><i class="fa fa-search"></i> Buscar</button>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Grid -->
                            <table class="table table-bordered table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th width="10%;">Opciones</th>
                                        <th>Producto</th>                            
                                        <th>Ventas</th>
                                        <th>Visitas</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="publicacion in modalDetalleVisorProyecto.publicaciones" :key="publicacion.id_meli_metrica_visor">
                                        <td>
                                                                                                                                   
                                          
                                            
                                            <template v-if="publicacion.estatus=='ACT'">
                                                <button type="button" class="btn btn-danger btn-sm" @click="onActivaDesactivaPublicacion(publicacion.id_meli_metrica_visor, publicacion.estatus)">
                                                    <i class="icon-trash"></i>
                                                </button>
                                            </template>

                                            <template v-else>
                                                <button type="button" class="btn btn-info btn-sm" @click="onActivaDesactivaPublicacion(publicacion.id_meli_metrica_visor, publicacion.estatus)">
                                                    <i class="icon-check"></i>
                                                </button>
                                            </template>

                                            <button type="button" class="btn btn-warning btn-sm" @click="onCalcularEstadistica(publicacion.url, publicacion.id_meli_metrica_visor)">
                                                <i class="icon-calculator"></i>
                                            </button>

                                            <button type="button" class="btn btn-primary btn-sm" @click="showModal('metrica','grafico', publicacion)">
                                                <i class="icon-graph"></i>
                                            </button>


                                        </td>
                                        <td>               
                                            <div class="row">                 
                                                <div class="col-3">                                                
                                                    <a href="#" @click="onAbrirPublicacionML(publicacion.url)"><img :src="publicacion.foto" alt="dog" width="100px" height="100px"> </a>
                                                </div>
                                                <div class="col-9">
                                                    <h6 v-text="publicacion.titulo"></h6>
                                                    <small class="text-muted" v-text="publicacion.id_publicacion_tienda"></small>                                    
                                                    <span v-text="publicacion.estatus_publicacion"></span>
                                                </div>          
                                            </div>
                                        </td>                            
                                        <td>               
                                            <img :src="publicacion.url_graph_ventas" alt="dog" height="100px"> 
                                        </td>   
                                        <td>               
                                            <img :src="publicacion.url_graph_visitas" alt="dog" height="100px"> 
                                        </td>
                                        
                                    </tr>                            
                                </tbody>
                            </table>
                            <nav>
                                <ul class="pagination">
                                    <li class="page-item" v-if="paginationPubli.current_page > 1">
                                        <a class="page-link" href="#" @click.prevent="cambiarPaginaPubli(paginationPubli.current_page-1, modalDetalleVisorProyecto.textoBuscar, modalDetalleVisorProyecto.criterio)">Ant</a>
                                    </li>
                                    <li class="page-item" v-for="page in pagesNumberPubli" :key="page" :class="[page == isActivedPubli ? 'active' : '']">
                                        <a class="page-link" href="#" @click.prevent="cambiarPaginaPubli(page, modalDetalleVisorProyecto.textoBuscar, modalDetalleVisorProyecto.criterio)" v-text="page"></a>
                                    </li>                           
                                    <li class="page-item" v-if="paginationPubli.current_page < paginationPubli.last_page">
                                        <a class="page-link" href="#" @click.prevent="cambiarPaginaPubli(paginationPubli.current_page+1, modalDetalleVisorProyecto.textoBuscar, modalDetalleVisorProyecto.criterio)">Sig</a>
                                    </li>
                                </ul>
                            </nav>
                            

                            <div v-show="modalDetalleVisorProyecto.errorProveedor" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalDetalleVisorProyecto.erroresProveedorMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>                        

                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalDetalleVisorProyecto.tipoAccion==1" @click="onCreaNuevoFolioEnvio();">Guardar</button>                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->    


        <!--Inicio del modal Detalle metricas-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetalleMetrica.modal}">
            <div class="modal-dialog modal-primary" style="max-width: 90% !important;" role="document">
                <div class="modal-content" style="height: 700px;">
                    <div class="modal-header">

                        <h4 class="modal-title" v-text="modalDetalleMetrica.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModalGrafico();">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="modal-body" style="max-height: calc(100% - 120px); overflow-y: scroll;">
                        <div class="list-group">    
                            
                         
                                
                            <div class="row">
                                <div class="col-md-2">
                                    Fecha inicial:
                                </div>
                                <div class="col-md-3">
                                    <datepicker v-model="modalDetalleMetrica.fechaInicial"></datepicker> 
                                </div>
                                <div class="col-md-2">
                                    Fecha final:
                                </div>
                                <div class="col-md-3">
                                    <datepicker v-model="modalDetalleMetrica.fechaFinal"></datepicker> 
                                </div>
                                <div class="col-md-2">
                                    <button type="button"  @click="getDetalleMetrica(modalDetalleMetrica.idMeliMetricaVisor);">
                                        <span aria-hidden="true">Buscar</span>
                                    </button>
                                </div>
                            </div>                                               

                            <br>     

                           
                            <div class="card" style="width: 100%;">                            
                                <div class="row">
                                    <div class="col-md-12">
                                        <div class="card card-chart">
                                            <div class="card-header">
                                                Ventas
                                            </div>
                                            <div class="card-content">
                                                <div class="ct-chart" style="height: 300px">
                                                    <canvas id="canvasGrafico"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="ror">
                                    <div class="col-md-12">


                                        <table class="table table-bordered table-striped table-sm">
                                            <thead>
                                                <tr>
                                                    <th>Fecha</th>
                                                    <th>Ventas</th>
                                                    <th>Ventas Dia</th>
                                                    <th>Visitas</th>                                                    
                                                    <th>Precio</th>
                                                    <th>Disponibles</th>
                                                    <th>Full</th>
                                                    <th>MSI</th>
                                                    <th>Catalogo</th>
                                                    <th>Estatus</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr v-for="metrica in modalDetalleMetrica.historicoMetricas" :key="metrica.id_meli_deta_metrica_visor">                                          
                                                    
                                                    <td v-text="metrica.fecha_consulta"></td>
                                                    <td v-text="metrica.ventas"></td>
                                                    <td v-text="metrica.ventasDia"></td>
                                                    <td v-text="metrica.visitas"></td>                                                    
                                                    <td v-text="metrica.precio"></td>
                                                    <td v-text="metrica.disponibles"></td>

                                                    <td v-if="metrica.full == 1">Si</td>
                                                    <td v-if="metrica.full == 0">No</td>

                                                    <td v-if="metrica.msi == 1">Si</td>
                                                    <td v-if="metrica.msi == 0">No</td>

                                                    <td v-if="metrica.isCatalogo == 1">Si</td>
                                                    <td v-if="metrica.isCatalogo == 0">No</td>
                                                                                                        
                                                    <td v-text="metrica.estatus_publicacion"></td>

                                                    
                                                </tr>                            
                                            </tbody>
                                        </table>

                                    </div>
                                </div>
                            </div>
                        
                        </div>                                                
                    </div>
                                                        
                    <div class="modal-footer">
                                                
                        <button type="button" class="btn btn-secondary" @click="closeModalGrafico();">Cerrar</button>                            
                                    
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
                buscadorGrid: {
                     proyectos: [],
                     textoBuscar: '',
                     criterio: '1'
                },  

                modalRegistraPublicacion   : {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    error: 0,
                    erroresMsjList: [],
                    url
                },

                modalDetalleMetrica   : {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    error: 0,
                    erroresMsjList: [],
                    varVentas: null,
                    charVentas: null,
                    historicoMetricas:[],
                    idMeliMetricaVisor:0,
                    fechaInicial: '',
                    fechaFinal: ''
                },

                modalRegistraProyecto: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    error: 0,
                    erroresMsjList: [],
                    idMeliMetricaProyecto:0,
                    nombre: '',
                    imagen: {
                        local: '',
                        nombre: '',
                        size: 0,
                        type: ''
                    },
                },

                modalDetalleVisorProyecto   : {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    error: 0,
                    criterio: 'ACT',
                    textoBuscar: '',
                    idMeliMetricaProyecto: 0,                    
                    erroresMsjList: [],
                    publicaciones:[]
                },

                pagination: {
                    total : 0,
                    current_page  : 0,
                    per_page : 0,
                    last_page : 0,
                    from : 0,
                    to : 0                    
                },

                paginationPubli: {
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
            },
            isActivedPubli: function(){
                return this.paginationPubli.current_page;
            },
            pagesNumberPubli: function(){
               return  paginador.getPagesNumber(this.paginationPubli);                
            }
        },
        components: {      
            Datepicker      
        },
        methods:{
            buscarProyectos(page, buscar, criterio, aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                let url= '/zicandi/public/meli/metricas/proyecto/buscar?page=' + page +'&filtro=' + buscar + '&estatus=' + criterio;
                axios.get(url)
                .then(function (response) {       
                    me.isLoading = 0
                    console.log(response.data);
                    if(response.data.xstatus){   
                        me.buscadorGrid.proyectos = response.data.proyectos.data;
                        me.pagination = response.data.pagination; 
                        
                        
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
             * Busca publicaciones
             * 
             * 
             * 
             */
            buscarPublicaciones(page, buscar, criterio, aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                let idMeliMetricaProyecto = this.modalDetalleVisorProyecto.idMeliMetricaProyecto;
                let url= '/zicandi/public/meli/metricas/visor?page=' + page +'&filtro=' + buscar + '&estatus=' + criterio +'&idMeliMetricaProyecto=' + idMeliMetricaProyecto;

                console.log(url);

                axios.get(url)
                .then(function (response) {       
                    me.isLoading = 0

                    if(response.data.xstatus){   
                        me.modalDetalleVisorProyecto.publicaciones = response.data.metricas.data;
                        me.paginationPubli = response.data.pagination; 

                        
                    }else{
                        throw new Error(response.data.error);
                    } 
              
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },


            onAbrirPublicacionML(url){     
                let params  = 'width='+screen.width;
                params += ', height='+screen.height;
                params += ', top=0, left=0'
                params += ', fullscreen=yes';           
                newwin = window.open(url,"Publicacion");

                if (window.focus) {newwin.focus()}
                    
            },

            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'metrica':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                this.modalRegistraPublicacion.modal = 1;
                                this.modalRegistraPublicacion.url = '';                                
                                this.modalRegistraPublicacion.tituloModal = 'Registrar publicacion';
                                this.modalRegistraPublicacion.tipoAccion = 1;

                                break;
                            }

                            case 'grafico':
                            {
                                this.modalDetalleMetrica.modal = 1;
                                this.modalDetalleMetrica.url = '';                                
                                this.modalDetalleMetrica.tituloModal = 'Metricas';
                                this.modalDetalleMetrica.tipoAccion = 1;
                                this.modalDetalleMetrica.idMeliMetricaVisor = data.id_meli_metrica_visor;
                                this.getDetalleMetrica(data.id_meli_metrica_visor);
                                

                                break;
                            }

                            case 'proyecto':
                            {
                                this.modalRegistraProyecto.modal = 1;
                                this.modalRegistraProyecto.nombre = '';                                
                                this.modalRegistraProyecto.tituloModal = 'Registrar proyecto';
                                this.modalRegistraProyecto.tipoAccion = 1;
                                this.modalRegistraProyecto.idMeliMetricaProyecto = 0;
                                this.modalRegistraProyecto.imagen.local = null;

                                break;
                            }

                            case 'proyecto_edit':
                            {
                                this.modalRegistraProyecto.modal = 1;
                                this.modalRegistraProyecto.nombre = data.nombre;
                                this.modalRegistraProyecto.tituloModal = 'Modificar proyecto';
                                this.modalRegistraProyecto.tipoAccion = 2;
                                this.modalRegistraProyecto.idMeliMetricaProyecto = data.id_meli_metrica_proyecto;
                                this.modalRegistraProyecto.imagen.local = data.foto;

                                break;
                            }

                            case 'deta_publicacion_proyecto':
                            {
                                this.modalDetalleVisorProyecto.modal = 1;                                
                                this.modalDetalleVisorProyecto.tituloModal = 'Publicaciones monitoreadas';
                                this.modalDetalleVisorProyecto.idMeliMetricaProyecto = data.id_meli_metrica_proyecto;
                                this.buscarPublicaciones(1, '', 'ACT', true);
                                break;
                            }


                            
                            


                            
                        }
                    }
                }
            },
            closeModal(){
                this.modalRegistraPublicacion.modal = 0;
                this.modalRegistraPublicacion.url = '';                
                this.modalRegistraPublicacion.tituloModal = '';

                this.modalDetalleMetrica.modal = 0;                
                this.modalDetalleMetrica.tituloModal = '';

                this.modalRegistraProyecto.modal = 0;                
                this.modalRegistraProyecto.tituloModal = '';

                this.modalDetalleVisorProyecto.modal = 0;                
                this.modalDetalleVisorProyecto.tituloModal = '';
            },
            closeModalGrafico(){
                this.modalDetalleMetrica.modal = 0;
                this.modalDetalleMetrica.url = '';                
                this.modalDetalleMetrica.tituloModal = '';

            },


            

            validarProveedor(){
                this.modalRegistraPublicacion.error = 0;
                this.modalRegistraPublicacion.erroresMsjList = [];

                if(!this.modalRegistraPublicacion.url) this.modalRegistraPublicacion.erroresMsjList.push("Se requiere la URL");

                
                if(this.modalRegistraPublicacion.erroresMsjList.length) this.modalRegistraPublicacion.error = 1;

                return this.modalRegistraPublicacion.error;
            },
            cambiarPagina(page, buscar, criterio){
                let me = this;

                me.pagination.current_page = page;

                me.buscarPublicaciones(page, buscar, criterio, true);
            },

            cambiarPaginaPubli(page, buscar, criterio){
                let me = this;

                me.paginationPubli.current_page = page;

                me.buscarPublicaciones(page, buscar, criterio, true);
            },

            onRegistrarPublicacion(){
                let me = this;                
                


                this.isLoading = 1;
                axios.post('/zicandi/public/meli/metricas/visor/save',{
                        'url': this.modalRegistraPublicacion.url
                })
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){ 
                        console.log(response.data);
                        util.AVISO('Se registro nueva ubicacion, seleccionala...', util.tipoOk);

                        me.closeModal();
                        me.buscarPublicaciones(1, me.buscadorGrid.textoBuscar, me.buscadorGrid.criterio, true);
                       
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });

            },


            onActivaDesactivaPublicacion(idMeliMetricaVisor, estatusActual){
                let me = this;                
                
                let estatusNuevo = '';

                if(estatusActual == "ACT"){
                    estatusNuevo = "CAN";
                }else{
                    estatusNuevo = "ACT";
                }


                this.isLoading = 1;
                axios.post('/zicandi/public/meli/metricas/visor/edit_estatus',{
                        'idMeliMetricaVisor': idMeliMetricaVisor,
                        'estatus': estatusNuevo
                })
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){ 
                        
                        util.AVISO('Se realizo el cambio correctamente', util.tipoOk);
                        
                        me.buscarPublicaciones(1, me.modalDetalleVisorProyecto.textoBuscar, me.modalDetalleVisorProyecto.criterio, true);
                       
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });

            },

            onGenerarGraficoVentas(){
                let varTotalVentas = [];
                let varTotalDiaVentas = [];
                let varDiaVentas = [];
                let varPorVisitas = [];                


                
                let metricas = this.modalDetalleMetrica.historicoMetricas;
                

                for(let i=0; i<this.modalDetalleMetrica.historicoMetricas.length;i++){
                    let metrica = this.modalDetalleMetrica.historicoMetricas[i];

                    if(i>=1){
                        varTotalDiaVentas.push(metrica.ventas - this.modalDetalleMetrica.historicoMetricas[i-1].ventas);   
                    }else{                        
                        varTotalDiaVentas.push(0);   
                    }
                    varDiaVentas.push(metrica.fecha_consulta);
                    varTotalVentas.push(metrica.ventas);
                    varPorVisitas.push(metrica.porcentajeVentas);
                }               

                let ctx = document.getElementById('canvasGrafico').getContext('2d');

              

                let chartData = {
                    labels: varDiaVentas,
                    datasets: [{
                        type: 'line',
                        label: 'VENTAS',
                        borderColor: 'rgba(227, 22, 60, 1)',
                        backgroundColor: 'rgba(227, 22, 60, 0.8)',
                        borderWidth: 5,
                        fill: false,
                        pointRadius: 5,
                        pointHoverRadius: 15,
                        data: varTotalDiaVentas
                    }]

                };

                if (window.grafica) {
                    window.grafica.clear();
                    window.grafica.destroy();
                }

                

                window.grafica = new Chart(ctx, {
                    type: 'bar',
                    data: chartData,
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }],
                            xAxes: [{
                                barPercentage: 0.1
                            }]
                        },

                        tooltips: {
                            callbacks: {
                                label: function(tooltipItem, data) {
                                    let label = data.datasets[tooltipItem.datasetIndex].label || '';
                                    
                                    if (label) {
                                        label += ': ';
                                    }
                                    

                                    let visitas = 0;
                                    let precio = 0;
                                    let full = 0;
                                    let disponibles = 0;
                                    let msi = 0;
                                    let estatusPublicacion = '';                                    


                                    for(let i=0; i<metricas.length;i++){
                                        let m = metricas[i];
                                        if(m.fecha_consulta == tooltipItem.xLabel){
                                            visitas = m.visitas;
                                            precio = m.precio;
                                            full = m.full;
                                            disponibles = m.disponibles;
                                            msi = m.msi;
                                            estatusPublicacion = m.estatus_publicacion;
                                            

                                            break;
                                        }
                                    }

                                    label += tooltipItem.yLabel 
                                    + ' | VISITAS:' + visitas
                                    + ' | PRECIO:' + precio
                                    + ' | FULL:' + (full==1 ? 'Si' : 'No')
                                    + ' | MSI:' + (msi==1 ? 'Si' : 'No')
                                    + ' | DISPONIBLE:' + disponibles
                                    + ' | ESTATUS:' + estatusPublicacion;
                                                                                                            
                                    return label;
                                }
                            }
                        }
                    }
                }
                );
            },

            getDetalleMetrica(idMeliMetricaVisor){

                this.isLoading = 1;

                let fechaInicio = this.modalDetalleMetrica.fechaInicial.getFullYear()+"-"+(this.modalDetalleMetrica.fechaInicial.getMonth() + 1)+"-"+this.modalDetalleMetrica.fechaInicial.getDate();
                let fechaFin = this.modalDetalleMetrica.fechaFinal.getFullYear()+"-"+(this.modalDetalleMetrica.fechaFinal.getMonth() + 1)+"-"+this.modalDetalleMetrica.fechaFinal.getDate();
                                

                let me=this;                
                let url= '/zicandi/public/meli/metricas/visor/detalle?idMeliMetricaVisor='+idMeliMetricaVisor+'&fechaInicial='+fechaInicio+'&fechaFinal='+fechaFin;
                axios.get(url)
                .then(function (response) {       
                    me.isLoading = 0

                    if(response.data.xstatus){   
                   
                        me.modalDetalleMetrica.historicoMetricas = response.data.metricas;                                                

                        for(let i=0; i<me.modalDetalleMetrica.historicoMetricas.length;i++){
                            let metrica = me.modalDetalleMetrica.historicoMetricas[i];
                            

                            if(i>=1){
                                
                                let anterior = me.modalDetalleMetrica.historicoMetricas[i-1];
                                let ventasDia = metrica.ventas - anterior.ventas;
                                let visitasDia = metrica.visitas;
                                let porcentaje = (visitasDia / ventasDia)*100;
                                let porcentajeVentas = (visitasDia / ventasDia)*metrica.ventas;

                                me.modalDetalleMetrica.historicoMetricas[i].ventasDia = ventasDia;
                                me.modalDetalleMetrica.historicoMetricas[i].porcentaje = Math.round(porcentaje);
                                me.modalDetalleMetrica.historicoMetricas[i].porcentajeVentas = Math.round(porcentajeVentas);
                            }
                        }


                        me.onGenerarGraficoVentas();

                        console.log(response.data.metricas);
                        
                    }else{
                        throw new Error(response.data.error);
                    } 
              
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            getImagenLocal(e){                       
                let file = e.target.files[0];
                this.modalRegistraProyecto.imagen.nombre = file.name;
                this.modalRegistraProyecto.imagen.size = file.size;
                this.modalRegistraProyecto.imagen.type = file.type;                
                            
                let reader = new FileReader();

                reader.onload = (e) => {
                    this.modalRegistraProyecto.imagen.local = e.target.result;                    
                }
                reader.readAsDataURL(file);
            },


            onRegistrarProyecto(){                
                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/meli/metricas/proyecto/save',{                    
                    'nombre': this.modalRegistraProyecto.nombre, 
                    'idMeliMetricaProyecto': this.modalRegistraProyecto.idMeliMetricaProyecto,                                       
                    'imagen_local': this.modalRegistraProyecto.imagen.local,
                    'imagen_nombre': this.modalRegistraProyecto.imagen.nombre,
                    'imagen_size': this.modalRegistraProyecto.imagen.size,
                    'imagen_type': this.modalRegistraProyecto.imagen.type                    
                })
                .then(function (response) {                    
                    me.buscar = '';
                    me.isLoading = 0;
                    me.closeModal();
                    util.AVISO('Perfecto, registro correcto', util.tipoOk);                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            
            /**
             * Activa / desactiva proyecto
             * 
             * 
             */
            onActivaDesactivaProyecto(idMeliMetricaProyecto, estatusActual){
                let me = this;                
                
                let estatusNuevo = '';

                if(estatusActual == "1"){
                    estatusNuevo = "0";
                }else{
                    estatusNuevo = "1";
                }


                this.isLoading = 1;
                axios.post('/zicandi/public/meli/metricas/proyecto/xstatus',{
                        'idMeliMetricaProyecto': idMeliMetricaProyecto,
                        'xstatus': estatusNuevo
                })                
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){ 
                        
                        util.AVISO('Se realizo el cambio correctamente', util.tipoOk);
                        
                        me.buscarProyectos(1, me.buscadorGrid.textoBuscar, me.buscadorGrid.criterio, true);
                       
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });

            },


             onCalcularEstadistica(url, idMeliMetricaVisor){
                let me = this;                
                
                this.isLoading = 1;
          
                console.log('/zicandi/public/meli/metricas/visor/metrica?url=' + url + '&idMeliMetricaVisor='+idMeliMetricaVisor);
                axios.get('/zicandi/public/meli/metricas/visor/metrica?url=' + url + '&idMeliMetricaVisor='+idMeliMetricaVisor)
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){ 
                        
                        util.AVISO('Metricas actualizadas', util.tipoOk);
                        
                        me.buscarPublicaciones(1, me.modalDetalleVisorProyecto.textoBuscar, me.modalDetalleVisorProyecto.criterio, true);
                       
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
            
            let hoy30 = new Date();
            hoy30.setDate(hoy30.getDate() -30);
            this.modalDetalleMetrica.fechaFinal = new Date();
            this.modalDetalleMetrica.fechaInicial = hoy30;

            //this.buscarPublicaciones(1, this.buscadorGrid.textoBuscar, this.buscadorGrid.criterio, true);
            this.buscarProyectos(1, this.buscadorGrid.textoBuscar, this.buscadorGrid.criterio, true);
        }
    }
</script>