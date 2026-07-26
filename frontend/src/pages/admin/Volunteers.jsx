import { useEffect, useState } from "react";
import { getAllVolunteers } from "../../services/AdminService";

function Volunteers() {

    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        loadVolunteers();
    }, []);

    const loadVolunteers = () => {
        getAllVolunteers()
            .then((response) => {
                setVolunteers(response.data);
            })
            .catch((error) => {
                console.error("Error fetching volunteers:", error);
            });
    };

    return (
        <div className="dashboard">

            <h2 className="dashboard-title">Manage Volunteers</h2>

            <div className="card shadow-sm border-0 rounded-4 mt-4">

                <div className="card-body">

                    <table className="table table-hover align-middle">

                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Department</th>
                            <th>Year</th>
                            <th>Status</th>
                        </tr>
                        </thead>

                        <tbody>

                        {volunteers.map((volunteer) => (

                            <tr key={volunteer.id}>

                                <td>{volunteer.id}</td>
                                <td>{volunteer.fullName}</td>
                                <td>{volunteer.email}</td>
                                <td>{volunteer.phoneNumber}</td>
                                <td>{volunteer.department}</td>
                                <td>{volunteer.year}</td>
                                <td>{volunteer.status}</td>

                            </tr>

                        ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Volunteers;