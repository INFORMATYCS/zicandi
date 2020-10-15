<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateControlVentasMeliTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('control_ventas_meli', function (Blueprint $table) {
            $table->increments('id_control_ventas_meli');          
            $table->integer('id_cuenta_tienda')->unsigned();
            $table->date('fecha_inicial',1)->nullable();
            $table->date('fecha_final',1)->nullable();
            $table->integer('total_registros')->nullable();
            $table->date('fecha_consulta',1)->nullable();
            $table->string('estatus',3);            

            $table->timestamps();

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
        Schema::dropIfExists('control_ventas_meli');
    }
}
