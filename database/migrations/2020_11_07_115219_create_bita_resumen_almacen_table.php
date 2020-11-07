<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBitaResumenAlmacenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bita_resumen_almacen', function (Blueprint $table) {
            $table->increments('id_bita_resumen_almacen');            
            $table->integer('id_almacen')->unsigned();
            $table->integer('id_producto')->unsigned();
            $table->decimal('stock', 8, 2);
            $table->date('primer_registro',1);
            $table->date('ultimo_registro',1);

            $table->timestamps();

            $table->foreign('id_almacen')->references('id_almacen')->on('almacen');
            $table->foreign('id_producto')->references('id_producto')->on('stock_producto');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bita_resumen_almacen');
    }
}
