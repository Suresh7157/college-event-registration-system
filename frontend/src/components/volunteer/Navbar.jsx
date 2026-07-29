import React from "react";
import "../../styles/navbar.css";

function Navbar() {

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return (

        <nav className="top-navbar">

            <div>

                <h3>Volunteer Dashboard</h3>

                <p>{today}</p>

            </div>

            <div className="navbar-right">

                <button className="notification-btn">

                    🔔

                </button>

                <div className="profile-box">

                    <img
                        src="https://ui-avatars.com/api/?name=Volunteer&background=0D8ABC&color=fff"
                        alt="profile"
                    />

                    <div>

                        <h6>Volunteer</h6>

                        <small>College Event System</small>

                    </div>

                </div>

            </div>

        </nav>

    );
}

export default Navbar;