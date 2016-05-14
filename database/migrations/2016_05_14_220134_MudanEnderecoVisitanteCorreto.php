<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class MudanEnderecoVisitanteCorreto extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {   

         Schema::table('visitors', function(Blueprint $table){
            $table->dropColumn('users_id');
            $table->dropColumn('cidade_id');
        });

        Schema::table('visitors', function(Blueprint $table){
            $table->integer('user_id')->unsigned();
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('visitors', function(Blueprint $table){
            $table->dropForeign('visitors_user_id_foreign');
            $table->dropColumn(['cidade', 'estado']);
            $table->integer('cidade_id')->unsigned();
        });
    }
}
