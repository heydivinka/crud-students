    // src/pages/Dashboard.jsx
    import { useEffect, useState, useRef } from "react";
    import api from "../utils/api";
    import { Link } from "react-router-dom";
    import {
    Users,
    UserCheck,
    UserX,
    CheckCircle2,
    XCircle,
    X,
    } from "lucide-react";
    import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    } from "recharts";
    import { motion } from "framer-motion";

    export default function Dashboard({ searchTerm }) {
    const [students, setStudents] = useState([]);
    const [stats, setStats] = useState({ total: 0, aktif: 0, tidakAktif: 0 });
    const [selectedStudent, setSelectedStudent] = useState(null);

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "";

    // 🔹 Ref untuk grid agar bisa di-scroll otomatis
    const gridRef = useRef(null);

    // Normalisasi: pastikan nilai is_active jadi boolean
    const normalizeStudent = (s) => ({
        ...s,
        is_active: s.is_active === true || s.is_active === 1 || s.is_active === "1",
    });

    const fetchStudents = async () => {
        try {
        const res = await api.get("/students");
        const data = Array.isArray(res.data) ? res.data : [];
        const normalized = data.map(normalizeStudent);
        setStudents(normalized);

        const aktif = normalized.filter((s) => s.is_active).length;
        setStats({
            total: normalized.length,
            aktif,
            tidakAktif: normalized.length - aktif,
        });
        } catch (err) {
        console.error("fetchStudents error:", err);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    // Data chart
    const chartData = [
        { name: "Total", value: stats.total },
        { name: "Aktif", value: stats.aktif },
        { name: "Tidak Aktif", value: stats.tidakAktif },
    ];

    // Filter hasil search
    const filteredStudents = students.filter((student) =>
        student.nama_lengkap.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 📜 Scroll otomatis ke grid saat searchTerm berubah
    useEffect(() => {
        if (searchTerm && gridRef.current) {
        gridRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-black text-white px-8 py-10 relative">
        <h1 className="text-4xl font-bold mb-8">Dashboard Siswa</h1>

        {/* Statistik cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
            <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:bg-neutral-800 transition-all">
            <Users className="w-10 h-10 text-white" />
            <div>
                <h2 className="text-lg opacity-80">Total Siswa</h2>
                <p className="text-3xl font-semibold">{stats.total}</p>
            </div>
            </div>

            <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:bg-neutral-800 transition-all">
            <UserCheck className="w-10 h-10 text-green-400" />
            <div>
                <h2 className="text-lg opacity-80">Siswa Aktif</h2>
                <p className="text-3xl font-semibold text-green-400">{stats.aktif}</p>
            </div>
            </div>

            <div className="bg-neutral-900 border border-white/10 p-6 rounded-2xl shadow-lg flex items-center gap-4 hover:bg-neutral-800 transition-all">
            <UserX className="w-10 h-10 text-red-400" />
            <div>
                <h2 className="text-lg opacity-80">Tidak Aktif</h2>
                <p className="text-3xl font-semibold text-red-400">
                {stats.tidakAktif}
                </p>
            </div>
            </div>
        </div>

        {/* Chart */}
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-lg mb-10">
            <h2 className="text-2xl font-bold mb-4">Statistik Visual</h2>
            <div className="w-full h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                data={chartData}
                margin={{ top: 30, right: 30, left: 0, bottom: 10 }}
                >
                <defs>
                    <linearGradient id="barColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity={0.5} />
                    </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                <XAxis
                    dataKey="name"
                    stroke="#aaa"
                    tickLine={false}
                    axisLine={{ stroke: "#333" }}
                />
                <YAxis
                    stroke="#aaa"
                    tickLine={false}
                    axisLine={{ stroke: "#333" }}
                />
                <Tooltip
                    cursor={{ fill: "rgba(255,255,255,0.05)" }}
                    contentStyle={{
                    backgroundColor: "#0f172a",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                    color: "#fff",
                    }}
                    labelStyle={{ color: "#38bdf8", fontWeight: "bold" }}
                    itemStyle={{ color: "#e2e8f0" }}
                />
                <Bar
                    dataKey="value"
                    fill="url(#barColor)"
                    radius={[12, 12, 0, 0]}
                    barSize={50}
                    animationDuration={1200}
                    label={{
                    position: "top",
                    fill: "#fff",
                    fontSize: 14,
                    fontWeight: "bold",
                    }}
                />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>

        {/* Grid siswa */}
        <div ref={gridRef} className="mt-10">
            <h2 className="text-2xl font-bold mb-6">Daftar Siswa</h2>

            {filteredStudents.length === 0 ? (
            <p className="text-neutral-500">Tidak ada siswa ditemukan.</p>
            ) : (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
            >
                {filteredStudents.map((student) => (
                <motion.div
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className="bg-neutral-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                >
                    <div className="w-full relative overflow-hidden">
                    <div className="pt-[100%] relative">
                        <img
                        src={
                            student.photo
                            ? `${backendUrl}/${student.photo}`
                            : "/placeholder.png"
                        }
                        alt={student.nama_lengkap}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        />
                    </div>
                    </div>

                    <div className="p-4 text-white">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                        {student.nama_lengkap}
                        </h3>
                        {student.is_active ? (
                        <CheckCircle2
                            className="w-4 h-4 text-green-400"
                            title="Aktif"
                        />
                        ) : (
                        <XCircle
                            className="w-4 h-4 text-red-400"
                            title="Tidak Aktif"
                        />
                        )}
                    </div>
                    <p className="text-sm opacity-80">NISN: {student.nisin}</p>
                    <p className="text-sm opacity-80">
                        Jurusan: {student.jurusan}
                    </p>
                    <p className="text-sm opacity-80">
                        Angkatan: {student.angkatan}
                    </p>
                    </div>
                </motion.div>
                ))}
            </motion.div>
            )}
        </div>

        <div className="mt-10">
            <Link
            to="/students"
            className="inline-block bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-neutral-200 transition-all shadow-md"
            >
            Kelola Data Siswa
            </Link>
        </div>

        {/* Modal Detail */}
        {selectedStudent && (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-neutral-900 p-6 rounded-2xl w-full max-w-lg relative border border-white/10">
                <button
                onClick={() => setSelectedStudent(null)}
                className="absolute top-3 right-3 text-white hover:text-red-400 transition"
                >
                <X className="w-6 h-6" />
                </button>

                <div className="flex flex-col items-center text-center">
                <img
                    src={
                    selectedStudent.photo
                        ? `${backendUrl}/${selectedStudent.photo}`
                        : "/placeholder.png"
                    }
                    alt={selectedStudent.nama_lengkap}
                    className="w-40 h-40 object-cover rounded-xl mb-4 border border-white/10"
                />
                <h3 className="text-2xl font-bold mb-2">
                    {selectedStudent.nama_lengkap}
                </h3>
                <p className="opacity-70 mb-4">
                    {selectedStudent.is_active
                    ? "Status: Aktif ✅"
                    : "Status: Tidak Aktif ❌"}
                </p>

                <div className="w-full text-left space-y-2 text-sm">
                    <p>
                    <span className="opacity-70">NISN:</span>{" "}
                    {selectedStudent.nisin}
                    </p>
                    <p>
                    <span className="opacity-70">Tempat Lahir:</span>{" "}
                    {selectedStudent.tempat_lahir}
                    </p>
                    <p>
                    <span className="opacity-70">Tanggal Lahir:</span>{" "}
                    {selectedStudent.tanggal_lahir}
                    </p>
                    <p>
                    <span className="opacity-70">Alamat:</span>{" "}
                    {selectedStudent.alamat}
                    </p>
                    <p>
                    <span className="opacity-70">Jurusan:</span>{" "}
                    {selectedStudent.jurusan}
                    </p>
                    <p>
                    <span className="opacity-70">Angkatan:</span>{" "}
                    {selectedStudent.angkatan}
                    </p>
                    <p>
                    <span className="opacity-70">No HP:</span>{" "}
                    {selectedStudent.no_hp}
                    </p>
                    <p>
                    <span className="opacity-70">Ditambahkan oleh:</span>{" "}
                    {selectedStudent.added_by}
                    </p>
                    <p>
                    <span className="opacity-70">Tanggal dibuat:</span>{" "}
                    {selectedStudent.created_at
                        ? new Date(
                            selectedStudent.created_at
                        ).toLocaleString()
                        : "-"}
                    </p>
                    <p>
                    <span className="opacity-70">Terakhir diubah:</span>{" "}
                    {selectedStudent.updated_at
                        ? new Date(
                            selectedStudent.updated_at
                        ).toLocaleString()
                        : "-"}
                    </p>
                </div>
                </div>
            </div>
            </div>
        )}
        </div>
    );
    }
