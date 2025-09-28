    import { useEffect, useState } from "react";
    import api from "../utils/api";
    import { Link } from "react-router-dom";

    export default function Dashboard() {
    const [stats, setStats] = useState({
        total: 0,
        aktif: 0,
        tidakAktif: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        const res = await api.get("/students");
        const data = res.data;
        const aktif = data.filter(s => s.is_active).length;
        const tidakAktif = data.length - aktif;

        setStats({ total: data.length, aktif, tidakAktif });
    };

    return (
        <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white p-4 rounded shadow">
            <h2 className="text-lg">Total Siswa</h2>
            <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <div className="bg-green-500 text-white p-4 rounded shadow">
            <h2 className="text-lg">Siswa Aktif</h2>
            <p className="text-2xl font-bold">{stats.aktif}</p>
            </div>
            <div className="bg-red-500 text-white p-4 rounded shadow">
            <h2 className="text-lg">Tidak Aktif</h2>
            <p className="text-2xl font-bold">{stats.tidakAktif}</p>
            </div>
        </div>

        <div className="mt-6">
            <Link
            to="/students"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
            Kelola Data Siswa
            </Link>
        </div>
        </div>
    );
    }
