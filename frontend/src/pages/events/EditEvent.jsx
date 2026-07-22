import { useState } from "react";

function EditEvent() {
    const [event, setEvent] = useState({
    title:"Hackathon 2026",
    description:"National Level Coding Competition",
    category:"Technical",
    venue:"Main Auditorium",
    date:"2026-07-24",
    seats:120
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
                                        Category
                                    </label>
    
                                    <select
                                        className="form-select"
                                        name="category"
                                        value={event.category}
                                        onChange={handleChange}
                                    >
    
                                        <option value="">
                                            Select Category
                                        </option>
    
                                        <option>
                                            Technical
                                        </option>
    
                                        <option>
                                            Workshop
                                        </option>
    
                                        <option>
                                            Cultural
                                        </option>
    
                                        <option>
                                            Sports
                                        </option>
    
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
    
                                <div className="col-md-4 mb-3">
    
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
    
                                <div className="col-md-4 mb-3">
    
                                    <label className="form-label">
                                        Date
                                    </label>
    
                                    <input
                                        type="date"
                                        className="form-control"
                                        name="date"
                                        value={event.date}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                                <div className="col-md-4 mb-3">
    
                                    <label className="form-label">
                                        Seats
                                    </label>
    
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="seats"
                                        value={event.seats}
                                        onChange={handleChange}
                                    />
    
                                </div>
    
                            </div>
    
                            <button
                                className="btn btn-primary"
                            >
                                Update Event
                            </button>
    
                        </form>
    
                    </div>
    
                </div>
    
            </div>
        );
}

export default EditEvent;