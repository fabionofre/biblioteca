<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterTableCabinets extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('cabinets', function (Blueprint $table) {
            $table->dropColumn(['em_uso', 'quebrado']);
            $table->enum('status', ['em_uso', 'quebrado', 'livre']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('cabinets', function(Blueprint $table){
            $table->boolean('em_uso');
            $table->boolean('quebrado');
            $table->dropColumn('status');
        });
    }
}
