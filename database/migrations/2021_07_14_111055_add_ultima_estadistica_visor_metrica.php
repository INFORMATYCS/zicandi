<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddUltimaEstadisticaVisorMetrica extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('meli_metrica_visor', function (Blueprint $table) {   
            $table->decimal('ult_precio', 8, 2)->after('estatus_publicacion'); 
            $table->integer('ult_ventas')->after('ult_precio');
            $table->integer('ult_visitas')->after('ult_ventas');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
