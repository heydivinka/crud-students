    import { useEffect } from "react";
    import Swal from "sweetalert2";
    import api from "../api";

    export default function StudentList({ students, setStudents, onEdit }) {
    // Hapus data
    const handleDelete = async (id) => {
        const confirm = await Swal.fire({
        title: "Yakin ingin menghapus?",
        text: "Data ini tidak bisa dikembalikan!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Ya, hapus",
        cancelButtonText: "Batal",
        });

        if (confirm.isConfirmed) {
        try {
            await api.delete(`/students/${id}`);
            setStudents(students.filter((s) => s.id !== id));
            Swal.fire("Berhasil!", "Data telah dihapus.", "success");
        } catch (error) {
            console.error(error);
            Swal.fire("Gagal!", "Terjadi kesalahan saat menghapus.", "error");
        }
        }
    };

    return (
        <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-200 shadow-md">
            <thead className="bg-gray-100">
            <tr>
                <th className="p-2 border">No</th>
                <th className="p-2 border">NISIN</th>
                <th className="p-2 border">Nama Lengkap</th>
                <th className="p-2 border">Jurusan</th>
                <th className="p-2 border">Aksi</th>
            </tr>
            </thead>
            <tbody>
            {students.length > 0 ? (
                students.map((s, i) => (
                <tr key={s.id} className="text-center hover:bg-gray-50">
                    <td className="p-2 border">{i + 1}</td>
                    <td className="p-2 border">{s.nisin}</td>
                    <td className="p-2 border">{s.nama_lengkap}</td>
                    <td className="p-2 border">{s.jurusan}</td>
                    <td className="p-2 border">
                    <button
                        onClick={() => onEdit(s)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => handleDelete(s.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                        Hapus
                    </button>
                    </td>
                </tr>
                ))
            ) : (
                <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                    Tidak ada data.
                </td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
    }
