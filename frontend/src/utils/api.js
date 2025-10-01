    // src/utils/api.js
    import axios from "axios";

    const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api",
    headers: {
        "Content-Type": "application/json",
    },
    });
// buka http://127.0.0.1:8000/api/students untuk melihat data siswa di browser secara json
    export default api;
