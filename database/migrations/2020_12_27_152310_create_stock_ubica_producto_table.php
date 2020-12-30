<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockUbicaProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_ubica_producto', function (Blueprint $table) {
            $table->increments('id_stock_ubica_producto');            
            $table->integer('id_almacen')->unsigned();
            $table->integer('id_producto')->unsigned();
            $table->string('codigo_ubica',10); 
            $table->decimal('stock', 8, 2);        
            $table->timestamps();

            $table->foreign('id_almacen')->references('id_almacen')->on('almacen');
            $table->foreign('id_producto')->references('id_producto')->on('stock_producto');
            $table->foreign('codigo_ubica')->references('codigo')->on('cat_ubica_producto');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('stock_ubica_producto');
    }
}
