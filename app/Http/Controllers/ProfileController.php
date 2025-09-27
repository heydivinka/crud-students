<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    // Tampilkan halaman edit profil
    public function edit()
    {
        return view('profile.edit');
    }

    // Update data profil
    public function update(Request $request)
    {
        // logika update data nanti diisi sesuai kebutuhan
        return redirect()->route('profile.edit')->with('success', 'Profil berhasil diperbarui!');
    }

    // Hapus akun (opsional)
    public function destroy()
    {
        // logika hapus akun
        return redirect('/')->with('success', 'Akun berhasil dihapus!');
    }
}
