<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliConfigEnvioFullTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_config_envio_full', function (Blueprint $table) {
            $table->increments('id_config_meli_envio_full');
            $table->integer('id_meli_envio_full')->unsigned();
            $table->integer('id_deta_meli_envio_full')->unsigned();            
            $table->integer('id_producto')->unsigned();
            $table->integer('id_config_publicacion')->unsigned();                        
            $table->string('codigo_producto',15)->nullable();
            $table->string('nombre_producto',30)->nullable();
            $table->integer('total_piezas');

            $table->timestamps();

            
            $table->foreign('id_meli_envio_full')->references('id_meli_envio_full')->on('meli_envio_full');
            $table->foreign('id_deta_meli_envio_full')->references('id_deta_meli_envio_full')->on('meli_deta_envio_full');
            $table->foreign('id_producto')->references('id_producto')->on('producto');            
            $table->foreign('id_config_publicacion')->references('id_config_publicacion')->on('config_publicacion');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meli_config_envio_full');
    }
}
