import React, { useEffect, useState } from "react";
import Sidebar from "../components/volunteer/Sidebar";
import Navbar from "../components/volunteer/Navbar";
import DashboardCard from "../components/volunteer/DashboardCard";
import { getAllVolunteers } from "../services/volunteerService";
import "../styles/dashboard.css";
import "../styles/dashboardCard.css";

function VolunteerDashboard() {

    const [volunteer, setVolunteer] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getAllVolunteers()
            .then((response) => {

                console.log("Volunteer API Response:", response.data);

                if (response.data && response.data.length > 0) {
                    setVolunteer(response.data[0]);
                }

                setLoading(false);

            })
            .catch((error) => {

                console.error("Volunteer API Error:", error);
                setLoading(false);

            });

    }, []);

    return (
        <>
            <Sidebar />

            <div className="dashboard-container">

                <Navbar />

                <div className="dashboard-content">

                    {loading ? (

                        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
                            Loading...
                        </h2>

                    ) : !volunteer ? (

                        <h2 style={{ textAlign: "center", marginTop: "40px" }}>
                            No Volunteer Data Found
                        </h2>

                    ) : (

                        <>

                            <h2 className="welcome-title">
                                Welcome Back, {volunteer.user.fullName} 👋
                            </h2>

                            <p className="welcome-text">
                                Here's a quick overview of your volunteer activities.
                            </p>

                            <div className="dashboard-cards">

                                <DashboardCard
                                    title="Volunteer Status"
                                    value={volunteer.status}
                                    icon="✅"
                                    color="success"
                                />

                                <DashboardCard
                                    title="Assigned Role"
                                    value={volunteer.assignedRole}
                                    icon="🪪"
                                    color="primary"
                                />

                                <DashboardCard
                                    title="Assigned Event"
                                    value={volunteer.event.title}
                                    icon="🎉"
                                    color="warning"
                                />

                                <DashboardCard
                                    title="Department"
                                    value={volunteer.user.department}
                                    icon="🏫"
                                    color="danger"
                                />

                            </div>

                            <div className="dashboard-section">

                                <div className="event-box">

                                    <h4>Upcoming Event</h4>

                                    <div className="info-row">
                                        <span className="info-row-icon">🎉</span>
                                        <div className="info-row-body">
                                            <span className="info-row-label">Event</span>
                                            <span className="info-row-value">{volunteer.event.title}</span>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-row-icon">📍</span>
                                        <div className="info-row-body">
                                            <span className="info-row-label">Venue</span>
                                            <span className="info-row-value">{volunteer.event.venue}</span>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-row-icon">📅</span>
                                        <div className="info-row-body">
                                            <span className="info-row-label">Date</span>
                                            <span className="info-row-value">{volunteer.event.eventDate}</span>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-row-icon">🕐</span>
                                        <div className="info-row-body">
                                            <span className="info-row-label">Time</span>
                                            <span className="info-row-value">{volunteer.event.eventTime}</span>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-row-icon">🪪</span>
                                        <div className="info-row-body">
                                            <span className="info-row-label">Role</span>
                                            <span className="info-row-value">{volunteer.assignedRole}</span>
                                        </div>
                                    </div>

                                </div>

                                <div className="announcement-box">

                                    <h4>Volunteer Details</h4>

                                    <div className="info-row">
                                        <span className="info-row-icon">👤</span>
                                        <div className="info-row-body">
                                            <span className="info-row-label">Name</span>
                                            <span className="info-row-value">{volunteer.user.fullName}</span>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-row-icon">✉️</span>
                                        <div className="info-row-body">
                                            <span className="info-row-label">Email</span>
                                            <span className="info-row-value">{volunteer.user.email}</span>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-row-icon">🏫</span>
                                        <div className="info-row-body">
                                            <span className="info-row-label">Department</span>
                                            <span className="info-row-value">{volunteer.user.department}</span>
                                        </div>
                                    </div>

                                    <div className="info-row">
                                        <span className="info-row-icon">📚</span>
                                        <div className="info-row-body">
                                            <span className="info-row-label">Year</span>
                                            <span className="info-row-value">{volunteer.user.year}</span>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </>

                    )}

                </div>

            </div>

        </>
    );
}

export default VolunteerDashboard;