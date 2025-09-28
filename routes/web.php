<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('reacts');
});


// Route CRUD Student (tanpa login)
Route::resource('/student', StudentController::class);
