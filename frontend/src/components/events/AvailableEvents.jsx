import "./AvailableEvents.css";
import EventGrid from "./EventGrid";
import { useEffect, useState } from "react";
import eventService from "../../services/eventService";
function AvailableEvents({ events }) {
//     const [events, setEvents] = useState([]);

//     const fetchEvents = async () => {

//     try {

//         const response = await eventService.getAllEvents();

//         setEvents(response.data.content);

//     } catch (error) {

//         console.error("Error loading events:", error);

//     }

// };

// useEffect(() => {
//     fetchEvents();
// }, []);



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

        <EventGrid events={events} />
      </div>
    </section>
  );
}

export default AvailableEvents;