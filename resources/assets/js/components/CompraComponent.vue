/<template>



    <main class="main">
        <!-- Loading -->
        <div style="display: none;" class="sbl-circ-ripple" :class="{'abrir-load-sbl' : isLoading}"></div>

        <!-- Breadcrumb -->
        <ol class="breadcrumb">
            <li class="breadcrumb-item">Home</li>
            <li class="breadcrumb-item">Compras</li>
            <li class="breadcrumb-item active">Ingresos</li>
        </ol>
        
         
        <div class="container-fluid">           
            <!-- Barra con botones de tareas -->
            <div class="card">
                <div class="card-header">
                    <i class="fa fa-align-justify"></i> Tareas:
                    <button type="button" class="btn btn-secondary" @click="showModal('compra','registrar')">
                        <i class="icon-plus"></i>&nbsp;Nuevo
                    </button>                    
                </div>   
            </div>
            
            <div class="card-body">

                <!-- Grid -->
                <table class="table table-bordered table-striped table-sm">
                    <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Folio</th>
                            <th>Proveedor</th>
                            <th>Referencia</th>
                            <th>Fecha</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="compra in listaCompras" :key="compra.id_compra">
                            <td>
                                <button type="button" class="btn btn-warning btn-sm" @click="showModal('compra','actualizar', compra)">
                                    <i class="icon-pencil"></i>
                                </button> &nbsp;
                                <template v-if="compra.xstatus">
                                    <button type="button" class="btn btn-danger btn-sm" @click="desactivar(compra.id_compra)">
                                        <i class="icon-trash"></i>
                                    </button>
                                </template>

                                <template v-else>
                                    <button type="button" class="btn btn-info btn-sm" @click="activar(compra.id_compra)">
                                        <i class="icon-check"></i>
                                    </button>
                                </template>
                            </td>
                            <td v-text="compra.folio"></td>
                            <td v-text="compra.proveedor"></td>
                            <td v-text="compra.referencia"></td>
                            <td v-text="compra.updated_at"></td>                            
                            <td>
                                <div v-if="compra.estatus=='REGISTRADO'">
                                    <span class="badge badge-warning">Registrado</span>
                                </div>
                                <div v-else-if="compra.estatus=='APLICADO'">
                                    <span class="badge badge-success">Aplicado</span>
                                </div>
                                <div v-else>
                                    <span class="badge badge-danger">Cancelado</span>
                                </div>

                            </td>
                        </tr>                            
                    </tbody>
                </table>
                <nav>
                    <ul class="pagination">
                        <li class="page-item" v-if="pagination.current_page > 1">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page-1)">Ant</a>
                        </li>
                        <li class="page-item" v-for="page in pagesNumber" :key="page" :class="[page == isActived ? 'active' : '']">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(page)" v-text="page"></a>
                        </li>                           
                        <li class="page-item" v-if="pagination.current_page < pagination.last_page">
                            <a class="page-link" href="#" @click.prevent="cambiarPagina(pagination.current_page+1)">Sig</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
            
    
        <!--Inicio del modal agregar/actualizar-->
        <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;" aria-hidden="true" :class="{'mostrar' : modalCompras.modal}">
            <div class="modal-dialog modal-primary modal-lg" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" v-text="modalCompras.tituloModal"></h4>
                        <button type="button" class="close" aria-label="Close" @click="closeModal();">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <upload-component ref="adjuntos"></upload-component>
                        
                        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                        
                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Folio</label>
                                <div class="col-md-5">
                                    <input type="text" class="form-control" placeholder="Folio de la compra" v-model="oCompra.folio">                                    
                                </div>
                                <div class="col-md-4">
                                    <div v-if="oCompra.estatus=='REGISTRADO'">
                                        <span class="badge badge-warning">Registrado</span>
                                    </div>
                                    <div v-else-if="oCompra.estatus=='APLICADO'">
                                        <span class="badge badge-success">Aplicado</span>
                                    </div>
                                    <div v-else>
                                        <span class="badge badge-danger">Cancelado</span>
                                    </div>                                    
                                </div>
                            </div>

                            <div class="form-group row">
                                <label class="col-md-3 form-control-label" for="text-input">Proveedor</label>
                                <div class="col-md-5">                                    
                                    <select class="form-control" v-model="oProveedor.selectProveedor">
                                        <option value="0" disabled>Seleccione...</option>
                                        <option v-for="proveedor in oProveedor.listaProveedor" :key="proveedor.id_proveedor" v-bind:value="{ id_proveedor: proveedor.id_proveedor, nombre: proveedor.nombre, nombre_corto: proveedor.nombre_corto, pagina_web: proveedor.pagina_web }">
                                            {{ proveedor.nombre }}
                                        </option>
                                    </select>          
                                </div>
                                <div class="col-md-4">                                    
                                    <input type="text" class="form-control" placeholder="Referencia proveedor" v-model="oCompra.referencia_proveedor">                                    
                                </div>
                            </div>

                    

                            <div v-show="modalCompras.error" class="form-group row div-error">
                                <div class="text-center text-error">
                                    <div v-for="error in modalCompras.erroresMsjList" :key="error" v-text="error"></div>
                                </div>
                            </div>

                            <div class="col-md-12" v-if="oCompra.estatus=='REGISTRADO'">
                                <buscador-producto-component @setProducto="getProduccionSeleccion" ></buscador-producto-component> 
                            </div>
                            <div class="form-group row">                                                            
                                <div class="col-md-12">
                                    <div class="card">                                    
                                        <ul class="list-group list-group-flush pre-scrollable">
                                            <li class="list-group-item">
                                                <div class="row">                 
                                                    <div class="col-6">
                                                        Producto                                                    
                                                    </div>
                                                    <div class="col-2">
                                                        Cantidad
                                                    </div>
                                                    <div class="col-2">
                                                        Precio
                                                    </div>
                                                    <div class="col-2">
                                                        Sub Total
                                                    </div>
                                                                
                                                </div>
                                            </li>
                                            <div v-for="detaCompra in listaDetalleCompra" :key="detaCompra.producto.id_producto"> 
                                            <li class="list-group-item"  v-if="detaCompra.xstatus!=0">

                                                <div class="row">           
                                                    <div class="col-1">
                                                        <button type="button" class="btn btn-danger btn-sm" @click="onEliminaDetaProd(detaCompra)">
                                                        <i class="icon-trash"></i>
                                                        </button>
                                                    </div>      
                                                    <div class="col-1">                                                        
                                                        <img :src="detaCompra.producto.url_imagen" alt="dog" width="50" height="50"> 
                                                    </div>
                                                    <div class="col-4">
                                                        <small v-text="detaCompra.producto.nombre"></small>
                                                        <small class="text-muted" v-text="detaCompra.producto.codigo"></small>
                                                    </div>
                                                    <div class="col-2">
                                                        <input type="text" class="form-control" v-model="detaCompra.cantidad" @keyup="onCalculaSubtotalDetaCom(detaCompra)">                                    
                                                    </div>
                                                    <div class="col-2">
                                                        <input type="text" class="form-control" v-model="detaCompra.precio" @keyup="onCalculaSubtotalDetaCom(detaCompra)">                                    
                                                    </div>
                                                    <div class="col-2">
                                                        <h5 v-text="detaCompra.strSubtotal" align="right"></h5>                                                        
                                                    </div>
                                                                
                                                </div>
                                            </li>
                                            </div>
                                            <li class="list-group-item">
                                                <div class="row">                 
                                                    <div class="col-6">
                                                                                                            
                                                    </div>
                                                    <div class="col-2">
                                                        <h3 v-text="resumenCompra.cantidad" align="center"></h3>
                                                    </div>                                                    
                                                    <div class="col-4">
                                                        <h3 v-text="resumenCompra.total" align="right"></h3>
                                                    </div>
                                                                
                                                </div>
                                            </li>        

                                        </ul>
                                    </div>                                    
                                </div>
                            </div>

                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" v-if="modalCompras.activaAplicar==1" @click="onAplicar();">Aplicar</button>
                        <button type="button" class="btn btn-secondary" @click="closeModal();">Cerrar</button>                        
                        <button type="button" class="btn btn-primary" v-if="modalCompras.tipoAccion==1" @click="registrar();">Guardar</button>
                        <button type="button" class="btn btn-primary" v-if="modalCompras.tipoAccion==2" @click="actualizar();">Actualizar</button>
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
    export default {
        data(){
            return{               
                oCompra: {
                    id_compra: 0,                    
                    id_proveedor: '',
                    folio: '',
                    referencia_proveedor: '',
                    id_carpeta_adjuntos: 0,
                    xstatus : 0
                },
                resumenCompra:{
                    cantidad: 0,
                    total: 0
                },             
                listaDetalleCompra:[],
                listaCompras: [],
                oProveedor:{
                    selectProveedor:'',                    
                    listaProveedor: []                    
                },
                modalCompras: {
                    modal: 0,
                    tituloModal: '',
                    tipoAccion: 0,
                    activaAplicar: 0,
                    error: 0,
                    erroresMsjList: [],
                },
                pagination: {
                    total : 0,
                    current_page  : 0,
                    per_page : 0,
                    last_page : 0,
                    from : 0,
                    to : 0                    
                },
                isLoading: 0
            }
        },
        computed:{
            isActived: function(){
                return this.pagination.current_page;
            },
            pagesNumber: function(){
               return  paginador.getPagesNumber(this.pagination);                
            }
        },
        methods:{
            listar(page, aplLoading=false){

                if(aplLoading){
                    this.isLoading = 1;
                }

                let me=this;                
                let url= '/zicandi/public/compras?page=' + page;
                axios.get(url)
                .then(function (response) {                    
                    let respuesta = response.data;  
                    me.isLoading = 0;
                    me.listaCompras = respuesta.compras.data;
                    me.pagination = respuesta.pagination;                    
                })
                .catch(function (error) {                    
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            //~Aber modal
            showModal(modelo, accion, data=[]){
                switch(modelo){
                    case 'compra':
                    {
                        switch(accion){
                            case 'registrar':
                            {                                                                
                                this.modalCompras.modal = 1;                                 

                                this.listaDetalleCompra=[];
                                this.oProveedor.selectProveedor= '';
                                this.oProveedor.listaProveedor= [];
                                this.resumenCompra.cantidad = 0;
                                this.resumenCompra.total = 0;                                

                                this.oCompra.id_compra = 0;
                                this.oCompra.id_proveedor = 0;
                                this.oCompra.folio = '';
                                this.oCompra.referencia_proveedor = '';
                                this.oCompra.id_carpeta_adjuntos = 0;
                                this.oCompra.estatus = 'REGISTRADO';
                                this.modalCompras.tituloModal = 'Registrar nueva Compra';
                                this.modalCompras.tipoAccion = 1;

                                //~Carga documentos adjuntos
                                this.onCargaComponenteUpload();
                                this.selectProveedor(null);
                                this.seqFolioCompraNextval();
                                
                                break;
                            }
                            case 'actualizar':
                            {
                                this.modalCompras.modal = 1;                            
                                this.oCompra.id_compra =data['id_compra'];
                                this.oCompra.estatus =data['estatus'];                            
                                this.modalCompras.tituloModal = 'Actualizar compra'

                                if(this.oCompra.estatus!="REGISTRADO"){
                                    this.modalCompras.tipoAccion = 0;
                                }else{
                                    this.modalCompras.tipoAccion = 2;
                                }

                                //~Obtiene el detalle de la compra
                                this.getDetalleCompra();                                                                                                
                            }
                        }
                    }
                }
            },
            closeModal(){
                this.modalCompras.modal = 0;                
                this.ubicacion = '';
                this.nota = '';                
                this.modalCompras.tituloModal = '';
            },
            onCargaComponenteUpload(){
                if(this.oCompra.id_carpeta_adjuntos==0 || this.oCompra.id_carpeta_adjuntos==null){
                    let me = this;                    
                    axios.post('/zicandi/public/uploadfile/nuevaCarpeta',{
                        'nombre': 'carpeta_compra'                   
                    })
                    .then(function (response) {                                                                
                        console.log(response);

                        me.oCompra.id_carpeta_adjuntos=response.data;
                        me.$refs.adjuntos.onLoadAdjuntos(me.oCompra.id_carpeta_adjuntos);
                    })
                    .catch(function (error) {                               
                        util.MSG('Algo salio Mal','Error al crear la carpeta: '.util.getErrorMensaje(error), util.tipoErr);
                    });
                }else{
                    this.$refs.adjuntos.onLoadAdjuntos(this.oCompra.id_carpeta_adjuntos);
                }
                
            },
            selectProveedor(id_proveedor){                
                let me=this;                
                var url= '/zicandi/public/proveedores/selectProveedor';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.oProveedor.listaProveedor = respuesta.proveedores;  
                    
                    if(id_proveedor!=null){
                        for(let i=0; i<respuesta.proveedores.length; i++){
                            if(id_proveedor == respuesta.proveedores[i].id_proveedor){
                                me.oProveedor.selectProveedor = respuesta.proveedores[i];
                            }
                        }
                    }
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            seqFolioCompraNextval(){                
                let me=this;                
                var url= '/zicandi/public/parametria/seqFolioCompra_nextval';
                axios.get(url)
                .then(function (response) {                    
                    var respuesta = response.data;  

                    me.oCompra.folio = respuesta;                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            getProduccionSeleccion(producto){
                
                var detalleCompra = {
                    id_deta_compra: 0,
                    id_compra: 0,
                    id_producto: 0,
                    producto: producto,
                    cantidad: 0,
                    precio: 0,
                    id_movimiento_producto: 0,
                    xstatus: 1,
                    subtotal: 0,
                    strSubtotal: '0.00'
                };

                this.listaDetalleCompra.push(detalleCompra);                
            },
            toMoneda(valor){
                let val = (valor/1).toFixed(2).replace(',', '.');        
                return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
            onCalculaSubtotalDetaCom(detaCompra){                
                detaCompra.subtotal = detaCompra.cantidad * detaCompra.precio;                
                detaCompra.strSubtotal = this.toMoneda(detaCompra.subtotal);

                let cantidadTotal = 0;
                let total = 0;

                for(let i=0; i<this.listaDetalleCompra.length; i++){
                    let compra = this.listaDetalleCompra[i];
                    
                    if(compra.xstatus!=0){
                        let cantidad = compra.cantidad;
                        let subtotal = compra.subtotal;

                        cantidadTotal+=parseFloat(cantidad);
                        total+=parseFloat(subtotal);
                    }
                }
                
                this.resumenCompra.cantidad = cantidadTotal;
                this.resumenCompra.total = this.toMoneda(total);

                this.modalCompras.activaAplicar = 0;
            },
            getDetalleCompra(){                
                let me=this;                
                var url= '/zicandi/public/compras/detalle';
                me.isLoading = 1;
                axios.post(url,{
                    'id_compra': this.oCompra.id_compra
                })
                .then(function (response) {              
                    let resp = response.data;
                                                            
                    me.oCompra.id_proveedor = resp.compra.id_proveedor;
                    me.oCompra.folio = resp.compra.folio;
                    me.oCompra.referencia_proveedor = resp.compra.referencia_proveedor;
                    me.oCompra.id_carpeta_adjuntos = resp.compra.id_carpeta_adjuntos
                    me.oCompra.estatus = resp.compra.estatus;

                    //~Carga documentos adjuntos
                    me.onCargaComponenteUpload();

                    //~Selecciona proveedor
                    me.selectProveedor(resp.compra.id_proveedor);      
                    
                    //~Detalle de la compra
                    me.listaDetalleCompra=resp.detalle; 
                    
                    //~Calculos
                    for(let i=0; i<me.listaDetalleCompra.length; i++){                        
                        me.onCalculaSubtotalDetaCom(me.listaDetalleCompra[i]);
                    }
                    
                    me.modalCompras.activaAplicar = 1;   
                    me.isLoading = 0;                                        
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });                
            },
            registrar(){
                if(this.validarAlmacen()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/compras/registrar',{
                    'folio': this.oCompra.folio,
                    'id_proveedor': this.oProveedor.selectProveedor.id_proveedor,
                    'referencia_proveedor':   this.oCompra.referencia_proveedor,
                    'id_carpeta_adjuntos':   this.oCompra.id_carpeta_adjuntos,
                    'listaDetalleCompra': this.listaDetalleCompra
                })
                .then(function (response) {      
                    let resp = response.data;

                    me.isLoading = 0;                    
                    util.AVISO('Perfecto, registro correcto', util.tipoOk);

                    me.modalCompras.activaAplicar = 1;
                    me.oCompra.id_compra =resp.compra.id_compra;
                    me.oCompra.estatus =resp.compra.estatus;                
                    me.modalCompras.tituloModal = 'Actualizar compra';
                    me.modalCompras.tipoAccion = 2;

                    me.listar(1);                    
                })
                .catch(function (error) {       
                    me.isLoading = 0;             
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            onAplicar(){
                let total = this.resumenCompra.total;

                util.MSG_SI_NO('Deseas aplicar la compra?','Monto de la transaccion: '+total,util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/mf2/liquidarCompra',{
                            'id_compra': this.oCompra.id_compra
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            console.log(response);
                            me.oCompra.estatus='APLICADO';
                            me.modalCompras.activaAplicar = 0;
                            me.modalCompras.tipoAccion = 0;
                            util.AVISO('La compra se aplico correctamente!!!', util.tipoOk);                                       
                            me.listar(1); 
                            
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });         
            },
            onEliminaDetaProd(detaCompra){                
                detaCompra.xstatus=0;
                this.onCalculaSubtotalDetaCom(detaCompra);
            },
            actualizar(){
                if(this.validarAlmacen()){
                    return;
                }

                let me = this;
                this.isLoading = 1;
                axios.post('/zicandi/public/compras/actualizar',{
                    'id_compra': this.oCompra.id_compra,
                    'folio': this.oCompra.folio,
                    'id_proveedor': this.oProveedor.selectProveedor.id_proveedor,
                    'referencia_proveedor':   this.oCompra.referencia_proveedor,
                    'listaDetalleCompra': this.listaDetalleCompra
                })
                .then(function (response) {                                        
                    me.isLoading = 0;
                    util.AVISO('Actualizacion correcta!', util.tipoOk);                
                    me.modalCompras.activaAplicar = 1;

                    me.listar(me.pagination.current_page);
                })
                .catch(function (error) {
                    me.isLoading = 0;
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },
            validarAlmacen(){
                this.modalCompras.error = 0;
                this.modalCompras.erroresMsjList = [];

                if(!this.oCompra.folio) this.modalCompras.erroresMsjList.push("Se requiere el folio de la compra");
                if(!this.oProveedor.selectProveedor.id_proveedor) this.modalCompras.erroresMsjList.push("Se requiere elegir el proveedor");
                

                let totalDetalleReg = 0;
                let bandCantidad = false;
                let bandPrecio = false;
                for(let i=0; i<this.listaDetalleCompra.length; i++){
                    let compra = this.listaDetalleCompra[i];

                    if(compra.xstatus!=0){
                        totalDetalleReg++;

                        if(compra.cantidad == null || compra.cantidad <=0){
                            bandCantidad=true;
                        }
                        if(compra.precio == null || compra.precio <=0){
                            bandPrecio=true;
                        }
                    }
                }

                if(totalDetalleReg==0) this.modalCompras.erroresMsjList.push("No hay detalle de la compra");
                if(bandCantidad) this.modalCompras.erroresMsjList.push("Hay productos sin cantidad, no puede ser cero o negativo");
                if(bandPrecio) this.modalCompras.erroresMsjList.push("Hay productos sin precio, no puede ser cero o negativo");

                
                if(this.modalCompras.erroresMsjList.length) this.modalCompras.error = 1;

                return this.modalCompras.error;
            },
            cambiarPagina(page){
                let me = this;

                me.pagination.current_page = page;

                me.listar(page, true);
            },











            desactivar(id_almacen){     
                util.MSG_SI_NO('Deseas desactivarlo','No podras usarlo...',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/almacenes/desactivar',{
                            'id_almacen': id_almacen
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Desactivado!!!', util.tipoOk);                                       
                            me.listar(me.pagination.current_page);
                        })
                        .catch(function (error) {
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });                                               

            },
            activar(id_almacen){
                util.MSG_SI_NO('Deseas activarlo','Mientras no lo actives no estara disponible para usarse',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        this.isLoading = 1;
                        let me = this;

                        axios.post('/zicandi/public/almacenes/activar',{
                            'id_almacen': id_almacen
                        })
                        .then(function (response) {
                            me.isLoading = 0;
                            util.AVISO('Activado!!!', util.tipoOk);                    
                            me.listar(me.pagination.current_page);
                        })
                        .catch(function (error) {                            
                            me.isLoading = 0;
                            util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                        });

                    }

                });               
            }
                              
        },
        mounted() {
            this.listar(1, true);
        }
    }
</script>