<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateStockProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('stock_producto', function (Blueprint $table) {
            $table->increments('id_stock_producto');            
            $table->integer('id_producto')->unsigned();            
            $table->decimal('stock', 8, 2);
            $table->decimal('disponible', 8, 2);
            $table->decimal('retenido', 8, 2);
            $table->decimal('minimo', 8, 2)->nullable();
            $table->decimal('maximo', 8, 2)->nullable();
            $table->date('ultima_entrada',1)->nullable();
            $table->date('ultima_salida',1)->nullable();
            $table->timestamps();

                        
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
        Schema::dropIfExists('stock_producto');
    }
}
