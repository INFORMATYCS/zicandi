<template>



    <main class="main">
       <li class="nav-item">
            <span class="badge badge-pill badge-warning" v-text="cuentaActivalMeli"></span>                                       
        </li>         
    </main>    
</template>

<script>
    export default {
        data(){
            return{                               
                isLoading: 0,
                cuentaActivalMeli: ''
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
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            }
        },
        mounted() {
           this.onCuentaActivaMercadolibre();
            
        }
    }
</script>