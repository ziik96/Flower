<?php
namespace App\Http\Controllers;

use Illuminate\Support\Facades\Route;

Route::get('/', [GameController::class,'index'])->name('game.index');
Route::post('/play', [GameController::class,'play'])->name('game.play');
