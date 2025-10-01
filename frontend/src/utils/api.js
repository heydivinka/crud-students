    // src/utils/api.js
    import axios from "axios";

    const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    // Hapus headers default Content-Type
    // Biarkan axios otomatis menyesuaikan Content-Type saat kirim FormData
    });

    // Catatan: Jika mau kirim JSON biasa, tinggal append headers saat request
    // Contoh: api.post("/students", data, { headers: { "Content-Type": "application/json" } })

    export default api;
