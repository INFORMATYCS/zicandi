<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddGraficosMeliMetricaVisor extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {

        Schema::table('meli_metrica_visor', function (Blueprint $table) {                        
            $table->string('url_graph_visitas', 300)->nullable()->after('estatus_publicacion');
        $table->string('url_graph_ventas', 300)->nullable()->after('estatus_publicacion');
        });

        
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
