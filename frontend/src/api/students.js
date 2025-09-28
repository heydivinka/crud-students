    // src/api/students.js
    const API_URL = "http://127.0.0.1:8000/api/students";

    export async function getAllStudents() {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Gagal mengambil data siswa");
    return await response.json();
    }

    export async function createStudent(data) {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error("Gagal menambah siswa");
    return await response.json();
    }

    // tambahkan update & delete jika perlu
