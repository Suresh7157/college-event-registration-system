import { useEffect, useState } from "react";
import { getAllEvents } from "../../services/AdminService";

function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = async () => {

        try {

            const response = await getAllEvents();

            setEvents(response.data);

        } catch (error) {

            console.error("Error fetching events:", error);

        }

    };

    return (

        <div className="dashboard">

            {/* Page Header */}

            <div className="page-header">

                <div>

                    <h2 className="page-title">
                        Manage Events
                    </h2>

                    <p className="page-subtitle">
                        View and manage all college events.
                    </p>

                </div>

            </div>

            {/* Events Table */}

            <div className="table-container">

                <table className="table">

                    <thead className="table-header">

                    <tr>

                        <th>ID</th>

                        <th>Event Title</th>

                        <th>Venue</th>

                        <th>Date</th>

                        <th>Time</th>

                        <th>Capacity</th>

                        <th>Registration Deadline</th>

                        <th>Status</th>

                    </tr>

                    </thead>

                    <tbody>

                    {events.length > 0 ? (

                        events.map((event) => (

                            <tr key={event.id}>

                                <td>{event.id}</td>

                                <td>

                                    <strong>
                                        {event.title}
                                    </strong>

                                </td>

                                <td>{event.venue}</td>

                                <td>{event.eventDate}</td>

                                <td>{event.eventTime}</td>

                                <td>{event.capacity}</td>

                                <td>{event.registrationDeadline}</td>

                                <td>

                                    <span
                                        className={`badge ${
                                            event.status === "UPCOMING"
                                                ? "bg-primary"
                                                : event.status === "ONGOING"
                                                    ? "bg-success"
                                                    : event.status === "COMPLETED"
                                                        ? "bg-secondary"
                                                        : event.status === "CANCELLED"
                                                            ? "bg-danger"
                                                            : "bg-warning text-dark"
                                        }`}
                                    >
                                        {event.status}
                                    </span>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="8"
                                className="text-center py-5"
                            >

                                No Events Found

                            </td>

                        </tr>

                    )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Events;