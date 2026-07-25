import EventCard from "./EventCard";

function EventGrid({ events }) {

    return (

        <div className="row g-4">

            {events.map((event) => (

                <div
                    key={event.id}
                    className="col-xl-3 col-lg-4 col-md-6"
                >
                    <EventCard event={event} />
                </div>

            ))}

        </div>

    );

}

export default EventGrid;