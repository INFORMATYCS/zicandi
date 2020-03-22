var util = { 
        NOMBRE_APP: 'Zicandi - Eclipse',   
        tipoOk: 'success',
        tipoErr: 'error',
        tipoAdv: 'warning',
        tipoInf: 'info',
        tipoPreg: 'question',
        btnSi: 'si',
        btnNo: 'no',
        /**
         * Muestra mensaje generico
         * @param {*} titulo 
         * @param {*} mensaje 
         * @param {*} icono success error warning info question
         */
        MSG: function(titulo, mensaje, icono){
            Swal.fire(
                titulo,
                mensaje,
                icono
            );
        },
        /**
         * Muestra mensaje con botones de si y no
         * @param {*} titulo 
         * @param {*} mensaje 
         * @param {*} icono 
         * @param {*} botonSi 
         * @param {*} botonNo 
         */
        MSG_SI_NO: function(titulo, mensaje, icono, botonSi='Si, de acuerdo!', botonNo='No, cerrar'){
            let me = this;

            const promise = new Promise(function (resolve, reject) {
                            
                const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
                });


                swalWithBootstrapButtons.fire({
                    title: titulo,
                    text: mensaje,
                    icon: icono,
                    showCancelButton: true,
                    confirmButtonText: botonSi,
                    cancelButtonText: botonNo,
                    reverseButtons: true
                }).then((result) => {       
                    if(result.value==true){
                        resolve(me.btnSi);
                    }else if(result.dismiss=='cancel'){
                        resolve(me.btnNo);
                    }else{
                        resolve('cancel');
                    }
                                       
                });

                
            });

            return promise;  
        },

        /**
         * Muestra mensaje intermitente
         * @param {*} mensaje 
         * @param {*} icono 
         */
        AVISO: function(mensaje, icono){
            Swal.fire({
                position: 'top-end',
                icon: icono,
                title: mensaje,
                showConfirmButton: false,
                timer: 1000
              })
        },
    
        /**
         * Recupera el mensaje de error del objecto
         * @param {*} error 
         */
        getErrorMensaje(error){        
            let msgError = '';
            let codError = '';
        
            if(error.hasOwnProperty('response')){
                if(error.response.hasOwnProperty('data')){
                    if(error.response.data.hasOwnProperty('message')){
                        msgError+= error.response.data.message;                        
                    }
                }
            }else{
                msgError+= error;
            }

            if(error.hasOwnProperty('response')){
                if(error.response.hasOwnProperty('status')){                    
                    codError+= error.response.status;
                }
            }else{
                codError+= error;
            }
            
            
            if(codError!=''){
                if(codError.length<=5){
                    msgError= msgError + " (" + codError + ")";
                }
            }


            return msgError;
        }

};        