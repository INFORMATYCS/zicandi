<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CapFolioDetalleEntity extends Model{
    //~Nombre de la tabla
    protected $table = 'cap_folio_detalle';
    
    //~Llave primaria
    protected $primaryKey = 'id_cap_folio_detalle'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_cap_folio','id_producto','codigo_producto','nombre_producto','url_imagen','total_captura','xstatus'];

    //~Relacion inversa One To Many Producto
    public function Folio(){
        return $this->belongsTo('App\CapFolioEntity');
    }
}
