<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatUbicaProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cat_ubica_producto', function (Blueprint $table) {
            $table->increments('id_cat_ubica_producto');
            $table->string('codigo',10)->unique();            
            $table->string('nombre',30);            
            $table->boolean('xstatus')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cat_ubica_producto');
    }
}
