import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import AdminLayout from "./layouts/AdminLayout";

import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Events from "./pages/admin/Events";
import Volunteers from "./pages/admin/Volunteers";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";

function App() {
    return (
        <Routes>

            <Route path="/" element={<Navigate to="/login" replace />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/admin" element={<AdminLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="users" element={<Users />} />
                <Route path="events" element={<Events />} />
                <Route path="volunteers" element={<Volunteers />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
            </Route>

        </Routes>
    );
}

export default App;