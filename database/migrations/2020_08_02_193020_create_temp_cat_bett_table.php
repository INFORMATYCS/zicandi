<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTempCatBettTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temp_cat_bett', function (Blueprint $table) {
            $table->increments('id_temp_cat_bett');
            $table->string('codigo',15);
            $table->string('nombre',50);
            $table->decimal('precio', 8, 2);
            $table->decimal('precio_oferta', 8, 2)->nullable();
            $table->string('url',200)->nullable();
            $table->string('descripcion',250)->nullable();
            $table->string('imagen',250)->nullable();
            $table->string('imagen_mini',250)->nullable();
            $table->string('estatus_proceso',3)->default("PEN");
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
        Schema::dropIfExists('temp_cat_bett');
    }
}
