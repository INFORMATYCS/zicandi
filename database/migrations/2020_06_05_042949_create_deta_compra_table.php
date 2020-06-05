<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetaCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deta_compra', function (Blueprint $table) {
            $table->increments('id_deta_compra');
            $table->integer('id_compra')->unsigned();
            $table->integer('id_producto')->unsigned();
            $table->decimal('cantidad', 8, 2);
            $table->decimal('precio', 8, 2);            
            $table->integer('id_carpeta_adjuntos')->unsigned();
            $table->integer('id_movimiento_producto')->unsigned()->nullable()->comment('Referencia');            
            $table->timestamps();


            $table->foreign('id_carpeta_adjuntos')->references('id_carpeta_adjuntos')->on('carpeta_adjuntos');
            $table->foreign('id_compra')->references('id_compra')->on('compra');
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
        Schema::dropIfExists('deta_compra');
    }
}
