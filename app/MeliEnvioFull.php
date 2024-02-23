<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class MeliEnvioFull extends Model{
    //~Nombre de la tabla
    protected $table = 'meli_envio_full';
    
    //~Llave primaria
    protected $primaryKey = 'id_meli_envio_full'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_cuenta_tienda','folio_full','referencia','fecha_cita','hora_cita','estatus','foto_stock_surtir'];    

    //~Relacion One To Many
    public function cuentatienda(){
        return $this->hasOne('App\CuentaTienda', 'id_cuenta_tienda', 'id_cuenta_tienda');
    }
 
}
