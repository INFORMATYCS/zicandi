<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CapFolioEntity extends Model{
    //~Nombre de la tabla
    protected $table = 'cap_folio';
    
    //~Llave primaria
    protected $primaryKey = 'id_cap_folio'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['fecha_creacion','concepto','xstatus'];

    //~Relacion One To Many
    public function detalle(){
        return $this->hasMany('App\CapFolioDetalleEntity', 'id_cap_folio', 'id_cap_folio')->orderBy('id_cap_folio_detalle','desc');
    }
 
}
