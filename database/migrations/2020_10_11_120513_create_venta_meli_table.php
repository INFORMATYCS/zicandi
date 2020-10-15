<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateVentaMeliTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('venta_meli', function (Blueprint $table) {
            $table->increments('id_venta_meli');       
            $table->integer('id_control_ventas_meli')->unsigned();   
            $table->integer('id_cuenta_tienda')->unsigned();
            $table->bigInteger('id_paquete_meli')->nullable();   
            $table->bigInteger('id_orden_meli')->index();
            $table->string('id_publicacion',30);
            $table->bigInteger('id_variante')->nullable();   
            $table->string('titulo',60);
            $table->bigInteger('id_pago');
            $table->date('fecha_pago',1);
            $table->decimal('monto_pagado', 8, 2);
            $table->integer('cantidad');
            $table->decimal('precio_venta', 8, 2);
            $table->decimal('comision', 8, 2);
            $table->decimal('isr', 8, 2)->nullable();
            $table->decimal('iva', 8, 2);
            $table->decimal('neto', 8, 2)->nullable();
            $table->decimal('precio_compra', 8, 2)->nullable();
            $table->decimal('utl_monto', 8, 2)->nullable();
            $table->decimal('utl_porcentaje', 8, 2)->nullable();
            $table->bigInteger('id_envio');
            $table->string('nombre_cliente',40);            
            $table->string('direccion_entrega',150)->nullable();          
            $table->string('metodo_envio',15)->nullable();
            $table->decimal('costo_envio_cliente', 8, 2)->nullable();
            $table->decimal('costo_envio_empresa', 8, 2)->nullable();
            $table->string('nota',300)->nullable();
            $table->string('estatus_meli',15);
            $table->string('estatus',3);


            $table->timestamps();

            $table->foreign('id_cuenta_tienda')->references('id_cuenta_tienda')->on('cuenta_tienda');
            $table->foreign('id_control_ventas_meli')->references('id_control_ventas_meli')->on('control_ventas_meli');            
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('venta_meli');
    }
}
