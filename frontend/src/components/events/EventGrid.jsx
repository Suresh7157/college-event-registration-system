import dummyEvents from "../../utils/dummyEvents";
import EventCard from "./EventCard";

function EventGrid() {
  return (
    <div className="row g-4">

      {dummyEvents.map((event) => (
        <div
          key={event.id}
          className="col-lg-4 col-md-6"
        >
          <EventCard event={event} />
        </div>
      ))}

    </div>
  );
}

export default EventGrid;