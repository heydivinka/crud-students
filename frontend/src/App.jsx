import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Ambil data dari Laravel API
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Gagal mengambil data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/students", { name, email });
      setName("");
      setEmail("");
      fetchStudents(); // refresh data
    } catch (error) {
      console.error("Gagal menambah data:", error);
    }
  };

  return (
    <div className="container">
      <h1>CRUD React + Laravel</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Tambah</button>
      </form>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
