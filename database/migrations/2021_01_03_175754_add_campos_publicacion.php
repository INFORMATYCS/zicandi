<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddCamposPublicacion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(){
        Schema::table('publicacion', function (Blueprint $table) {                        
            $table->string('tipo_listing', 15)->nullable()->after('envio_gratis');
            $table->decimal('costo_envio', 8, 2)->nullable()->after('tipo_listing');
            $table->decimal('comision_venta', 8, 2)->nullable()->after('costo_envio');
            $table->decimal('iva', 8, 2)->nullable()->after('comision_venta');
            $table->decimal('isr', 8, 2)->nullable()->after('iva');
            $table->decimal('neto_venta_final', 8, 2)->nullable()->after('isr');
            $table->decimal('ultimo_precio_compra', 8, 2)->nullable()->after('neto_venta_final');                                       
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $table->dropColumn('tipo_listing');
        $table->dropColumn('costo_envio');
        $table->dropColumn('comision_venta');
        $table->dropColumn('iva');
        $table->dropColumn('isr');
        $table->dropColumn('neto_venta_final');
        $table->dropColumn('ultimo_precio_compra');        
    }
}
