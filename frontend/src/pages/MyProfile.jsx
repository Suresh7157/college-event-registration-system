import React from "react";
import Sidebar from "../components/volunteer/Sidebar";
import Navbar from "../components/volunteer/Navbar";
import "../styles/profile.css";

function MyProfile() {
    return (
        <>
            <Sidebar />

            <div className="profile-container">

                <Navbar />

                <div className="profile-content">

                    <div className="profile-card">

                        <div className="profile-header">

                            <img
                                src="https://ui-avatars.com/api/?name=Volunteer&background=2563eb&color=fff&size=150"
                                alt="Profile"
                            />

                            <h2>Volunteer Name</h2>

                            <p>College Event Volunteer</p>

                        </div>

                        <div className="profile-details">

                            <div className="detail-row">
                                <span>Full Name</span>
                                <strong>Volunteer Name</strong>
                            </div>

                            <div className="detail-row">
                                <span>Email</span>
                                <strong>volunteer@gmail.com</strong>
                            </div>

                            <div className="detail-row">
                                <span>Department</span>
                                <strong>Computer Science</strong>
                            </div>

                            <div className="detail-row">
                                <span>Year</span>
                                <strong>3rd Year</strong>
                            </div>

                            <div className="detail-row">
                                <span>Volunteer Status</span>
                                <strong className="status approved">
                                    Approved
                                </strong>
                            </div>

                            <div className="detail-row">
                                <span>Assigned Role</span>
                                <strong>Registration Desk</strong>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default MyProfile;