import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <div className="sidebar">

            {/* Logo */}
            <div className="sidebar-header">
                <h2>CEMS</h2>
                <p>Admin Panel</p>
            </div>

            {/* Menu */}
            <ul className="sidebar-menu">

                <li>
                    <NavLink
                        to="/admin/dashboard"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        <i className="bi bi-speedometer2"></i>
                        <span>Dashboard</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/admin/users"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        <i className="bi bi-people"></i>
                        <span>Users</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/admin/events"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        <i className="bi bi-calendar-event"></i>
                        <span>Events</span>
                    </NavLink>
                </li>

                <li>
                    <NavLink
                        to="/admin/organizers"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        <i className="bi bi-person-workspace me-2"></i>
                        <span>Organizers</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/volunteers"
                        className={({ isActive }) =>
                            isActive ? "nav-link active" : "nav-link"
                        }
                    >
                        <i className="bi bi-person-badge"></i>
                        <span>Volunteers</span>
                    </NavLink>
                </li>



                <li className="logout">
                    <NavLink to="/login" className="nav-link">
                        <i className="bi bi-box-arrow-right"></i>
                        <span>Logout</span>
                    </NavLink>
                </li>


            </ul>

        </div>
    );
}

export default Sidebar;