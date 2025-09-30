    // Sidebar.jsx
    import { useState } from "react";
    import { Link, useLocation } from "react-router-dom";
    import { Home, Users } from "lucide-react";

    export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", icon: <Home size={18} />, path: "/" },
        { name: "Students", icon: <Users size={18} />, path: "/students" },
    ];

    return (
        <aside
        className={`${
            open ? "w-64" : "w-20"
        } bg-black border-r border-neutral-800 text-white h-screen transition-all duration-300 flex flex-col`}
        >
        <div className="p-4 flex justify-between items-center">
            <span className={`font-semibold text-lg transition-all ${!open && "opacity-0"}`}>
            Menu
            </span>
            <button
            onClick={() => setOpen(!open)}
            className="text-neutral-400 hover:text-white transition"
            >
            ☰
            </button>
        </div>
        <nav className="mt-4 flex flex-col gap-1">
            {navItems.map((item) => (
            <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${
                location.pathname === item.path
                    ? "bg-emerald-600 text-white"
                    : "hover:bg-neutral-900 text-neutral-300"
                }`}
            >
                {item.icon}
                {open && <span>{item.name}</span>}
            </Link>
            ))}
        </nav>
        </aside>
    );
    }
