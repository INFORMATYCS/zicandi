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
                        <a class="nav-link" @click="setActive('profile')" :class="{ active: isActive('profile') }" href="#profile">Crea BAT</a>
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

                                        <div class="custom-file">
                                                    <input type="file" class="custom-file-input" id="customFileLang" lang="es" @change="onFileSelected" multiple>                                   
                                            </div>
                                        <label class="btn btn-primary" for="customFileLang">Subir archivo</label>

                                        
                                        
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="tab-pane fade" :class="{ 'active show': isActive('profile') }" id="profile">Profile content</div>
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

                
                isLoading: 0,

                oUploadFile:{
                    selectedFile: null,                    
                    id_carpeta_adjuntos: 0
                },
                
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
            },

            onFileSelected(event){                
                //console.log(event.target.files)
                for(let i=0; i<event.target.files.length; i++){
                    this.oUploadFile.selectedFile = event.target.files[i];

                    //~Sube inmediatamente el archivo
                    this.onUploadFile();
                }
            },

            onUploadFile(){
                this.oUploadFile.progreso = 0;
                

                const fd = new FormData();

                let size = (this.oUploadFile.selectedFile.size  / 1024)/ 1024;                
                if(size > 20){                    
                    util.MSG('Algo salio Mal!','No se permiten archivos mayores a 20M', util.tipoErr);
                    this.oUploadFile.bandProgress=0;
                }else{
                    this.oUploadFile.bandProgress=1;

                    fd.append('file', this.oUploadFile.selectedFile, this.oUploadFile.selectedFile.name);
                    fd.append('id_carpeta_adjuntos', this.oUploadFile.id_carpeta_adjuntos);
                    fd.append('nombre', this.oUploadFile.selectedFile.name);

                    let me = this;
                    axios.post('/zicandi/public/uploadfile', fd, {
                        onUploadProgress: uploadEvent => {
                            me.oUploadFile.progreso = Math.round(uploadEvent.loaded / uploadEvent.total * 100);                            
                        }
                    })
                    .then(function (response) {                                            
                        me.oUploadFile.bandProgress=0;

                        me.onLoadAdjuntos(me.oUploadFile.id_carpeta_adjuntos);
                    })
                    .catch(function (error) {       
                        util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                    });
                }
            },
            
        },
        mounted() {
            
        }
    }
</script>