import { useState } from "react";

function Users() {

    const [users] = useState([
        {
            id: 1,
            fullName: "Tabrez Shaik",
            email: "tabrez@gmail.com",
            phoneNumber: "9876543210",
            department: "CST",
            year: "4th Year",
            role: "ADMIN"
        },
        {
            id: 2,
            fullName: "Rahul Kumar",
            email: "rahul@gmail.com",
            phoneNumber: "9123456789",
            department: "CSE",
            year: "3rd Year",
            role: "STUDENT"
        },
        {
            id: 3,
            fullName: "Priya Sharma",
            email: "priya@gmail.com",
            phoneNumber: "9988776655",
            department: "ECE",
            year: "2nd Year",
            role: "ORGANIZER"
        },
        {
            id: 4,
            fullName: "Aman Reddy",
            email: "aman@gmail.com",
            phoneNumber: "9871234567",
            department: "EEE",
            year: "4th Year",
            role: "VOLUNTEER"
        }
    ]);

    return (
        <div className="dashboard">

            <h2 className="dashboard-title">Manage Users</h2>

            <div className="card shadow-sm border-0 rounded-4 mt-4">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>
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
                        {users.map((user) => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.fullName}</td>
                                <td>{user.email}</td>
                                <td>{user.phoneNumber}</td>
                                <td>{user.department}</td>
                                <td>{user.year}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))}
                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Users;