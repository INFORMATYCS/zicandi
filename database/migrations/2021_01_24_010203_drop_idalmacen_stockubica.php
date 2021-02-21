<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class DropIdalmacenStockubica extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {        

        Schema::table('stock_ubica_producto', function (Blueprint $table) {      
            $table->dropForeign(['id_almacen']);                  
            $table->dropColumn('id_almacen');                                      
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
