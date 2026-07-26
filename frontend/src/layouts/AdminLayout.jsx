import Sidebar from "../pages/admin/Sidebar.jsx";
import Navbar from "../pages/admin/Navbar.jsx";

function AdminLayout({ children }) {
    return (
        <div className="admin-layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                {children}

            </div>

        </div>
    );
}

export default AdminLayout;