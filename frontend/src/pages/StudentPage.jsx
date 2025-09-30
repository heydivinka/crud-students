    import { useState, useEffect } from "react";
    import StudentForm from "../components/StudentForm";
    import StudentTable from "../components/StudentTable";
    import api from "../utils/api";
    import { UserPlus } from "lucide-react";

    export default function StudentPage() {
    const [students, setStudents] = useState([]);
    const [selected, setSelected] = useState(null);

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

    return (
        <div className="min-h-screen bg-black text-white px-8 py-10">
        <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-8 h-8 text-white" />
            <h1 className="text-3xl font-bold">Data Siswa</h1>
        </div>

        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-lg mb-8">
            <StudentForm
            fetchStudents={fetchStudents}
            selected={selected}
            setSelected={setSelected}
            />
        </div>

        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-lg">
            <StudentTable
            data={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
            />
        </div>
        </div>
    );
    }
