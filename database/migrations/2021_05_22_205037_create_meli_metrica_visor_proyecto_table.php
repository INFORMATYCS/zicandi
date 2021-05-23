<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliMetricaVisorProyectoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_metrica_visor_proyecto', function (Blueprint $table) {
            $table->increments('id_meli_metrica_visor_proyecto'); 
            $table->integer('id_meli_metrica_proyecto')->unsigned(); 
            $table->integer('id_meli_metrica_visor')->unsigned(); 
            $table->timestamps();

            $table->foreign('id_meli_metrica_proyecto')->references('id_meli_metrica_proyecto')->on('meli_metrica_proyecto');
            $table->foreign('id_meli_metrica_visor')->references('id_meli_metrica_visor')->on('meli_metrica_visor');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meli_metrica_visor_proyecto');
    }
}
