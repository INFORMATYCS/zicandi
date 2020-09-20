<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class BatchProceso extends Model
{
    //~Nombre de la tabla
    protected $table = 'batch_proceso';
    
    //~Llave primaria
    protected $primaryKey = 'id_batch_proceso'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['archivo_php','descripcion','estatus','fecha_ultima_exec'];
}