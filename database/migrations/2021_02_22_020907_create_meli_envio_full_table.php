<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliEnvioFullTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_envio_full', function (Blueprint $table) {
            $table->increments('id_meli_envio_full');      
            $table->integer('id_cuenta_tienda')->unsigned();      
            $table->string('folio_full',15)->unique();
            $table->string('referencia',30)->nullable();
            $table->date('fecha_cita',1);
            $table->string('hora_cita',30);            
            $table->string('estatus',3)->nullable();            
            $table->timestamps();         
            
            
            $table->foreign('id_cuenta_tienda')->references('id_cuenta_tienda')->on('cuenta_tienda');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('meli_envio_full');
    }
}
