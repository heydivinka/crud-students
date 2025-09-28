    import React from 'react';
    import ReactDOM from 'react-dom/client';

    // Buat komponen sederhana
    function App() {
    return <h1>Halo, React di Vite!</h1>;
    }

    // Render komponen ke DOM
    ReactDOM.createRoot(document.getElementById('app')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
    );