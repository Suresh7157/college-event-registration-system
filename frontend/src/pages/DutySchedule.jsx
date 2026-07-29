import React from "react";
import Sidebar from "../components/volunteer/Sidebar";
import Navbar from "../components/volunteer/Navbar";
import "../styles/dutySchedule.css";

function DutySchedule() {
    return (
        <>
            <Sidebar />

            <div className="schedule-container">

                <Navbar />

                <div className="schedule-content">

                    <h2 className="schedule-title">
                        Duty Schedule
                    </h2>

                    <div className="schedule-grid">

                        <div className="schedule-card">

                            <div className="schedule-date">
                                25 JUL
                            </div>

                            <div className="schedule-details">

                                <h4>Hackathon 2026</h4>

                                <p>
                                    📍 Seminar Hall
                                </p>

                                <p>
                                    ⏰ 09:00 AM - 01:00 PM
                                </p>

                                <span className="role-badge">
                                    Registration Desk
                                </span>

                            </div>

                        </div>

                        <div className="schedule-card">

                            <div className="schedule-date">
                                28 JUL
                            </div>

                            <div className="schedule-details">

                                <h4>Technical Workshop</h4>

                                <p>
                                    📍 Auditorium
                                </p>

                                <p>
                                    ⏰ 10:00 AM - 03:00 PM
                                </p>

                                <span className="role-badge">
                                    Hospitality
                                </span>

                            </div>

                        </div>

                        <div className="schedule-card">

                            <div className="schedule-date">
                                30 JUL
                            </div>

                            <div className="schedule-details">

                                <h4>Coding Contest</h4>

                                <p>
                                    📍 Computer Lab
                                </p>

                                <p>
                                    ⏰ 09:30 AM - 12:30 PM
                                </p>

                                <span className="role-badge">
                                    Technical Support
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default DutySchedule;