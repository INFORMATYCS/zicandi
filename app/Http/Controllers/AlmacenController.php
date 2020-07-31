<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Almacen;

class AlmacenController extends Controller{
    /**
     * Listar registros
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request){
       
        if(!$request->ajax())return redirect('/');


        $listaAlmacen = Almacen::orderBy('id_almacen','desc')->paginate(10);
       

        return [
            'pagination' => [
                'total'         => $listaAlmacen->total(),
                'current_page'         => $listaAlmacen->currentPage(),
                'per_page'         => $listaAlmacen->perPage(),
                'last_page'         => $listaAlmacen->lastPage(),
                'from'         => $listaAlmacen->firstItem(),
                'to'         => $listaAlmacen->lastItem()
            ],
            'almacen'=> $listaAlmacen
        ];
        
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $almacen = new Almacen();        
        $almacen->nombre = $request->nombre;
        $almacen->ubicacion = $request->ubicacion;
        $almacen->nota = $request->nota;
        $almacen->xstatus ='1';

        $almacen->save();



    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request){
                
        /*$almacen = Almacen::findOrFail($request->id_almacen);//~Se busca en base al ID entrante
        $almacen->nombre = $request->nombre;
        $almacen->ubicacion = $request->ubicacion;
        $almacen->nota = $request->nota;
        $almacen->xstatus ='1';

        $almacen->save();
        */

        /*$root = $this->get("https://tendencias.mercadolibre.com.mx/");

        $salida = $this->procesador($root);
        

        abort(585, 'El nombre del proveedor no puede ser zicandi');
        */
    
        $handle = curl_init();
	 
	//$url = "https://api.mercadolibre.com/sites/MLM/search?category=MLM1574";
        $url = "https://api.mercadolibre.com/sites/MLM/categories";
        $url = "https://api.mercadolibre.com/categories/MLM1574";	
        $url = "https://api.mercadolibre.com/categories/MLM1631";	
        
        $url = "https://api.mercadolibre.com/categories/MLM188288";	
        
        $url = "https://api.mercadolibre.com/sites/MLM/search?category=MLM188288&offset=100";
        
        $url = "https://api.mercadolibre.com/sites/MLA/search?q=alcancia%20viaje";
        
        
        // Set the url
        curl_setopt($handle, CURLOPT_URL, $url);
        curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 0); 
        curl_setopt($handle, CURLOPT_TIMEOUT, 5); //timeout in seconds
        // Set the result output to be a string.
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);                

        $output = curl_exec($handle);
        $SALIDA = json_decode($output);

        abort(585, 'El nombre del proveedor no puede ser zicandi');

    }


    /**
     * 
     * 
     */
    public function desactivar(Request $request){
        $almacen = Almacen::findOrFail($request->id_almacen);
        $almacen->xstatus ='0';

        $almacen->save();
    }

    /**
     * 
     * 
     */
    public function activar(Request $request){        
        $almacen = Almacen::findOrFail($request->id_almacen);
        $almacen->xstatus ='1';

        $almacen->save();
    }




    function procesador($array){
	
        if(count($array["indice"])<=1){		
            return $array;
        }
        for($i=0; $i<count($array["indice"])-1; $i++){
            $cat = $array["indice"][$i];
            $hijo = $this->get("https://tendencias.mercadolibre.com.mx".$cat["path"]);
            
            if($cat["nombre"]==$hijo["indice"][0]["nombre"]){
                $array["indice"][$i]["detalle"]=$hijo["detalle"];
            }else{
                //$array["indice"][$i]["hijo"]=$hijo;		

                $array["indice"][$i]["hijo"] = $this->procesador($hijo);
            }
        }
        
        
        return $array;
    }


    public function get($page){
	
        $handle = curl_init();
         
        $url = $page;
         
        // Set the url
        curl_setopt($handle, CURLOPT_URL, $url);
        curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 0); 
        curl_setopt($handle, CURLOPT_TIMEOUT, 5); //timeout in seconds
        // Set the result output to be a string.
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
         
        $output = curl_exec($handle);
         
        curl_close($handle);
         
        //~Div Indice (Lateral) 
        $posIniIndice = stripos($output, '<div class="andes-card sidebar__card">');
        $posIniDestaca = stripos($output, '<div class="andes-card sidebar__card">', $posIniIndice + 1);
        $posIniDetalle = stripos($output, '<div class="andes-card searches">', $posIniDestaca + 1);
    
        $bloqueHtmlIndice = substr($output, $posIniIndice, $posIniDestaca - $posIniIndice);
        $bloqueHtmlDestaca = substr($output, $posIniDestaca, $posIniDetalle - $posIniDestaca);
        $bloqueHtmlDetalle = substr($output, $posIniDetalle);
    
        $arrBloqueHtmlIndice = explode("<a href=", $bloqueHtmlIndice);
        $arrBloqueHtmlDestaca = explode("<a href=", $bloqueHtmlDestaca);
        $arrBloqueHtmlDetalle = explode('<li class="searches__item">', $bloqueHtmlDetalle);
    
        $arrIndiceSalida = array();
        for($i=1; $i<count($arrBloqueHtmlIndice); $i++){
            array_push($arrIndiceSalida, $this->limpiaCadenaTipo1($arrBloqueHtmlIndice[$i]));
        }
    
    
        $arrDestacaSalida = array();
        for($i=1; $i<count($arrBloqueHtmlDestaca); $i++){
            array_push($arrDestacaSalida, $this->limpiaCadenaTipo1($arrBloqueHtmlDestaca[$i]));
        }
    
        $arrDetalleSalida = array();
        for($i=1; $i<count($arrBloqueHtmlDetalle); $i++){
            array_push($arrDetalleSalida, $this->limpiaCadenaTipo2($arrBloqueHtmlDetalle[$i]));
        }
    
        $salida = array(
            "indice"=>$arrIndiceSalida,
            //"destaca"=>$arrDestacaSalida,
            "detalle"=>$arrDetalleSalida
        );
    
        return $salida;
    
    }
    
    public function limpiaCadenaTipo1($cadena){
        $catF = stripos($cadena, '">');
        $cat = substr($cadena, 1, $catF-1);
    
        $ncatF = stripos($cadena, '</a>');
        $nCat = substr($cadena, $catF + 2, $ncatF-$catF-2);
    
        $catArray = array("nombre"=>$nCat,"path"=>$cat);
        return $catArray;
    }
    
    public function limpiaCadenaTipo2($cadena){
        $catF = stripos($cadena, '">');
        $cat = substr($cadena, 9, $catF-9);
    
        $ncatF = stripos($cadena, '</a>');
        $nCat = substr($cadena, $catF + 2, $ncatF-$catF-2);
    
        $catArray = array("nombre"=>$nCat,"path"=>$cat);
        return $catArray;
    }
}