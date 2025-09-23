<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateGameStatisticsTable extends Migration
{
    public function up()
    {
        Schema::create('game_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('player_name');
            $table->string('computer_choice');
            $table->string('player_choice');
            $table->string('result');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('game_statistics');
    }
}
