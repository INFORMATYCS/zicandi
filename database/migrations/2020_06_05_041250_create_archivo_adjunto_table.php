<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateArchivoAdjuntoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('archivo_adjunto', function (Blueprint $table) {
            $table->increments('id_archivo_adjunto');
            $table->integer('id_carpeta_adjuntos')->unsigned();
            $table->string('nombre',50);
            $table->string('alias',30)->nullable();
            $table->string('path',250);
            $table->string('descripcion',300)->nullable();            
            $table->boolean('xstatus')->default(1);
            $table->timestamps();     


            $table->foreign('id_carpeta_adjuntos')->references('id_carpeta_adjuntos')->on('carpeta_adjuntos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('archivo_adjunto');
    }
}
