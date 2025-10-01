    import { useEffect, useState } from "react";
    import Swal from "sweetalert2";
    import api from "../utils/api";
    import { Save } from "lucide-react";

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
        photo: null,
    });

    useEffect(() => {
        if (selected) {
        setFormData({ ...selected, photo: null }); // jangan set file lama
        }
    }, [selected]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "nisin") {
        const onlyNumbers = value.replace(/\D/g, "");
        if (onlyNumbers.length <= 10) setFormData({ ...formData, [name]: onlyNumbers });
        } else if (name === "photo") {
        setFormData({ ...formData, photo: files[0] || null });
        } else {
        setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.nisin.length !== 10) {
        Swal.fire("Gagal!", "NISN harus 10 digit.", "error");
        return;
        }

        try {
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== null) data.append(key, formData[key]);
        });

        if (selected) {
            await api.post(`/students/${selected.id}?_method=PUT`, data, {
            headers: { "Content-Type": "multipart/form-data" },
            });
            Swal.fire("Updated!", "Data berhasil diperbarui!", "success");
        } else {
            await api.post("/students", data, {
            headers: { "Content-Type": "multipart/form-data" },
            });
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
            photo: null,
        });
        setSelected(null);
        } catch (error) {
        console.error(error.response?.data || error);
        Swal.fire("Gagal!", "Periksa input data.", "error");
        }
    };

    const inputClass =
        "bg-neutral-800/50 border border-neutral-700/50 rounded-lg px-4 py-2.5 text-white placeholder-neutral-400 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 w-full";

    const jurusanOptions = [
        { value: "", label: "Pilih Jurusan" },
        { value: "Animasi", label: "Animasi" },
        { value: "Broadcasting", label: "Broadcasting" },
        { value: "PPLG", label: "PPLG" },
        { value: "Teknik Otomotif", label: "Teknik Otomotif" },
        { value: "TPFL", label: "TPFL" },
    ];

    return (
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6 bg-neutral-900 p-6 rounded-xl shadow-lg">
        {[
            { name: "nisin", placeholder: "NISN", type: "text" },
            { name: "nama_lengkap", placeholder: "Nama Lengkap", type: "text" },
            { name: "tempat_lahir", placeholder: "Tempat Lahir", type: "text" },
            { name: "tanggal_lahir", placeholder: "Tanggal Lahir", type: "date" },
            { name: "alamat", placeholder: "Alamat", type: "text", span: 2 },
            { name: "jurusan", placeholder: "Jurusan", type: "select" },
            { name: "angkatan", placeholder: "Angkatan", type: "number" },
            { name: "no_hp", placeholder: "No HP", type: "text" },
            { name: "photo", placeholder: "Foto", type: "file", span: 2 },
        ].map((field) => (
            <div key={field.name} className={`${field.span === 2 ? "col-span-2" : ""}`}>
            {field.type === "select" ? (
                <select name={field.name} value={formData[field.name]} onChange={handleChange} required className={inputClass}>
                {jurusanOptions.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.value === ""}>
                    {option.label}
                    </option>
                ))}
                </select>
            ) : field.type === "file" ? (
                <input type="file" name={field.name} accept="image/*" onChange={handleChange} className={inputClass} />
            ) : (
                <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                value={formData[field.name]}
                onChange={handleChange}
                required
                maxLength={field.name === "nisin" ? 10 : undefined}
                className={inputClass}
                />
            )}
            </div>
        ))}
        <button type="submit" className="col-span-2 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 rounded-lg transition-all duration-200 font-medium shadow-md">
            <Save size={18} />
            {selected ? "Update Data" : "Tambah Data"}
        </button>
        </form>
    );
    }
