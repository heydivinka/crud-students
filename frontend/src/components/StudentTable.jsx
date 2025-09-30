    // StudentTable.jsx
    export default function StudentTable({ data, onEdit, onDelete }) {
    return (
        <div className="mt-8 overflow-x-auto">
        <table className="min-w-full border border-neutral-800 bg-neutral-900 rounded-lg overflow-hidden">
            <thead className="bg-neutral-800 text-neutral-300">
            <tr>
                {["#", "NISIN", "Nama", "Jurusan", "Angkatan", "Status", "Aksi"].map((h) => (
                <th key={h} className="px-4 py-3 text-left font-medium">
                    {h}
                </th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.length > 0 ? (
                data.map((student, index) => (
                <tr
                    key={student.id}
                    className="border-t border-neutral-800 hover:bg-neutral-800 transition"
                >
                    <td className="px-4 py-3 text-neutral-400">{index + 1}</td>
                    <td className="px-4 py-3">{student.nisin}</td>
                    <td className="px-4 py-3">{student.nama_lengkap}</td>
                    <td className="px-4 py-3">{student.jurusan}</td>
                    <td className="px-4 py-3">{student.angkatan}</td>
                    <td className="px-4 py-3">
                    {student.is_active ? (
                        <span className="text-emerald-400">Aktif</span>
                    ) : (
                        <span className="text-red-400">Nonaktif</span>
                    )}
                    </td>
                    <td className="px-4 py-3 flex gap-2">
                    <button
                        onClick={() => onEdit(student)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-black px-3 py-1 rounded-md text-sm font-medium transition"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(student.id)}
                        className="bg-red-600 hover:bg-red-500 text-white px-3 py-1 rounded-md text-sm font-medium transition"
                    >
                        Hapus
                    </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td
                    colSpan="7"
                    className="px-4 py-6 text-center text-neutral-500 italic"
                >
                    Tidak ada data siswa.
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
    }
