<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContaCuenta extends Model
{
    //~Nombre de la tabla
    protected $table = 'conta_cuenta';
    
    //~Llave primaria
    protected $primaryKey = 'id_conta_cuenta'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['codigo','nombre','xstatus'];

    //~Relacion One To Many
    public function subcuentas(){
        return $this->hasMany('App\ContaSubCuenta');
    }
}
