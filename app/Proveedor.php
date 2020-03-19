<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Proveedor extends Model
{
    //~Nombre de la tabla
    protected $table = 'proveedor';
    
    //~Llave primaria
    protected $primaryKey = 'id_proveedor'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['nombre_corto','nombre','pagina_web','contacto','xstatus'];
}
