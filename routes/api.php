<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::get('/students', [StudentController::class, 'apiIndex']);     // 🔹 GET semua siswa
Route::post('/students', [StudentController::class, 'apiStore']);    // 🔹 POST tambah siswa
Route::get('/students/{student}', [StudentController::class, 'apiShow']);  // 🔹 GET detail siswa
Route::put('/students/{student}', [StudentController::class, 'apiUpdate']); // 🔹 PUT update siswa
Route::delete('/students/{student}', [StudentController::class, 'apiDestroy']); // 🔹 DELETE hapus siswa
// Tambahkan route lain sesuai kebutuhan