    import React from "react";

    export default function StudentTable({ data, onEdit, onDelete }) {
    return (
        <table className="min-w-full border border-gray-300 mt-6">
        <thead>
            <tr className="bg-gray-100">
            <th className="border px-4 py-2">No</th>
            <th className="border px-4 py-2">NISIN</th>
            <th className="border px-4 py-2">Nama Lengkap</th>
            <th className="border px-4 py-2">Jurusan</th>
            <th className="border px-4 py-2">Angkatan</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Aksi</th>
            </tr>
        </thead>
        <tbody>
            {data.length > 0 ? (
            data.map((student, index) => (
                <tr key={student.id} className="text-center">
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{student.nisin}</td>
                <td className="border px-4 py-2">{student.nama_lengkap}</td>
                <td className="border px-4 py-2">{student.jurusan}</td>
                <td className="border px-4 py-2">{student.angkatan}</td>
                <td className="border px-4 py-2">
                    {student.is_active ? (
                    <span className="text-green-600 font-semibold">Aktif</span>
                    ) : (
                    <span className="text-red-600 font-semibold">Nonaktif</span>
                    )}
                </td>
                <td className="border px-4 py-2 space-x-2">
                    <button
                    onClick={() => onEdit(student)}
                    className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                    Edit
                    </button>
                    <button
                    onClick={() => onDelete(student.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                    Hapus
                    </button>
                </td>
                </tr>
            ))
            ) : (
            <tr>
                <td colSpan="7" className="border px-4 py-2 text-center">
                Tidak ada data
                </td>
            </tr>
            )}
        </tbody>
        </table>
    );
    }
