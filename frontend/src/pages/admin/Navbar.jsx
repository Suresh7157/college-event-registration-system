import {
    FaBell,
    FaUserCircle,
    FaUniversity,
    FaChevronDown
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Navbar() {

    return (

        <nav className="admin-navbar">

            {/* Left Side */}

            <div className="admin-navbar-left">

                <div className="navbar-logo">

                    <FaUniversity className="logo-icon" />

                    <div>

                        <h4>College Event Management</h4>

                        <small>Administrator Panel</small>

                    </div>

                </div>

            </div>

            {/* Right Side */}

            <div className="admin-navbar-right">

                {/* Notification */}

                <button className="notification-btn">

                    <FaBell />

                    <span className="notification-badge">
                        3
                    </span>

                </button>

                {/* Profile */}

                <NavLink
                    to="/admin/profile"
                    className="profile-link"
                >

                    <div className="admin-profile">

                        <FaUserCircle className="profile-icon" />

                        <div className="profile-details">

                            <h6>Administrator</h6>

                            <small>View Profile</small>

                        </div>

                        <FaChevronDown className="dropdown-icon" />

                    </div>

                </NavLink>

            </div>

        </nav>

    );

}

export default Navbar;