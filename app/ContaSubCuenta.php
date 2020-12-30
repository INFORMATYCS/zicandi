<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContaSubCuenta extends Model
{
    //~Nombre de la tabla
    protected $table = 'conta_subcuenta';
    
    //~Llave primaria
    protected $primaryKey = 'id_conta_subcuenta'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['codigo','nombre','xstatus'];

    //~Relacion One To Many
    public function saldos(){
        return $this->hasMany('App\ContaSubCuentaSaldo');
    }
}
