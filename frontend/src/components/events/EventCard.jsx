import "./EventCard.css";
import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="card event-card shadow-sm h-100">

      <img
        src={event.image}
        className="card-img-top"
        alt={event.title}
      />

      <div className="card-body">

        <span className="badge bg-primary mb-2">
          {event.category}
        </span>

        <h5 className="card-title fw-bold">
          {event.title}
        </h5>

        <p className="text-muted mb-2">
          <i className="bi bi-calendar-event me-2"></i>
          {event.date}
        </p>

        <p className="text-muted mb-2">
          <i className="bi bi-geo-alt me-2"></i>
          {event.venue}
        </p>

        <p className="text-muted">
          <i className="bi bi-people me-2"></i>
          {event.seats} Seats
        </p>

      </div>

      <div className="card-footer bg-white border-0">

        <Link
    to={`/events/${event.id}`}
    className="btn btn-primary w-100"
>
    View Details
</Link>

      </div>

    </div>
  );
}

export default EventCard;