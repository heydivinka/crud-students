<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Students;

class StudentController extends Controller
{
    /**
     * 📄 Tampilkan semua data siswa di halaman Blade.
     */
    public function index()
    {
        $data = Students::all();
        return view('students.index', compact('data'));
    }

    /**
     * 📝 Tampilkan form tambah siswa (Blade).
     */
    public function create()
    {
        return view('students.create');
    }

    /**
     * 💾 Simpan data siswa baru dari form Blade.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nisin' => 'required|unique:students',
            'nama_lengkap' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required',
            'jurusan' => 'required',
            'angkatan' => 'required|numeric',
            'no_hp' => 'required',
            'added_by' => 'nullable',
            'is_active' => 'boolean',
        ]);

        Students::create($validated);
        return redirect()->route('student.index')->with('success', 'Data berhasil ditambahkan!');
    }

    /**
     * 🔍 Tampilkan detail siswa tertentu.
     */
    public function show(string $id)
    {
        $student = Students::findOrFail($id);
        return view('students.show', compact('student'));
    }

    /**
     * ✏️ Tampilkan form edit siswa.
     */
    public function edit(string $id)
    {
        $student = Students::findOrFail($id);
        return view('students.edit', compact('student'));
    }

    /**
     * 🔄 Update data siswa dari form Blade.
     */
    public function update(Request $request, string $id)
    {
        $student = Students::findOrFail($id);

        $validated = $request->validate([
            'nisin' => 'required|unique:students,nisin,' . $student->id,
            'nama_lengkap' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required',
            'jurusan' => 'required',
            'angkatan' => 'required|numeric',
            'no_hp' => 'required',
            'added_by' => 'nullable',
            'is_active' => 'boolean',
        ]);

        $student->update($validated);
        return redirect()->route('student.index')->with('success', 'Data berhasil diperbarui!');
    }

    /**
     * 🗑️ Hapus data siswa.
     */
    public function destroy(string $id)
    {
        $student = Students::findOrFail($id);
        $student->delete();
        return redirect()->route('student.index')->with('success', 'Data berhasil dihapus!');
    }

    // ============================================================
    // 🔹 BAGIAN API UNTUK REACT / FRONTEND MODERN
    // ============================================================

    /**
     * 📡 Ambil semua data siswa dalam bentuk JSON.
     */
    public function apiIndex()
    {
        return response()->json(Students::orderBy('nama_lengkap')->get());
    }

    /**
     * ➕ Tambah siswa (API)
     */
    public function apiStore(Request $request)
    {
        $validated = $request->validate([
            'nisin' => 'required|unique:students',
            'nama_lengkap' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required',
            'jurusan' => 'required',
            'angkatan' => 'required|numeric',
            'no_hp' => 'required',
            'added_by' => 'nullable',
            'is_active' => 'boolean',
        ]);

        $student = Students::create($validated);
        return response()->json($student, 201);
    }

    /**
     * 🔍 Ambil detail siswa tertentu (API)
     */
    public function apiShow(Students $student)
    {
        return response()->json($student);
    }

    /**
     * ✏️ Update data siswa (API)
     */
    public function apiUpdate(Request $request, Students $student)
    {
        $validated = $request->validate([
            'nisin' => 'required|unique:students,nisin,' . $student->id,
            'nama_lengkap' => 'required',
            'tempat_lahir' => 'required',
            'tanggal_lahir' => 'required|date',
            'alamat' => 'required',
            'jurusan' => 'required',
            'angkatan' => 'required|numeric',
            'no_hp' => 'required',
            'added_by' => 'nullable',
            'is_active' => 'boolean',
        ]);

        $student->update($validated);
        return response()->json($student);
    }

    /**
     * 🗑️ Hapus siswa (API)
     */
    public function apiDestroy(Students $student)
    {
        $student->delete();
        return response()->json(null, 204);
    }
}
