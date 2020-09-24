<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CuentaTienda extends Model
{
    //~Nombre de la tabla
    protected $table = 'cuenta_tienda';
    
    //~Llave primaria
    protected $primaryKey = 'id_cuenta_tienda'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_tienda','usuario','correo','telefono','att_id','att_user_id','att_access_token','att_refresh_token','att_expira_token','estatus'];

    //~Relacion inversa One To Many Tienda
    public function tienda(){
        return $this->belongsTo('App\Tienda');
    }

    //~Evalua cual tienda se encuentra aun logeada en mercadolibre
    public function getCuentaLogeadaMELI(){
        $cuenta = $this->where('estatus','=','CONECTADO')->get();        

        if(count($cuenta)>0){
            return $cuenta[0];
        }else{
            return null;
        }                
    }
}
