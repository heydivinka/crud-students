    import { useState, useEffect } from "react";
    import StudentForm from "../components/StudentForm";
    import StudentTable from "../components/StudentTable";
    import api from "../utils/api";

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
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Data Siswa</h1>
        <StudentForm
            fetchStudents={fetchStudents}
            selected={selected}
            setSelected={setSelected}
        />
        <StudentTable
            data={students}
            onEdit={handleEdit}
            onDelete={handleDelete}
        />
        </div>
    );
    }
