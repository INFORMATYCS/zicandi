<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Compra extends Model
{
    //~Nombre de la tabla
    protected $table = 'compra';
    
    //~Llave primaria
    protected $primaryKey = 'id_compra'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_proveedor','folio','referencia_proveedor','id_carpeta_adjuntos','xstatus'];


    //~Relacion inversa One To Many
    public function categoria(){
        return $this->belongsTo('App\Categoria');
    }

    //~Relacion One To Many
    public function detalle(){
        return $this->hasMany('App\DetaCompra', 'id_compra', 'id_compra');
    }

    //~Relacion One To One
    public function carpeta(){
        return $this->hasOne('App\CarpetaAdjuntos','id_carpeta_adjuntos','id_carpeta_adjuntos');
    }
    
}
