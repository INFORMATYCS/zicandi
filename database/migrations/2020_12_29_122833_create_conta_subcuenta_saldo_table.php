<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContaSubcuentaSaldoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conta_subcuenta_saldo', function (Blueprint $table) {            
            $table->integer('id_conta_subcuenta')->unsigned();
            $table->integer('id_carpeta_adjuntos')->unsigned();
            $table->string('ejercicio',10);
            $table->decimal('saldo_cierre', 8, 2); 
            $table->timestamps();


            $table->primary(['id_conta_subcuenta', 'ejercicio']);
            $table->foreign('id_conta_subcuenta')->references('id_conta_subcuenta')->on('conta_subcuenta');
            $table->foreign('id_carpeta_adjuntos')->references('id_carpeta_adjuntos')->on('carpeta_adjuntos');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('conta_subcuenta_saldo');
    }
}
