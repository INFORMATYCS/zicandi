<template>
    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item"><a href="/">Escritorio</a></li>
            <li class="breadcrumb-item">Tienda</li>
            <li class="breadcrumb-item active">Ventas</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:                                    
                </div>   
            </div>

                    
                <!-- Buscador -->
                <div class="form-group row">
                    <div class="col-md-4">
                        <div class="input-group">                                                     
                            <span>Fecha inicial</span>&nbsp;&nbsp;        
                            <datepicker v-model="buscador.fechaInicio"></datepicker>
                            
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="input-group">
                            <span>Fecha final</span>&nbsp;&nbsp;
                            <datepicker v-model="buscador.fechaFin"></datepicker> 
                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="input-group">                                                        
                            Color: 
                            <select class="form-control col-md-3" v-model="buscador.color">
                                <option value="todos">Todos</option>
                                <option value="verde">Verde</option>
                                <option value="naranja">Naranja</option>
                                <option value="rojo">Rojo</option>
                            </select>                      
                        </div>
                    </div>                    
                </div>
                <div class="form-group row">
                    <div class="col-md-5">
                        <div class="input-group">
                          
                            <input type="text" v-model="buscador.buscar" @keyup.enter="listarVentas(1, buscador.buscar, buscador.criterio, true)" class="form-control" placeholder="Texto a buscar">
                                                        
                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="input-group">
                            
                            <select class="form-control" v-model="buscador.idCuentaTienda">
                                <option value="0" disabled>Seleccione...</option>
                                <option v-for="cuenta in buscador.CuentasTiendaList" :key="cuenta.id_cuenta_tienda" :value="cuenta.id_cuenta_tienda" v-text="cuenta.usuario"></option>
                            </select>   
                        </div>
                    </div>

                    <div class="col-md-2">
                        <div class="input-group">                            
                            <button type="submit" class="btn btn-primary" @click="listarVentas(1, buscador.buscar, buscador.criterio, true)"><i class="fa fa-search"></i> buscar</button>  
                            &nbsp;
                            <button type="submit" class="btn btn-primary" @click="onExportarPublicaciones(buscador.buscar, buscador.criterio, true)"><i class="fa fa-search"></i> Excel</button>  
                        </div>
                    </div>                    
                </div>

                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>                            
                            <th>Fecha Venta</th>
                            <th>Producto</th>                            
                            <th>Cliente</th>
                            <th>Precio Venta</th>
                            <th>Neto</th>
                            <th>Utl</th>
                            <th>Estatus</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="venta in buscador.ventasList" :key="venta.idVentaMeli">
                                                        
                            <td>
                               <span v-text="venta.fechaVenta"></span>
                            </td>
                            <td>                                
                                <a href="#" @click="showModal('venta','detalle', venta)"><span v-text="venta.idPublicacion"></span></a>
                                
                                <span v-text="venta.titulo"></span>
                            </td>
                            <td>
                               <span v-if="venta.totalPaquete>1"><i class="icon-social-dropbox"></i></span>   
                               <span v-text="venta.nombreCliente"></span>                            
                            </td>
                            <td>
                               <span v-text="venta.precioVenta"></span>
                            </td>
                            <td>
                               <span v-text="venta.neto"></span>
                            </td>
                            <td>
                               <span :class="colorPorcentaje(venta.utlPorcentaje)" v-text="venta.utlPorcentaje"></span>
                            </td>
                            <td>
                               <span v-text="venta.estatusVentaMeli"></span>
                            </td>
                            
                        </tr>                            
                    </tbody>
                </table>
                <nav>
                    <ul class="pagination">
                        <li class="page-item" v-if="pagination.current_page > 1">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page-1, buscador.buscar, buscador.criterio)">Ant</a>
                        </li>
                        <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(page, buscador.buscar, buscador.criterio)" v-text="page"></a>
                        </li>                           
                        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page+1, buscador.buscar, buscador.criterio)">Sig</a>
                        </li>
                    </ul>
                </nav>
            
        </div>


        <!--Inicio del modal agregar/actualizar-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalDetalleVenta.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalDetalleVenta.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group row" v-for="pub in modalDetalleVenta.detaPublicacion" :key="pub.id_variante_publicacion">
                                    <div class="col-md-2">
                                        <img :src="pub.foto_mini" alt="Imagen del producto" contain height="100px" width="100px" v-if="pub.id_variante_publicacion == modalDetalleVenta.venta.idVariante">
                                    </div>                                    
                                    <div class="col-md-10" v-if="pub.id_variante_publicacion == modalDetalleVenta.venta.idVariante">
                                        <div class="row">
                                            <div class="col-md-3">
                                                <span v-text="pub.id_publicacion_tienda"></span>
                                            </div>
                                            <div class="col-md-4">
                                                <span v-text="pub.titulo"></span>
                                            </div>
                                            <div class="col-md-5">
                                                <a  :href="pub.link" target="_blank">Visitar</a>
                                                &nbsp;
                                                |
                                                &nbsp;
                                                <a  href="#" @click="modalDetalleVenta.mostrarDetalleConfig=1;">Productos</a>
                                                <ul style="display: none;" :class="{'mostrarDiv' : modalDetalleVenta.mostrarDetalleConfig}">
                                                    <li v-for="config in pub.config" :key="config.codigo">
                                                        <strong><span v-text="config.codigo"></span></strong>
                                                        <span v-text="config.nombre"></span>
                                                        $<span v-text="Math.round(config.ultimo_precio_compra * config.detalle.cantidad *100)/100"></span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div class="form-group row">
                                    <div class="col-md-7">                                        
                                        <div class="row">
                                            <div class="col-md-4">ID Venta</div>
                                            <div class="col-md-8"><span v-text="venta.idOrdenMeli"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">Cliente</div>
                                            <div class="col-md-8"><span v-text="venta.nombreCliente"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">Direccion</div>
                                            <div class="col-md-8"><span v-text="venta.direccionEntrega"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">Fecha pago</div>
                                            <div class="col-md-8"><span v-text="venta.fechaPago"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">Fecha Venta</div>
                                            <div class="col-md-8"><span v-text="venta.fechaVenta"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-4">Forma envio</div>
                                            <div class="col-md-8"><span v-text="venta.metodoEnvio"></span></div>
                                        </div>                                        
                                        <div class="row">
                                            <div class="col-md-4">Estatus</div>
                                            <div class="col-md-8"><span v-text="venta.estatusVentaMeli"></span></div>
                                        </div>
                                    </div>                                    
                                    <div class="col-md-5">
                                        <div class="row">
                                            <div class="col-md-7"><strong>Cantidad</strong></div>
                                            <div class="col-md-5" style="text-align: right;"><span v-text="venta.cantidad"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-7"><strong>Precio Venta</strong></div>
                                            <div class="col-md-5" style="text-align: right;">$<span v-text="venta.precioVenta"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-7"><strong>Comision</strong></div>
                                            <div class="col-md-5" style="text-align: right;">$<span v-text="venta.comision"></span></div>
                                        </div>                                        
                                        <div class="row">
                                            <div class="col-md-7"><strong>Envio</strong></div>
                                            <div class="col-md-5" style="text-align: right;">$<span v-text="venta.costoEnvioEmpresa"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-7"><strong>ISR</strong></div>
                                            <div class="col-md-5" style="text-align: right;">$<span v-text="venta.isr"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-7"><strong>IVA</strong></div>
                                            <div class="col-md-5" style="text-align: right;">$<span v-text="venta.iva"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-7"><strong>NETO</strong></div>
                                            <div class="col-md-5" style="text-align: right;">$<span v-text="venta.neto"></span></div>
                                        </div> 
                                        <div class="row">
                                            <div class="col-md-7"><strong>Precio compra</strong></div>
                                            <div class="col-md-5" style="text-align: right;">$<span v-text="venta.ultimoPrecioCompra"></span></div>
                                        </div>                                       
                                        <div class="row">
                                            <div class="col-md-7"><strong>Utilidad $</strong></div>
                                            <div class="col-md-5" style="text-align: right;">$<span v-text="venta.utlMonto"></span></div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-7"><strong>Utilidad %</strong></div>
                                            <div class="col-md-5" style="text-align: right;"><span v-text="venta.utlPorcentaje"></span></div>
                                        </div>

                                        
                                    </div>
                                </div>
                                
                                

                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>
                        <button type="button" class="btn btn-primary" v-if="modalDetalleVenta.tipoAccion==1" @click="registrarProveedor();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="modalDetalleVenta.tipoAccion==2" @click="actualizarProveedor();">Actualizar</button>
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
                pagination: {
                    total : 0,
                    current_page  : 0,
                    per_page : 0,
                    last_page : 0,
                    from : 0,
                    to : 0
                },
                offset : 100,
                
                isLoading: 0,

                buscador: {                    
                    criterio: 'titulo',
                    buscar: '',
                    idCuentaTienda: 0,
                    fechaInicio : '',
                    fechaFin: '',
                    color: 'todos',
                    CuentasTiendaList: [],
                    ventasList: []                    
                },

                modalDetalleVenta: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    errorProveedor: 0,
                    erroresProveedorMsjList: [],
                    venta: null,
                    detaPublicacion: null,
                    mostrarDetalleConfig: 0
                },

                venta:{
                    cantidad: null,
                    comision: null,
                    costoEnvioCliente: null,
                    costoEnvioEmpresa: null,
                    direccionEntrega: null,
                    estatusVentaMeli: null,
                    fechaPago: null,
                    fechaVenta: null,
                    idEnvio: null,
                    idOrdenMeli: null,
                    idPago: null,
                    idPaqueteMeli: null,
                    idPublicacion: null,
                    idVariante: null,
                    idVentaMeli: null,
                    isr: null,
                    iva: null,
                    metodoEnvio: null,
                    montoPagoCliente: null,
                    neto: null,
                    nombreCliente: null,
                    nota: null,
                    precioVenta: null,
                    titulo: null,
                    totalPaquete: null,
                    ultimoPrecioCompra: null,
                    utlMonto: null,
                    utlPorcentaje: null
                }
            }
        },
        components: {      
            Datepicker      
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
            listarVentas(page, buscar, criterio, aplLoading=false){                

                if(this.buscador.idCuentaTienda == 0){
                    util.MSG('Algo salio Mal!', 'Seleccione la cuenta de la tienda', util.tipoErr);
                    return;
                }
                if(this.buscador.fechaInicio == "" || this.buscador.fechaFin == ""){
                    util.MSG('Algo salio Mal!', 'Eliga fechas de consulta', util.tipoErr);
                    return;
                }


                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;     
                let fechaInicio = this.buscador.fechaInicio.getFullYear()+"-"+(this.buscador.fechaInicio.getMonth() + 1)+"-"+this.buscador.fechaInicio.getDate();
                let fechaFin = this.buscador.fechaFin.getFullYear()+"-"+(this.buscador.fechaFin.getMonth() + 1)+"-"+this.buscador.fechaFin.getDate();

                axios.get('/zicandi/public/tienda/ventasList',{
                    params: {
                        'page': page,
                        'buscar': buscar,
                        'criterio': criterio,
                        'idCuentaTienda': this.buscador.idCuentaTienda,
                        'fechaInicial': fechaInicio,
                        'fechaFinal': fechaFin,
                        'color': this.buscador.color,
                        filtros: {
                            'activas': this.chkEstatusActivas,
                            'pausadas': this.chkEstatusPausadas,
                            'sinligar': this.chkEstatusSinLigar,
                            'orden': this.orden
                        }
                    }
                })
                .then(function (response) {                    
                    var respuesta = response.data;  
                    me.buscador.ventasList = respuesta.pagination.data;

                    me.pagination = respuesta.pagination;                    

                    me.isLoading = 0;
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            selectTienda(){                
                let me=this;                
                var url= '/zicandi/public/tienda/getSelectCuentaTiendas';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.buscador.CuentasTiendaList = respuesta.tiendas;     
                                
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
 
            },
            onGetDetallePublicacion(idPublicacion){      
                this.isLoading = 1;          
                let me=this;                
                var url= '/zicandi/public/publicaciones/get?idPublicacion='+idPublicacion;
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    
                    me.modalDetalleVenta.detaPublicacion = respuesta.publicacion;
                    me.isLoading = 0;
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });



                
            },
            cambiarPagina(page, buscar, criterio){
                let me = this;

                me.pagination.current_page = page;

                me.listarVentas(page, buscar, criterio, true);
            },
            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'venta':
                    {
                        switch(accion){
                            case 'detalle':
                            {
                                this.modalDetalleVenta.modal = 1;
                                this.modalDetalleVenta.tituloModal = 'Detalle venta';
                                this.modalDetalleVenta.tipoAccion = 1;
                                this.modalDetalleVenta.venta = data;
                                this.modalDetalleVenta.mostrarDetalleConfig = 0;
                                this.venta = data;

                                this.onGetDetallePublicacion(data['idPublicacion']);
                                

                                break;
                            }
                        }
                    }
                }
            },
            closeModal(){
                this.modalDetalleVenta.modal = 0;                
                this.modalDetalleVenta.tituloModal = '';
            },
            colorPorcentaje(valor){
                if(valor>=.20){
                    return "verde";
                }else if(valor >=.05 && valor<.20){
                    return "naranja";
                }else{
                    return "rojo";
                }
            },
            onExportarPublicaciones(buscar, criterio, aplLoading=false){                

                if(this.buscador.idCuentaTienda == 0){
                    util.MSG('Algo salio Mal!', 'Seleccione la cuenta de la tienda', util.tipoErr);
                    return;
                }
                if(this.buscador.fechaInicio == "" || this.buscador.fechaFin == ""){
                    util.MSG('Algo salio Mal!', 'Eliga fechas de consulta', util.tipoErr);
                    return;
                }

                let me=this;     
                let fechaInicio = this.buscador.fechaInicio.getFullYear()+"-"+(this.buscador.fechaInicio.getMonth() + 1)+"-"+this.buscador.fechaInicio.getDate();
                let fechaFin = this.buscador.fechaFin.getFullYear()+"-"+(this.buscador.fechaFin.getMonth() + 1)+"-"+this.buscador.fechaFin.getDate();

                let params= {                       
                        'buscar': buscar,
                        'criterio': criterio,
                        'idCuentaTienda': this.buscador.idCuentaTienda,
                        'fechaInicial': fechaInicio,
                        'fechaFinal': fechaFin,
                        'color': this.buscador.color
                    };

                let json = JSON.stringify(params);

                window.open('/zicandi/public/tienda/ventas/export?param='+encodeURIComponent(json));
     
            },

        },
        mounted() {            
            this.buscador.fechaInicio = new Date();
            this.buscador.fechaFin = new Date();
            this.selectTienda();
        }
    }
</script>
<style>
.mostrarDiv{
    display: list-item !important;    
}

.naranja{
    color: coral;
}

.rojo{
    color: crimson;
}

.verde{
    color: green;
}

</style>