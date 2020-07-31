<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Mercadolibre API</li>            
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="onLoginMercadoLibre()">
                        <i class="icon-login"></i>&nbsp;Conectar
                    </button>                    
                </div>   
            </div>
            
            <div class="card-body">

                

            </div>
        </div>
            
    </main>    
</template>

<script>
    export default {
        data(){
            return{               
                oMeli: {
                    id_proveedor: 0,
                    nombre_corto: '',
                    nombre: '',
                    pagina_web: '',
                    contacto: '',
                },                                
                isLoading: 0
                
            }
        },
        computed:{            
        },
        methods:{
            
            onLoginMercadoLibre(){
                
                let me = this;
                this.isLoading = 1;
                axios.get('/zicandi/public/meli/login')
                .then(function (response) {                                        
                    me.isLoading = 0;  
                    let urlLogin = response.data.urlLogin;
                    let msg = response.data.msg;
                    console.log(response);
                    if(urlLogin!=null){
                        let altura=675;
                        let anchura=990;
                        
                        let y=parseInt((window.screen.height/2)-(altura/2));
                        let x=parseInt((window.screen.width/2)-(anchura/2));
                                                
                        window.open(urlLogin,"Login mercadolibre", 'width='+anchura+',height='+altura+',top='+y+',left='+x+',toolbar=no,location=no,status=no,menubar=no,scrollbars=no,directories=no,resizable=no');
                    }else{
                        util.AVISO(msg, util.tipoOk);                    
                    }
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            }

        },
        mounted() {
            
        }
    }
</script>