<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterVisitorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
    Schema::table('visitors', function(Blueprint $table){
            $table->string('rua', 60);
            $table->string('numero', 10);
            $table->string('cep', 12);
            $table->string('bairro', 60);
            $table->integer('cidade_id')->unsigned();
            $table->foreign('cidade_id')->references('id')->on('cities');
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
            $table->dropForeign('cidade_id');
            $table->dropColumn(['rua', 'numero', 'cep', 'bairro', 'cidade_id']);
        });
    }
}
