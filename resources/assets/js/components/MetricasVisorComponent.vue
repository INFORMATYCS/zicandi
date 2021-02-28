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
                    <button type="button" class="btn btn-secondary" @click="showModal('metrica','registrar')">
                        <i class="icon-plus"></i>&nbsp;Nuevo
                    </button>                    
                </div>   
            </div>
            
            <div class="card-body">

                <!-- Buscador -->
                <div class="form-group row">
                    <div class="col-md-6">
                        <div class="input-group">   
                            <select class="form-control col-md-3" v-model="buscadorGrid.criterio">
                                <option value="ACT">Activas</option>
                                <option value="CAN">Canceladas</option>                                
                            </select>                         
                            <input type="text" v-model="buscadorGrid.textoBuscar" @keyup.enter="buscarPublicaciones(1, buscadorGrid.textoBuscar, buscadorGrid.criterio, true)" class="form-control" placeholder="Texto a buscar">
                            <button type="submit" class="btn btn-primary" @click="buscarPublicaciones(1, buscadorGrid.textoBuscar, buscadorGrid.criterio, true)"><i class="fa fa-search"></i> Buscar</button>
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
                        <tr v-for="publicacion in buscadorGrid.publicaciones" :key="publicacion.id_meli_metrica_visor">
                            <td>
                                <button type="button" class="btn btn-primary btn-sm" @click="showModal('metrica','grafico', publicacion)">
                                    <i class="icon-graph"></i>
                                </button>

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
                            </td>                            
                            <td>
                                <a href="#" @click="onAbrirPublicacionML(publicacion.url)"><img :src="publicacion.foto" alt="dog" width="50px" height="50px"></a>
                            </td>
                            <td v-text="publicacion.titulo"></td>
                            <td>
                                    <a href="#"  v-text="publicacion.id_publicacion_tienda"></a>
                            </td>                            
                            <td>
                                <div v-if="publicacion.estatus_publicacion=='ACTIVA'">
                                    <span class="badge badge-success">Activa</span>
                                </div>
                                <div v-else>
                                    <span class="badge badge-danger">Pausada</span>
                                </div>
                                
                            </td>
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



        <!--Inicio del modal Detalle metricas-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetalleMetrica.modal}">
            <div class="modal-dialog modal-primary" style="max-width: 90% !important;" role="document">
                <div class="modal-content" style="height: 700px;">
                    <div class="modal-header">

                        <h4 class="modal-title" v-text="modalDetalleMetrica.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
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
                                                    <th>Incapacidad</th>
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
                                                    <td><span v-text="metrica.porcentaje"></span>%</td>
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
    import Datepicker from 'vuejs-datepicker';
    export default {
        data(){
            return{               
                buscadorGrid: {
                     publicaciones: [],
                     textoBuscar: '',
                     criterio: 'ACT'
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
        components: {      
            Datepicker      
        },
        methods:{
            buscarPublicaciones(page, buscar, criterio, aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                let url= '/zicandi/public/meli/metricas/visor?page=' + page +'&filtro=' + buscar + '&estatus=' + criterio;
                axios.get(url)
                .then(function (response) {       
                    me.isLoading = 0

                    if(response.data.xstatus){   
                        me.buscadorGrid.publicaciones = response.data.metricas.data;
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

            onGenerarGraficoVentas(){
                let varTotalVentas = [];
                let varDiaVentas = [];
                let varPorVisitas = [];


                
                let metricas = this.modalDetalleMetrica.historicoMetricas;
                

                for(let i=0; i<this.modalDetalleMetrica.historicoMetricas.length;i++){
                    let metrica = this.modalDetalleMetrica.historicoMetricas[i];
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
                        data: varTotalVentas
                    }, {
                        type: 'bar',
                        label: 'VISITAS',
                        backgroundColor: 'rgba(162, 227, 22, 1)',
                        data: varPorVisitas,
                        borderColor: 'white',
                        borderWidth: 2
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
            }
            
        },
        mounted() {
            
            let hoy30 = new Date();
            hoy30.setDate(hoy30.getDate() -30);
            this.modalDetalleMetrica.fechaFinal = new Date();
            this.modalDetalleMetrica.fechaInicial = hoy30;

            this.buscarPublicaciones(1, this.buscadorGrid.textoBuscar, this.buscadorGrid.criterio, true);
        }
    }
</script>