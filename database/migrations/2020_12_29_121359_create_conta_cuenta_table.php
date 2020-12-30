<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContaCuentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conta_cuenta', function (Blueprint $table) {
            $table->increments('id_conta_cuenta');
            $table->integer('id_conta_empresa')->unsigned();
            $table->string('codigo',10)->unique();            
            $table->string('nombre',30);            
            $table->boolean('xstatus')->default(1);
            $table->timestamps();


            $table->foreign('id_conta_empresa')->references('id_conta_empresa')->on('conta_empresa');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conta_cuenta');
    }
}
