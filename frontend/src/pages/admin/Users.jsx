import { useEffect, useState } from "react";
import { getAllUsers } from "../../services/AdminService";

function Users() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);
    const loadUsers = async () => {
        try {
            const response = await getAllUsers();

            console.log("API Response:", response);
            console.log("Users:", response.data);

            setUsers(response.data);

        } catch (error) {
            console.error("Axios Error:", error);
        }
    };

    // const loadUsers = async () => {
    //     try {
    //         const response = await getAllUsers();
    //         setUsers(response.data);
    //     } catch (error) {
    //         console.error("Error loading users:", error);
    //     }
    // };

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