import "./AvailableEvents.css";
import EventGrid from "./EventGrid";

function AvailableEvents() {
  return (
    <section className="available-events py-5">
      <div className="container">

        <div className="d-flex justify-content-between align-items-center mb-4">

          <div>
            <h2 className="fw-bold mb-1">Available Events</h2>
            <p className="text-muted mb-0">
              Explore and register for upcoming college events.
            </p>
          </div>

          <div style={{ width: "220px" }}>
            <select className="form-select">
              <option>Sort By</option>
              <option>Date</option>
              <option>Event Name</option>
              <option>Available Seats</option>
            </select>
          </div>

        </div>

        <EventGrid />

      </div>
    </section>
  );
}

export default AvailableEvents;