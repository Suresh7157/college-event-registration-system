import "./AvailableEvents.css";
import EventGrid from "./EventGrid";

function AvailableEvents({ events, onSort }) {
    return (
        <section className="available-events">
            <div className="container-fluid px-0">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h2 className="fw-bold mb-1" style={{ fontSize: 36, color: "#1e293b" }}>
                            Available Events
                        </h2>
                        <p className="text-muted mb-0" style={{ fontSize: "0.93rem" }}>
                            Manage and monitor your upcoming college events.
                        </p>
                    </div>

                    <div style={{ width: 200, flexShrink: 0 }}>
                        <select
                            className="form-select"
                            onChange={(e) => onSort(e.target.value)}
                            style={{ borderRadius: 10, fontSize: "0.9rem" }}
                        >
                            <option value="">Sort By</option>
                            <option value="eventDate,asc">Event Date ↑</option>
                            <option value="eventDate,desc">Event Date ↓</option>
                            <option value="title,asc">Event Name A–Z</option>
                            <option value="title,desc">Event Name Z–A</option>
                            <option value="capacity,desc">Available Seats</option>
                        </select>
                    </div>
                </div>

                <EventGrid events={events} />

            </div>
        </section>
    );
}

export default AvailableEvents;
