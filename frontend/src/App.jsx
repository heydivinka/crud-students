import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import StudentPage from "./pages/StudentPage";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function App() {
  return (
    <Router>
      <div className="flex w-full min-h-screen bg-black text-white">
        {/* Sidebar */}
        <Sidebar />

        {/* Konten utama */}
        <div className="flex-1 flex flex-col">
          {/* Navbar di atas */}
          <Navbar />

          {/* Isi halaman */}
          <main className="flex-1 w-full">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/students" element={<StudentPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
