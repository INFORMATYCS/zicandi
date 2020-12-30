<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ContaSubCuentaSaldo extends Model
{
    //~Nombre de la tabla
    protected $table = 'conta_subcuenta_saldo';            

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_conta_subcuenta', 'ejercicio','saldo_cierre'];

}
