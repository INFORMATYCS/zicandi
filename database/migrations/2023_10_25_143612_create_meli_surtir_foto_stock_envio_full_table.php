<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliSurtirFotoStockEnvioFullTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_surtir_foto_stock_envio_full', function (Blueprint $table) {
            $table->increments('id_surtir_foto_stock_envio_full');
            $table->string('folio_full',15)->index();
            $table->integer('id_almacen')->unsigned();            
            $table->string('codigo_ubicacion',15);
            $table->integer('id_producto')->unsigned();
            $table->string('codigo_producto',15);
            $table->integer('stock');
            $table->integer('retenido');
            $table->integer('disponible');
            $table->timestamps(); 

            $table->foreign('id_almacen')->references('id_almacen')->on('almacen');
            $table->foreign('id_producto')->references('id_producto')->on('producto');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meli_surtir_foto_stock_envio_full');
    }
}
