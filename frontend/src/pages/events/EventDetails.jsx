import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import eventService from "../../services/eventService";

function EventDetails() {

    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [showFullImg, setShowFullImg] = useState(false);

    useEffect(() => {
    fetchEvent();
}, []);

const fetchEvent = async () => {
    try {

        const response = await eventService.getEventById(id);

        setEvent(response.data);

    } catch (error) {

        console.error("Error:", error);

    }
};

    if (!event) {
        return (
            <div className="container py-5">
                <h3>Event not found.</h3>
            </div>
        );
    }

    const imgSrc = event.imageUrl
        ? `http://localhost:8081/uploads/${event.imageUrl}`
        : "https://png.pngtree.com/png-clipart/20221209/ourmid/pngtree-coming-soon-banner-design-png-image_6517859.png";

    return (

        <div className="container py-5">

            <div className="card shadow">

                <img
                    src={imgSrc}
                    className="card-img-top"
                    alt={event.title}
                    style={{ maxHeight: "400px", objectFit: "cover", cursor: "pointer" }}
                    onClick={() => setShowFullImg(true)}
                />

                <div className="card-body">

                    <span
                        className={`badge mb-3 ${
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

                    <h2 className="fw-bold">
                        {event.title}
                    </h2>

                    <p className="text-muted mt-3">
                        {event.description}
                    </p>

                    <hr />

                    <p>
                        <strong>📍 Venue:</strong> {event.venue}
                    </p>

                    <p>
                        <strong>📅 Event Date:</strong> {event.eventDate}
                    </p>

                    <p>
                        <strong>🕒 Event Time:</strong> {event.eventTime}
                    </p>

                    <p>
                        <strong>📝 Registration Deadline:</strong> {event.registrationDeadline}
                    </p>

                    <p>
                        <strong>👥 Capacity:</strong> {event.capacity}
                    </p>

                </div>

            </div>

            {showFullImg && (
                <div
                    onClick={() => setShowFullImg(false)}
                    style={{
                        position: "fixed", inset: 0,
                        background: "rgba(0,0,0,0.85)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        zIndex: 9999, cursor: "zoom-out"
                    }}
                >
                    <img
                        src={imgSrc}
                        alt={event.title}
                        style={{ maxHeight: "90vh", maxWidth: "90vw", borderRadius: "8px" }}
                    />
                </div>
            )}

        </div>

    );
}

export default EventDetails;