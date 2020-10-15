<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use App\Http\Lib\ProcesadorImagenes;
use App\TempCatBett;
use App\Categoria;
use App\Producto;
use App\StockProducto;
use App\Proveedor;

class BetterwareController extends Controller{
    /**
     * Lee pagina betterware e inserta en temporales
     *
     * @return \Illuminate\Http\Response
     */
    public function getPage(Request $request){
    try{
        $url = $request->url;

        $cliente = curl_init();
		curl_setopt($cliente, CURLOPT_URL, $url);	
		curl_setopt($cliente, CURLOPT_HEADER, 0);
		curl_setopt($cliente, CURLOPT_RETURNTRANSFER, true); 

		$contenido = curl_exec($cliente);
		$puntero = 1;
		
        $productos = array();
        $msgErrorSalida ="";
		while(true){
            try{
            $puntero = strpos($contenido, '<div class="productThumbs"', $puntero);
            if($puntero<=0){
                break;
            }

            $inicialUrlDetalle = strpos($contenido, '<a href="', $puntero);
            $finalUrlDetalle = strpos($contenido, '" class="img-link">', $inicialUrlDetalle);
            $urlDetalle = substr($contenido, $inicialUrlDetalle + 9, $finalUrlDetalle - ($inicialUrlDetalle+9));
            
            
            $inicialImagen = strpos($contenido, '<img src="', $puntero);
            $finalImagen = strpos($contenido, '" class="', $inicialImagen);
            $urlImagen = substr($contenido, $inicialImagen + 10, $finalImagen - ($inicialImagen+10));                        

			$puntero = strpos($contenido, '<div class="nombre">', $puntero);							
			
			//Busca nombre del producto
			$inicialNombre = strpos($contenido, '>', $puntero + 21);
			$finalNombre = strpos($contenido, '</a>', $inicialNombre);
			$nombre = substr($contenido, $inicialNombre + 1, $finalNombre - ($inicialNombre+1));
			
			$puntero = $finalNombre;
			
			//Busca el codigo del producto
			$puntero = strpos($contenido, '<div class="codigo">', $puntero);	
			
			$inicialCodigo = strpos($contenido, '<b>', $puntero + 22);
			$finalCodigo = strpos($contenido, '</b>', $inicialCodigo);
			$codigo = substr($contenido, $inicialCodigo + 3, $finalCodigo - ($inicialCodigo+3));
			
			$puntero = $finalCodigo;
			$puntero = strpos($contenido, '<div>', $puntero);	
			
			//Busca el precio del producto
            //$inicialPrecio = $puntero  + 5;
            $inicialPrecio = strpos($contenido, '$', $puntero);
			$finalPrecio = strpos($contenido, '</div>', $inicialPrecio);
			$precio = substr($contenido, $inicialPrecio, $finalPrecio - $inicialPrecio);
			
			//Precio con descuento
			if(strpos($precio, "a")>0){
                $inicialPrecioGrande = strpos($precio, '$');
				$finalPrecioGrande = strpos($precio, 'a <b>$');
				$precioGrande = substr($precio, $inicialPrecioGrande, $finalPrecioGrande - $inicialPrecioGrande);
				
				
				$inicialPrecioDes = $finalPrecioGrande  + 5;
				$finalPrecioDes = strpos($precio, '</b>', $inicialPrecioDes);
				$precio = substr($precio, $inicialPrecioDes, $finalPrecioDes - $inicialPrecioDes);
			}else{
				$precioGrande = $precio;
			}
			
			$precio = str_replace("$", "", $precio );
			$precioGrande = str_replace("$", "", $precioGrande );
			
            $puntero = $finalPrecio;      
            
            //Procesa imagen
            $fichero = Config::get('zicandi.betterware.path').$urlImagen;
            $ext = substr($urlImagen, -3);
    
            $actual = file_get_contents($fichero);

            $b64= base64_encode($actual);

            $procesadorImagenes = new ProcesadorImagenes();
            $imagen = array(    
                'nombre'=>$codigo.'.'.$ext,
                'size'=>0,
                'type'=>$ext,
                'b64'=>$b64
            );
            $url_imagen = $procesadorImagenes->publicaImagenMini100C($imagen); 

            //~Busca la descripcion del producto
            $clienteDetalle = curl_init();
            curl_setopt($clienteDetalle, CURLOPT_URL, Config::get('zicandi.betterware.path').$urlDetalle);	
            curl_setopt($clienteDetalle, CURLOPT_HEADER, 0);
            curl_setopt($clienteDetalle, CURLOPT_RETURNTRANSFER, true); 

            $detalle = curl_exec($clienteDetalle);
            $pDetalle = strpos($detalle, '<strong>Descripción</strong><br />');
            $descripcion = "";
            if($pDetalle>0){
                $inicialDesc = $pDetalle;
			    $finalDesc = strpos($detalle, '</p>', $inicialDesc);
                $descripcion = substr($detalle, $inicialDesc + 35, $finalDesc - ($inicialDesc+35));
                $descripcion = ltrim($descripcion);
                $descripcion = rtrim($descripcion);
            }

            curl_close($clienteDetalle);

            $temp = new TempCatBett();
            $temp->codigo = substr($codigo,0,15);
            $temp->nombre = substr($nombre,0,50);
            $temp->precio = trim($precio);
            $temp->precio_oferta = trim($precioGrande);
            $temp->url =Config::get('zicandi.betterware.path').$urlDetalle;
            $temp->descripcion =substr($descripcion,0,250);           
            $temp->imagen =Config::get('zicandi.betterware.path').$urlImagen;
            $temp->imagen_mini =$url_imagen;
            
            $temp->save();     
            }catch (\Exception $e) {
                $msgErrorSalida = "Error en ".$codigo." ".$e->getMessage();
            }                                    
		}	
		
        curl_close($cliente);   
        
        if($msgErrorSalida==""){
            return "OK";    
        }else{
            return $msgErrorSalida;
        }
        
    }catch (\Exception $e) {
        $ERROR = $e->getMessage();
        echo $ERROR;
    }    
    }

    public function limpiaTablaTemporal(Request $request){
        $temp = new TempCatBett();
        $temp->truncate();
    }

    public function resumenMigracion(Request $request){

        $res = \DB::select("SELECT count(DISTINCT codigo) as total FROM temp_cat_bett");

        $resExiste = \DB::select("SELECT count(DISTINCT codigo) as total FROM producto WHERE codigo in (SELECT codigo FROM temp_cat_bett)");

        $total = $res[0]->total;
        $existe = $resExiste[0]->total;
        $nuevo = $total - $existe;


        return array("total"=>$total, "update"=>$existe, "nuevo"=>$nuevo);            
    }

    public function migracionProductos(Request $request){
        //~Configura proveedor
        $proveedor = Proveedor::where('nombre_corto','=','BETT')
        ->select('id_proveedor','nombre')        
        ->get(); 

        $idProveedor = $proveedor[0]->id_proveedor;

        //~Configura categoria
        $idCategoria = 0;
        $categorias = Categoria::where('xstatus','=','1')
        ->select('id_categoria','nombre')
        ->where('nombre','=','Carga Masiva')
        ->get();        

        if($categorias->isEmpty()){
            $categoria = new Categoria();
            $categoria->codigo = "MAS";
            $categoria->nombre = "Carga Masiva"; 
            $categoria->save();   
            
            $idCategoria = $categoria->id_categoria;
        }else{
            $idCategoria = $categorias[0]->id_categoria;
        }            

        $temp = TempCatBett::all();        

        foreach($temp as $t){
            
            $producto = Producto::where('codigo','=',$t->codigo)
            ->select('id_producto','nombre','codigo','url_imagen','nota','ultimo_precio_compra','promedio_precio_compra','xstatus')            
            ->get(); 

            if($producto->isEmpty()){
                $producto = new Producto();    
                $producto->id_categoria = $idCategoria;
                $producto->codigo = $t->codigo;
                $producto->nombre = substr($t->nombre, 0, 30);
                $producto->url_imagen = Config::get('zicandi.url_public').$t->imagen_mini;
                $producto->nota = $t->descripcion;
                $producto->ultimo_precio_compra = $t->precio_oferta * Config::get('zicandi.betterware.factorConversion');
                $producto->promedio_precio_compra = $t->precio_oferta * Config::get('zicandi.betterware.factorConversion');
                $producto->precio_referenciado = $t->precio_oferta * Config::get('zicandi.betterware.factorConversion');
                $producto->xstatus ='1';
                $producto->save();

                $producto->proveedores()->attach($idProveedor,['codigo_barras'=>$t->codigo]);


                //~Registra stock
                $stock = new StockProducto();
                $stock->id_producto = $producto->id_producto;
                $stock->stock = 0;
                $stock->disponible = 0;
                $stock->retenido = 0;
                $stock->save();

            }else{
                $producto = Producto::find($producto[0]->id_producto);
                $producto->nombre = substr($t->nombre, 0, 30);
                $producto->url_imagen = Config::get('zicandi.url_public').$t->imagen_mini;
                $producto->nota = $t->descripcion;                
                $ultimoPrecioCompras = $producto->calcularUltimoPrecioCompra();

                if( $ultimoPrecioCompras<=0 ){
                    $producto->ultimo_precio_compra = $t->precio_oferta * Config::get('zicandi.betterware.factorConversion');
                    $producto->promedio_precio_compra = $t->precio_oferta * Config::get('zicandi.betterware.factorConversion');
                    $producto->precio_referenciado = $t->precio_oferta * Config::get('zicandi.betterware.factorConversion');
                }else{
                    $producto->precio_referenciado = $t->precio_oferta * Config::get('zicandi.betterware.factorConversion');
                }


                $producto->save();


                //~Registra stock
                $productoStock = StockProducto::where('id_producto','=',$producto->id_producto)->get();
                if($productoStock!=null){
                    $stock = new StockProducto();
                    $stock->id_producto = $producto->id_producto;
                    $stock->stock = 0;
                    $stock->disponible = 0;
                    $stock->retenido = 0;
                    $stock->save();
                }
            }

        }

        return 1;
    }

    
}
