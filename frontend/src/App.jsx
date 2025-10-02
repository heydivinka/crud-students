import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentPage from "./pages/StudentPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer"; // ✅ tambahkan ini

export default function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Router>
      <div className="flex w-full min-h-screen bg-black text-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Konten utama */}
        <div className="flex-1 flex flex-col">
          {/* Navbar */}
          <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          {/* Isi halaman */}
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Dashboard searchTerm={searchTerm} />} />
              <Route path="/students" element={<StudentPage />} />
            </Routes>
          </main>

          {/* Footer */}
          <Footer /> {/* ✅ tampil di bawah semua halaman */}
        </div>
      </div>
    </Router>
  );
}
