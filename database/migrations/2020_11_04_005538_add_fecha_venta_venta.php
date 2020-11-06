<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddFechaVentaVenta extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        Schema::table('venta_meli', function (Blueprint $table) {            
            $table->dateTime('fecha_venta',0)->after('id_orden_meli');
            $table->index('id_paquete_meli');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        $table->dropColumn('fecha_venta');
    }
}
