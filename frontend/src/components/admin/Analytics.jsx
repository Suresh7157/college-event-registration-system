import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const userData = [
    { department: "CSE", users: 120 },
    { department: "CST", users: 95 },
    { department: "ECE", users: 80 },
    { department: "EEE", users: 60 },
    { department: "MBA", users: 40 },
];

const eventData = [
    { event: "Hackathon", registrations: 180 },
    { event: "Workshop", registrations: 140 },
    { event: "Coding", registrations: 120 },
    { event: "Quiz", registrations: 90 },
];

const volunteerData = [
    { name: "Assigned", value: 35 },
    { name: "Available", value: 20 },
    { name: "Pending", value: 10 },
];

const COLORS = ["#0d6efd", "#198754", "#ffc107"];

function Analytics() {

    return (

        <>
            {/* Row 1 */}
            <div className="row mt-4">

                {/* Users Chart */}
                <div className="col-lg-6 mb-4">

                    <div className="card shadow rounded-4 border-0">

                        <div className="card-body">

                            <h5 className="mb-3">Users by Department</h5>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={userData}>
                                    <XAxis dataKey="department" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="users" fill="#0d6efd" />
                                </BarChart>
                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

                {/* Event Chart */}
                <div className="col-lg-6 mb-4">

                    <div className="card shadow rounded-4 border-0">

                        <div className="card-body">

                            <h5 className="mb-3">Event Registrations</h5>

                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={eventData}>
                                    <XAxis dataKey="event" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="registrations" fill="#198754" />
                                </BarChart>
                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>

            {/* Row 2 */}
            <div className="row">

                {/* Volunteer Status */}
                <div className="col-lg-6 mb-4">

                    <div className="card shadow rounded-4 border-0">

                        <div className="card-body">

                            <h5 className="mb-3">Volunteer Status</h5>

                            <ResponsiveContainer width="100%" height={300}>

                                <PieChart>

                                    <Pie
                                        data={volunteerData}
                                        cx="50%"
                                        cy="50%"
                                        outerRadius={90}
                                        dataKey="value"
                                        label
                                    >
                                        {volunteerData.map((entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={COLORS[index % COLORS.length]}
                                            />
                                        ))}
                                    </Pie>

                                    <Tooltip />
                                    <Legend />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

                {/* Send Email */}
                <div className="col-lg-6 mb-4">

                    <div className="card shadow rounded-4 border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-3">📧 Send Email</h5>

                            <div className="mb-3">
                                <label className="form-label">To</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter recipient email"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Subject</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter subject"
                                />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Message</label>
                                <textarea
                                    rows="6"
                                    className="form-control"
                                    placeholder="Write your message..."
                                ></textarea>
                            </div>

                            <p className="mb-3">
                                Regards,<br />
                                <strong>Administrator</strong><br />
                                College Event Registration System
                            </p>

                            <button className="btn btn-primary w-100">
                                Send Email
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </>

    );
}

export default Analytics;