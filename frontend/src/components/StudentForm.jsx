    import { useEffect, useState } from "react";
    import Swal from "sweetalert2";
    import api from "../api";

    export default function StudentForm({ fetchStudents, selected, setSelected }) {
    const [formData, setFormData] = useState({
        nisin: "",
        nama_lengkap: "",
        tempat_lahir: "",
        tanggal_lahir: "",
        alamat: "",
        jurusan: "",
        angkatan: "",
        no_hp: "",
        added_by: "Admin",
        is_active: true,
    });

    useEffect(() => {
        if (selected) setFormData(selected);
    }, [selected]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
        if (selected) {
            await api.put(`/students/${selected.id}`, formData);
            Swal.fire("Berhasil!", "Data berhasil diperbarui!", "success");
        } else {
            await api.post("/students", formData);
            Swal.fire("Berhasil!", "Data berhasil ditambahkan!", "success");
        }
        fetchStudents();
        setFormData({
            nisin: "",
            nama_lengkap: "",
            tempat_lahir: "",
            tanggal_lahir: "",
            alamat: "",
            jurusan: "",
            angkatan: "",
            no_hp: "",
            added_by: "Admin",
            is_active: true,
        });
        setSelected(null);
        } catch (error) {
        console.error(error);
        Swal.fire("Gagal!", "Periksa input data.", "error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4 mt-6">
        <input
            type="text"
            name="nisin"
            placeholder="NISIN"
            value={formData.nisin}
            onChange={handleChange}
            className="border p-2 rounded"
            required
        />
        <input
            type="text"
            name="nama_lengkap"
            placeholder="Nama Lengkap"
            value={formData.nama_lengkap}
            onChange={handleChange}
            className="border p-2 rounded"
            required
        />
        <input
            type="text"
            name="tempat_lahir"
            placeholder="Tempat Lahir"
            value={formData.tempat_lahir}
            onChange={handleChange}
            className="border p-2 rounded"
            required
        />
        <input
            type="date"
            name="tanggal_lahir"
            value={formData.tanggal_lahir}
            onChange={handleChange}
            className="border p-2 rounded"
            required
        />
        <input
            type="text"
            name="alamat"
            placeholder="Alamat"
            value={formData.alamat}
            onChange={handleChange}
            className="border p-2 rounded col-span-2"
            required
        />
        <input
            type="text"
            name="jurusan"
            placeholder="Jurusan"
            value={formData.jurusan}
            onChange={handleChange}
            className="border p-2 rounded"
            required
        />
        <input
            type="number"
            name="angkatan"
            placeholder="Angkatan"
            value={formData.angkatan}
            onChange={handleChange}
            className="border p-2 rounded"
            required
        />
        <input
            type="text"
            name="no_hp"
            placeholder="No HP"
            value={formData.no_hp}
            onChange={handleChange}
            className="border p-2 rounded"
            required
        />

        <button
            type="submit"
            className="col-span-2 bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
            {selected ? "Update" : "Tambah"} Data
        </button>
        </form>
    );
    }
