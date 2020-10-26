<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBettAsociadaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bett_asociada', function (Blueprint $table) {
            $table->increments('id_bett_asociada');
            $table->string('codigo',30);
            $table->string('nombre',50);
            $table->string('telefono',30)->nullable();
            $table->string('direccion',300)->nullable();
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
        Schema::dropIfExists('bett_asociada');
    }
}
