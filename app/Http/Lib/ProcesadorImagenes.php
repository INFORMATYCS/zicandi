<?php

namespace App\Http\Lib;
use Config;

class ProcesadorImagenes{


    /**
     * 
     * 
     * 
     */
    public function publicaImagenMini100($configImagen){           
        $repositorio = Config::get('zicandi.repositorio.entrada.producto_mini');

        
        
        $base64_string = $configImagen['b64'];
        $nombre_archivo = $configImagen['nombre'];

        return $_SERVER["HTTP_REFERER"].$this->creaImagen("mini_prod_", $nombre_archivo, $base64_string, $repositorio, 100, 100);
        
    }

    /**
     * 
     * 
     * 
     */
    public function publicaImagenMini100C($configImagen){           
        $repositorio = Config::get('zicandi.repositorio.entrada.producto_mini');
        
        $base64_string = $configImagen['b64'];
        $nombre_archivo = $configImagen['nombre'];

        return $this->creaImagen("mini_prod_c_", $nombre_archivo, $base64_string, $repositorio, 100, 100);
        
    }

    public function publicaImagen250($configImagen){           
        $repositorio = Config::get('zicandi.repositorio.entrada.producto_mini');
        
        $base64_string = $configImagen['b64'];
        $nombre_archivo = $configImagen['nombre'];

        return $this->creaImagen("medio_prod_", $nombre_archivo, $base64_string, $repositorio, 250, 250);        
    }

    /**
     * 
     * 
     * 
     */
    private function creaImagen($prefijo, $nombre_archivo, $base64_string, $destino, $ancho, $alto){
        $tmp = Config::get('zicandi.repositorio.img.tmp');

        $nombreDestino = $this->calcNombreImage($prefijo, $nombre_archivo);

        $file = fopen( $tmp.$nombre_archivo, "wb");

        $data = explode(',', $base64_string);

        if(count($data)>1){
            fwrite($file, base64_decode($data[1]));
        }else{
            fwrite($file, base64_decode($base64_string));
        }

        fclose($file);
    
        $imagen_optimizada = $this->redimensionar_imagen($nombre_archivo, $tmp.$nombre_archivo,$ancho,$alto);
        
        imagejpeg($imagen_optimizada, $destino.$nombreDestino);

        return $destino.$nombreDestino;
    }


    /**
     * Recorta una imagen
     */
    private function redimensionar_imagen($nombreimg, $rutaimg, $xmax, $ymax){  
        $ext = explode(".", $nombreimg);  
        $ext = $ext[count($ext)-1];  
      
        if($ext == "jpg" || $ext == "jpeg")  
            $imagen = imagecreatefromjpeg($rutaimg);  
        elseif($ext == "png")  
            $imagen = imagecreatefrompng($rutaimg);  
        elseif($ext == "gif")  
            $imagen = imagecreatefromgif($rutaimg);  
          
        $x = imagesx($imagen);  
        $y = imagesy($imagen);  
          
        if($x <= $xmax && $y <= $ymax){            
            return $imagen;  
        }
      
        if($x >= $y) {  
            $nuevax = $xmax;  
            $nuevay = $nuevax * $y / $x;  
        }  
        else {  
            $nuevay = $ymax;  
            $nuevax = $x / $y * $nuevay;  
        }  
          
        $img2 = imagecreatetruecolor($nuevax, $nuevay);  
        imagecopyresized($img2, $imagen, 0, 0, 0, 0, floor($nuevax), floor($nuevay), $x, $y);          
        return $img2;   
    }


    /**
     * Crea un nombre de archivo unico
     * 
     */
    private function calcNombreImage($prefijo, $imgNombre){
        $ext = explode(".", $imgNombre);  
        $ext = $ext[count($ext)-1];  

        $nombreArchivoSalida = $prefijo.uniqid().".".$ext;

        return $nombreArchivoSalida;
    }


    public function publicaDocumento($prefijo, $file){        
        $repositorio = Config::get('zicandi.repositorio.entrada.adjuntos');
        
        //File Name
        $nombre = $file->getClientOriginalName();

        //Display File Extension
        $extension = $file->getClientOriginalExtension();

        //Display File Real Path
        //$file->getRealPath();

        //Display File Size
        //$file->getSize();

        //Display File Mime Type
        //$file->getMimeType();

        //~Crear el nuevo directorio
        $carpeta = $repositorio.$prefijo;
        if (!file_exists($carpeta)) {
            mkdir($carpeta, 0777, true);
        }

        //Move Uploaded File
        $destinationPath = $carpeta;
        $nombreSalida = $prefijo."_".uniqid().".".$extension;
        $file->move($destinationPath,$nombreSalida);

        return $destinationPath."/".$nombreSalida;
    }
}
