    import React from "react";
    import ReactDOM from "react-dom/client";

    function App() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-4xl font-bold text-blue-600">React + Tailwind v4 ✅</h1>
        <p className="text-gray-600 mt-2">Terhubung ke Laravel via Vite</p>
        </div>
    );
    }

    ReactDOM.createRoot(document.getElementById("root")).render(<App />);
