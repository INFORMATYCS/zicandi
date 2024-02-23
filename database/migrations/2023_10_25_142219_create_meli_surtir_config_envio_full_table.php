<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliSurtirConfigEnvioFullTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_surtir_config_envio_full', function (Blueprint $table) {
            $table->increments('id_surtir_config_envio_full');
            $table->string('folio_full',15)->index();
            $table->integer('id_surtir_indice_envio_full')->unsigned();
            $table->integer('id_deta_meli_envio_full')->unsigned();
            $table->string('id_publicacion_tienda',20)->nullable();
            $table->integer('id_producto')->unsigned();
            $table->integer('id_config_publicacion');
            $table->string('codigo_producto',15);
            $table->string('nombre_producto',15);
            $table->integer('total_piezas_surtir');
            $table->integer('total_piezas_surtidas');            
            $table->string('ubicacion_1',15)->nullable();
            $table->string('ubicacion_2',15)->nullable();
            $table->string('ubicacion_3',15)->nullable();                        
            $table->string('estatus',3)->nullable();
            $table->timestamps(); 
            
            $table->foreign('id_surtir_indice_envio_full','meli_surtir_config_ef_id_surtir_indice_ef_foreign')->references('id_surtir_indice_envio_full')->on('meli_surtir_indice_envio_full');
            $table->foreign('id_deta_meli_envio_full')->references('id_deta_meli_envio_full')->on('meli_deta_envio_full');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meli_surtir_config_envio_full');
    }
}
