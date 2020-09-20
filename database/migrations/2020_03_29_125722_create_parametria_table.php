<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateParametriaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('parametria', function (Blueprint $table) {
            $table->increments('id_parametria');
            $table->string('clave_proceso',15);
            $table->string('llave',50);
            $table->string('valor',150)->nullable();
            $table->string('descripcion',150)->nullable();
            $table->boolean('xstatus')->default(1);
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
        Schema::dropIfExists('parametria');
    }
}
