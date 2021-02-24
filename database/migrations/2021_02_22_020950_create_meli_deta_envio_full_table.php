<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliDetaEnvioFullTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_deta_envio_full', function (Blueprint $table) {
            $table->increments('id_deta_meli_envio_full');
            $table->integer('id_meli_envio_full')->unsigned();
            $table->integer('id_publicacion')->unsigned();                                    
            $table->string('codigo_barras_full',15)->nullable();            
            $table->string('id_publicacion_tienda',20)->nullable();            
            $table->integer('total_etiquetas');
            $table->integer('etiquetas_impresas');
            $table->integer('etiquetas_pendientes');
            $table->string('zpl_cadena',500)->nullable();            
            $table->string('estatus',3)->nullable();            
            $table->timestamps();

            
            $table->foreign('id_meli_envio_full')->references('id_meli_envio_full')->on('meli_envio_full');            
            $table->foreign('id_publicacion')->references('id_publicacion')->on('publicacion');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meli_deta_envio_full');
    }
}
