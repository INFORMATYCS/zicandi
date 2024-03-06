<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMeliPublicacionHistoricoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('meli_publicacion_historico', function (Blueprint $table) {
            $table->increments('id_publicacion_historico');
            $table->string('id_publicacion')->nullable()->index();            
            $table->string('id_variante_publicacion')->nullable()->index();
            $table->string('id_publicacion_tienda')->nullable()->index();
            $table->date('fecha_consulta',1)->nullable();                                
            $table->decimal('precio', 8, 2);
            $table->decimal('stock', 8, 2);
            $table->decimal('ventas', 8, 2);
            $table->decimal('visitas', 8, 2);
            $table->boolean('envio_gratis')->default(0);
            $table->boolean('full')->default(0);                                                
            $table->string('estatus',15);

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
        Schema::dropIfExists('meli_publicacion_historico');
    }
}
