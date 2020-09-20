<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetaProveedorProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('deta_proveedor_producto', function (Blueprint $table) {
            $table->increments('id_deta_proveedor_producto');
            $table->integer('id_proveedor')->unsigned();
            $table->integer('id_producto')->unsigned(); 
            $table->string('codigo_barras', 40)->nullable();
            $table->timestamps();
            
            $table->foreign('id_proveedor')->references('id_proveedor')->on('proveedor');
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
        Schema::dropIfExists('deta_proveedor_producto');
    }
}
