<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCapFolioDetalleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cap_folio_detalle', function (Blueprint $table) {
            $table->increments('id_cap_folio_detalle');
            $table->integer('id_cap_folio')->unsigned();
            $table->integer('id_producto')->unsigned();
            $table->string('codigo_producto',20)->nullable();
            $table->string('nombre_producto',250)->nullable();
            $table->string('url_imagen',200)->nullable();
            $table->integer('total_captura');                        
            $table->boolean('xstatus')->default(1);
            $table->timestamps();   
            
            $table->foreign('id_cap_folio')->references('id_cap_folio')->on('cap_folio');
            $table->foreign('id_producto')->references('id_producto')->on('producto');

            $table->index('id_cap_folio');
            $table->index('codigo_producto');
            $table->index('id_producto');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cap_folio_detalle');
    }
}
