<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddPrecioReferenciadoProducto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        Schema::table('producto', function (Blueprint $table) {            
            $table->decimal('precio_referenciado', 8, 2)->nullable()->after('ultimo_precio_compra');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(){
        $table->dropColumn('precio_referenciado');
    }
}
