<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Herramientas</li>            
        </ol>

         
        <div class="container-fluid">           

            <div class="card-body">
                <ul class="nav nav-tabs nav-justified">
                    <li class="nav-item">
                        <a class="nav-link" @click="setActive('nota_remision')" :class="{ active: isActive('nota_remision') }" href="#nota_remision">Remision Betterware</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="setActive('cat_bett')" :class="{ active: isActive('cat_bett') }" href="#cat_bett">Catalogo Betterware</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" @click="setActive('contact')" :class="{ active: isActive('contact') }" href="#contact">Contact</a>
                    </li>
                </ul>
                <div class="tab-content py-3" id="myTabContent">
                    
                    <div class="tab-pane fade" :class="{ 'active show': isActive('nota_remision') }" id="nota_remision">
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            
                            <div class="form-group row">                                
                                <div class="col-md-12">
                                    <div class="card">

                                        
                                        <label class="btn btn-primary" for="customFileLang">Subir archivo</label>

                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>

                    <div class="tab-pane fade" :class="{ 'active show': isActive('cat_bett') }" id="cat_bett">
                        <div class="card-body">
                            <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                                <div class="form-group row">
                                    <label class="col-md-5 form-control-label" for="text-input">Total de productos</label>
                                    <div class="col-md-7" v-text="catBett.totalRegResumen">
                                        
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-5 form-control-label" for="text-input">Existentes (Update)</label>
                                    <div class="col-md-7" v-text="catBett.updateRegResumen">
                                        
                                    </div>
                                </div>
                                <div class="form-group row">
                                    <label class="col-md-5 form-control-label" for="text-input">Nuevos</label>
                                    <div class="col-md-7" v-text="catBett.nuevoRegResumen">
                                        
                                    </div>
                                </div>


                            </form>
                        </div>
                        <div class="card-footer">
                            <button type="button" class="btn btn-primary" @click="onMigracionCatProductos();">Aplicar</button>                        
                    </div>
                    </div>
                    <div class="tab-pane fade" :class="{ 'active show': isActive('contact') }" id="contact">Contact content</div>
                </div>



            </div>
        </div>

    </main>    
</template>

<script>
    export default {
        data(){
            return{               
                activeItem: 'nota_remision',
                catBett:{
                    totalRegResumen: 0,
                    updateRegResumen: 0,
                    nuevoRegResumen: 0
                },
                
                isLoading: 0                
            }
        },
        computed:{
           
        },
        methods:{
            isActive (menuItem) {
                return this.activeItem === menuItem
            },
            setActive (menuItem) {
                this.activeItem = menuItem

                if(menuItem=="cat_bett"){
                    this.onResumenMigracionBett();
                }
            },


            
            onResumenMigracionBett(){                
                this.isLoading = 1;                

                let me=this;                
                var url= '/zicandi/public/bett/resumen';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  
                    me.isLoading = 0;
                    console.log(respuesta);

                     
                    me.catBett.totalRegResumen= respuesta.total;
                    me.catBett.updateRegResumen= respuesta.update;
                    me.catBett.nuevoRegResumen= respuesta.nuevo;
                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onMigracionCatProductos(){                
                this.isLoading = 1;                
                
                let me=this;                
                var url= '/zicandi/public/bett/migracion';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  
                    me.isLoading = 0;
                    console.log(respuesta);           
                    
                    if(respuesta==1){
                        util.AVISO('Perfecto, migracion de productos terminada', util.tipoOk);
                    }
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            
        },
        mounted() {
            
        }
    }
</script>