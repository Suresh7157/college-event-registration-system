import "./EventCard.css";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="card event-card h-100">

      <img
        src={event.imageUrl
            ? `http://localhost:8080/uploads/${event.imageUrl}`
            : "https://png.pngtree.com/png-clipart/20221209/ourmid/pngtree-coming-soon-banner-design-png-image_6517859.png"}
        className="card-img-top event-card-img"
        alt={event.title}
      />

      <div className="card-body py-2 px-3">

        <span
          className={`badge mb-1 ${
            event.status === "UPCOMING"
              ? "bg-primary"
              : event.status === "ACTIVE"
              ? "bg-success"
              : event.status === "COMPLETED"
              ? "bg-secondary"
              : "bg-danger"
          }`}
          style={{ fontSize: "0.7rem" }}
        >
          {event.status}
        </span>

        <h5 className="card-title fw-bold mb-1">{event.title}</h5>

        <p className="text-muted mb-1" style={{ fontSize: "0.8rem" }}>
          <i className="bi bi-calendar-event me-1"></i>{event.eventDate}
        </p>

        <p className="text-muted mb-1" style={{ fontSize: "0.8rem" }}>
          <i className="bi bi-clock me-1"></i>{event.eventTime}
        </p>

        <p className="text-muted mb-1" style={{ fontSize: "0.8rem" }}>
          <i className="bi bi-geo-alt me-1"></i>{event.venue}
        </p>

        <p className="text-muted mb-0" style={{ fontSize: "0.8rem" }}>
          <i className="bi bi-people me-1"></i>Capacity: {event.capacity}
        </p>

      </div>

      <div className="card-footer bg-white border-0 pb-2 px-3 pt-1">
        <Link to={`/events/${event.id}`} className="btn btn-primary w-100">
          View Details
        </Link>
      </div>

    </div>
  );
}

export default EventCard;
