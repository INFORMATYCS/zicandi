<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBettOrdenEntregaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bett_orden_entrega', function (Blueprint $table) {
            $table->increments('id_bett_orden_entrega');
            $table->integer('id_bett_semana')->unsigned();
            $table->integer('id_bett_asociada')->unsigned();
            $table->string('nombre_asociada',50);
            $table->string('grupo_entrega',50)->nullable();
            $table->integer('total_productos')->nullable();
            $table->decimal('monto_cobrar', 8, 2)->nullable();
            $table->decimal('monto_recibido', 8, 2)->nullable();
            $table->integer('bolsas_entregar')->nullable();
            $table->integer('bolsas_recibir')->nullable();
            $table->string('comentarios_entrega',300)->nullable();
            $table->string('comentarios_recibidos',300)->nullable();
            $table->string('metodo_pago',50)->nullable();
            $table->decimal('prioridad_entrega', 8, 2)->nullable();
            $table->string('estatus',50)->nullable();            

            $table->timestamps();

            $table->foreign('id_bett_semana')->references('id_bett_semana')->on('bett_semana');
            $table->foreign('id_bett_asociada')->references('id_bett_asociada')->on('bett_asociada');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bett_orden_entrega');
    }
}
