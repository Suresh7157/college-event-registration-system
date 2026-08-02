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

const COLORS = [
    "#0d6efd",
    "#198754",
    "#ffc107",
    "#dc3545",
    "#6f42c1"
];

function Analytics({
                       userData = [],
                       eventData = [],
                       volunteerData = []
                   }) {

    return (

        <div className="analytics-section">

            {/* Top Row */}

            <div className="row g-4">

                {/* Users by Department */}

                <div className="col-lg-6">

                    <div className="card analytics-card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-4">
                                Users by Department
                            </h5>

                            <ResponsiveContainer width="100%" height={320}>

                                <BarChart data={userData}>

                                    <XAxis dataKey="department"/>

                                    <YAxis/>

                                    <Tooltip/>

                                    <Legend/>

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

                {/* Registrations by Event */}

                <div className="col-lg-6">

                    <div className="card analytics-card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-4">
                                Event Registrations
                            </h5>

                            <ResponsiveContainer width="100%" height={320}>

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

                {/* Volunteer Status */}

                <div className="col-lg-5">

                    <div className="card analytics-card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-4">
                                Volunteer Status
                            </h5>

                            <ResponsiveContainer width="100%" height={320}>

                                <PieChart>

                                    <Pie
                                        data={volunteerData}
                                        dataKey="value"
                                        nameKey="name"
                                        outerRadius={110}
                                        label
                                    >

                                        {
                                            volunteerData.map((entry,index)=>(

                                                <Cell
                                                    key={index}
                                                    fill={COLORS[index % COLORS.length]}
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

                {/* Dashboard Summary */}

                <div className="col-lg-7">

                    <div className="card analytics-card shadow-sm border-0 h-100">

                        <div className="card-body">

                            <h5 className="mb-4">
                                Dashboard Summary
                            </h5>

                            <table className="table table-bordered">

                                <thead className="table-light">

                                <tr>

                                    <th>Analytics</th>

                                    <th>Total</th>

                                </tr>

                                </thead>

                                <tbody>

                                <tr>

                                    <td>Total Departments</td>

                                    <td>{userData.length}</td>

                                </tr>

                                <tr>

                                    <td>Total Events</td>

                                    <td>{eventData.length}</td>

                                </tr>

                                <tr>

                                    <td>Volunteer Categories</td>

                                    <td>{volunteerData.length}</td>

                                </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Analytics;