import { FaUsers, FaCalendarAlt, FaClipboardCheck, FaHandsHelping } from "react-icons/fa";

function Reports() {

    const reports = [
        {
            title: "Total Users",
            value: 250,
            icon: <FaUsers size={30} />,
        },
        {
            title: "Total Events",
            value: 18,
            icon: <FaCalendarAlt size={30} />,
        },
        {
            title: "Registrations",
            value: 420,
            icon: <FaClipboardCheck size={30} />,
        },
        {
            title: "Volunteers",
            value: 65,
            icon: <FaHandsHelping size={30} />,
        },
    ];

    return (
        <div className="container-fluid">

            <h2 className="mb-4 fw-bold">Reports</h2>

            <div className="row">

                {reports.map((report, index) => (

                    <div className="col-md-3 mb-4" key={index}>

                        <div className="card shadow border-0 rounded-4">

                            <div className="card-body text-center">

                                <div className="mb-3 text-primary">
                                    {report.icon}
                                </div>

                                <h5>{report.title}</h5>

                                <h2 className="fw-bold text-primary">
                                    {report.value}
                                </h2>

                            </div>

                        </div>

                    </div>

                ))}

            </div>

            <div className="card shadow border-0 rounded-4 mt-4">

                <div className="card-header bg-primary text-white">
                    Recent Report Summary
                </div>

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
                        <tr>
                            <th>Category</th>
                            <th>Total</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>

                        <tr>
                            <td>Users</td>
                            <td>250</td>
                            <td><span className="badge bg-success">Active</span></td>
                        </tr>

                        <tr>
                            <td>Events</td>
                            <td>18</td>
                            <td><span className="badge bg-success">Ongoing</span></td>
                        </tr>

                        <tr>
                            <td>Registrations</td>
                            <td>420</td>
                            <td><span className="badge bg-info">Completed</span></td>
                        </tr>

                        <tr>
                            <td>Volunteers</td>
                            <td>65</td>
                            <td><span className="badge bg-warning text-dark">Assigned</span></td>
                        </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Reports;