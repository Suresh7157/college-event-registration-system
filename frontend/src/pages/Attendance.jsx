import React from "react";
import Sidebar from "../components/volunteer/Sidebar";
import Navbar from "../components/volunteer/Navbar";
import "../styles/attendance.css";

function Attendance() {
    return (
        <>
            <Sidebar />

            <div className="attendance-container">

                <Navbar />

                <div className="attendance-content">

                    <div className="attendance-header">

                        <h2>Attendance</h2>

                        <div className="attendance-percentage">
                            95%
                        </div>

                    </div>

                    <div className="attendance-card">

                        <table className="attendance-table">

                            <thead>

                                <tr>
                                    <th>Event</th>
                                    <th>Date</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>

                            </thead>

                            <tbody>

                                <tr>
                                    <td>Hackathon 2026</td>
                                    <td>25 Jul 2026</td>
                                    <td>Registration Desk</td>
                                    <td>
                                        <span className="present">
                                            Present
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Tech Talk</td>
                                    <td>20 Jul 2026</td>
                                    <td>Hospitality</td>
                                    <td>
                                        <span className="present">
                                            Present
                                        </span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>Coding Contest</td>
                                    <td>12 Jul 2026</td>
                                    <td>Registration Desk</td>
                                    <td>
                                        <span className="absent">
                                            Absent
                                        </span>
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </>
    );
}

export default Attendance;