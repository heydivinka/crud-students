    // Sidebar.jsx
    import { Link } from "react-router-dom";

    export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4">
        <nav className="flex flex-col gap-2">
            <Link to="/" className="hover:bg-gray-700 p-2 rounded">
            Dashboard
            </Link>
            <Link to="/students" className="hover:bg-gray-700 p-2 rounded">
            Students
            </Link>
        </nav>
        </aside>
    );
    }
