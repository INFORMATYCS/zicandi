<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateTempCargaStockTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('temp_carga_stock', function (Blueprint $table) {
            $table->increments('id_temp_carga_stock');                        
            $table->string('id_producto',12)->nullable();
            $table->string('id_almacen',12)->nullable();
            $table->string('codigo_producto',30)->nullable();
            $table->string('tipo_movimiento',20)->nullable();
            $table->string('codigo_ubicacion',20)->nullable();
            $table->string('cantidad', 12)->nullable();
            $table->decimal('piezas_operar', 8, 2);
            $table->decimal('stock_actual', 8, 2);
            $table->decimal('stock_nuevo', 8, 2);
            $table->string('lote_referencia',40)->nullable();
            $table->string('estatus',3)->nullable();
            $table->string('opt1',30)->nullable();
            $table->string('opt2',30)->nullable();
            $table->string('opt3',30)->nullable();
            $table->string('diagnostico',300)->nullable();
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
        Schema::dropIfExists('temp_carga_stock');
    }
}
