<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MeliDetaMetricaProyecto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_deta_metrica_proyecto', function (Blueprint $table) {
            $table->increments('id_deta_meli_metrica_proyecto'); 
            $table->integer('id_meli_metrica_proyecto')->unsigned(); 
            $table->date('fecha_metrica',1);          
            $table->decimal('promedio_visitas', 8, 2); 
            $table->decimal('promedio_ventas', 8, 2); 
            $table->timestamps();       
            
            $table->foreign('id_meli_metrica_proyecto')->references('id_meli_metrica_proyecto')->on('meli_metrica_proyecto');
        }); 
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meli_deta_metrica_proyecto');
    }
}
