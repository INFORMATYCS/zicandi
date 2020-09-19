<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateConfigPublicacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('config_publicacion', function (Blueprint $table) {
            $table->increments('id_config_publicacion');
            $table->integer('id_publicacion')->unsigned();
            $table->integer('id_producto')->unsigned();                                          
            $table->timestamps();

            $table->foreign('id_producto')->references('id_producto')->on('producto');            
            $table->foreign('id_publicacion')->references('id_publicacion')->on('publicacion');
            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('config_publicacion');
    }
}
