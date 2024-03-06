<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliPublicacionEstadisticasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_publicacion_estadisticas', function (Blueprint $table) {
            $table->increments('id_publicacion_estadisticas');
            $table->string('id_publicacion')->nullable()->index();            
            $table->string('id_variante_publicacion')->nullable()->index();
            $table->string('id_publicacion_tienda')->nullable()->index();
            $table->date('fecha_estadistica',1)->nullable();                                
            $table->decimal('puntaje_stock_full', 8, 2);
            $table->decimal('puntaje_visitas_full', 8, 2);

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
        Schema::dropIfExists('meli_publicacion_estadisticas');
    }
}
