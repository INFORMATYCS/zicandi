<template>



    <main class="main">
       <li class="nav-item">
            <span class="badge badge-pill badge-warning" v-text="entorno"></span>
            <span v-text="version"></span>                                          
        </li>         
    </main>    
</template>

<script>
    export default {
        data(){
            return{                               
                isLoading: 0,
                cuentaActivalMeli: '',
                idVendedor: 0,
                entorno: '',
                version: ''
            }
        },
        methods:{
            onCuentaActivaMercadolibre(){                                
                let me=this;                
                let url= '/zicandi/public/tienda/registraCuentaActiva';
                axios.get(url)
                .then(function (response) { 
                    let cuenta = response.data.cuenta;
                    me.cuentaActivalMeli = cuenta;
                    me.idVendedor = response.data.id;

                    //me.onGetPublicaciones();
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

            /**
             * Funcion: Entorno ejecucion App (pruebas | produccion)
             * In: -
             * Out: (String entorno)
             */
            onGetEntorno(){                                
                let me=this;                                
                axios.get('/zicandi/public/main/entorno')
                .then(function (response) {         
                    if(response.data.xstatus){
                        me.onGetVersion();                        
                        me.entorno = response.data.entorno;

                    }else{
                        throw new Error(response.data.error);
                    }
                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            /**
             * Funcion: Pide al servidor la version actual de la App
             * In: -
             * Out: (String version)
             */
            onGetVersion(){                                
                let me=this;                                
                axios.get('/zicandi/public/main/version')
                .then(function (response) {         
                    if(response.data.xstatus){
                        me.version = response.data.version;
                    }else{
                        throw new Error(response.data.error);
                    }
                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
        },
        mounted() {
            this.onGetEntorno();            
        }
    }
</script>