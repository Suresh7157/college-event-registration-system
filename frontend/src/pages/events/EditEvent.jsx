import { useState } from "react";

function EditEvent() {

    const [event, setEvent] = useState({
        title: "Hackathon 2026",
        description: "National Level Coding Competition",
        venue: "Main Auditorium",
        eventDate: "2026-07-24",
        eventTime: "10:00",
        capacity: 120,
        registrationDeadline: "2026-07-20",
        status: "UPCOMING"
    });

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log(event);

        alert("Event Updated Successfully");
    };

    return (
        <div className="container py-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">

                    <h3 className="mb-0">
                        Edit Event
                    </h3>

                </div>

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Event Title
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    value={event.title}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Status
                                </label>

                                <select
                                    className="form-select"
                                    name="status"
                                    value={event.status}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Status</option>
                                    <option value="UPCOMING">UPCOMING</option>
                                    <option value="ACTIVE">ACTIVE</option>
                                    <option value="COMPLETED">COMPLETED</option>
                                    <option value="CANCELLED">CANCELLED</option>
                                </select>

                            </div>

                        </div>

                        <div className="mb-3">

                            <label className="form-label">
                                Description
                            </label>

                            <textarea
                                rows="4"
                                className="form-control"
                                name="description"
                                value={event.description}
                                onChange={handleChange}
                            />

                        </div>

                        <div className="row">

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Venue
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    name="venue"
                                    value={event.venue}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-6 mb-3">

                                <label className="form-label">
                                    Event Date
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="eventDate"
                                    value={event.eventDate}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="row">

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Event Time
                                </label>

                                <input
                                    type="time"
                                    className="form-control"
                                    name="eventTime"
                                    value={event.eventTime}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Capacity
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    name="capacity"
                                    value={event.capacity}
                                    onChange={handleChange}
                                />

                            </div>

                            <div className="col-md-4 mb-3">

                                <label className="form-label">
                                    Registration Deadline
                                </label>

                                <input
                                    type="date"
                                    className="form-control"
                                    name="registrationDeadline"
                                    value={event.registrationDeadline}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <button className="btn btn-primary">
                            Update Event
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default EditEvent;