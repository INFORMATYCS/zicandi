<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliSocketEnvioFullTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_socket_envio_full', function (Blueprint $table) {
            $table->increments('id_meli_socket_envio_full');
            $table->string('zpl_cadena',500)->nullable();
            $table->string('estatus',3)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meli_socket_envio_full');
    }
}
