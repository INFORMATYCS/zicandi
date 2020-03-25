<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('producto', function (Blueprint $table) {
            $table->increments('id_producto');
            $table->integer('id_categoria')->unsigned();
            $table->string('codigo',20)->unique();
            $table->string('nombre',30);
            $table->string('url_imagen',200)->nullable();
            $table->string('modelo',80)->nullable();
            $table->decimal('ultimo_precio_compra', 8, 2);
            $table->decimal('promedio_precio_compra', 8, 2);
            $table->boolean('xstatus')->default(1);
            $table->timestamps();

            $table->foreign('id_categoria')->references('id_categoria')->on('categoria');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('producto');
    }
}
