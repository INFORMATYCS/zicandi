<template>
    <main>
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <div class="form-group row">
            <h4 class="col-md-12 form-control-label" for="text-input">Resumen: {{p_idLote}}</h4>                
        </div>
        <div class="row" v-for="(detaLote, indice) in loteOperacionProcesosDeta" :key="detaLote.id_lote_operacion">                                 
            <div class="col-md-1">                    
                <img :src="detaLote.url_img_producto" width="30" alt="dog">
            </div>
            <div class="col-md-3">
                <label v-text="detaLote.nombre_almacen"></label>
            </div>
            <div class="col-md-2">
                <label v-text="detaLote.codigo_ubicacion"></label>
            </div>                
            <div class="col-md-1">
                <strong><label v-text="detaLote.codigo_producto"></label></strong>
            </div>
            <div class="col-md-3">
                <label v-text="detaLote.nombre_producto"></label>
            </div>                
            <div class="col-md-1">
                <label v-if="detaLote.tipo_movimiento == 'ING'" v-text="detaLote.cantidad" style="color: blue;"></label>
                <label v-if="detaLote.tipo_movimiento == 'RET'" v-text="detaLote.cantidad*-1" style="color: red;"></label>
            </div>
            <div class="col-md-1">
                <div v-if="detaLote.estado == 'E'" v-text="detaLote.estado" :title="detaLote.msg_error" style="color: red;"></div>
                <label v-if="detaLote.estado == 'A'" v-text="detaLote.estado"></label>
            </div>
        </div>

        <div class="col"><hr></div>

        <div class="row">                
            <div class="col-md-12">                
                <button v-if="p_isValidado==1 && aplicaLoteBtnVisible==1" type="button" class="btn btn-danger" @click="onAplicaLote()">
                    <i class="icon-control-play"></i>&nbsp;Aplicar
                </button>
            </div>
        </div>
    </main>    
</template>

<script>
    export default {
        props: ['p_idLote','p_isValidado'],
        data(){
            return{
                isLoading: 0,
                isProcessBackend: false,
                idLoteActual:'',
                loteOperacionProcesosDeta:[],
                aplicaLoteBtnVisible: 1
            }
        },        
        computed:{
            
        },
        methods:{
            /**
             * Recupera el map de almacenes
             * 
             */
             onGetDetalleLote(idLote){                
                let me=this;  
                this.idLoteActual = idLote;
                this.isLoading = 1;              
                let url= '/zicandi/public/lop/get-detalle-lote?lote_referencia='+this.idLoteActual;
                axios.get(url)
                .then(function (response) {                    
                    me.isLoading = 0;
                    let respuesta = response.data;                      
                    me.loteOperacionProcesosDeta = respuesta.deta;
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onAplicaLote(){
                let me=this;

                if(this.isProcessBackend){
                    return;
                }

                this.isLoading = 1;
                this.isProcessBackend = true;
                axios.post('/zicandi/public/lop/aplica-lote',{
                    'lote_referencia': this.idLoteActual
                })
                .then(function (response) {  
                    me.isLoading = 0;
                    me.isProcessBackend = false;
                    me.loteOperacionProcesosDeta = response.data.deta;
                    let totalErrCtn=0;
                    response.data.deta.forEach( function(valor, indice) {
                        if(valor.estado=='E'){
                            totalErrCtn++;
                        }                                     
                    });

                    if(totalErrCtn==0){                        
                        me.aplicaLoteBtnVisible=0;
                        util.MSG('Bien!','Lote se aplico correctamente y completo', util.tipoOk);
                    }else{
                        util.MSG('Algo salio Mal!','Valide, hay '+totalErrCtn+' errores. El resto se aplicó CORRECTAMENTE', util.tipoErr);
                    }

                    console.log('Hay '+totalErrCtn+' errores');
                    console.log(response);
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            }

            
        },
        mounted() {
            console.log('Inicia componente AplicaMovAlmacenComponent. ');            
            this.onGetDetalleLote(this.p_idLote);
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