<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publicacion extends Model{
    //~Nombre de la tabla
    protected $table = 'publicacion';
    
    //~Llave primaria
    protected $primaryKey = 'id_publicacion'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_tienda','id_cuenta_tienda','id_publicacion_tienda','id_variante_publicacion','titulo','nombre_variante','precio','stock','ventas','visitas','envio_gratis','full','link','foto_mini','fecha_consulta','estatus'];

    public function getTienda(){
        return $this->hasOne('App\Tienda','id_tienda','id_tienda');
    }

    public function getCuentaTienda(){
        return $this->hasOne('App\CuentaTienda','id_cuenta_tienda','id_cuenta_tienda');
    }

    public function config(){
        return  $this->belongsToMany('App\Producto', 'config_publicacion', 'id_publicacion', 'id_producto');

    }

    //~Relacion One To Many
    public function estadisticas(){
        return $this->hasMany('App\EstadisticaPublicacion', 'id_publicacion', 'id_publicacion');
    }
}
