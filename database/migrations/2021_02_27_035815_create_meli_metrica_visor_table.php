<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliMetricaVisorTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_metrica_visor', function (Blueprint $table) {
            $table->increments('id_meli_metrica_visor');      
            $table->string('foto',250);
            $table->text('url');
            $table->string('titulo',99);
            $table->string('id_publicacion_tienda',20);
            $table->string('vendedor',30);
            $table->string('estatus_publicacion',15);
            $table->string('estatus',3);
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
        Schema::dropIfExists('meli_metrica_visor');
    }
}
