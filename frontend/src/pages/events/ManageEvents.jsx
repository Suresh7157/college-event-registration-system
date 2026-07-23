import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import eventService from "../../services/eventService";
// import { useState } from "react";

function ManageEvents() {

    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleDeleteClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const confirmDelete = () => {
        alert(`${selectedEvent.title} deleted successfully`);
        setShowModal(false);
    };

    useEffect(() => {
    fetchEvents();
}, []);

const fetchEvents = async () => {
    try {
        const response = await eventService.getAllEvents();

        // Spring Boot returns Page<EventResponseDTO>
        setEvents(response.data.content);

    } catch (error) {
        console.error("Error fetching events:", error);
    }
};

    return (

        <div className="container py-5">

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>
                    <h2 className="fw-bold">Manage Events</h2>

                    <p className="text-muted">
                        Create, edit and delete college events.
                    </p>
                </div>

                <Link
                    to="/events/create"
                    className="btn btn-primary"
                >
                    <i className="bi bi-plus-circle me-2"></i>
                    Create Event
                </Link>

            </div>

            <div className="card shadow-sm">

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-light">

                            <tr>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Status</th>
                                <th>Event Date</th>
                                <th>Venue</th>
                                <th>Capacity</th>
                                <th>Actions</th>
                            </tr>

                        </thead>

                        <tbody>

                            {events.map((event) => (

                                <tr key={event.id}>

                                    <td>
                                        <img
                                            src={event.image}
                                            alt={event.title}
                                            width="70"
                                            className="rounded"
                                        />
                                    </td>

                                    <td>{event.title}</td>

                                    <td>
                                        <span
                                            className={`badge ${
                                                event.status === "UPCOMING"
                                                    ? "bg-primary"
                                                    : event.status === "ACTIVE"
                                                    ? "bg-success"
                                                    : event.status === "COMPLETED"
                                                    ? "bg-secondary"
                                                    : "bg-danger"
                                            }`}
                                        >
                                            {event.status}
                                        </span>
                                    </td>

                                    <td>{event.eventDate}</td>

                                    <td>{event.venue}</td>

                                    <td>{event.capacity}</td>

                                    <td>

                                        <Link
                                            to={`/events/edit/${event.id}`}
                                            className="btn btn-warning btn-sm me-2"
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </Link>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDeleteClick(event)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {showModal && (
                <div
                    className="modal fade show d-block"
                    style={{ background: "rgba(0,0,0,.5)" }}
                >
                    <div className="modal-dialog modal-dialog-centered">

                        <div className="modal-content">

                            <div className="modal-header">
                                <h5 className="modal-title">
                                    Delete Event
                                </h5>
                            </div>

                            <div className="modal-body">
                                Are you sure you want to delete
                                <strong> {selectedEvent?.title}</strong>?
                            </div>

                            <div className="modal-footer">

                                <button
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>

                                <button
                                    className="btn btn-danger"
                                    onClick={confirmDelete}
                                >
                                    Delete
                                </button>

                            </div>

                        </div>

                    </div>
                </div>
            )}

        </div>

    );
}

export default ManageEvents;