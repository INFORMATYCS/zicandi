<template>
    <main>


        <form action="" method="post" enctype="multipart/form-data" class="form-horizontal">
                            
            <div class="form-group row">                                
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <div class="row">
                            <div class="col-9">
                                Archivos adjuntos 
                                <p>
                                <small class="text-muted">Control+V para pegar de portapapeles</small>
                                </p>
                            </div>
                            <div class="col-3" >
                                <label class="btn btn-primary" @click="onBorrarSeleccion"><i class="icon-trash"></i></label>
                                <label class="btn btn-primary" @click="onMostrarFrame"><i class="icon-frame"></i></label>
                                <label class="btn btn-primary custom-file-label" for="customFileLang">+</label>

                                
                            </div>           
                            </div>                 
                        </div>
                        <div class="card-body" style="display: none;" :class="{'mostrarFrame' : bandFrameView}">
                            <ul style="column-count:3">
                                                         
                                    <div class="form-check" v-for="adjunto in listaAdjuntos" :key="adjunto.id_archivo_adjunto">
                                        <input type="checkbox" class="form-check-input" v-model="adjunto.checked" :value="adjunto.id_archivo_adjunto">
                                        <a v-bind:href="''+adjunto.path+''" target="_blank" ><span v-text="adjunto.nombre"></span></a>                                        
                                    </div>

                            </ul>
     
                            <div class="custom-file" style="display: none;">
                                    <input type="file" class="custom-file-input" id="customFileLang" lang="es" @change="onFileSelected" multiple>                                   
                            </div>
                            

                            <div class="progress" style="display: none;" :class="{'mostrarProgreso' : oUploadFile.bandProgress}" >
                                <div class="progress-bar" role="progressbar" :style="{'width': `${oUploadFile.progreso}%`}" :aria-valuenow="oUploadFile.progreso" aria-valuemin="0" aria-valuemax="100"></div>                            
                            </div>

                                                        
                        </div>

                        
                    </div>
                </div>
            </div>
        </form>

    </main>    
</template>

<script>
    export default {
        data(){
            return{               
                
                oUploadFile:{
                    selectedFile: null,
                    progreso: 0,
                    bandProgress: 0,
                    id_carpeta_adjuntos: 0
                },

                listaAdjuntos: [],

                bandFrameView: 0,

                b64ImagenPP: '',
                bandPortapapeles: false
            }
        },        
        computed:{
            
        },
        methods:{
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
                    
                    let nombreArchivo = this.oUploadFile.selectedFile.name;

                    //~Si la imagen es de portapapeles se reasigna el nombre al azar
                    if(nombreArchivo=="image.png" && this.bandPortapapeles){
                        nombreArchivo = "portapapeles.png";
                    }

                    fd.append('file', this.oUploadFile.selectedFile, nombreArchivo);
                    fd.append('id_carpeta_adjuntos', this.oUploadFile.id_carpeta_adjuntos);
                    fd.append('nombre', nombreArchivo);

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

            onLoadAdjuntos(id){
                this.oUploadFile.id_carpeta_adjuntos = id;
                console.log(id);

                this.onPegarPortapapeles(); 
                let me=this;                
                let url= '/zicandi/public/uploadfile/getAdjuntosByCarpeta';
                
                axios.post(url,{
                    'id_carpeta_adjuntos': this.oUploadFile.id_carpeta_adjuntos
                })
                .then(function (response) {                    
                    let respuesta = response.data;                        
                    me.listaAdjuntos = respuesta.adjuntos;   
                    
                })
                .catch(function (error) {                                        
                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                });
            },

            onBorrarSeleccion(){
                util.MSG_SI_NO('Deseas borrar los selecionados','No podras deshacer ...',util.tipoPreg).
                then((result) => {
                    if(result==util.btnSi){
                        let auxListaAdjuntos = [];
                        
                        for(let i=0; i<this.listaAdjuntos.length; i++){
                            let adjunto = this.listaAdjuntos[i];

                            if(adjunto.checked == true){
                                console.log(adjunto.id_archivo_adjunto);

                                let me = this;

                                axios.post('/zicandi/public/uploadfile/delete',{
                                    'id_archivo_adjunto': adjunto.id_archivo_adjunto
                                })
                                .then(function (response) {                                    
                                    
                                })
                                .catch(function (error) {                                    
                                    util.MSG('Algo salio Mal!',util.getErrorMensaje(error), util.tipoErr);
                                });


                            }else{
                                auxListaAdjuntos.push(adjunto);
                            }

                        }

                        this.listaAdjuntos = auxListaAdjuntos;

                       
                    }

                });          
            },

            onMostrarFrame(){
                if(this.bandFrameView == 1){
                    this.bandFrameView = 0;
                }else{
                    this.bandFrameView = 1;
                }
            },

            onPegarPortapapeles(event){
                let me=this;  
                this.bandPortapapeles = false;               

                document.addEventListener('paste', function (event) {
                    let clipboardData = event.clipboardData || event.originalEvent.clipboardData || window.clipboardData;

                   for (let i = 0; i < event.clipboardData.items.length; i++) {

                        let clipboardItem = event.clipboardData.items[0];
                        let type = clipboardItem.type;

                        // Solo aplica para imagenes
                        if (type.indexOf("image") != -1) {
                            
                            let blob = clipboardItem.getAsFile();

                            let reader = new window.FileReader();
                            reader.readAsDataURL(blob);
                            
                            reader.onload = function () {                                
                                me.b64ImagenPP = reader.result;
                                me.bandPortapapeles = true;

                                Swal.fire({                                                                        
                                    html:
                                    '<img src="'+reader.result+'" width="200" height="200" style="border: 1px solid #0F67E8;">',
                                    showCloseButton: true,
                                    showCancelButton: true,
                                    focusConfirm: false,
                                    confirmButtonText:
                                    'Subir imagen',
                                    confirmButtonAriaLabel: 'Thumbs up, great!',
                                    cancelButtonText:
                                    'Cancelar',
                                    cancelButtonAriaLabel: 'Thumbs down'
                                }).then((result) => {       
                                    if(result.value==true){                                        
                                        me.oUploadFile.selectedFile = blob;                                           
                                        me.onUploadFile();
                                    }
                                                    
                                });


                            };
                            reader.onerror = function (error) {
                                console.log('Error: ', error);
                            };
                        }
                    }




                });
            }
        }
    }
</script>


<style>
    .mostrarProgreso{
        display: block !important;        
    }

    .mostrarFrame{
        display: block !important;        
    }
</style>