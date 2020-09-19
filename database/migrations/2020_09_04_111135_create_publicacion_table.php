<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePublicacionTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('publicacion', function (Blueprint $table) {
            $table->increments('id_publicacion');            
            $table->integer('id_tienda')->unsigned();            
            $table->integer('id_cuenta_tienda')->unsigned();
            $table->string('id_publicacion_tienda')->nullable()->index();
            $table->string('id_variante_publicacion')->nullable()->index();           
            $table->string('titulo',90);
            $table->string('nombre_variante',90)->nullable();
            $table->decimal('precio', 8, 2);
            $table->decimal('stock', 8, 2);
            $table->decimal('ventas', 8, 2);
            $table->decimal('visitas', 8, 2);
            $table->boolean('envio_gratis')->default(0);
            $table->boolean('full')->default(0);            
            $table->string('link',350)->nullable();
            $table->string('foto_mini',350)->nullable();
            $table->date('fecha_consulta',1)->nullable();
            $table->string('estatus',15);     
            $table->timestamps();

                        
            $table->foreign('id_tienda')->references('id_tienda')->on('tienda');
            $table->foreign('id_cuenta_tienda')->references('id_cuenta_tienda')->on('cuenta_tienda');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('publicacion');
    }
}
