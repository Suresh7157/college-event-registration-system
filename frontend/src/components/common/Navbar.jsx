import { NavLink } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
            <div className="container">

                {/* Logo */}
                <NavLink className="navbar-brand fw-bold" to="/">
                    🎓 College Events
                </NavLink>

                {/* Mobile Toggle */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarContent"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Links */}
                <div className="collapse navbar-collapse" id="navbarContent">

                    <ul className="navbar-nav ms-auto align-items-lg-center">

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">
                                <i className="bi bi-house-door-fill me-1"></i>
                                Home
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/events">
                                <i className="bi bi-calendar-event me-1"></i>
                                Events
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/my-registrations">
                                <i className="bi bi-journal-check me-1"></i>
                                My Registrations
                            </NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink className="nav-link" to="/registration-status">
                                <i className="bi bi-check-circle me-1"></i>
                                Status
                            </NavLink>
                        </li>

                        <li className="nav-item ms-lg-3">
                            <button className="btn btn-light rounded-pill">
                                <i className="bi bi-person-circle"></i>
                            </button>
                        </li>

                    </ul>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;