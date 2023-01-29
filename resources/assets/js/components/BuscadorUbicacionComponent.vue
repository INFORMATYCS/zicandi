<template>
    <main>
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"> </div>
                     
        <!-- Buscador -->
        <div class="form-group row"> 
            <div class="col-md-12">
                <div class="input-group">                            
                    <input type="text" v-model="buscar" @keyup.enter="listarUbicaciones(buscar, true)" class="form-control" placeholder="Ubicacion">
                    <button type="button" class="btn btn-primary" @click="listarUbicaciones(buscar, true)"><i class="fa fa-search"></i>Buscar</button>
                </div>                
            </div>
        </div>
        <div style="display: none;" class="pre-scrollable" :class="{'abrir-buscaprod' : isBuscadorUbicacionVisibleDiv}">
            <table class="table table-bordered table-striped table-sm">                                   
                <tbody>
                    <tr v-for="ubicacion in listaUbicaciones" :key="ubicacion.codigo">                                                          
                        <td>                                    
                            <button type="button" class="btn btn-secondary" @click="setUbicacion(ubicacion)">
                                <i class="fa icon-target"></i> 
                                <span v-text="ubicacion.codigo"></span>
                            </button>
                        </td>
                    </tr>                            
                </tbody>
            </table>
        </div>
    </main>    
</template>

<script>
    export default {
        data(){
            return{                
                isBuscadorUbicacionVisibleDiv: 0,
                offset : 3,
                criterio: 'all',
                buscar: '',
                isLoading: 0,
                listaUbicaciones: []
                
            }
        },                
        props: {
            data: null
        },
        computed:{
            
        },
        methods:{
            listarUbicaciones(buscar, aplLoading=false){
                                
                let me=this;     
                me.isLoading = 1;           
                let url= '/zicandi/public/almacenes/filter_ubicacion?criterio='+buscar;
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    console.log(respuesta);
                    me.isLoading = 0;
                                        
                    me.listaUbicaciones = respuesta.ubicaciones;

                    if(me.listaUbicaciones.length==0){                        
                        me.setUbicacion(null);
                    }else if(me.listaUbicaciones.length==1){
                        me.setUbicacion(me.listaUbicaciones[0]);
                    }else if(me.listaUbicaciones.length>1){
                        me.isBuscadorUbicacionVisibleDiv = 1;
                    }
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });


            },

            setUbicacion(ubicacion){
                this.isBuscadorUbicacionVisibleDiv = 0;
                this.listaUbicaciones=[];

                if(ubicacion!=null){
                    this.buscar = ubicacion.codigo;
                }else{
                    this.buscar = "No encontrado";
                }

                let respuesta = {
                    ubicacion: ubicacion,
                    data: this.data
                };

                this.$emit("setUbicacion", respuesta);                
            }
        }
    }
</script>

<style>
    .abrir-buscaprod{
        display: block !important;        
    }
</style>