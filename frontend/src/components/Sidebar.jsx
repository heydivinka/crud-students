    import { useState } from "react";
    import { Link, useLocation } from "react-router-dom";
    import { Home, Users, ChevronLeft } from "lucide-react";
    import { motion, AnimatePresence } from "framer-motion";

    export default function Sidebar() {
    const [open, setOpen] = useState(true);
    const location = useLocation();

    const navItems = [
        { name: "Dashboard", icon: <Home size={18} />, path: "/" },
        { name: "Students", icon: <Users size={18} />, path: "/students" },
    ];

    return (
        <aside
        className={`
            bg-black border-r border-neutral-800 text-white h-screen 
            transition-all duration-500 ease-in-out flex flex-col
            ${open ? "w-64" : "w-20"}
        `}
        >
        {/* Header */}
        <div className="p-4 flex justify-between items-center relative">
            <AnimatePresence>
            {open && (
                <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="font-semibold text-lg"
                >
                Menu
                </motion.span>
            )}
            </AnimatePresence>
            <button
            onClick={() => setOpen(!open)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white transition-transform duration-500"
            >
            <motion.div
                animate={{ rotate: open ? 0 : 180 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                <ChevronLeft size={20} />
            </motion.div>
            </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 flex flex-col gap-1 px-2">
            {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
                <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors duration-300 ${
                    isActive
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "hover:bg-neutral-900 text-neutral-300"
                }`}
                >
                <span className="min-w-[24px] flex justify-center">{item.icon}</span>
                <AnimatePresence>
                    {open && (
                    <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {item.name}
                    </motion.span>
                    )}
                </AnimatePresence>
                </Link>
            );
            })}
        </nav>
        </aside>
    );
    }
