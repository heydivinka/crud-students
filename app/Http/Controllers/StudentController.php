<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Students;

class StudentController extends Controller
{
    // ===========================
    // Blade Methods
    // ===========================

    public function index()
    {
        $data = Students::all();
        return view('students.index', compact('data'));
    }

    public function create()
    {
        return view('students.create');
    }

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
            'photo' => 'nullable|image|max:5120', // 5MB
        ]);

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $validated['photo'] = 'uploads/' . $filename;
        }

        Students::create($validated);
        return redirect()->route('student.index')->with('success', 'Data berhasil ditambahkan!');
    }

    public function show(string $id)
    {
        $student = Students::findOrFail($id);
        return view('students.show', compact('student'));
    }

    public function edit(string $id)
    {
        $student = Students::findOrFail($id);
        return view('students.edit', compact('student'));
    }

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
            'photo' => 'nullable|image|max:5120', // 5MB
        ]);

        if ($request->hasFile('photo')) {
            if ($student->photo && file_exists(public_path($student->photo))) {
                unlink(public_path($student->photo));
            }
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $validated['photo'] = 'uploads/' . $filename;
        }

        $student->update($validated);
        return redirect()->route('student.index')->with('success', 'Data berhasil diperbarui!');
    }

    public function destroy(string $id)
    {
        $student = Students::findOrFail($id);
        if ($student->photo && file_exists(public_path($student->photo))) {
            unlink(public_path($student->photo));
        }
        $student->delete();
        return redirect()->route('student.index')->with('success', 'Data berhasil dihapus!');
    }

    // ===========================
    // API Methods (React / Frontend)
    // ===========================

    public function apiIndex()
    {
        return response()->json(Students::orderBy('nama_lengkap')->get());
    }

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
            'photo' => 'nullable|image|max:5120', // 5MB
        ]);

        if ($request->hasFile('photo')) {
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $validated['photo'] = 'uploads/' . $filename;
        }

        $student = Students::create($validated);
        return response()->json($student, 201);
    }

    public function apiShow(Students $student)
    {
        return response()->json($student);
    }

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
            'photo' => 'nullable|image|max:5120', // 5MB
        ]);

        if ($request->hasFile('photo')) {
            if ($student->photo && file_exists(public_path($student->photo))) {
                unlink(public_path($student->photo));
            }
            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads'), $filename);
            $validated['photo'] = 'uploads/' . $filename;
        }

        $student->update($validated);
        return response()->json($student);
    }

    public function apiDestroy(Students $student)
    {
        if ($student->photo && file_exists(public_path($student->photo))) {
            unlink(public_path($student->photo));
        }
        $student->delete();
        return response()->json(null, 204);
    }
}
