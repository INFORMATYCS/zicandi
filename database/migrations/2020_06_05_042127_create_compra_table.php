<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCompraTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('compra', function (Blueprint $table) {
            $table->increments('id_compra');
            $table->integer('id_proveedor')->unsigned();
            $table->string('folio',50);
            $table->string('referencia_proveedor',80)->nullable();
            $table->integer('id_carpeta_adjuntos')->unsigned();
            $table->string('estatus',20);
            $table->boolean('xstatus')->default(1);
            $table->timestamps();


            $table->foreign('id_carpeta_adjuntos')->references('id_carpeta_adjuntos')->on('carpeta_adjuntos');
            $table->foreign('id_proveedor')->references('id_proveedor')->on('proveedor');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('compra');
    }
}
