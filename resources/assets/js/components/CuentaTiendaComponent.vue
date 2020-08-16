<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Tienda</li>            
            <li class="breadcrumb-item">Cuentas</li>            
        </ol>

         
        <div class="container-fluid">           

            <div class="card-body">
                
                <div class="row">
                    <div class="col-sm-8">
                        <div class="card" style="width: 60rem;">
                        <ul class="list-group list-group-flush">


                            <li class="list-group-item" v-for="cuenta in listaCuentasTienda" :key="cuenta.id_cuenta_tienda">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-10">
                                            <div class="form-group row">                                
                                                <div class="col-md-3">
                                                    <h6 v-text="cuenta.nombre"></h6>
                                                </div>
                                                <div class="col-md-3">
                                                    <h6 v-text="cuenta.usuario"></h6>
                                                </div>
                                                <div class="col-md-4">
                                                    <h6  v-text="cuenta.correo"></h6>
                                                </div>
                                                <div class="col-md-2">                                                    
                                                    <span class="badge badge-pill badge-success" v-if="cuenta.estatus=='CONECTADO'">Conectado</span>
                                                    <span v-else>No Conectado</span>
                                                </div>
                                            </div>
                                            <div class="form-group row"> 
                                                <div class="col-md-3">
                                                    ID usuario
                                                </div>    
                                                <div class="col-md-9"  v-text="cuenta.att_user_id"></div>    
                                            </div>                    
                                            <div class="form-group row"> 
                                                <div class="col-md-3" >
                                                    ID
                                                </div>    
                                                <div class="col-md-9"  v-text="cuenta.att_id"></div>    
                                            </div> 
                                            <div class="form-group row"> 
                                                <div class="col-md-3">
                                                    Token
                                                </div>    
                                                <div class="col-md-9"  v-text="cuenta.att_access_token"></div>    
                                            </div> 
                                            <div class="form-group row"> 
                                                <div class="col-md-3">
                                                    Expira Token
                                                </div>    
                                                <div class="col-md-9">
                                                    <span class="badge badge-info" v-text="cuenta.att_expira_token"></span>
                                                </div>    
                                            </div> 
                                            <div class="form-group row"> 
                                                <div class="col-md-3">
                                                    Telefono
                                                </div>    
                                                <div class="col-md-9" v-text="cuenta.telefono"></div>    
                                            </div> 
                                        </div> 
                                        <div class="col-2">                                       
                                            <div class="card text-center">
                                                    <div class="card-header">
                                                            Opciones
                                                    </div>
                                                    <div class="card-body"> 
                                                            <a href="#" class="btn btn-primary" v-if="cuenta.estatus=='CONECTADO'" @click="onLogoutMercadoLibre()">Salir</a>
                                                            <a href="#" class="btn btn-primary" v-else @click="onConectarTienda(cuenta.codigo)">Conectar</a>
                                                            <p></p>
                                                            <a href="#" class="btn btn-warning" @click="onEliminarCuentaTienda(cuenta.id_cuenta_tienda)">Eliminar</a>
                                                    </div>
                                                    
                                            </div>

                                        </div>
                                    </div> 
                                </div>     
                            </li>
                        </ul>
                        </div>
                    </div>
                    <!-- DIv para registrar nueva cuenta-->

                    <div class="col-sm-4">
                        <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Nueva cuenta</h5>
                            <p class="card-text">La cuenta debe estar registrada en la tienda</p>
                            <div class="row">
                                <div class="col-4">
                                    Tienda
                                </div>
                                <div class="col-8">
                                    <select class="form-control" v-model="formRegistrarCuenta.id_tienda">
                                        <option value="0" disabled selected>Seleccione...</option>
                                        <option v-for="tienda in selectTiendas" :key="tienda.id_tienda" :value="tienda.id_tienda" v-text="tienda.nombre"></option>
                                    </select>                                                                     
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-4">
                                    Usuario
                                </div>
                                <div class="col-8">
                                    <input type="text" class="form-control" placeholder="Codigo Usuario" maxlength="30" v-model="formRegistrarCuenta.usuario">
                                </div>
                            </div>
                            
                            <a href="#" class="btn btn-primary" @click="onNuevaCuentaTienda();">Guardar</a>
                        </div>
                        </div>
                    </div>
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
                listaCuentasTienda: [],
                selectTiendas: [],
                formRegistrarCuenta:{
                    id_tienda:0,
                    usuario:''

                }   
            }
        },
        computed:{
           
        },
        methods:{

            onGetCuentasTiendas(){                
                this.isLoading = 1;                

                let me=this;                
                var url= '/zicandi/public/tienda/getcuentas';
                axios.get(url)
                .then(function (response) {                        
                    var respuesta = response.data.resultado;  
                    me.isLoading = 0;
                    me.listaCuentasTienda = respuesta;                                                            
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onSelectTiendas(){                                
                let me=this;                
                var url= '/zicandi/public/tienda/getSelectTiendas';
                axios.get(url)
                .then(function (response) {                        
                    var respuesta = response.data.tiendas;                      
                    me.selectTiendas = respuesta;                                                            
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onNuevaCuentaTienda(){                              
                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/tienda/storeCuentaTienda',{
                    'id_tienda': this.formRegistrarCuenta.id_tienda,                    
                    'usuario': this.formRegistrarCuenta.usuario
                })
                .then(function (response) {                                                            
                    util.AVISO('Perfecto, registro correcto', util.tipoOk);  
                    me.onGetCuentasTiendas();                  
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onEliminarCuentaTienda(idCuentaTienda){
                util.MSG_SI_NO('Deseas eliminar','No podras usarlo...',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/tienda/eliminarCuenta',{
                            'id_cuenta_tienda': idCuentaTienda
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Cuenta eliminada!!!', util.tipoOk);                                       
                            me.onGetCuentasTiendas();    
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });        
            },

            onCuentaActivaMercadolibre(){                                
                let me=this;                
                var url= '/zicandi/public/tienda/registraCuentaActiva';
                axios.get(url)
                .then(function (response) {                        
                    console.log(response);
                    me.onGetCuentasTiendas();
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onConectarTienda(codigoTienda){
                console.log(codigoTienda);
                //MercadoLibre
                if(codigoTienda=="MLM"){
                    this.onLoginMercadoLibre();
                }else if(codigoTienda=="AMZ"){//Amazon

                }
            },

            onLogoutMercadoLibre(){
                

                let me = this;
                this.isLoading = 1;
                axios.get('/zicandi/public/meli/logout')
                .then(function (response) {                                        
                    me.isLoading = 0;  
                    //util.POPUP('https://www.mercadolibre.com/jms/mlm/lgz/logout','display: none;'); 
                    
                    let url = 'https://www.mercadolibre.com';
                    /*Swal.fire({
                        title: '<strong>Saliendo de mercadolibre</strong>',
                        icon: 'info',
                        html:
                        '<iframe src="'+url+'" title="Login Mercadolibre" style="display: none;"></iframe>',
                        showCloseButton: true,
                        showCancelButton: true,
                        focusConfirm: false,
                        confirmButtonText:
                        '<i class="fa fa-thumbs-up"></i> Great!',
                        confirmButtonAriaLabel: 'Thumbs up, great!',
                        cancelButtonText:
                        '<i class="fa fa-thumbs-down"></i>',
                        cancelButtonAriaLabel: 'Thumbs down'
                    });*/

                    Swal.fire({
                        title: 'Saliendo de mercadolibre',
                        html:'<iframe src="'+url+'" title="Login Mercadolibre"></iframe>',
                        icon: 'success',
                        showCancelButton: false,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Listo!'
                        }).then((result) => {
                        if (result.value) {
                            me.onGetCuentasTiendas();
                        }
                        })
                    

                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

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
            },
            onLoginAmazon(){
                
                //P e n d i e n t e
            }
        },
        mounted() {
            this.onCuentaActivaMercadolibre();
            
            this.onSelectTiendas();
            
        }
    }
</script>