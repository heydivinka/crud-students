<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Students extends Model
{
    use HasFactory;

    // Kolom yang bisa diisi mass assignment
    protected $fillable = [
        'nisin',
        'nama_lengkap',
        'tempat_lahir',
        'tanggal_lahir',
        'alamat',
        'jurusan',
        'angkatan',
        'no_hp',
        'added_by',
        'is_active',
        'photo', // tambahkan kolom foto
    ];
}
