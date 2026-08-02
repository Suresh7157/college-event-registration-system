import { useEffect, useState } from "react";
import {
    getAllVolunteers,
    approveVolunteer,
    rejectVolunteer
} from "../../services/AdminService";

function Volunteers() {

    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        loadVolunteers();
    }, []);

    const loadVolunteers = async () => {

        try {

            const response = await getAllVolunteers();

            setVolunteers(response.data);

        } catch (error) {

            console.error("Error fetching volunteers:", error);

        }

    };

    const handleApprove = async (id) => {

        try {

            await approveVolunteer(id);

            loadVolunteers();

        } catch (error) {

            console.error(error);

        }

    };

    const handleReject = async (id) => {

        try {

            await rejectVolunteer(id);

            loadVolunteers();

        } catch (error) {

            console.error(error);

        }

    };

    return (

        <div className="dashboard">

            {/* Page Header */}

            <div className="page-header">

                <div>

                    <h2 className="page-title">
                        Manage Volunteers
                    </h2>

                    <p className="page-subtitle">
                        Approve or reject volunteer applications.
                    </p>

                </div>

            </div>

            {/* Volunteers Table */}

            <div className="table-container">

                <table className="table">

                    <thead className="table-header">

                    <tr>

                        <th>ID</th>

                        <th>Volunteer</th>

                        <th>Assigned Role</th>

                        <th>Assigned By</th>

                        <th>Event</th>

                        <th>Status</th>

                    </tr>

                    </thead>

                    <tbody>

                    {volunteers.length > 0 ? (

                        volunteers.map((volunteer) => (

                            <tr key={volunteer.id}>

                                <td>{volunteer.id}</td>

                                <td>

                                    <strong>
                                        {volunteer.user?.fullName}
                                    </strong>

                                </td>

                                <td>

                                    <span className="badge bg-info">

                                        {volunteer.assignedRole}

                                    </span>

                                </td>

                                <td>

                                    {volunteer.assignedBy?.fullName}

                                </td>

                                <td>

                                    {volunteer.event?.title}

                                </td>

                                <td>

                                    {volunteer.status === "PENDING" ? (

                                        <div className="d-flex gap-2">

                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleApprove(volunteer.id)}
                                            >
                                                ✓ Approve
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleReject(volunteer.id)}
                                            >
                                                ✕ Reject
                                            </button>

                                        </div>

                                    ) : (

                                        <span
                                            className={`badge ${
                                                volunteer.status === "APPROVED"
                                                    ? "bg-success"
                                                    : "bg-danger"
                                            }`}
                                        >

                                            {volunteer.status}

                                        </span>

                                    )}

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="6"
                                className="text-center py-5"
                            >

                                No Volunteers Found

                            </td>

                        </tr>

                    )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Volunteers;