import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import eventService from "../../services/eventService";
// import { useState } from "react";

function ManageEvents() {

    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchTitle, setSearchTitle] = useState("");

    const fetchEvents = async () => {
    try {
        const response = await eventService.getAllEvents();

        console.log("Backend Response:", response);

        setEvents(response.data.content);

    } catch (error) {
        console.error("Error fetching events:", error);
    }
};

    const handleSearch = async () => {

    try {

        if (searchTitle.trim() === "") {

            fetchEvents();
            return;

        }

        const response = await eventService.searchEvents(searchTitle);

        setEvents(response.data);

    } catch (error) {

        console.error("Search Error:", error);

    }

};

    const handleDeleteClick = (event) => {
        setSelectedEvent(event);
        setShowModal(true);
    };

    const confirmDelete = async () => {

    try {

        await eventService.deleteEvent(selectedEvent.id);

        alert(`${selectedEvent.title} deleted successfully`);

        setShowModal(false);

        fetchEvents();

    } catch (error) {

        console.error("Delete failed:", error);

        alert("Failed to delete event");

    }

};
    useEffect(() => {
    fetchEvents();
}, []);


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

            <div className="row mb-3">

    <div className="col-md-8">

        <input
    type="text"
    className="form-control"
    placeholder="Search by Event Title..."
    value={searchTitle}
    onChange={(e) => setSearchTitle(e.target.value)}
    onKeyDown={(e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }}
/>

    </div>

    <div className="col-md-4">

        <button
            className="btn btn-primary me-2"
            onClick={handleSearch}
        >
            Search
        </button>

        <button
            className="btn btn-secondary"
            onClick={() => {

                setSearchTitle("");
                fetchEvents();

            }}
        >
            Reset
        </button>

    </div>

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
    // src="https://via.placeholder.com/70"
    src="/src/assets/images/events/hero.avif"
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