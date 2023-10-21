<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateLoteOperacionProcesosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('lote_operacion_procesos', function (Blueprint $table) {
            $table->increments('id_lote_operacion');
            $table->string('lote_referencia',50)->index();
            $table->string('referencia',20)->nullable()->index();
            $table->date('fecha_operacion',1);
            $table->integer('id_almacen')->unsigned();
            $table->string('nombre_almacen',50);
            $table->string('codigo_ubicacion',50);
            $table->integer('id_producto')->unsigned();
            $table->string('codigo_producto',15);
            $table->string('nombre_producto',50);
            $table->string('url_img_producto',200)->nullable();
            $table->string('tipo_movimiento',10);
            $table->integer('cantidad');
            $table->string('estado',20)->index();
            $table->integer('id_movimiento_almacen')->nullable();
            $table->string('msg_error',200)->nullable();
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
        Schema::dropIfExists('lote_operacion_procesos');
    }
}
