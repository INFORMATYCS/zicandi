<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBitaApiMeliTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bita_api_meli', function (Blueprint $table) {
            $table->increments('id_bita_api_meli');          
            $table->integer('id_usuario')->nullable();
            $table->string('recurso',30)->index();
            $table->string('url',250);
            $table->date('fecha_consulta',1)->nullable();
            $table->string('resultado',15);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bita_api_meli');
    }
}
