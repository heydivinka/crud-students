import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentPage from "./pages/StudentPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  // 🔍 State global untuk pencarian siswa
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="flex w-full min-h-screen bg-black text-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Konten utama */}
        <div className="flex-1 flex flex-col">
          {/* Navbar di atas */}
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Isi halaman */}
          <main className="flex-1 w-full">
            <Routes>
              {/* Kirim searchTerm ke Dashboard */}
              <Route path="/" element={<Dashboard searchTerm={searchTerm} />} />
              <Route path="/students" element={<StudentPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
