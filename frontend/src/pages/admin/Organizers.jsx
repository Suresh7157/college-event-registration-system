import { useEffect, useState } from "react";
import { getAllOrganizers } from "../../services/AdminService";

function Organizers() {

    const [organizers, setOrganizers] = useState([]);

    useEffect(() => {
        loadOrganizers();
    }, []);

    const loadOrganizers = async () => {

        try {

            const response = await getAllOrganizers();

            setOrganizers(response.data);

        } catch (error) {

            console.error("Error loading organizers:", error);

        }

    };

    return (

        <div className="dashboard">

            {/* Page Header */}

            <div className="page-header">

                <div>

                    <h2 className="page-title">
                        Manage Organizers
                    </h2>

                    <p className="page-subtitle">
                        View and manage all event organizers.
                    </p>

                </div>

            </div>

            {/* Organizers Table */}

            <div className="table-container">

                <table className="table">

                    <thead className="table-header">

                    <tr>

                        <th>ID</th>

                        <th>Name</th>

                        <th>Email</th>

                        <th>Phone</th>

                        <th>Department</th>

                        <th>Year</th>

                        <th>Role</th>

                    </tr>

                    </thead>

                    <tbody>

                    {organizers.length > 0 ? (

                        organizers.map((organizer) => (

                            <tr key={organizer.id}>

                                <td>{organizer.id}</td>

                                <td>
                                    <strong>{organizer.fullName}</strong>
                                </td>

                                <td>{organizer.email}</td>

                                <td>{organizer.phoneNumber}</td>

                                <td>{organizer.department}</td>

                                <td>{organizer.year}</td>

                                <td>

                                    <span className="badge bg-primary">

                                        {organizer.role}

                                    </span>

                                </td>

                            </tr>

                        ))

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                className="text-center py-5"
                            >

                                No Organizers Found

                            </td>

                        </tr>

                    )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default Organizers;