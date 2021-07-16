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
                    <button type="button" class="btn btn-secondary" @click="onCuentaActivaMercadolibre()">
                        <i class="icon-plus"></i>&nbsp;Actualizar publicaciones
                    </button>                    
                </div>   
            </div>
            <div class="card small" style="width: 15rem; display: inline-block;">
                <div class="card-body">
                    <h5 class="card-title">Estatus publicacion</h5>                            
                    <p class="card-text">                                    
                            <input type="checkbox" v-model="chkEstatusActivas"> Activas                            
                    </p>
                    <p class="card-text">                                                                
                            <input type="checkbox" v-model="chkEstatusPausadas"> Pausadas                        
                    </p>
                    <p class="card-text">                                                                
                            <input type="checkbox" v-model="chkEstatusSinLigar"> Sin ligar                                
                    </p>
                </div>
            </div>

            <div class="card small bg-dark text-white" style="width: 15rem; display: inline-block;">
                <div class="card-body">
                    <h5 class="card-title">Utilidad</h5>                            
                    <p class="card-text">                        
                        <input type="checkbox" v-model="chkUtilidadEstatusVerde"> Verde
                    </p>
                    <p class="card-text" >
                        <input type="checkbox" v-model="chkUtilidadEstatusAmarilla"> Amarilla
                    </p>
                    <p class="card-text" >
                        <input type="checkbox" v-model="chkUtilidadEstatusRoja"> Roja
                    </p>
                </div>
            </div>

            <div class="card small" style="width: 15rem; display: inline-block;">
                <div class="card-body">
                    <h5 class="card-title">Orden</h5>                            
                    <div class="card-text">                                    
                        <select class="form-control" v-model="orden">
                            <option value="publicacion.id_publicacion|desc">Ultimos registros</option>
                            <option value="publicacion.ventas|desc">Mas ventas</option>
                            <option value="publicacion.ventas|asc">Menos ventas</option>
                            <option value="publicacion.visitas|desc">Mas visitados</option>
                            <option value="publicacion.visitas|asc">Menos visitados</option>
                        </select>
                    </div>
                   
                </div>
            </div>

            <!--
            <div class="card small bg-dark text-white" style="width: 15rem; display: inline-block;">
                <div class="card-body">
                    <h5 class="card-title">Visitas</h5>                            
                    <p class="card-text">
                        <input type="radio" checked> Mayor ventas arriba
                    </p>
                    <p class="card-text">
                        <input type="radio" > Menor ventas arriba
                    </p>
                </div>
            </div>-->

                        

                    
                <!-- Buscador -->
                <div class="form-group row">
                    <div class="col-md-5">
                        <div class="input-group">
                            <select class="form-control col-md-3" v-model="criterio">
                                <option value="titulo">Titulo</option>                                
                            </select>
                          
                            <input type="text" v-model="buscar" @keyup.enter="listarPublicaciones(1, buscar, criterio, true)" class="form-control" placeholder="Texto a buscar">
                            
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="input-group">
                            
                            <select class="form-control" v-model="objPublicacion.idCuentaTienda">
                                <option value="0" disabled>Seleccione...</option>
                                <option v-for="cuenta in listaCuentaTiendas" :key="cuenta.id_cuenta_tienda" :value="cuenta.id_cuenta_tienda" v-text="cuenta.usuario"></option>
                            </select>   
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="input-group">                            
                            <button type="submit" class="btn btn-primary" @click="listarPublicaciones(1, buscar, criterio, true)"><i class="fa fa-search"></i> Buscar</button>  
                            &nbsp;
                            <button type="submit" class="btn btn-primary" @click="exportarPublicaciones(buscar, criterio, true)"><i class="fa fa-search"></i> Excel</button>  
                        </div>
                    </div>                    
                </div>

                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th width="10%;">Opciones</th>
                            <th width="100px">Imagen</th>                            
                            <th>Publicacion</th>
                            <th>Precio venta</th>
                            <th>Estadistica</th>
                            <th>Envio</th>
                            <th>Productos</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="publicacion in listaPublicaciones" :key="publicacion.id_publicacion">
                            
                            <td v-if="(chkEstatusSinLigar && publicacion.config.length == 0) || (chkEstatusSinLigar==false)">
                                <button type="button" class="btn btn-info btn-sm" @click="abrirPublicacion(publicacion.link,'popup')">
                                    <i class="icon-screen-desktop"></i>
                                </button> &nbsp;

                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('producto','ligar', publicacion)">
                                    <i class="icon-screen-tablet"></i>
                                </button> &nbsp;

                                <button type="button" class="btn btn-info btn-sm" @click="showModal('grafico','crear', publicacion)">
                                    <i class="icon-graph"></i>
                                </button> &nbsp;

                                
                                
                            </td>
                            <td v-if="(chkEstatusSinLigar && publicacion.config.length == 0) || (chkEstatusSinLigar==false)">               
                                
                                <a href="#" @click="abrirPublicacion(publicacion.link,'swal')"><img :src="publicacion.foto_mini" alt="dog"></a>
                            </td>                            
                            <td v-if="(chkEstatusSinLigar && publicacion.config.length == 0) || (chkEstatusSinLigar==false)">
                                <h6 v-text="publicacion.titulo"></h6>
                                <small class="text-muted"><strong>ID </strong></small>
                                <small class="text-muted" v-text="publicacion.id_publicacion_tienda"></small>
                                <small class="text-muted" v-if="publicacion.id_variante_publicacion>0" ><strong>Variante </strong></small>
                                <small class="text-muted" v-if="publicacion.id_variante_publicacion>0" v-text="publicacion.id_variante_publicacion"></small>
                                <small class="text-muted" v-if="publicacion.id_variante_publicacion>0" >|</small>
                                <small class="text-muted" v-if="publicacion.id_variante_publicacion>0" v-text="publicacion.nombre_variante"></small>

                            </td>
                            <td v-if="(chkEstatusSinLigar && publicacion.config.length == 0) || (chkEstatusSinLigar==false)">
                                <span v-text="publicacion.precio"></span>                            
                                <span :class="colorPorcentaje(publicacion.p_neto)" data-toggle="modal" data-target="#calculadoraModal" data-placement="top" @click="showModal('calculadora','show', publicacion)" v-if="publicacion.p_neto !=null"><span v-text="publicacion.p_neto"></span>%</span>                            
                            </td>
                            <td v-if="(chkEstatusSinLigar && publicacion.config.length == 0) || (chkEstatusSinLigar==false)">
                                <div>
                                    <small class="text-muted">Stock:</small> <div class="badge badge-pill badge-primary"><span v-text="redondear(publicacion.stock, 0)"></span></div>
                                </div>
                                <div>
                                    <small class="text-muted">Ventas:</small> <div class="badge badge-pill badge-secondary"><span v-text="redondear(publicacion.ventas,0)"></span></div>
                                </div>
                                <div>
                                    <small class="text-muted">Visitas:</small> <div class="badge badge-pill badge-secondary"><span v-text="redondear(publicacion.visitas,0)"></span></div>
                                </div>
                            </td>
                            <td v-if="(chkEstatusSinLigar && publicacion.config.length == 0) || (chkEstatusSinLigar==false)">                                
                                <div class="badge badge-pill badge-success" v-if="publicacion.envio_gratis"><span>Envio gratis</span></div>
                                <div>
                                <div class="badge badge-pill badge-warning" v-if="publicacion.full"><span>Full</span></div>
                                </div>
                            </td>
                            <td v-if="(chkEstatusSinLigar && publicacion.config.length == 0) || (chkEstatusSinLigar==false)">
                                <div class="badge badge-pill badge-danger" v-if="publicacion.config.length <= 0" @click="showModal('producto','ligar', publicacion)">                                    
                                    <span style="cursor: pointer;">Falta ligar</span>
                                </div>                                                                

                                <ul v-if="publicacion.config.length > 0">                                    
                                    <li  v-for="producto in publicacion.config" :key="producto.id_producto">
                                        <span v-text="producto.codigo" v-if="producto.xstatus && !producto.temporal"></span>
                                    </li>
                                </ul>
                            </td>  
                            <td v-if="(chkEstatusSinLigar && publicacion.config.length == 0) || (chkEstatusSinLigar==false)">
                                <div v-if="publicacion.estatus=='active'">
                                    <span class="badge badge-success">Activo</span>
                                </div>
                                <div v-else>
                                    <span class="badge badge-danger">Pausada</span>
                                </div>
                                <small class="text-muted" v-text="publicacion.fecha_consulta"></small>
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

        <!--Inicio del modal productos ligados-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalProductosLigados.modal}">
            <div class="modal-dialog modal-primary" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        
                        
                        <div class="row" style="width: 100%;">
                            <div class="col-7">
                                <h4 class="modal-title" v-text="modalProductosLigados.tituloModal"></h4>
                                <h6 class="text-muted" v-text="modalProductosLigados.publicacionSeleccion.titulo"></h6>
                            </div>
                            <div class="col-4">
                                <img :src="modalProductosLigados.publicacionSeleccion.foto_mini" alt="dog">     
                            </div>
                            <div class="col-1">
                                <button type="button" class="close" aria-label="Close" @click="closeModal();">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                                                
                        
                    </div>
                    <div class="modal-body">
                        
                        <div class="card" style="width: 100%;">                            
                            <ul class="list-group list-group-flush">                 
                               <buscador-producto-component @setProducto="getProduccionSeleccion" ></buscador-producto-component>                  
                                
                                <div v-for="producto in modalProductosLigados.productosligados" :key="producto.id_producto">
                                    <li class="list-group-item" v-if="producto.xstatus">
                                    
                                        <div class="row">
                                            <div class="col-12">
                                                <button type="button" class="close " aria-label="Close">
                                                    <span aria-hidden="true" @click="producto.xstatus=false;">&times;</span>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="row">                                             
                                            <div class="col-md-4">
                                                <img :src="producto.url_imagen" alt="dog" width="50%">                                                 
                                            </div>
                                            <div class="col-md-8">
                                    
                                                    <div class="row">  
                                                        <div class="col-md-3">
                                                            <input type="text" class="form-control" v-model="producto.cantidad">
                                                        </div>
                                                        <div class="col-md-9">
                                                            <span class="font-weight-bold" v-text="producto.codigo"></span> <span  class="text-right text-muted" v-if="producto.temporal">Sin guardar</span>
                                                        </div>
                                                    </div>
                                        
                                                <span v-text="producto.nombre"></span>                                                
                                            </div>
                                        </div>                                                                                                                                              
                                    </li>     
                                </div>      

                            </ul>
                        </div>

                       
                    </div>
                    <div class="modal-footer">
                        <p class="font-weight-light">Puedes ligar mas de un producto a la publicacion</p>                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" @click="onGuardarProductosLigados();">Guardar</button>                        
                    </div>
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->


        <!--Inicio del modal productos ligados-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalGrafico.modal}">
            <div class="modal-dialog modal-lg modal-primary">
                <div class="modal-content">
                    <div class="modal-header">

                        <h4 class="modal-title" v-text="modalGrafico.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>

                    </div>
                    <div class="modal-body">
                        
                        <div class="card" style="width: 100%;">                            
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="card card-chart">
                                        <div class="card-header">
                                            Ventas
                                        </div>
                                        <div class="card-content">
                                            <div class="ct-chart">
                                                <canvas id="canVentas"></canvas>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                       
                    </div>
                   
                    
                </div>
                <!-- /.modal-content -->
            </div>
            <!-- /.modal-dialog -->
        </div>
        <!--Fin del modal-->


        <!--Inicio del modal calculadora-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" id="calculadoraModal">
            <div class="modal-dialog modal-primary" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        
                        
                        <div class="row" style="width: 100%;">
                            <div class="col-11">
                                <h4 class="modal-title" v-text="modalCalculadora.tituloModal"></h4>                                
                            </div>                            
                            <div class="col-1">
                                <button type="button" class="close" aria-label="Close" data-dismiss="modal">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                        </div>
                                                
                        
                    </div>
                    <div class="modal-body">
                        
                        <div class="card" style="width: 100%;">                                                        
                                
                            <div class="row">
                                <div class="col-7" style="text-align: left;"><strong>Tipo de publicacion</strong></div>
                                <div class="col-5" style="text-align: right;"><span v-text="modalCalculadora.publicacionSeleccion.tipo_listing"/></div>
                            </div>

                            <div class="row">
                                <div class="col-7" style="text-align: left;"><strong>Precio Venta</strong></div>
                                <div class="col-5" style="text-align: right;"><span v-text="modalCalculadora.publicacionSeleccion.precio"/></div>
                            </div>                            

                            <div class="row">
                                <div class="col-7" style="text-align: left;"><strong>Costo envio</strong></div>
                                <div class="col-5" style="text-align: right;"><span v-text="modalCalculadora.publicacionSeleccion.costo_envio"/></div>
                            </div>

                            <div class="row">
                                <div class="col-7" style="text-align: left;"><strong>Comision venta</strong></div>
                                <div class="col-5" style="text-align: right;"><span v-text="modalCalculadora.publicacionSeleccion.comision_venta"/></div>
                            </div>

                            <div class="row">
                                <div class="col-7" style="text-align: left;"><strong>IVA</strong></div>
                                <div class="col-5" style="text-align: right;"><span v-text="modalCalculadora.publicacionSeleccion.iva"/></div>
                            </div>

                            <div class="row">
                                <div class="col-7" style="text-align: left;"><strong>ISR</strong></div>
                                <div class="col-5" style="text-align: right;"><span v-text="modalCalculadora.publicacionSeleccion.isr"/></div>
                            </div>

                            <div class="row">
                                <div class="col-7" style="text-align: left;"><strong>NETO Venta</strong></div>
                                <div class="col-5" style="text-align: right;"><span v-text="modalCalculadora.publicacionSeleccion.neto_venta_final"/></div>
                            </div>

                            <div class="row">
                                <div class="col-7" style="text-align: left;"><strong>Precio Compra</strong></div>
                                <div class="col-5" style="text-align: right;"><span v-text="modalCalculadora.publicacionSeleccion.ultimo_precio_compra"/></div>
                            </div>

                            <div class="row">
                                <div class="col-7" style="text-align: left;"><strong>NETO FINAL</strong></div>
                                <div class="col-5" style="text-align: right;"><span v-text="modalCalculadora.publicacionSeleccion.neto"/></div>
                            </div>


                           
                        </div>

                        <div class="card" style="width: 100%;">                                                        
                                
                            
                            <div class="row">
                                <div class="col-12" ><h6>Simulador</h6></div>                            
                            </div>
                            <div class="row">
                                <div class="col-5" >Precio Compra</div>
                                <div class="col-7" style="text-align: left;"><input type="text" v-model="modalCalculadora.nuevoPrecioCompra" class="form-control" placeholder="Nuevo precio"></div>
                            </div>
                            <div class="row">
                                <div class="col-5" >Precio Venta</div>
                                <div class="col-7" style="text-align: left;"><input type="text" v-model="modalCalculadora.nuevoPrecio" class="form-control" placeholder="Nuevo precio"></div>
                            </div>
                            <div class="row">
                                <div class="col-5" >Envio Gratis</div>
                                <div class="col-7" style="text-align: left;"><input type="checkbox" v-model="modalCalculadora.envioGratis"></div>
                            </div>
                            <div class="row">
                                <div class="col-7" ></div>
                                <div class="col-5" style="text-align: right;"><button type="button" class="btn btn-primary" @click="closeModal();">Calcular</button></div>
                            </div>

                           
                        </div>

                       
                    </div>
          
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>                        
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
                listaCuentaTiendas: [],
                objPublicacion: {
                    idPublicacion: 0,
                    idCuentaTienda: 0,
                    idPublicacionTienda: 0,
                    idVariantePublicacion: 0,
                    titulo: '',
                    nombreVariante: '',
                    precioVenta: 0,
                    stock: 0,
                    ventas: 0,
                    envioGratis: 0,
                    full: 0,
                    link: '',
                    fotoMini: '',
                    fechaConsulta: '',
                    estatus: ''                    
                },
                listaPublicaciones: [],

                pagination: {
                    total : 0,
                    current_page  : 0,
                    per_page : 0,
                    last_page : 0,
                    from : 0,
                    to : 0
                },
                offset : 3,
                chkEstatusActivas: true,
                chkEstatusPausadas: false,
                chkEstatusSinLigar: false,
                orden: 'publicacion.id_publicacion|desc',
                criterio: 'titulo',
                buscar: '',
                isLoading: 0,
                modalProductosLigados: {
                    modal: 0,
                    tituloModal: '',                    
                    errorProducto: 0,
                    erroresProductoMsjList: [],
                    productosligados:[],
                    publicacionSeleccion: {}
                },
                modalGrafico: {
                    modal: 0,
                    tituloModal: '',
                    varVentas: null,
                    charVentas: null,
                    ventas: [],
                    varTotalVentas: [],
                    varDiaVentas: []
                },
                modalCalculadora: {                    
                    tituloModal: '',                                        
                    errorProducto: 0,
                    erroresProductoMsjList: [],                    
                    publicacionSeleccion: {},
                    nuevoPrecio: 0,
                    envioGratis: 0,
                    nuevoPrecioCompra: 0
                },
                chkUtilidadEstatusVerde: true,
                chkUtilidadEstatusAmarilla: true,
                chkUtilidadEstatusRoja: true

                
            }
        },
        components: {            
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
            listarPublicaciones(page, buscar, criterio, aplLoading=false){                

                if(this.objPublicacion.idCuentaTienda == 0){
                    util.MSG('Algo salio Mal!', 'Seleccione la cuenta de la tienda', util.tipoErr);
                    return;
                }


                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                
                axios.get('/zicandi/public/publicaciones',{
                    params: {
                        'page': page,
                        'buscar': buscar,
                        'criterio': criterio,
                        'idCuentaTienda': this.objPublicacion.idCuentaTienda,
                        filtros: {
                            'activas': this.chkEstatusActivas,
                            'pausadas': this.chkEstatusPausadas,
                            'sinligar': this.chkEstatusSinLigar,
                            'orden': this.orden,
                            'utilidad': {
                                'verde': this.chkUtilidadEstatusVerde,
                                'amarilla': this.chkUtilidadEstatusAmarilla,
                                'roja': this.chkUtilidadEstatusRoja
                            }
                        }
                    }
                })
                .then(function (response) {                    
                    var respuesta = response.data;  
                    me.isLoading = 0;
                    console.log(respuesta);
                    me.listaPublicaciones = respuesta.publicaciones.data;
                    me.pagination = respuesta.pagination;                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            exportarPublicaciones(buscar, criterio, aplLoading=false){                

                if(this.objPublicacion.idCuentaTienda == 0){
                    util.MSG('Algo salio Mal!', 'Seleccione la cuenta de la tienda', util.tipoErr);
                    return;
                }

                let params= {                       
                        'buscar': buscar,
                        'criterio': criterio,
                        'idCuentaTienda': this.objPublicacion.idCuentaTienda,
                        filtros: {
                            'activas': this.chkEstatusActivas,
                            'pausadas': this.chkEstatusPausadas,
                            'sinligar': this.chkEstatusSinLigar,
                            'orden': this.orden
                        }
                    };
                let paramString = new URLSearchParams(params);

                console.log(paramString.toString());

                let json = JSON.stringify(params);

                console.log(encodeURIComponent(json));


                window.open('/zicandi/public/publicaciones/exportar?param='+encodeURIComponent(json));
     
            },
            selectTienda(){                
                let me=this;                
                var url= '/zicandi/public/tienda/getSelectCuentaTiendas';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.listaCuentaTiendas = respuesta.tiendas;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });



                
            },
            abrirPublicacion(url, tipo){
                if(tipo=='popup'){
                    let altura=675;
                    let anchura=990;
                    
                    let y=parseInt((window.screen.height/2)-(altura/2));
                    let x=parseInt((window.screen.width/2)-(anchura/2));
                                            
                    window.open(url,"Login mercadolibre", 'width='+anchura+',height='+altura+',top='+y+',left='+x+',toolbar=no,location=no,status=no,menubar=no,scrollbars=no,directories=no,resizable=no');
                }else{
                    Swal.fire({                        
                            html:'<iframe src="'+url+'" title="Login Mercadolibre" width="100%" height="500px"></iframe>',                        
                            showCancelButton: false,
                            confirmButtonColor: '#3085d6',
                            cancelButtonColor: '#d33',
                            confirmButtonText: 'Listo!',
                            width: '90%',
                            height: '80%'
                            });
                }
            },
            redondear(numero, decimales){
                return parseFloat(numero).toFixed(decimales);
            },
            cambiarPagina(page, buscar, criterio){
                let me = this;

                me.pagination.current_page = page;

                me.listarPublicaciones(page, buscar, criterio, true);
            },

            onCuentaActivaMercadolibre(){                                
                let me=this;                
                let url= '/zicandi/public/tienda/registraCuentaActiva';
                axios.get(url)
                .then(function (response) { 
                    let cuenta = response.data.cuenta;
                    me.cuentaActivalMeli = cuenta;
                    me.idVendedor = response.data.id;

                    me.onGetPublicaciones();
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onGetPublicaciones(){                                
                let me=this;                
                let url= '/zicandi/public/tienda/getPublicaciones';
                axios.post(url,{
                    'id': this.idVendedor
                })
                .then(function (response) { 
                    console.log(response);
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            showModal(modelo, accion, data=[]){
                console.log(modelo);
                console.log(accion);
                switch(modelo){
                    case 'producto':
                    {
                        switch(accion){
                            case 'ligar':
                            {                                
                                this.modalProductosLigados.tituloModal = 'Ligar productos';
                                this.modalProductosLigados.tipoAccion = 1;
                                this.modalProductosLigados.modal = 1;
                                this.modalProductosLigados.publicacionSeleccion = data;                                
                                this.onGetProductosLigados(data);

                                window.scrollTo(0,0);
                                break;
                            }
                        }

                        break;
                    }
                    case 'grafico':
                    {
                        switch(accion){
                            case 'crear':
                            {                                
                                this.modalGrafico.tituloModal = 'Estadisticas';                                
                                this.modalGrafico.modal = 1;
                                this.onCargaEstadisticas();
                                break;
                            }
                        }

                        break;
                    }
                    case 'calculadora':
                    {
                        switch(accion){
                            case 'show':
                            {                                
                                this.modalCalculadora.tituloModal = 'Calculadora xxx';                                
                                this.modalCalculadora.publicacionSeleccion = data;
                                this.modalCalculadora.nuevoPrecio = data.precio;
                                this.modalCalculadora.envioGratis = data.envio_gratis;
                                this.modalCalculadora.nuevoPrecioCompra = data.ultimo_precio_compra;   
                                break;
                            }
                        }

                        break;
                        
                    }
                }                
            },
            closeModal(){

                this.modalProductosLigados.modal = 0;                
                this.modalProductosLigados.tituloModal = '';

                this.modalGrafico.modal = 0;                
                this.modalGrafico.tituloModal = '';

                this.modalCalculadora.modal = 0;                
                this.modalCalculadora.tituloModal = '';
            },
            getProduccionSeleccion(producto){                                
                producto.temporal = true;
                producto.cantidad = 1;
                this.modalProductosLigados.productosligados.push(producto);
            },
            onGetProductosLigados(publicacion){        
                for (let i = 0; i < publicacion.config.length ; i++) {                            
                    publicacion.config[i].cantidad = publicacion.config[i].detalle.cantidad;                            
                }        
                console.log(publicacion.config);
                this.modalProductosLigados.productosligados = publicacion.config;                                
            },
            onGuardarProductosLigados(){     
                util.MSG_SI_NO('Deseas guardar los cambios','Productos ligados',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/publicaciones/guardarProductos',{
                            'idPublicacion': this.modalProductosLigados.publicacionSeleccion.id_publicacion,
                            'config': this.modalProductosLigados.productosligados
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            let total = response.data.total;                            

                            me.modalProductosLigados.productosligados.forEach((producto, index) => {
                                producto.temporal = false;
                            });
                            
                            
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });

            },
            onCargaEstadisticas(){
                this.modalGrafico.varTotalVentas.push(25);
                this.modalGrafico.varTotalVentas.push(30);
                this.modalGrafico.varTotalVentas.push(40);
                this.modalGrafico.varTotalVentas.push(25);
                this.modalGrafico.varTotalVentas.push(19);

                this.modalGrafico.varDiaVentas.push('Lunes');
                this.modalGrafico.varDiaVentas.push('Martes');
                this.modalGrafico.varDiaVentas.push('Miercoles');
                this.modalGrafico.varDiaVentas.push('Jueves');
                this.modalGrafico.varDiaVentas.push('Viernes');

                this.modalGrafico.varVentas = document.getElementById('canVentas').getContext('2d');


                this.modalGrafico.charVentas = new Chart(this.modalGrafico.varVentas, {
                    type: 'bar',
                    data: {
                        labels: this.modalGrafico.varDiaVentas,
                        datasets: [{
                            label: 'Ventas',
                            data: this.modalGrafico.varTotalVentas,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                                'rgba(153, 102, 255, 0.2)'
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            yAxes: [{
                                ticks: {
                                    beginAtZero: true
                                }
                            }]
                        }
                    }
                });
            },

            onDetalleVentaCalculadora(publicacion){
                let mensaje =   '<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><strong>Tipo de publicacion</strong></div>'
                               +'     <div class="col-5" style="text-align: right;">'+publicacion.tipo_listing+'</div>'
                               +' </div>'

                               +'<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><strong>Precio Venta</strong></div>'
                               +'     <div class="col-5" style="text-align: right;">'+publicacion.precio+'</div>'
                               +' </div>'

                               +'<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><input type="text" v-model="buscar" class="form-control" placeholder="Nuevo precio"></div>'
                               +'     <div class="col-5" style="text-align: right;"></div>'
                               +' </div>'
                               
                               +'<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><strong>Costo envio</strong></div>'
                               +'     <div class="col-5" style="text-align: right;">'+publicacion.costo_envio+'</div>'
                               +' </div>'

                               +'<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><strong>Comision venta</strong></div>'
                               +'     <div class="col-5" style="text-align: right;">'+publicacion.comision_venta+'</div>'
                               +' </div>'

                               +'<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><strong>IVA</strong></div>'
                               +'     <div class="col-5" style="text-align: right;">'+publicacion.iva+'</div>'
                               +' </div>'

                               +'<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><strong>ISR</strong></div>'
                               +'     <div class="col-5" style="text-align: right;">'+publicacion.isr+'</div>'
                               +' </div>'

                               +'<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><strong>NETO Venta</strong></div>'
                               +'     <div class="col-5" style="text-align: right;">'+publicacion.neto_venta_final+'</div>'
                               +' </div>'

                               +'<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><strong>Precio Compra</strong></div>'
                               +'     <div class="col-5" style="text-align: right;">'+publicacion.ultimo_precio_compra+'</div>'
                               +' </div>'

                               +'<div class="row">'
                               +'    <div class="col-7" style="text-align: left;"><strong>NETO FINAL</strong></div>'
                               +'     <div class="col-5" style="text-align: right;">'+publicacion.neto+'</div>'
                               +' </div>';

                util.MSG((publicacion.p_neto)+' %',mensaje, util.tipoInf);       
            },
            colorPorcentaje(valor){
                if(valor>=20){
                    return "badge badge-success";
                }else if(valor >=5 && valor<20){
                    return "badge badge-warning";
                }else{
                    return "badge badge-danger";
                }
            },
            onValidaVisibleUtilidad(valor){
                if(this.chkUtilidadEstatusVerde == true && valor >= 20){
                    console.log(valor + " salida 1 verde");
                    return 1;
                }else if(this.chkUtilidadEstatusAmarilla == true && (valor >=5 && valor<20)){
                    console.log(valor + " salida 1 amarilla");
                    return 1;
                }else if(this.chkUtilidadEstatusRoja == true && valor < 5){
                    console.log(valor + " salida 1 roja");
                    return 1;
                }else{
                    console.log(valor + " salida 0");
                    return 0;
                }
            }


        },
        
        mounted() {            
            this.selectTienda();
        }
    }
</script>