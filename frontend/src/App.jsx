import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Events from "./pages/admin/Events";
import Volunteers from "./pages/admin/Volunteers";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

function App() {
    return (
        <AdminLayout>
            <Routes>
                <Route path="/" element={<Navigate to="/admin/dashboard" />} />

                <Route path="/admin/dashboard" element={<Dashboard />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/events" element={<Events />} />

                <Route path="/admin/reports" element={<Reports />} />
                <Route path="/admin/settings" element={<Settings />} />

                <Route path="/admin/volunteers" element={<Volunteers />} />
                <Route path="/admin/reports" element={<Reports />} />
            </Routes>
        </AdminLayout>
    );
}

export default App;
