<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrdenEntrega extends Model{
    //~Nombre de la tabla
    protected $table = 'bett_orden_entrega';
    
    //~Llave primaria
    protected $primaryKey = 'id_bett_orden_entrega'; 

    //~Por seguridad se agrega para evitar ataques. Toda las columnas de la tabla
    protected $fillable = ['id_bett_semana','id_bett_asociada','nombre_asociada','grupo_entrega','total_productos','monto_cobrar','monto_recibido','bolsas_entregar','bolsas_recibir','comentarios_entrega','comentarios_recibidos','metodo_pago','prioridad_entrega','estatus'];

           
}
