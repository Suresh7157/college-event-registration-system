import { Outlet } from "react-router-dom";
import Sidebar from "../pages/admin/Sidebar";
import Navbar from "../pages/admin/Navbar";

function AdminLayout() {
    return (
        <div className="admin-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <Outlet />

            </div>

        </div>
    );
}

export default AdminLayout;