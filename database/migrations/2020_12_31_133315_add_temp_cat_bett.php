<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AddTempCatBett extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('temp_cat_bett', function (Blueprint $table) {                        
            $table->string('categoria', 50)->nullable()->after('imagen_mini');
            $table->text('espec_json')->nullable()->after('categoria');
            $table->string('imagen_respaldo',250)->nullable()->after('imagen');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        $table->dropColumn('categoria');
        $table->dropColumn('espec_json');
    }
}
