<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDefineProductoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('define_producto', function (Blueprint $table) {
            $table->increments('id_define_producto');      
            $table->integer('id_producto')->unsigned();      
            $table->string('atributo',30);
            $table->string('valor',200);           
            $table->boolean('xstatus')->default(1);
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
        Schema::dropIfExists('define_producto');
    }
}
