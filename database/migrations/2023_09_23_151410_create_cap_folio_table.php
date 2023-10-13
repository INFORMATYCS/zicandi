<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCapFolioTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cap_folio', function (Blueprint $table) {
            $table->increments('id_cap_folio');      
            $table->date('fecha_creacion',1);
            $table->string('concepto',50)->nullable();            
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
        Schema::dropIfExists('cap_folio');
    }
}
