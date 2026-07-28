import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar">

            {/* Left Side */}
            <div className="navbar-left">

                <h3>Admin Dashboard</h3>

                <div className="search-box">

                    <FaSearch className="search-icon" />

                    <input
                        type="text"
                        placeholder="Search..."
                    />

                </div>

            </div>

            {/* Right Side */}
            <div className="navbar-right">

                <button className="notification-btn">

                    <FaBell />

                    <span className="notification-badge">3</span>

                </button>

                <div className="profile">

                    <FaUserCircle className="profile-icon" />

                    <div>

                        <h6>Administrator</h6>

                        <small>System Admin</small>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;