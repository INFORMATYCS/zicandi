<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContaEmpresa extends Model
{
    //~Nombre de la tabla
    protected $table = 'conta_empresa';
    
    //~Llave primaria
    protected $primaryKey = 'id_conta_empresa'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['nombre','rfc','nota','xstatus'];

    //~Relacion One To Many
    public function cuentas(){
        return $this->hasMany('App\ContaCuenta');
    }
}
