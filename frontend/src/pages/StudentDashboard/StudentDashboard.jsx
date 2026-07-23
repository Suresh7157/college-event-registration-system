import { Link, useNavigate } from "react-router-dom";

import "../../styles/dashboard.css";
import Navbar from "../../components/layout/Navbar";
function StudentDashboard() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const handleLogout = () => {

        localStorage.clear();

        navigate("/login");

    };

    return (

        <>

            <Navbar />

            <div className="container py-5">

                {/* Welcome */}

                <div className="mb-5">

                    <h2 className="fw-bold">
                        Welcome, {user?.fullName || "Student"} 👋
                    </h2>

                    <p className="text-muted">
                        Manage your college events and registrations from one place.
                    </p>

                </div>

                {/* Statistics */}

                <div className="row g-4 mb-5">

                    <div className="col-md-3">

                        <div className="card stat-card">

                            <div className="card-body text-center">

                                <h2>12</h2>

                                <p>Total Events</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card stat-card">

                            <div className="card-body text-center">

                                <h2>3</h2>

                                <p>Registered Events</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card stat-card">

                            <div className="card-body text-center">

                                <h2>1</h2>

                                <p>Upcoming Events</p>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-3">

                        <div className="card stat-card">

                            <div className="card-body text-center">

                                <h2>0</h2>

                                <p>Volunteer Applications</p>

                            </div>

                        </div>

                    </div>

                </div>

                {/* Action Cards */}

                <div className="row g-4">

                    {/* Events */}

                    <div className="col-lg-4">

                        <div className="card dashboard-card h-100">

                            <div className="card-body text-center">

                                <div className="icon">
                                    📅
                                </div>

                                <h4>
                                    Available Events
                                </h4>

                                <p>
                                    Browse all available college events.
                                </p>

                                <Link
                                    to="/events"
                                    className="btn btn-primary"
                                >
                                    View Events
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* Registrations */}

                    <div className="col-lg-4">

                        <div className="card dashboard-card h-100">

                            <div className="card-body text-center">

                                <div className="icon">
                                    📝
                                </div>

                                <h4>
                                    My Registrations
                                </h4>

                                <p>
                                    View all your registered events.
                                </p>

                                <Link
                                    to="/my-registrations"
                                    className="btn btn-success"
                                >
                                    My Registrations
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* Status */}

                    <div className="col-lg-4">

                        <div className="card dashboard-card h-100">

                            <div className="card-body text-center">

                                <div className="icon">
                                    📊
                                </div>

                                <h4>
                                    Registration Status
                                </h4>

                                <p>
                                    Track your registration status.
                                </p>

                                <Link
                                    to="/registration-status"
                                    className="btn btn-warning"
                                >
                                    View Status
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* Volunteer */}

                    <div className="col-lg-4">

                        <div className="card dashboard-card h-100">

                            <div className="card-body text-center">

                                <div className="icon">
                                    🙋
                                </div>

                                <h4>
                                    Apply as Volunteer
                                </h4>

                                <p>
                                    Become a volunteer for college events.
                                </p>

                                <Link
                                    to="/volunteer/dashboard"
                                    className="btn btn-info"
                                >
                                    Apply
                                </Link>

                            </div>

                        </div>

                    </div>

                    {/* Profile */}

                    <div className="col-lg-4">

                        <div className="card dashboard-card h-100">

                            <div className="card-body text-center">

                                <div className="icon">
                                    👤
                                </div>

                                <h4>
                                    My Profile
                                </h4>

                                <p>
                                    View your personal information.
                                </p>

                                <button
                                    className="btn btn-secondary"
                                >
                                    Profile
                                </button>

                            </div>

                        </div>

                    </div>

                    {/* Logout */}

                    <div className="col-lg-4">

                        <div className="card dashboard-card h-100">

                            <div className="card-body text-center">

                                <div className="icon">
                                    🚪
                                </div>

                                <h4>
                                    Logout
                                </h4>

                                <p>
                                    Securely logout from your account.
                                </p>

                                <button
                                    className="btn btn-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );

}

export default StudentDashboard;