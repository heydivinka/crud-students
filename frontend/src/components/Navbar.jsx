// Navbar.jsx
import { Search, Bell, UserCircle2 } from "lucide-react";

export default function Navbar({ searchTerm, setSearchTerm }) {
  return (
    <header className="bg-black border-b border-neutral-800 px-6 py-3 flex justify-between items-center text-white">
      {/* Judul */}
      <div className="text-xl font-semibold tracking-tight">CRUD App</div>

      {/* Search Input */}
      <div className="flex-1 max-w-lg mx-10">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Cari nama siswa..."
            className="w-full bg-neutral-900 text-white placeholder-neutral-500 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
          />
          <Search className="absolute left-3 top-2.5 text-neutral-500" size={18} />
        </div>
      </div>

      {/* Ikon kanan */}
      <div className="flex items-center gap-4">
        <Bell className="text-neutral-400 hover:text-white cursor-pointer transition" />
        <div className="flex items-center gap-2 cursor-pointer">
          <UserCircle2 className="text-white" size={28} />
          <span className="text-sm font-medium text-neutral-300">Admin</span>
        </div>
      </div>
    </header>
  );
}
