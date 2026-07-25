import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import eventService from "../../services/eventService";

const COMING_SOON = "https://png.pngtree.com/png-clipart/20221209/ourmid/pngtree-coming-soon-banner-design-png-image_6517859.png";

const statusMeta = {
    ACTIVE:    { bg: "bg-success",   icon: "bi-lightning-charge-fill" },
    UPCOMING:  { bg: "bg-primary",   icon: "bi-clock-fill" },
    COMPLETED: { bg: "bg-secondary", icon: "bi-check-circle-fill" },
    CANCELLED: { bg: "bg-danger",    icon: "bi-x-circle-fill" },
};

function ManageEvents() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [searchTitle, setSearchTitle] = useState("");

    const fetchEvents = async () => {
        try {
            const response = await eventService.getAllEvents();
            setEvents(response.data.content);
        } catch (error) {
            console.error("Error fetching events:", error);
        }
    };

    const handleSearch = async () => {
        try {
            if (searchTitle.trim() === "") { fetchEvents(); return; }
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

    useEffect(() => { fetchEvents(); }, []);

    const counts = {
        total:     events.length,
        active:    events.filter(e => e.status === "ACTIVE").length,
        upcoming:  events.filter(e => e.status === "UPCOMING").length,
        completed: events.filter(e => e.status === "COMPLETED").length,
    };

    const summaryCards = [
        { label: "Total Events",     value: counts.total,     icon: "bi-calendar-event-fill",  accent: "#2563eb", iconBg: "#eff6ff", iconColor: "#2563eb" },
        { label: "Active Events",    value: counts.active,    icon: "bi-lightning-charge-fill", accent: "#10b981", iconBg: "#f0fdf4", iconColor: "#059669" },
        { label: "Upcoming Events",  value: counts.upcoming,  icon: "bi-clock-fill",            accent: "#6366f1", iconBg: "#eef2ff", iconColor: "#4f46e5" },
        { label: "Completed Events", value: counts.completed, icon: "bi-check-circle-fill",     accent: "#94a3b8", iconBg: "#f8fafc", iconColor: "#64748b" },
    ];

    return (
        <div className="container-fluid py-4 px-4" style={{ background: "#f1f5f9", minHeight: "100vh" }}>

            {/* ── Header ── */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: "#1e293b" }}>
                        <i className="bi bi-calendar3 me-2 text-primary"></i>Manage Events
                    </h2>
                    <p className="text-muted mb-0" style={{ fontSize: "0.93rem" }}>
                        Create, edit and delete college events.
                    </p>
                </div>
                <Link
                    to="/events/create"
                    className="btn btn-primary fw-semibold px-4"
                    style={{ borderRadius: "12px", boxShadow: "0 4px 14px rgba(37,99,235,0.35)" }}
                >
                    <i className="bi bi-plus-circle me-2"></i>Create Event
                </Link>
            </div>

            {/* ── Summary Cards ── */}
            <div className="row g-3 mb-4">
                {summaryCards.map(card => (
                    <div className="col-6 col-xl-3" key={card.label}>
                        <div
                            className="d-flex align-items-center gap-3 p-3 h-100"
                            style={{
                                background: "#fff",
                                borderRadius: 18,
                                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                                borderLeft: `4px solid ${card.accent}`,
                            }}
                        >
                            <div style={{
                                background: card.iconBg, borderRadius: 12,
                                width: 52, height: 52, flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <i className={`bi ${card.icon}`} style={{ fontSize: "1.5rem", color: card.iconColor }}></i>
                            </div>
                            <div>
                                <div className="fw-bold" style={{ fontSize: "1.85rem", lineHeight: 1, color: "#1e293b" }}>{card.value}</div>
                                <div className="fw-semibold" style={{ fontSize: "0.82rem", color: "#374151", marginTop: 3 }}>{card.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Search Card ── */}
            <div
                className="card border-0 mb-4"
                style={{ borderRadius: "18px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}
            >
                <div className="card-body p-3">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0" style={{ borderRadius: "12px 0 0 12px" }}>
                                    <i className="bi bi-search text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0 ps-0"
                                    placeholder="Search by event title..."
                                    value={searchTitle}
                                    style={{ borderRadius: "0 12px 12px 0" }}
                                    onChange={e => setSearchTitle(e.target.value)}
                                    onKeyDown={e => e.key === "Enter" && handleSearch()}
                                />
                            </div>
                        </div>
                        <div className="col-auto d-flex gap-2">
                            <button
                                className="btn btn-primary fw-semibold px-4"
                                style={{ borderRadius: "12px" }}
                                onClick={handleSearch}
                            >
                                <i className="bi bi-search me-1"></i>Search
                            </button>
                            <button
                                className="btn btn-outline-secondary fw-semibold px-3"
                                style={{ borderRadius: "12px" }}
                                onClick={() => { setSearchTitle(""); fetchEvents(); }}
                            >
                                <i className="bi bi-arrow-counterclockwise me-1"></i>Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Table Card ── */}
            <div
                className="card border-0"
                style={{ borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.09)", overflow: "hidden" }}
            >
                <div className="card-header border-0 px-4 py-3" style={{ background: "#fff" }}>
                    <span className="fw-semibold" style={{ color: "#1e293b", fontSize: "1rem" }}>
                        <i className="bi bi-table me-2 text-primary"></i>
                        All Events
                        <span className="badge bg-primary ms-2" style={{ borderRadius: "8px", fontSize: "0.78rem" }}>
                            {events.length}
                        </span>
                    </span>
                </div>

                <div className="table-responsive" style={{ maxHeight: "520px", overflowY: "auto" }}>
                    <table className="table table-hover table-striped align-middle mb-0">
                        <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "#f8fafc" }}>
                            <tr style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b" }}>
                                <th className="ps-4 py-3">Image</th>
                                <th className="py-3">Title</th>
                                <th className="py-3">Status</th>
                                <th className="py-3">Date</th>
                                <th className="py-3">Venue</th>
                                <th className="py-3 text-center">Capacity</th>
                                <th className="py-3 text-center pe-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {events.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="text-center py-5 text-muted">
                                        <i className="bi bi-calendar-x" style={{ fontSize: "2.5rem", display: "block", marginBottom: 8 }}></i>
                                        No events found.
                                    </td>
                                </tr>
                            ) : events.map(event => {
                                const meta = statusMeta[event.status] || { bg: "bg-secondary", icon: "bi-circle" };
                                return (
                                    <tr key={event.id} style={{ fontSize: "0.93rem" }}>
                                        <td className="ps-4 py-3">
                                            <img
                                                src={event.imageUrl ? `http://localhost:8081/uploads/${event.imageUrl}` : COMING_SOON}
                                                alt={event.title}
                                                style={{ width: 80, height: 60, objectFit: "cover", borderRadius: "10px", boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
                                            />
                                        </td>
                                        <td className="fw-semibold" style={{ color: "#1e293b", maxWidth: 200 }}>{event.title}</td>
                                        <td>
                                            <span className={`badge ${meta.bg} d-inline-flex align-items-center gap-1`} style={{ borderRadius: "8px", padding: "5px 10px", fontSize: "0.78rem" }}>
                                                <i className={`bi ${meta.icon}`}></i>
                                                {event.status}
                                            </span>
                                        </td>
                                        <td style={{ color: "#475569" }}>
                                            <i className="bi bi-calendar3 me-1 text-primary"></i>
                                            {event.eventDate}
                                        </td>
                                        <td style={{ color: "#475569" }}>
                                            <i className="bi bi-geo-alt me-1 text-danger"></i>
                                            {event.venue}
                                        </td>
                                        <td className="text-center">
                                            <span className="badge bg-light text-dark border" style={{ borderRadius: "8px", padding: "5px 12px" }}>
                                                <i className="bi bi-people me-1"></i>{event.capacity}
                                            </span>
                                        </td>
                                        <td className="text-center pe-4">
                                            <div className="d-flex justify-content-center gap-2">
                                                <Link
                                                    to={`/events/${event.id}`}
                                                    className="btn btn-sm btn-outline-info"
                                                    style={{ borderRadius: "8px", width: 34, height: 34, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                                                    title="View Details"
                                                    data-bs-toggle="tooltip"
                                                >
                                                    <i className="bi bi-eye"></i>
                                                </Link>
                                                <Link
                                                    to={`/events/edit/${event.id}`}
                                                    className="btn btn-sm btn-outline-warning"
                                                    style={{ borderRadius: "8px", width: 34, height: 34, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                                                    title="Edit Event"
                                                    data-bs-toggle="tooltip"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    style={{ borderRadius: "8px", width: 34, height: 34, padding: 0, display: "flex", alignItems: "center", justifyContent: "center" }}
                                                    title="Delete Event"
                                                    data-bs-toggle="tooltip"
                                                    onClick={() => handleDeleteClick(event)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ── Delete Modal ── */}
            {showModal && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.45)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0" style={{ borderRadius: "18px", overflow: "hidden" }}>
                            <div className="modal-header border-0 pb-0 px-4 pt-4">
                                <div
                                    style={{
                                        background: "rgba(239,68,68,0.1)",
                                        borderRadius: "12px",
                                        width: 52, height: 52,
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                    }}
                                >
                                    <i className="bi bi-trash text-danger" style={{ fontSize: "1.5rem" }}></i>
                                </div>
                            </div>
                            <div className="modal-body px-4 pt-3 pb-2">
                                <h5 className="fw-bold mb-1" style={{ color: "#1e293b" }}>Delete Event</h5>
                                <p className="text-muted mb-0" style={{ fontSize: "0.93rem" }}>
                                    Are you sure you want to delete <strong>{selectedEvent?.title}</strong>? This action cannot be undone.
                                </p>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                <button
                                    className="btn btn-outline-secondary fw-semibold px-4"
                                    style={{ borderRadius: "10px" }}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger fw-semibold px-4"
                                    style={{ borderRadius: "10px" }}
                                    onClick={confirmDelete}
                                >
                                    <i className="bi bi-trash me-2"></i>Delete
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
