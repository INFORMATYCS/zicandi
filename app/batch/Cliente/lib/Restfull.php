<?php
class Restfull
    {
        public function sendPost($url, $data){
            //datos a enviar
            //$data = array("a" => "a");
            //url contra la que atacamos
            $ch = curl_init($url);
            //a true, obtendremos una respuesta de la url, en otro caso, 
            //true si es correcto, false si no lo es
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            //establecemos el verbo http que queremos utilizar para la petición
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
            //enviamos el array data
            curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
            //obtenemos la respuesta
            $response = curl_exec($ch);
            // Se cierra el recurso CURL y se liberan los recursos del sistema
            curl_close($ch);
            if(!$response) {
                return false;
            }else{
                return $response;
            }
        }

        

        public static function sendGet($url, $data=null){
            //datos a enviar
            //$data = array("a" => "a");
            //url contra la que atacamos
            if($data!=null){                            
                $url = $url.'?'.http_build_query($data);
            }
            
            $ch = curl_init($url);
            //a true, obtendremos una respuesta de la url, en otro caso, 
            //true si es correcto, false si no lo es
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            //establecemos el verbo http que queremos utilizar para la petición
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
            //enviamos el array data
            //curl_setopt($ch, CURLOPT_POSTFIELDS,http_build_query($data));
            //obtenemos la respuesta
            $response = curl_exec($ch);
            // Se cierra el recurso CURL y se liberan los recursos del sistema
            curl_close($ch);
            if(!$response) {
                return false;
            }else{
                return $response;
            }
        }

        

        public static function descargaFuente($path, $archivo){
            $origen = $path."?archivo=".$archivo;
			//echo $origen;
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $origen);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,3);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);
            $destino = "bin/".$archivo;
            $archivo = fopen($destino, "w+");
            fputs($archivo, $data);
            fclose($archivo);
        }
    }