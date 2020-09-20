<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateEstadisticaPublicacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('estadistica_publicacion', function (Blueprint $table) {
            $table->increments('id_estadistica_publicacion');
            $table->string('id_publicacion')->nullable()->index();
            $table->date('fecha_consulta',1)->nullable();
            $table->decimal('stock', 8, 2);
            $table->decimal('ventas', 8, 2);
            $table->decimal('visitas', 8, 2);

            $table->timestamps();
            
            $table->foreign('id_publicacion')->references('id_publicacion')->on('publicacion');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('estadistica_publicacion');
    }
}
