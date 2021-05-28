<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MeliMetricaProyecto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_metrica_proyecto', function (Blueprint $table) {
            $table->increments('id_meli_metrica_proyecto');      
            $table->string('nombre',50);
            $table->string('foto',250);
            $table->string('graph_visitas', 250); 
            $table->string('graph_ventas', 250); 
            $table->string('tendencia',3);
            $table->boolean('xstatus')->default(1);
            $table->timestamps();         
        });  
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meli_metrica_proyecto');
    }
}
