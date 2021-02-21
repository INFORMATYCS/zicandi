<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    //~Nombre de la tabla
    protected $table = 'producto';
    
    //~Llave primaria
    protected $primaryKey = 'id_producto'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_categoria','id_carpeta_adjuntos','codigo','nombre','url_imagen','nota','ultimo_precio_compra','precio_referenciado','promedio_precio_compra','xstatus'];


    //~Relacion inversa One To Many
    public function categoria(){
        return $this->belongsTo('App\Categoria');
    }

    //~Relacion One To Many
    public function atributos(){
        return $this->hasMany('App\DefineProducto', 'id_producto', 'id_producto');
    }

    //~Relacion Many To Many Proveedores
    public function proveedores(){
        return  $this->belongsToMany('App\Proveedor', 'deta_proveedor_producto', 'id_producto', 'id_proveedor')
                ->withTimestamps()
                ->withPivot('id_deta_proveedor_producto', 'id_proveedor', 'codigo_barras')
                ->as('codigo');
    }

    //~Relacion inversa One To Many
    public function stock(){
        return $this->belongsTo('App\StockProducto', 'id_producto', 'id_producto');
    }

    //~Relacion One To Many
    public function almacen(){
        return $this->hasMany('App\BitaResumenAlmacen', 'id_producto', 'id_producto');
    }

    //~Evalua cual tienda se encuentra aun logeada en mercadolibre
    public function calcularUltimoPrecioCompra(){
        $precio=0;

        $compra = Compra::join('deta_compra','compra.id_compra','=','deta_compra.id_compra')
        ->select('deta_compra.precio')
        ->where('compra.estatus','=','APLICADO')
        ->where('deta_compra.id_producto','=', $this->id_producto)
        ->orderBy('compra.updated_at', 'desc')
        ->limit(1)->get();

        if( count($compra) > 0 ){
            $precio = $compra[0]->precio;  
            $this->ultimo_precio_compra = $precio;
        }
        return $precio;
                        
    }
}



