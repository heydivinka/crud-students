    import { useState, useEffect } from "react";
    import StudentForm from "../components/StudentForm";
    import StudentTable from "../components/StudentTable";
    import api from "../utils/api";
    import { UserPlus, Search } from "lucide-react";

    export default function StudentPage() {
    const [students, setStudents] = useState([]);
    const [selected, setSelected] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    // Fetch data siswa
    const fetchStudents = async () => {
        try {
        const res = await api.get("/students");
        setStudents(res.data);
        } catch (err) {
        console.error("Gagal fetch data:", err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const handleEdit = (student) => setSelected(student);

    const handleDelete = async (id) => {
        if (confirm("Yakin mau hapus data ini?")) {
        try {
            await api.delete(`/students/${id}`);
            fetchStudents();
        } catch (err) {
            console.error("Gagal hapus data:", err);
        }
        }
    };

    // Filter data berdasarkan prefix search
    const filteredStudents = students.filter((s) => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return true;

        if (term.startsWith("#")) {
        const idSearch = term.slice(1);
        return s.id.toString() === idSearch;
        }

        if (/^\d+$/.test(term) && term.length <= 10) {
        return s.nisin.toLowerCase().includes(term);
        }

        return s.nama_lengkap.toLowerCase().includes(term);
    });

    return (
        <div className="min-h-screen bg-black text-white px-8 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold">Data Siswa</h1>
        </div>

        {/* Form */}
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-lg mb-8">
            <StudentForm
            fetchStudents={fetchStudents}
            selected={selected}
            setSelected={setSelected}
            />
        </div>

        {/* Search + Table */}
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-lg">
            {/* Search Input */}
            <div className="mb-5 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 w-5 h-5" />
            <input
                type="text"
                placeholder='Cari: "#1" untuk ID, "12345" untuk NISIN, "nama" untuk Nama...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg py-2.5 pl-10 pr-4 text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            </div>

            <StudentTable
            data={filteredStudents}
            onEdit={handleEdit}
            onDelete={handleDelete}
            />
        </div>
        </div>
    );
    }
