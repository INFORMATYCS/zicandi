<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMovimientoProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movimiento_producto', function (Blueprint $table) {
            $table->increments('id_movimiento_producto');            
            $table->integer('id_producto')->unsigned();
            $table->date('fecha_aplicacion');
            $table->date('fecha_transaccion');
            $table->string('referencia',70)->nullable();
            $table->string('concepto',15);
            $table->string('naturaleza',1);
            $table->decimal('cantidad', 8, 2);
            $table->decimal('precio', 8, 2);
            $table->decimal('stock', 8, 2);                        
            $table->string('estatus_movimiento',1);
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
        Schema::dropIfExists('movimiento_producto');
    }
}
