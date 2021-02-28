<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliDetaMetricaVisorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_deta_metrica_visor', function (Blueprint $table) {
            $table->increments('id_meli_deta_metrica_visor');      
            $table->integer('id_meli_metrica_visor')->unsigned();      
            $table->date('fecha_consulta',1);
            $table->decimal('precio', 8, 2); 
            $table->integer('ventas');
            $table->integer('visitas');
            $table->integer('full');
            $table->integer('msi');
            $table->integer('disponibles');                                 
            $table->integer('isCatalogo');
            $table->string('estatus_publicacion',15);
            $table->timestamps();         
            
            
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
        Schema::dropIfExists('meli_deta_metrica_visor');
    }
}
