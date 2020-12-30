<template>
    <main>
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"> </div>
             
            <div class="card-body">
                <!-- Buscador -->
                <div class="form-group row"> 
                    <div class="col-md-12">
                        <div class="input-group">                            
                            <input type="text" v-model="buscar" @keyup.enter="listarProductos(1, buscar, criterio, true)" class="form-control" placeholder="Texto a buscar">
                            <button type="button" class="btn btn-primary" @click="listarProductos(1, buscar, criterio, true)"><i class="fa fa-search"></i> Buscar producto</button>
                        </div>                
                    </div>
                </div>

                <div style="display: none;" class="pre-scrollable" :class="{'abrir-buscaprod' : isBuscadorProductoDiv}">
                    <table class="table table-bordered table-striped table-sm">                                   
                        <tbody>
                            <tr v-for="producto in listaProductos" :key="producto.id_producto">
                                
                                <td>               
                                    <div class="row">                 
                                        <div class="col-3">
                                            <img :src="producto.url_imagen" alt="dog" width="50" height="50"> 
                                        </div>
                                        <div class="col-9">
                                            <h6 v-text="producto.nombre"></h6>
                                            <small class="text-muted" v-text="producto.codigo"></small>    
                                            
                                            <span class="badge badge-success" v-if="producto.xstatus">Activo</span>
                                            
                                            <span class="badge badge-danger" v-else>Desactivado</span>
                                                                            
                                        </div>
                                                    
                                    </div>
                                </td>                                                            
                                <td>
                                    <ul>
                                        <li  v-for="atributo in producto.atributos" :key="atributo.id_define_producto">
                                            <span v-text="atributo.atributo"></span> : <span v-text="atributo.valor"></span>
                                        </li>
                                    </ul>
                                </td>                                
                                <td>
                                    
                                    <button type="button" class="btn btn-secondary" @click="setProducto(producto)">
                                        <i class="fa icon-target"></i> 
                                        Elegir
                                    </button>
                                </td>
                            </tr>                            
                        </tbody>
                    </table>
                </div>

            </div>

    </main>    
</template>

<script>
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
                isBuscadorProductoDiv: 0,
                offset : 3,
                criterio: 'all',
                buscar: '',
                isLoading: 0,
                listaProductos: []
                
            }
        },        
        computed:{
            
        },
        methods:{
            listarProductos(page, buscar, criterio, aplLoading=false){
                
                if(aplLoading){
                    this.isLoading = 1;
                }
                this.isBuscadorProductoDiv = 0;

                let me=this;                
                let url= '/zicandi/public/productos?page=' + page +'&buscar=' + buscar + '&criterio=' + criterio;
                axios.get(url)
                .then(function (response) {                    
                    
                    let respuesta = response.data;  
                    me.isLoading = 0;
                                        
                    me.listaProductos = respuesta.producto.data;


                    if(me.listaProductos.length==1){
                        me.setProducto(me.listaProductos[0]);
                    }else if(me.listaProductos.length>1){
                        me.isBuscadorProductoDiv = 1;
                    }

                    me.pagination = respuesta.pagination;                    
                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            setProducto(producto){
                this.isBuscadorProductoDiv = 0;
                this.listaProductos=[];            
                this.$emit("setProducto", producto);
                
            }
        }
    }
</script>

<style>
    .abrir-buscaprod{
        display: block !important;        
    }
</style>