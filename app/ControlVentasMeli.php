<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class ControlVentasMeli extends Model{
    //~Nombre de la tabla
    protected $table = 'control_ventas_meli';
    
    //~Llave primaria
    protected $primaryKey = 'id_control_ventas_meli'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_cuenta_tienda','fecha_inicial','fecha_final','total_registros','fecha_consulta','estatus'];

    //~Relacion inversa One To Many
    public function cuentaTienda(){
        return $this->belongsTo('App\CuentaTienda');
    }

      
}
