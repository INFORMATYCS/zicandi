<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Tiendas</li>
            <li class="breadcrumb-item active">Buscar en Mercadolibre</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-primary" @click="onProcesarListaSeleccion()">
                        <i class="icon-plus"></i>&nbsp;Agregar/Quitar Seleccionados
                    </button>                    
                    &nbsp;&nbsp;&nbsp;
                    <button type="button" class="btn btn-secondary" @click="(mostrarSoloSeleccionado==false)?mostrarSoloSeleccionado=true:mostrarSoloSeleccionado=false">
                        <i class="icon-plus"></i>&nbsp;Mostrar solo seleccionados
                    </button>   
                </div>   
            </div>
            
            <div class="card-body">
                <div class="row">
                    <div class="col-md-2">                        
                        Tipo de busqueda
                    </div>
                    <div class="col-md-2">
                        
                        <input class="form-check-input" type="radio" id="tipo1" v-model="tipoBuscadorMeli" value="NORMAL">
                        <label class="form-check-label" for="tipo1">
                            Abierta
                        </label>
                    </div>
                    <div class="col-md-2">
                        <input class="form-check-input" type="radio" id="tipo2" v-model="tipoBuscadorMeli" value="VENDEDOR">
                        <label class="form-check-label" for="tipo2">
                            Por vendedor <small class="text-muted">Nickname</small>
                        </label>                        
                    </div>
                    <div class="col-md-4">
                        <input class="form-check-input" type="radio" id="tipo3" v-model="tipoBuscadorMeli" value="ID">
                        <label class="form-check-label" for="tipo3">
                            Por IDs <small class="text-muted">MLM632166728,MLM567242653</small>
                        </label>                        
                    </div>
                </div>
               <div class="row">
                    <div class="col-md-12">
                        <input type="text" class="form-control form-control-lg" maxlength="30"  @focus="$event.target.select()" v-model="buscadorMeli" @keyup.enter="onBuscadorMeli(true, false);">
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-1">
                        Proyecto
                    </div>
                    <div class="col-md-8">
                        <select class="form-control" v-model="idMeliMetricaProyecto">
                            <option value="0" disabled>Seleccione...</option>
                            <option v-for="proyecto in selectProyecto" :key="proyecto.id_meli_metrica_proyecto" :value="proyecto.id_meli_metrica_proyecto" v-text="proyecto.nombre"></option>
                        </select> 
                    </div>
                    <div class="col-md-3">
                        <button type="button" class="btn btn-primary" @click="onBuscadorMeli(true, false);">
                        <i class="icon-magnifier"></i>&nbsp;Buscar en Mercadolibre
                        </button>
                    </div>
                </div>

                <br>
                <div class="row">
                    <div class="col-md-8">
                        Total de resultados: <span v-text="totalResultadoBusquedaMeli"></span>
                    </div>
                    <div class="col-md-4">
                        Pagina: <input type="text" maxlength="2" size="2" width="20px" v-model="paginaBuscadorMeli">
                        de <span v-text="totalPaginaBuscadorMeli"></span>
                        <a href="#" @click="onBuscadorMeli(true, true)">Ir</a>
                    </div>
                </div>

                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Foto</th>
                            <th>ID publicacion</th>
                            <th>Titulo</th>
                            <th>Precio</th>
                            <th>Etiquetas</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="resultado in resultadoBusquedaMeli" :key="resultado.idPublicacionTienda">
                                                        
                            <td @click="(resultado.check)?resultado.check=0:resultado.check=1" v-if="mostrarSoloSeleccionado==false ||(resultado.check==true && mostrarSoloSeleccionado==true)">
                                <input type="checkbox" v-model="resultado.check">    
                            </td>    
                            <td v-if="mostrarSoloSeleccionado==false ||(resultado.check==true && mostrarSoloSeleccionado==true)">                                                                
                                <a href="#" @click="onAbrirPublicacionML(resultado.url)"><img :src="resultado.foto" alt="dog" width="50px" height="50px"></a>
                            </td>        
                            <td v-if="mostrarSoloSeleccionado==false ||(resultado.check==true && mostrarSoloSeleccionado==true)">
                                <div v-if="resultado.idMeliMetricaVisor > 0">
                                    <strong><span v-text="resultado.idPublicacionTienda"></span></strong>
                                    <div v-if="resultado.check==false"><cite title="Source Title">Quitar</cite></div>                                    

                                    <div v-if="resultado.perteneceProyecto=='S'"><span class="badge badge-pill badge-info" @click="onLigarProyecto(resultado, '-')">Proyecto</span></div>
                                    <div v-if="resultado.perteneceProyecto=='N'"><span class="badge badge-pill badge-light" @click="onLigarProyecto(resultado, '+')">+ proyecto</span></div>

                                    
                                </div>
                                <div v-else><span v-text="resultado.idPublicacionTienda"></span></div>
                            </td>                                                        
                            <td v-if="mostrarSoloSeleccionado==false ||(resultado.check==true && mostrarSoloSeleccionado==true)">
                                <span v-text="resultado.titulo"></span>
                                <div v-if="resultado.error"><cite title="Source Title" v-text="resultado.error" style="color:red"></cite></div>    
                            </td>                                                                            
                            <td v-text="resultado.precio" v-if="mostrarSoloSeleccionado==false ||(resultado.check==true && mostrarSoloSeleccionado==true)"></td>                                                                            
                            <td v-if="mostrarSoloSeleccionado==false ||(resultado.check==true && mostrarSoloSeleccionado==true)">
                               

                                <div class="badge bg-success" v-if="resultado.envioGratis==true">Envio Gratis</div>

                                <div class="badge bg-info text-dark" v-text="resultado.publicacionLocal"></div>

                                <div v-if="resultado.tipoLogistica=='fulfillment'">
                                    <img src="repositorio/sistema/full.png" alt="dog" width="50px">      
                                </div>
                                
                                
                            </td>                                                                                                        
                        </tr>                            
                    </tbody>
                </table>
                
            </div>
        </div>
            
      


    </main>    
</template>

<script>
    import Datepicker from 'vuejs-datepicker';

    export default {
        data(){
            return{               
                resultadoBusquedaMeli: [],
                totalResultadoBusquedaMeli: 0,
                buscadorMeli: '',
                tipoBuscadorMeli: 'NORMAL',
                paginaBuscadorMeli: 1,
                totalPaginaBuscadorMeli: 1,
                mostrarSoloSeleccionado: false,
                isLoading: 0,
                selectProyecto:[],
                idMeliMetricaProyecto: 0                                
            }
        },
        computed:{
            
        },
        components: {      
            
        },
        methods:{
            onBuscadorMeli(aplLoading=false, cambioPagina=false){
                if(this.idMeliMetricaProyecto==0){
                    util.MSG('Falta!','Selecciona el proyecto', util.tipoErr);
                    return;
                }
                if(aplLoading){
                    this.isLoading = 1;
                }

                let q = this.buscadorMeli;
                if(cambioPagina==false){
                    this.paginaBuscadorMeli = 1;
                }
                let page = this.paginaBuscadorMeli;
                let tipo = this.tipoBuscadorMeli;

                let me=this;                
                let url= '/zicandi/public/meli/buscador?q='+q+'&page='+page+'&idMeliMetricaProyecto='+this.idMeliMetricaProyecto+'&tipoBusqueda='+tipo;
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    me.isLoading = 0;
                    me.resultadoBusquedaMeli = respuesta.publicaciones;   
                    me.totalResultadoBusquedaMeli = respuesta.totalResultados;
                    
                    me.totalPaginaBuscadorMeli = Math.trunc(respuesta.totalResultados / 50);
                    if((respuesta.totalResultados / 50 - Math.trunc(respuesta.totalResultados / 50))>0){
                        me.totalPaginaBuscadorMeli = Math.trunc(respuesta.totalResultados / 50) + 1;
                    }
                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'envios':
                    {
                        switch(accion){
                            case 'registrar':
                            {
                                

                                break;
                            }   
                            
                            
                        }
                    }
                }
            },
            closeModal(){
                                           
            },

            selectTienda(){                
                let me=this;                
                var url= '/zicandi/public/tienda/getSelectCuentaTiendas';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.modalNuevoFolioEnvio.CuentasTiendaList = respuesta.tiendas;     
                                
                })
                .catch(function (error) {                                        
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


            /**
             * Agrega la publicacion al visor
             * 
             */
            onAddMetricaVisor(publicacion, idMeliMetricaProyecto){                
                return new Promise(function (resolve, reject) {                    
                    axios.post('/zicandi/public/meli/metricas/visor/save',{
                        'url': publicacion.url,
                        'idMeliMetricaProyecto': idMeliMetricaProyecto,
                        'idPublicacionTienda': publicacion.idPublicacionTienda
                    })
                    .then(function (response) {                         
                        resolve(response.data);
                    })
                    .catch(function (error) {                        
                        reject(error);
                    });
                });

            },

            /**
             * Cancela metrica existente
             * 
             * 
             */
            onRemoveMetricaVisor(publicacion){                
                return new Promise(function (resolve, reject) {                    
                    axios.post('/zicandi/public/meli/metricas/visor/edit_estatus',{
                        'idMeliMetricaVisor': publicacion.idMeliMetricaVisor,
                        'estatus': 'CAN'
                    })
                    .then(function (response) {                         
                        resolve(response.data);
                    })
                    .catch(function (error) {                        
                        reject(error);
                    });
                });

            },


            

            /**
             * Procesa Colas
             * 
             */
            onProcesarListaSeleccion(){
                let me = this;                
                let resultadoBusquedaMeli = this.resultadoBusquedaMeli;
                let pilaProcesaAdd =[];

                for(let i=0; i < resultadoBusquedaMeli.length; i++){
                    let publicacion = resultadoBusquedaMeli[i];

                    if(publicacion.check == false && publicacion.idMeliMetricaVisor > 0){                        
                        publicacion.tarea = 'remove';
                        publicacion.indice = i;
                        pilaProcesaAdd.push(publicacion);
                    }else if(publicacion.check == true && publicacion.idMeliMetricaVisor > 0){
                        console.log('Nada');                        
                    }else if(publicacion.check == true){
                        
                        publicacion.tarea = 'add';
                        publicacion.indice = i;
                        pilaProcesaAdd.push(publicacion);

                    }

                    
                }

                console.log('Add');
                console.log(pilaProcesaAdd);

                //~Procesa pila para agregar
                let procesaOk = 0;
                let procesaErr = 0;
                let idMeliMetricaProyecto = this.idMeliMetricaProyecto;
                //~Procesa la pila de trabajo
                pilaProcesaAdd.reduce(
                    function (sequence, datosVO) {
                        return sequence.then(function() {
                            //~Proceso a ejecutar       
                            if(datosVO.tarea == 'add'){
                                return me.onAddMetricaVisor(datosVO, idMeliMetricaProyecto);
                            }else if(datosVO.tarea == 'remove'){
                                return me.onRemoveMetricaVisor(datosVO);
                            }
                        }).then(function(response) {                            
                                                       
                            if(response.xstatus == true){ 
                                if(datosVO.tarea == 'remove'){
                                    me.resultadoBusquedaMeli[datosVO.indice].idMeliMetricaVisor = 0;                                    
                                }else{
                                    me.resultadoBusquedaMeli[datosVO.indice].idMeliMetricaVisor = 1;
                                }
                                
                                procesaOk++;
                            }else{                                
                                me.resultadoBusquedaMeli[datosVO.indice].error = response.error.substring(0,50); 
                                procesaErr++;
                            }                                                                                   
                            me.$forceUpdate();
                                                       
                        });
                    },
                    Promise.resolve()
                ).then(function() {
                    //~Termina la ejecucion de toda la pila
                    if(procesaErr>0){
                        util.AVISO('Termina ejecucion, revise los errores', util.tipoOk);     
                    }else{
                        util.AVISO('Termina ejecucion', util.tipoOk);     
                        me.onBuscadorMeli(true, false);
                    }
                                        
                });

                
                

                

            },


            onLigarProyecto(registro, accion){
                let me = this;                
                
                let idMeliMetricaProyecto = this.idMeliMetricaProyecto;
                let idMeliMetricaVisor = registro.idMeliMetricaVisor;

                this.isLoading = 1;
                axios.post('/zicandi/public/meli/metricas/proyecto/ligar',{
                        'idMeliMetricaProyecto': idMeliMetricaProyecto,
                        'idMeliMetricaVisor': idMeliMetricaVisor,
                        'accion': accion
                })
                .then(function (response) {  
                    me.isLoading = 0;           
                    
                    if(response.data.xstatus){ 
                        registro.perteneceProyecto = 'S';
                        me.$forceUpdate();
                        util.AVISO('Se realizo el cambio correctamente', util.tipoOk);                                                                       
                    }else{
                        throw new Error(response.data.error);
                    } 
                                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });

            },

            selectProyectos(){                
                let me=this;                
                var url= '/zicandi/public/meli/metricas/proyecto/select';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.selectProyecto = respuesta.proyectos;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            
        },
        mounted() {
            this.selectProyectos();
        }
    }
</script>