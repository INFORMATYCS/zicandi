<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCuentaTiendaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cuenta_tienda', function (Blueprint $table) {
            $table->increments('id_cuenta_tienda');            
            $table->integer('id_tienda')->unsigned();            
            $table->string('usuario',15);
            $table->string('correo',30)->nullable();
            $table->string('telefono',15)->nullable();
            $table->string('att_id',20)->nullable();
            $table->string('att_user_id',20)->nullable();
            $table->string('att_access_token',150)->nullable();
            $table->date('att_expira_token',1)->nullable();
            $table->string('estatus',15);            
            $table->timestamps();

                        
            $table->foreign('id_tienda')->references('id_tienda')->on('tienda');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cuenta_tienda');
    }
}
