import React from "react";
import Sidebar from "../components/volunteer/Sidebar";
import Navbar from "../components/volunteer/Navbar";
import "../styles/assignedEvent.css";

function AssignedEvent() {
    return (
        <>
            <Sidebar />

            <div className="assigned-container">

                <Navbar />

                <div className="assigned-content">

                    <h2 className="page-title">
                        My Assigned Event
                    </h2>

                    <div className="event-card">

                        <div className="event-header">

                            <h3>🎉 Hackathon 2026</h3>

                            <span className="status-badge">
                                Approved
                            </span>

                        </div>

                        <div className="event-body">

                            <div className="event-item">
                                <h6>📍 Venue</h6>
                                <p>Seminar Hall</p>
                            </div>

                            <div className="event-item">
                                <h6>📅 Date</h6>
                                <p>25 July 2026</p>
                            </div>

                            <div className="event-item">
                                <h6>⏰ Time</h6>
                                <p>09:00 AM</p>
                            </div>

                            <div className="event-item">
                                <h6>🪪 Assigned Role</h6>
                                <p>Registration Desk</p>
                            </div>

                            <div className="event-item">
                                <h6>👤 Coordinator</h6>
                                <p>Uzma Rafath</p>
                            </div>

                            <div className="event-item">
                                <h6>📞 Contact</h6>
                                <p>9876543210</p>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </>
    );
}

export default AssignedEvent;