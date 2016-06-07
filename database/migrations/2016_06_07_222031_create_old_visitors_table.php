<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOldVisitorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('old_visitors', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name', 60);
            $table->string('cpf', 14);
            $table->string('rg', 11);
            $table->string('phone', 14);
            $table->integer('address');
            $table->integer('maker');
            $table->integer('status');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('old_visitors');
    }
}
