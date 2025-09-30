    import { useEffect, useState } from "react";
    import api from "../utils/api";
    import { Link } from "react-router-dom";
    import { Users, UserCheck, UserX } from "lucide-react";
    import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    } from "recharts";

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
        const aktif = data.filter((s) => s.is_active).length;
        const tidakAktif = data.length - aktif;

        setStats({ total: data.length, aktif, tidakAktif });
    };

    // Data untuk chart
    const chartData = [
        { name: "Total", value: stats.total },
        { name: "Aktif", value: stats.aktif },
        { name: "Tidak Aktif", value: stats.tidakAktif },
    ];

    return (
        <div className="min-h-screen bg-black text-white px-8 py-10">
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
                <p className="text-3xl font-semibold text-red-400">{stats.tidakAktif}</p>
            </div>
            </div>
        </div>

        {/* Chart */}
        <div className="bg-neutral-900 border border-white/10 rounded-2xl p-6 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Statistik Visual</h2>
            <div className="w-full h-72">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis dataKey="name" stroke="#fff" />
                <YAxis stroke="#fff" />
                <Tooltip
                    contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid #444",
                    color: "#fff",
                    }}
                />
                <Bar dataKey="value" fill="#38bdf8" radius={[6, 6, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
            </div>
        </div>

        <div className="mt-10">
            <Link
            to="/students"
            className="inline-block bg-white text-black px-6 py-3 rounded-xl font-medium hover:bg-neutral-200 transition-all shadow-md"
            >
            Kelola Data Siswa
            </Link>
        </div>
        </div>
    );
    }
