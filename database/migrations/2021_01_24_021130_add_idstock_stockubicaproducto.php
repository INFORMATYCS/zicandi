<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddIdstockStockubicaproducto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('stock_ubica_producto', function (Blueprint $table) {                        
            $table->integer('id_stock_producto')->unsigned()->after('id_stock_ubica_producto');

            $table->foreign('id_stock_producto')->references('id_stock_producto')->on('stock_producto');
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
