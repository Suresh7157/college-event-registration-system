import { NavLink } from "react-router-dom";
function Sidebar() {

    return (

        <div className="sidebar">

            <div className="sidebar-header">

                <h3>CEMS</h3>

                <small>Admin Panel</small>

            </div>

            <ul className="nav flex-column mt-3">

                <li>
                    <a href="/admin/dashboard" className="nav-link active">
                        <i className="bi bi-speedometer2 me-2"></i>
                        Dashboard
                    </a>
                </li>

                <li>
                    <a href="/admin/users" className="nav-link">
                        <i className="bi bi-people me-2"></i>
                        Users
                    </a>
                </li>

                <li>
                    <a href="/admin/events" className="nav-link">
                        <i className="bi bi-calendar-event me-2"></i>
                        Events
                    </a>
                </li>

                <li>
                    <a href="/admin/volunteers" className="nav-link">
                        <i className="bi bi-person-badge me-2"></i>
                        Volunteers
                    </a>
                </li>

                <li>
                    <a href="/admin/reports" className="nav-link">
                        <i className="bi bi-bar-chart me-2"></i>
                        Reports
                    </a>
                </li>

                <li className="mt-5">
                    <a href="#" className="nav-link">
                        <i className="bi bi-box-arrow-right me-2"></i>
                        Logout
                    </a>
                </li>

            </ul>

        </div>

    );

}

export default Sidebar;