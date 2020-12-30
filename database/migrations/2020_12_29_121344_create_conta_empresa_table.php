<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateContaEmpresaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('conta_empresa', function (Blueprint $table) {
            $table->increments('id_conta_empresa');
            $table->string('nombre',30)->unique();            
            $table->string('rfc',15);
            $table->string('nota',300);
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
        Schema::dropIfExists('conta_empresa');
    }
}
