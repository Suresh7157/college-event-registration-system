import {
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    XAxis,
    YAxis,
    Tooltip,
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
    { event: "Workshop", registrations: 150 },
    { event: "Coding", registrations: 120 },
    { event: "Quiz", registrations: 95 },
];

const volunteerData = [
    { name: "Assigned", value: 35 },
    { name: "Available", value: 20 },
    { name: "Pending", value: 10 },
];

const COLORS = [
    "#0d6efd",
    "#198754",
    "#ffc107"
];

function Analytics() {

    return (

        <div className="analytics-section">

            {/* Top Row */}

            <div className="row g-4">

                {/* Users Chart */}

                <div className="col-lg-6">

                    <div className="card analytics-card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-4">
                                Users by Department
                            </h5>

                            <ResponsiveContainer
                                width="100%"
                                height={320}
                            >

                                <BarChart data={userData}>

                                    <XAxis dataKey="department" />

                                    <YAxis />

                                    <Tooltip />

                                    <Legend />

                                    <Bar
                                        dataKey="users"
                                        fill="#0d6efd"
                                        radius={[8,8,0,0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

                {/* Event Chart */}

                <div className="col-lg-6">

                    <div className="card analytics-card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-4">
                                Event Registrations
                            </h5>

                            <ResponsiveContainer
                                width="100%"
                                height={320}
                            >

                                <BarChart data={eventData}>

                                    <XAxis dataKey="event"/>

                                    <YAxis/>

                                    <Tooltip/>

                                    <Legend/>

                                    <Bar
                                        dataKey="registrations"
                                        fill="#198754"
                                        radius={[8,8,0,0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>

            {/* Bottom Row */}

            <div className="row g-4 mt-2">

                {/* Pie Chart */}

                <div className="col-lg-5">

                    <div className="card analytics-card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-4">
                                Volunteer Status
                            </h5>

                            <ResponsiveContainer
                                width="100%"
                                height={320}
                            >

                                <PieChart>

                                    <Pie
                                        data={volunteerData}
                                        dataKey="value"
                                        outerRadius={110}
                                        label
                                    >

                                        {
                                            volunteerData.map((entry,index)=>(

                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index]}
                                                />

                                            ))
                                        }

                                    </Pie>

                                    <Tooltip/>

                                    <Legend/>

                                </PieChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

                {/* Email */}

                <div className="col-lg-7">

                    <div className="card analytics-card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-4">
                                📧 Send Email
                            </h5>

                            <div className="mb-3">

                                <label className="form-label">
                                    Recipient
                                </label>

                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Enter recipient email"
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Subject
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter subject"
                                />

                            </div>

                            <div className="mb-3">

                                <label className="form-label">
                                    Message
                                </label>

                                <textarea
                                    rows="6"
                                    className="form-control"
                                    placeholder="Write your message..."
                                />

                            </div>

                            <button className="btn btn-primary w-100">

                                <i className="bi bi-send-fill me-2"></i>

                                Send Email

                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Analytics;