<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBatchProcesoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('batch_proceso', function (Blueprint $table) {
            $table->increments('id_batch_proceso');          
            $table->string('archivo_php',90);
            $table->string('descripcion',90)->nullable();
            $table->string('estatus',2);
            $table->date('fecha_ultima_exec',1)->nullable();            

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
        Schema::dropIfExists('batch_proceso');
    }
}
