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

        return $_SERVER["HTTP_REFERER"].$this->creaImagen("mini_prod_", $nombre_archivo, $base64_string, $repositorio, 100, 100, true);
        
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

        return $this->creaImagen("mini_prod_c_", $nombre_archivo, $base64_string, $repositorio, 100, 100, true);
        
    }

    public function publicaImagen250($configImagen){           
        $repositorio = Config::get('zicandi.repositorio.entrada.producto_mini');
        
        $base64_string = $configImagen['b64'];
        $nombre_archivo = $configImagen['nombre'];

        return $this->creaImagen("medio_prod_", $nombre_archivo, $base64_string, $repositorio, 250, 250, true);        
    }


    /**
     * Guarda las imagenes de better original
     * 
     * 
     */
    public function publicaImagenRespBett($configImagen){           
        $repositorio = Config::get('zicandi.repositorio.entrada.bettimg');
        
        $base64_string = $configImagen['b64'];
        $nombre_archivo = $configImagen['nombre'];

        return $this->creaImagen("original_", $nombre_archivo, $base64_string, $repositorio, 0, 0, false);
        
    }

    /**
     * Guarda las imagenes de better 100px
     * 
     * 
     */
    public function publicaImagenMini100Bett($configImagen){ 
        try{
            
            $repositorio = Config::get('zicandi.repositorio.entrada.producto_mini');
        
            $base64_string = $configImagen['b64'];
            $nombre_archivo = $configImagen['nombre'];

            return $this->creaImagen("mini_prod_c_", $nombre_archivo, $base64_string, $repositorio, 100, 100, false);

        }catch(\Exception $e){
            
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
        

        
        
    }

    /**
     * 
     * 
     * 
     */
    private function creaImagen($prefijo, $nombre_archivo, $base64_string, $destino, $ancho, $alto, $isNombreAuto){        
        $tmp = Config::get('zicandi.repositorio.img.tmp');

        if($isNombreAuto){
            $nombreDestino = $this->calcNombreImage($prefijo, $nombre_archivo);
        }else{
            $nombreDestino = $prefijo.$nombre_archivo;
        }


        $file = fopen( $tmp.$nombre_archivo, "wb");

        $data = explode(',', $base64_string);

        if(count($data)>1){
            fwrite($file, base64_decode($data[1]));
        }else{
            fwrite($file, base64_decode($base64_string));
        }

        fclose($file);
    
        if($ancho!=0 && $alto!=0){
            $imagen_optimizada = $this->redimensionar_imagen($nombre_archivo, $tmp.$nombre_archivo,$ancho,$alto);
            imagejpeg($imagen_optimizada, $destino.$nombreDestino);
        }else{
            copy($tmp.$nombre_archivo, $destino.$nombreDestino);
        }
        
        unlink($tmp.$nombre_archivo);
        

        return $destino.$nombreDestino;
        
    }


    /**
     * Recorta una imagen
     */
    private function redimensionar_imagen($nombreimg, $rutaimg, $xmax, $ymax){  
        $ext = explode(".", $nombreimg);  
        $ext = $ext[count($ext)-1];  
        try{
            ini_set('memory_limit', -1);

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


            ini_restore('memory_limit');
            return $img2;   
        
        }catch(\Exception $e){
                
            return [ 'xstatus'=>false, 'error' => $e->getMessage() ];
        }
          
        
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

    /***
     * Publica imagen mini proyecto metricas
     * 
     * 
     * 
     */
    public function publicaImagenMiniMetrica($configImagen){           
        $repositorio = Config::get('zicandi.repositorio.entrada.metricas');

        
        
        $base64_string = $configImagen['b64'];
        $nombre_archivo = $configImagen['nombre'];

        return $_SERVER["HTTP_REFERER"].$this->creaImagen("mini_metrica_", $nombre_archivo, $base64_string, $repositorio, 200, 200, true);
        
    }


    public function creaGraficaPlanaMetricas($arrValores, $nombre, $tipo){
        $Values=$arrValores;
            
        $imgWidth=500;
        $imgHeight=200;
        $grid=25;
        $graphspacing=0.05;

        $max = 0;
        foreach ($Values as $key => $val) { 
            if($val>$max){
                $max=$val;
            }
            } 

        
        for ($i=0; $i<count($Values); $i++){
            $graphValues[$i] = $Values[$i] * (($imgHeight*(1-$graphspacing))/$max);
        }
        
        // use imagecreatetruecolor instead of imagecreate
        $image=imagecreatetruecolor($imgWidth, $imgHeight);
        
        // added antialiasing
        imageantialias($image, true);
        
        // had to force a white bg
        $bgColor = imagecolorallocate($image, 255, 255, 255);
        imagefill($image , 0,0 , $bgColor);
        
        $colorWhite=imagecolorallocate($image, 255, 255, 255);
        $colorGrey=imagecolorallocate($image, 192, 192, 192);
        $colorBlue=imagecolorallocate($image, 0, 0, 255);
        $colorAmarillo=imagecolorallocate($image, 228, 92, 27);
        
        imageline($image, 0, 0, 0, $imgHeight, $colorGrey);
        imageline($image, 0, 0, $imgWidth, 0, $colorGrey);
        imageline($image, $imgWidth-1, 0, $imgWidth-1, $imgHeight-1, $colorGrey);
        imageline($image, 0, $imgHeight-1, $imgWidth-1, $imgHeight-1, $colorGrey);
        
        // Create grid
        for ($i=1; $i<($imgWidth/$grid); $i++) {
            imageline($image, $i*$grid, 0, $i*$grid, $imgHeight, $colorGrey);
        }
        for ($i=1; $i<($imgHeight/$grid); $i++) {
            imageline($image, 0, $i*$grid, $imgWidth, $i*$grid, $colorGrey);
        }
        
        if($imgWidth/$grid>count($graphValues)){ 
            $space=$grid; 
        } else { 
            $space = $imgWidth/(count($graphValues)-1);
        }
        
        for ($i=0; $i<count($graphValues)-1; $i++) {
            $this->imagelinethick($image, $i*$space, ($imgHeight-$graphValues[$i]), ($i+1)*$space, ($imgHeight-$graphValues[$i+1]), ($tipo=="VENTA" ? $colorBlue : $colorAmarillo), 3);
        }

        $repositorioImg = Config::get('zicandi.repositorio.entrada.grafico_metricas').$nombre.".jpg";

        imagejpeg($image, $repositorioImg);
        imagedestroy($image);

        return Config::get('zicandi.url_public').$repositorioImg;
    }

    function imagelinethick($imagen, $x1, $y1, $x2, $y2, $color, $grueso = 1){
        /* esta forma funciona bien sólo para líneas ortogonales
        imagesetthickness($imagen, $grueso);
        return imageline($imagen, $x1, $y1, $x2, $y2, $color);
        */
        if ($grueso == 1) {
            return imageline($imagen, $x1, $y1, $x2, $y2, $color);
        }
        $t = $grueso / 2 - 0.5;
        if ($x1 == $x2 || $y1 == $y2) {
            return imagefilledrectangle($imagen, round(min($x1, $x2) - $t), round(min($y1, $y2) - $t), round(max($x1, $x2) + $t), round(max($y1, $y2) + $t), $color);
        }
        $k = ($y2 - $y1) / ($x2 - $x1); //y = kx + q
        $a = $t / sqrt(1 + pow($k, 2));
        $puntos = array(
            round($x1 - (1+$k)*$a), round($y1 + (1-$k)*$a),
            round($x1 - (1-$k)*$a), round($y1 - (1+$k)*$a),
            round($x2 + (1+$k)*$a), round($y2 - (1-$k)*$a),
            round($x2 + (1-$k)*$a), round($y2 + (1+$k)*$a),
        );
        imagefilledpolygon($imagen, $puntos, 4, $color);
        return imagepolygon($imagen, $puntos, 4, $color);
    }
}
