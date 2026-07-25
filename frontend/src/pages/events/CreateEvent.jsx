import { useState } from "react";
import { useNavigate } from "react-router-dom";
import eventService from "../../services/eventService";

function CreateEvent() {

    const [event, setEvent] = useState({
        title: "",
        description: "",
        venue: "",
        eventDate: "",
        eventTime: "",
        capacity: "",
        registrationDeadline: "",
        status: ""
    });

    const [poster, setPoster] = useState(null);
    const [posterPreview, setPosterPreview] = useState(null);

    const navigate = useNavigate();

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value
        });
    };

    const handlePosterChange = (e) => {
        const file = e.target.files[0];
        setPoster(file);
        setPosterPreview(file ? URL.createObjectURL(file) : null);
    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        const formData = new FormData();
        Object.entries(event).forEach(([key, value]) => formData.append(key, value));
        if (poster) formData.append("image", poster);

        await eventService.createEvent(formData);

        alert("Event Created Successfully");

        navigate("/manage-events");

    } catch (error) {

    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("Request Data:", event);

    alert("Failed to create event");

}

};

    return (
        <div className="container py-5">

            <div className="card shadow">

                <div className="card-header bg-primary text-white">
                    <h3 className="mb-0">
                        Create Event
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

                        <div className="mb-3">
                            <label className="form-label">Choose Poster</label>
                            <input
                                type="file"
                                className="form-control"
                                accept="image/*"
                                onChange={handlePosterChange}
                            />
                            {posterPreview && (
                                <img
                                    src={posterPreview}
                                    alt="Poster Preview"
                                    className="mt-2 img-fluid rounded"
                                    style={{ maxHeight: "200px", objectFit: "cover" }}
                                />
                            )}
                        </div>

                        <button className="btn btn-primary">
                            Create Event
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default CreateEvent;