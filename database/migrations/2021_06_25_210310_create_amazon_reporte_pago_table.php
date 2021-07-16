<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAmazonReportePagoTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('amazon_reporte_pago', function (Blueprint $table) {
            $table->increments('id_amazon_reporte_pago');             
            $table->date('fecha_operacion',1)->nullable();
            $table->string('numero_pedido',50)->nullable();
            $table->string('sku',50)->nullable();
            $table->string('tipo_transaccion',50)->nullable();
            $table->string('tipo_pago',50)->nullable();
            $table->string('detalle_pago',50)->nullable();
            $table->decimal('monto', 8, 2);
            $table->decimal('cantidad', 8, 2);
            $table->string('titulo_producto',120)->nullable();
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
        Schema::dropIfExists('amazon_reporte_pago');
    }
}
