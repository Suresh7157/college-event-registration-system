import { useEffect, useState } from "react";
import { getAllEvents } from "../../services/AdminService.js";
function Events() {

    const [events, setEvents] = useState([]);

    useEffect(() => {
        loadEvents();
    }, []);

    const loadEvents = () => {
        getAllEvents()
            .then((response) => {
                setEvents(response.data);
            })
            .catch((error) => {
                console.error("Error fetching events:", error);
            });
    };

    return (
        <div className="dashboard">

            <h2 className="dashboard-title">Manage Events</h2>

            <div className="card shadow-sm border-0 rounded-4 mt-4">

                <div className="card-body">

                    <table className="table table-hover align-middle">

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Venue</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Capacity</th>
                            <th>Registration Deadline</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>

                        {events.map((event) => (

                            <tr key={event.id}>
                                <td>{event.id}</td>
                                <td>{event.title}</td>
                                <td>{event.venue}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.eventTime}</td>
                                <td>{event.capacity}</td>
                                <td>{event.registrationDeadline}</td>
                                <td>{event.status}</td>
                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Events;