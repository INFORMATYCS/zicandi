<template>
    <main>
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <div class="card">
            <div class="row"> 
                <div class="col-md-7">                    
                    <div class="row"> 
                        <div class="col-md-2" style="line-height: 30px;">
                            &nbsp;&nbsp;&nbsp;Folio: <strong><span v-text="folioActual"></span></strong>
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" style="width: 200px;" v-model="conceptoFolioActual" @keyup.enter="onUpdateConceptoFolioCap()">                    
                        </div>
                        <div class="col-md-4">
                            <select class="form-control" style="width: 200px;" v-model="folioComboSelect" @change="onChangeFolioCapturaEstandar()">
                                <option value="0" disabled>Otro folio</option>
                                <option v-for="folio in mapFoliosExistentes" :key="folio.id_cap_folio" :value="folio.id_cap_folio" v-text="folio.concepto"></option>                                        
                                <option value="REFRESH_LISTA">Refresh lista</option>
                                <option value="DEPURA_LISTA">Depurar lista</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button type="button" class="btn btn-secondary" @click="onGeneraNuevoFolioCap()">
                                <i class="icon-plus"></i>&nbsp;Nuevo folio
                            </button>
                        </div>                        
                    </div>
                </div>
                       
                <div class="col-md-5">
                    <div class="row"> 
                        <div class="col-md-6">
                            <button type="button" class="btn btn-secondary" @click="onResetAll()">
                                <i class="icon-plus"></i>&nbsp;Reset All
                            </button> 
                        </div>
                        <div class="col-md-6">
                            Paso actual: <span v-text="step"></span>
                        </div>
                    </div>
                </div>                
            </div>            
        </div>

        <div v-if="step == 1">
            

            <!-- Buscador -->
            <div class="form-group row"> 
                <div class="col-md-8">
                    <div class="input-group">                            
                        <input type="text" ref="buscadorCapEst" v-model="buscador" @keyup.enter="onPushDetalleProductosLOCAL()" @focus="$event.target.select()" class="form-control" style="font-size:30px;" placeholder="Codigo del producto a buscar" autofocus>
                    </div>                
                </div>
                <div class="col-md-4">
                    <button type="button" class="btn btn-primary" @click="onEliminarConError()">
                        <i class="icon-plus"></i>&nbsp;Limpiar
                    </button>

                    
                    <button type="button" class="btn btn-danger" @click="onContinuarStep(2)">
                        <i class="icon-control-play"></i>&nbsp;Continuar
                    </button> 
                    
                </div>
            </div>

            <div class="row" v-for="(deta, indice) in detalleProductosLOCAL" :key="deta.id_cap_folio_detalle_idx"> 
                <div class="col-md-1">
                    <div class="contenedor">
                        <div class="A"><div :class="deta.color" :title="deta.error"></div></div>
                        <div class="B">
                            <img v-if="indice == 0" :src="deta.url_imagen" width="50" alt="dog">
                            <img v-if="indice > 0" :src="deta.url_imagen" width="30" alt="dog">
                        </div>
                    </div>
                </div>            
                <div class="col-md-2">
                    
                    <H2 v-if="indice == 0" v-text="deta.codigo_producto"></H2>
                    <H4 v-if="indice > 0" v-text="deta.codigo_producto" style="vertical-align: middle;"></H4>
                </div>
                <div class="col-md-6">
                    <H3 v-if="indice == 0" v-text="deta.nombre_producto"></H3>
                    <H4 v-if="indice > 0" v-text="deta.nombre_producto"></H4>
                </div>
                <div class="col-md-3">
                    <div class="contenedor">
                        <div class="A">
                            <H1 v-if="indice == 0" v-text="deta.total_captura" style="cursor: pointer" @click="onEditarTotalCaptura(deta)"></H1>
                            <H4 v-if="indice > 0" v-text="deta.total_captura" style="cursor: pointer" @click="onEditarTotalCaptura(deta)"></H4>
                        </div>
                        <div class="B">
                            <button type="button" class="btn btn-warning btn-sm" @click="onEditarTotalCaptura(deta)">
                                <i class="icon-pencil"></i>
                            </button>

                            <button type="button" class="btn btn-primary btn-sm" @click="onAddTotalCaptura(deta)">
                                <i class="icon-plus"></i>
                            </button>

                            <button type="button" class="btn btn-danger btn-sm" @click="onEliminarProducto(deta)">
                                <i class="icon-trash"></i>
                            </button>
                        </div>
                    </div>    
                </div>

                <div class="col"><hr></div>

            </div>
        </div>
        <div v-if="step == 2">
            <div class="form-group row">
                <h4 class="col-md-12 form-control-label" for="text-input">Que deseas hacer con la captura?</h4>                
            </div>
            <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Folio captura</label>
                <div class="col-md-9">
                    <label v-text="folioActual"></label> - <label v-text="conceptoFolioActual"></label>
                </div>                
            </div>
            <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Almacen</label>
                <div class="col-md-6">
                    <select class="form-control" v-model="configLote.idAlmacen">
                        <option value="0" disabled>Seleccione...</option>
                        <option v-for="almacen in mapAlmacen" :key="almacen.id_almacen" :value="almacen.id_almacen" v-text="almacen.nombre"></option>                                        
                    </select> 
                </div>
                <div class="col-md-3">
                    <small>Almacen destino a donde aplicara la transaccion</small>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Ubicacion</label>
                <div class="col-md-6">
                    <buscador-ubicacion-component @setUbicacion="getUbicacionSeleccionOrigen" ></buscador-ubicacion-component>
                </div>
                <div class="col-md-3">
                    <small>Ubicacion dentro del almacen seleccionado</small>
                </div>
            </div>
            <div class="form-group row">
                <label class="col-md-3 form-control-label" for="text-input">Tipo de Movimiento</label>
                <div class="col-md-6">
                    <select class="form-control" v-model="configLote.tipoMovimiento">
                        <option value="0">Seleccione...</option>
                        <option value="INGRESO">Ingreso</option>
                        <option value="RETIRO">Retiro</option>                        
                    </select> 
                </div>
                <div class="col-md-3">
                    <small>INGRESO o RETIRO al almance, todo el folio de captura se aplicara igual</small>
                </div>
            </div>
            <div class="col"><hr></div>
            <div class="row">                
                <div class="col-md-4">
                    
                </div>
                <div class="col-md-4">
                    <button type="button" class="btn btn-secondary" @click="onContinuarStep(1)">
                        <i class="icon-close"></i>&nbsp;Regresar
                    </button>
                    <button type="button" class="btn btn-danger" @click="onContinuarStep(3)">
                        <i class="icon-control-play"></i>&nbsp;Continuar
                    </button>
                </div>
                <div class="col-md-4">
                    
                </div>
            </div>
        </div>

        <div v-if="step == 3">
            <aplica-mov-almacen-component :p_idLote="configLote.idLoteGenerado" :p_isValidado="configLote.isValidadoLote"></aplica-mov-almacen-component> 

            

            <div class="col"><hr></div>

            <div class="row">                
                <div class="col-md-4">                    
                </div>
                <div class="col-md-4">
                    <button v-if="configLote.isValidadoLote==0" type="button" class="btn btn-secondary" @click="onContinuarStep(2)">
                        <i class="icon-close"></i>&nbsp;Regresar
                    </button>
                    <button v-if="configLote.isValidadoLote==0" type="button" class="btn btn-danger" @click="onValidaOkLote()">
                        <i class="icon-control-play"></i>&nbsp;Validado OK
                    </button>
                </div>
                <div class="col-md-4">
                    
                </div>
            </div>
        </div>
    </main>    
</template>

<script>
    export default {
        data(){
            return{
                isLoading: 0,
                isProcessBackend: false,
                step: 1,
                mapAlmacen: [],
                mapFoliosExistentes:[],
                buscador: '',
                folioActual: 0,
                conceptoFolioActual: '',
                folioComboSelect: 0,
                detalleProductosBD: [],
                detalleProductosLOCAL: [],
                bandExisteCambio: false,
                tiempoActualiza: 1000,
                temporizador: setInterval(()=>{ this.onTemporizador(); }, 1000),
                configLote:{
                    idAlmacen: 0,
                    ubicacion: '',
                    tipoMovimiento: '',
                    detalleLoteProcess: [],
                    idLoteGenerado:'',
                    isValidadoLote: 0
                }
            }
        },        
        computed:{
            
        },
        methods:{
            /**
             * Recupera el map de folios captura estandar
             * 
             */
             onGetMapFoliosCapEstandar(band){                
                let me=this;                
                let url= '/zicandi/public/cap/get/folios';
                axios.get(url)
                .then(function (response) {                                        
                    me.mapFoliosExistentes= response.data.folios.data;

                    if(band==1){
                        me.folioComboSelect=0;
                        me.folioActual= 0;
                        me.conceptoFolioActual= '';
                    }
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },


            /***
             * Genera un nuevo folio para la captura estandar
             * 
             * 
             */
             onGeneraNuevoFolioCap(){                
                let nAle= Math.floor(Math.random() * 1000);
                let date = new Date();
                let sufix = "" + date.getFullYear() + ((date.getMonth() + 1) > 9 ? '' : '0') + (date.getMonth() + 1) + (date.getDate() > 9 ? '' : '0') + date.getDate() + "-" + nAle;
                let me = this;                                    

                this.isLoading = 1;
                axios.post('/zicandi/public/cap/crud/store',{
                    'concepto': 'cap' + sufix
                })
                .then(function (response) {  
                    me.isLoading = 0;
                    me.onResetAll();
                    me.folioActual=response.data.id_cap_folio;
                    me.conceptoFolioActual='cap' + sufix;

                    me.onGetMapFoliosCapEstandar(0);                    
                    
                    if(me.$refs.buscadorCapEst){                        
                        me.$refs.buscadorCapEst.select();
                    }                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            /***
             * Actualiza el concepto para el folio de captura
             * 
             * Se activa al presionar Enter
             */
             onUpdateConceptoFolioCap(){                                
                let me = this;                                    

                this.isLoading = 1;
                axios.post('/zicandi/public/cap/crud/update',{
                    'id_cap_folio': me.folioActual,
                    'concepto': me.conceptoFolioActual
                })
                .then(function (response) {  
                    me.isLoading = 0;
                    me.onSetFocusBuscadorCapEst();
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            
            /***
             * Realiza el cambio de folio al seleccionarlo en el combo
             * 
             * 
             */
             onChangeFolioCapturaEstandar(){                                
                let me = this;                                    

                let folioSeleccion= this.folioComboSelect;                

                if(folioSeleccion == "REFRESH_LISTA"){
                    me.onResetAll();
                    this.onGetMapFoliosCapEstandar(1);                    
                }else if(folioSeleccion == "DEPURA_LISTA"){                                
                    axios.get('/zicandi/public/cap/depuracion-binaria')
                    .then(function (response) {
                        me.onResetAll();
                        me.onGetMapFoliosCapEstandar(1);
                        util.MSG('Depuracion exitosa!', 'Se eliminaron la mitad de folios', util.tipoOk);
                    })
                    .catch(function (error) {                                        
                        util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                    });

                }else{
                
                    this.isLoading = 1;
                    axios.get('/zicandi/public/cap/get/folio?id_cap_folio='+folioSeleccion)
                    .then(function (response) {                    
                        me.isLoading = 0;
                        me.onResetAll();
                        me.conceptoFolioActual= response.data.cap_folio.concepto;
                        me.detalleProductosBD= response.data.cap_folio.detalle;
                        me.folioActual= folioSeleccion;

                        response.data.cap_folio.detalle.forEach( function(valor, indice) {
                            me.detalleProductosLOCAL.push({
                                codigo_producto: valor.codigo_producto,
                                nombre_producto: valor.nombre_producto,
                                url_imagen: valor.url_imagen,
                                color: 'circulo-verde',
                                total_captura: valor.total_captura,
                                xstatus: true
                            });                    
                        });


                        me.$forceUpdate();

                        me.onSetFocusBuscadorCapEst();
                        if(me.$refs.buscadorCapEst){                        
                            me.$refs.buscadorCapEst.select();
                        }                    
                        
                    })
                    .catch(function (error) {                                        
                        util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                    });
                }
            },

            /***
             * Realiza el cambio de folio al seleccionarlo en el combo
             * 
             * 
             */
             onSetFocusBuscadorCapEst(){                                
                this.$refs.buscadorCapEst.focus();
            },

            onPushDetalleProductosLOCAL(){

                //Busca si ya existe el producto
                let existe= false;

                for(let i=0; i<this.detalleProductosLOCAL.length; i++){
                    let item = this.detalleProductosLOCAL[i];

                    if(item.codigo_producto == this.buscador){
                        this.detalleProductosLOCAL.splice(i, 1)

                        item.total_captura= item.total_captura + 1;
                        item.color= "circulo-gris";
                        existe=true;

                        this.detalleProductosLOCAL.unshift(item);
                        break;
                    }
                }

                console.log("a");
                console.log(this.detalleProductosLOCAL);

                if(!existe){
                    this.detalleProductosLOCAL.unshift({
                        codigo_producto: this.buscador,
                        nombre_producto:'',
                        url_imagen: 'data:image/gif;base64,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',
                        color: "circulo-gris",
                        total_captura: 1
                    });
                }

                //-----
                this.bandExisteCambio= true;
                //-----

                this.$refs.buscadorCapEst.select();
            },

            onUpdateDetalleProductosLOCAL(idCapFolioDetalle, codigoProducto, nombreProducto, urlImagen, xstatus, error){

                //Busca si ya existe el producto
                let existe= false;

                if(error=="No query results for model [App\\Producto]."){
                    error="No localizado";
                }

                for(let i=0; i<this.detalleProductosLOCAL.length; i++){
                    let item = this.detalleProductosLOCAL[i];

                    if(item.codigo_producto == codigoProducto){
                        item.id_cap_folio_detalle= idCapFolioDetalle;
                        item.nombre_producto= (nombreProducto!=null) ? nombreProducto: item.nombre_producto;
                        item.url_imagen= (urlImagen!=null) ? urlImagen: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAIAAACRXR/mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NTg3QkU5RTY2OEFDMTFFRTk2RTBFNjRDNUVBOUM1MkIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NTg3QkU5RTc2OEFDMTFFRTk2RTBFNjRDNUVBOUM1MkIiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo1ODdCRTlFNDY4QUMxMUVFOTZFMEU2NEM1RUE5QzUyQiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo1ODdCRTlFNTY4QUMxMUVFOTZFMEU2NEM1RUE5QzUyQiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Popa7NcAAALfSURBVHjaYvz//z/D4ANMDIMSjDpr1Fmjzhpeznr3jmHXLobz5xmoUhD+pwo4fvy/lBTQOSDk5PT/928KzaOGsx49QrgJgpKSBoGz/PxQ3AREQFeePDmgztq+HT2oIMjM7P+/fwPkLGAaUlDA4iYImjJlgJzV34/TTZCo/PyZ7s56/hx79CGj1FS6OysmBt0RomL/2TnQA+zCBTo6C7mgAiJJyf+7dv3/8OH/kyf/Gxr+MzIipOzt6eUsYBbT1kYJlbVrURTY2aEE2MqVdHHW8uUobuLl/f/+PYqC1lb0qPz5kyQbSK8TP35kKC5GEfn5k+HbNxSRr19RuM+eMbS20riqBloAtAYZ/PrFcPs2isj16+i65sxhePiQZs66c4dh6VIs4pcvI1f+IGVoAOiTwkKaOSs+AT2oIODSJQT70yfsak6eZNizhwYNm927cZaftrYIZTdu/Gdixq5MSen/nz9UzYk/fuCr/hQVEXlt61Z85T5xFSXRzursxGcZB+f/Fy+gKvv6CFSUr15RyVkvXxKu/k6fhipOSaG8oiQuyaemYk/FyODVKyjj/n0CKrduBTX58QIWwm4CGnHmDGFlGzcy/PvH8O8/w7VrBFQCfZiQwHDxIgU5EZhx9PQIRAp5aPVqCtLWwoXEWgNs0QOrwvJyUPOGGPXS0v+/fiXLWUBt8vJE2YGcim/f/i8sTJSuujqynJWZSZTprKygZhYyKC0lSiMwdz9+TGJOfPIElIqJAWxsDDw8KCJ8fERphKR90pK8mxsJ6XfqVITGX7/+GxgQqxFHjxKHsw4eJFx+IiMW1v/d3aCW9LZt/318SMuSOjqYFSUOZxUX06RQwIWuXycubb1/T9dxo89fiGtveXoySEnRyU1Ai7S1iE7ywO6Kujpt4w6YfAMDQd1gDMCIb7oAWMcBm5p//4IYEGWUD6kxMoIjiQmEODgYuLiwqxqdxRh11qizRp01xJwFEGAArbyFMdU3Oj0AAAAASUVORK5CYII=';                        
                        item.xstatus= xstatus;
                        item.error= (error!=null) ? error: null;
                        item.color= (xstatus) ? 'circulo-verde' : 'circulo-rojo';
                        existe=true;
                        break;
                    }
                }                
                
            },

            onSleep(ms){
                return new Promise(resolve => setTimeout(resolve, ms));
            },

            async onTemporizador(){

                if(!this.bandExisteCambio){
                    console.log("Sin cambios que procesar");
                    return;
                }                
                //~Detiene el temporizador para procesar las solicitudes                
                console.log("Detiene temporizador");
                clearInterval(this.temporizador);

                this.bandExisteCambio= false;

                let me = this;
                let detalle = [];
                this.detalleProductosLOCAL.forEach( function(valor, indice) {
                    detalle.push({"codigo_producto":valor.codigo_producto,"total_captura":valor.total_captura});                    
                });

                axios.post('/zicandi/public/cap/add-products-all',{
                    'id_cap_folio': this.folioActual,
                    'tipo_operacion': 'SET',
                    'detalle': detalle
                })
                .then(function (response) {                    
                    if(response.data.xstatus){                        
                        //~Procesa resultado y actualiza listado local
                        response.data.result.forEach( function(valor, indice) {
                            if(valor.result.xstatus){
                                me.onUpdateDetalleProductosLOCAL(valor.result.product.id_cap_folio_detalle, valor.codigo_producto, valor.result.product.nombre_producto, valor.result.product.url_imagen, true, null);
                            }else{
                                me.onUpdateDetalleProductosLOCAL(0, valor.codigo_producto, null, null, false, valor.result.error);
                            }
                        });
                    }
                    
                    me.$forceUpdate();

                    console.log(me.detalleProductosLOCAL);                    
                    me.temporizador=setInterval(()=>{ me.onTemporizador(); }, me.tiempoActualiza);
                })
                .catch(function (error) {                           
                    me.bandExisteCambio= true; //Para que lo vuelva a intentar
                    me.temporizador=setInterval(()=>{ me.onTemporizador(); }, me.tiempoActualiza);
                    console.log("Error al SET de productos: " + util.getErrorMensaje(error));                    
                });
            },

            onEliminarProducto(deta){
                let me = this;                    

                this.isLoading = 1;
                axios.delete('/zicandi/public/cap/remove-product',{
                    data:{'id_cap_folio_detalle': deta.id_cap_folio_detalle}
                })
                .then(function (response) {  
                    me.isLoading = 0;

                    for(let i=0; i<me.detalleProductosLOCAL.length; i++){
                        let item = me.detalleProductosLOCAL[i];

                        if(item.codigo_producto == deta.codigo_producto){
                            me.detalleProductosLOCAL.splice(i, 1);
                            break;
                        }
                    }

                    //-----
                    me.bandExisteCambio= true;
                    //-----
                    
                    if(me.$refs.buscadorCapEst){                        
                        me.$refs.buscadorCapEst.select();
                    }                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onEditarTotalCaptura(deta){
                let doc = prompt("Editar total piezas", deta.total_captura);

                if (!isNaN(doc)) {
                    if(parseInt(doc, 10) < 0){                                
                        util.MSG('Algo salio Mal!','Solo cantidades positivas', util.tipoErr);
                        return;
                    }

                    for(let i=0; i<this.detalleProductosLOCAL.length; i++){
                        let item = this.detalleProductosLOCAL[i];

                        if(item.codigo_producto == deta.codigo_producto){
                            item.total_captura= parseInt(doc, 10);
                            item.color= 'circulo-gris';

                            break;
                        }
                    }
                }else{
                    util.MSG('Algo salio Mal!','Se requiere un numero valido', util.tipoErr);
                }                

                //-----
                this.bandExisteCambio= true;
                //-----               
                this.$refs.buscadorCapEst.select(); 
            },

            onAddTotalCaptura(deta){
                let doc = prompt("Piezas a agregar o quitar(-)", "");

                if (!isNaN(doc)) {
                    for(let i=0; i<this.detalleProductosLOCAL.length; i++){
                        let item = this.detalleProductosLOCAL[i];

                        if(item.codigo_producto == deta.codigo_producto){
                            if((item.total_captura + parseInt(doc, 10))<0){                                
                                util.MSG('Algo salio Mal!','Cantidad insuficiente!', util.tipoErr);
                                return;
                            }
                            item.total_captura= item.total_captura + parseInt(doc, 10);
                            item.color= 'circulo-gris';

                            break;
                        }
                    }
                }else{
                    util.MSG('Algo salio Mal!','Se requiere un numero valido', util.tipoErr);
                }                

                //-----
                this.bandExisteCambio= true;
                //-----               
                this.$refs.buscadorCapEst.select();
            },

            onEliminarConError(){
                let auxDetalleProductos = [];
                for(let i=0; i<this.detalleProductosLOCAL.length; i++){
                    let item = this.detalleProductosLOCAL[i];

                    if(item.xstatus){
                        auxDetalleProductos.push(item);                        
                    }
                }
                this.detalleProductosLOCAL= auxDetalleProductos;
                this.$forceUpdate();
                //-----
                this.bandExisteCambio= true;
                //-----               
                this.$refs.buscadorCapEst.select(); 
            },

            onResetAll(){
                console.log('------------- reset-all------------- ')                
                this.buscador =  '';
                this.folioActual =  0;
                this.conceptoFolioActual =  '';
                this.folioComboSelect =  0;
                this.detalleProductosBD =  [];
                this.detalleProductosLOCAL =  [];
                this.bandExisteCambio =  false;    
                this.step = 1;                                                                                                 
                this.configLote.idAlmacen= 0;
                this.configLote.ubicacion= '';
                this.configLote.tipoMovimiento= '';
                this.configLote.detalleLoteProcess= [];
                this.configLote.idLoteGenerado= '';
                this.configLote.isValidadoLote= 0;
                
                clearInterval(this.temporizador);
                this.temporizador= setInterval(()=>{ this.onTemporizador(); }, this.tiempoActualiza);
            },

            onContinuarStep(newStep){
                switch (newStep) {
                    case 1:
                        console.log("Captura estandar");
                        this.temporizador= setInterval(()=>{ this.onTemporizador(); }, this.tiempoActualiza),
                        this.step= newStep;
                        break;
                    case 2:
                        clearInterval(this.temporizador);
                        this.step= newStep;
                        break;
                    case 3:
                        console.log("Generacion de lote");
                        if(this.isProcessBackend){
                            return;
                        }

                        let me = this;                                    
                        //~Validaciones
                        if(me.configLote.idAlmacen<=0){
                            util.MSG('Algo salio Mal!','Se requiere el almacen', util.tipoErr);
                            return;
                        }
                        if(me.configLote.ubicacion.codigo==null || me.configLote.ubicacion.codigo==''){
                            util.MSG('Algo salio Mal!','Selecciona la ubicacion', util.tipoErr);
                            return;
                        }
                        if(me.configLote.tipoMovimiento==0){
                            util.MSG('Algo salio Mal!','Falta tipo de movimiento', util.tipoErr);
                            return;
                        }

                        this.isLoading = 1;
                        this.isProcessBackend=true;
                        axios.post('/zicandi/public/cap/migrate-lote',{
                            'id_cap_folio': me.folioActual,
                            'id_almacen': me.configLote.idAlmacen,
                            'codigo_ubicacion': me.configLote.ubicacion.codigo,
                            'tipo_movimiento': me.configLote.tipoMovimiento
                        })
                        .then(function (response) { 
                            me.isProcessBackend=false;

                            me.isLoading = 0;

                            if(!response.data.xstatus){
                                util.MSG('Algo salio Mal!',util.getErrorMensaje(response.data.error), util.tipoErr);
                                return;
                            }
                            me.configLote.detalleLoteProcess=response.data.result;
                            me.configLote.idLoteGenerado=response.data.lote;
                            me.step= newStep;
                        })
                        .catch(function (error) {       
                            me.isLoading = 0;             
                            
                        });
                        
                        break;                    
                    default:
                        console.log("No definido");
                }                
            },

            /**
             * Recupera el map de almacenes
             * 
             */
             onGetMapAlmacen(){                
                let me=this;                
                let url= '/zicandi/public/almacenes/map';
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;                      
                    me.mapAlmacen = respuesta.almacen;
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            /**
             * Ubicacion seleccion en buscador
             * 
             */
             getUbicacionSeleccionOrigen(resp){                 
                this.configLote.ubicacion= resp.ubicacion;

                console.log(resp);
            },

            onValidaOkLote(){
                this.configLote.isValidadoLote=1;
            }
        },
        mounted() {
            console.log('caegando desde fuera');
            this.tituloModal = 'Captura Estandar';
            this.tipoAccion = 1;      
            this.onResetAll();      
            this.onGetMapFoliosCapEstandar(0);
            this.onGeneraNuevoFolioCap();                                
            this.onSetFocusBuscadorCapEst();
            this.onGetMapAlmacen();
        }
    }
</script>

<style>
    .circulo-verde{
        height: 5px;
        width: 5px;
        background-color: green;
        border-radius: 50%;
    }
    .circulo-gris{
        height: 5px;
        width: 5px;
        background-color: gray;
        border-radius: 50%;
    }
    .circulo-rojo{
        height: 5px;
        width: 5px;
        background-color: red;
        border-radius: 50%;
    }
    .contenedor {        
        display: flex;
    }

    .contenedor div {
        flex: 1;  
        justify-content: right;
        align-items: center;      
    }
</style>