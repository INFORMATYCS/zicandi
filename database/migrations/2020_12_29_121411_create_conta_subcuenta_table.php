<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContaSubcuentaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conta_subcuenta', function (Blueprint $table) {
            $table->increments('id_conta_subcuenta');
            $table->integer('id_conta_cuenta')->unsigned();            
            $table->string('codigo',10)->unique();            
            $table->string('nombre',30);            
            $table->boolean('xstatus')->default(1);
            $table->timestamps();

            
            $table->foreign('id_conta_cuenta')->references('id_conta_cuenta')->on('conta_cuenta');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conta_subcuenta');
    }
}
