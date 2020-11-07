<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovimientoAlmacenTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movimiento_almacen', function (Blueprint $table) {
            $table->increments('id_movimiento_almacen');
            $table->integer('id_almacen')->unsigned();
            $table->integer('id_producto')->unsigned();
            $table->string('tipo_movimiento',5);
            $table->date('fecha_aplicacion',1);
            $table->decimal('cantidad', 8, 2);
            $table->decimal('stock', 8, 2);
            $table->string('ubicacion',50)->nullable();
            $table->string('estatus_movimientos',1);

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
        Schema::dropIfExists('movimiento_almacen');
    }
}
