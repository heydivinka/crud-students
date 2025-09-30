    // StudentForm.jsx
    import { useEffect, useState } from "react";
    import Swal from "sweetalert2";
    import api from "../utils/api";

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
            Swal.fire("Updated!", "Data berhasil diperbarui!", "success");
        } else {
            await api.post("/students", formData);
            Swal.fire("Added!", "Data berhasil ditambahkan!", "success");
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

    const inputClass =
        "bg-transparent border-b border-neutral-700 focus:border-emerald-500 outline-none py-2 text-white placeholder-neutral-500 transition";

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 mt-6">
        {[
            { name: "nisin", placeholder: "NISIN", type: "text" },
            { name: "nama_lengkap", placeholder: "Nama Lengkap", type: "text" },
            { name: "tempat_lahir", placeholder: "Tempat Lahir", type: "text" },
            { name: "tanggal_lahir", placeholder: "Tanggal Lahir", type: "date" },
            { name: "alamat", placeholder: "Alamat", type: "text", span: 2 },
            { name: "jurusan", placeholder: "Jurusan", type: "text" },
            { name: "angkatan", placeholder: "Angkatan", type: "number" },
            { name: "no_hp", placeholder: "No HP", type: "text" },
        ].map((field) => (
            <input
            key={field.name}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            required
            className={`${inputClass} ${field.span === 2 ? "col-span-2" : ""}`}
            />
        ))}

        <button
            type="submit"
            className="col-span-2 mt-4 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-md transition font-medium"
        >
            {selected ? "Update Data" : "Tambah Data"}
        </button>
        </form>
    );
    }
