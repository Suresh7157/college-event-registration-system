import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";

function EventCard({ event, onRegister }) {

    return (

        <Card className="event-card shadow-sm border-0 h-100">

            <div className="position-relative">

                <Card.Img
                    variant="top"
                    src={event.image}
                    className="event-image"
                />

                <Badge
                    bg="primary"
                    className="position-absolute top-0 start-0 m-3 px-3 py-2"
                >
                    {event.category}
                </Badge>

            </div>

            <Card.Body>

                <Card.Title className="fw-bold">
                    {event.title}
                </Card.Title>

                <p>
                    <i className="bi bi-calendar-event text-primary me-2"></i>
                    {event.date}
                </p>

                <p>
                    <i className="bi bi-geo-alt-fill text-danger me-2"></i>
                    {event.venue}
                </p>

                <Card.Text>
                    {event.description}
                </Card.Text>

                <p className="text-success fw-semibold">
                    Seats Left : {event.seats}
                </p>

                <Button
                    variant="success"
                    className="w-100"
                    onClick={() => onRegister(event)}
                >
                    Register Now
                </Button>

            </Card.Body>

        </Card>

    );
}

export default EventCard;