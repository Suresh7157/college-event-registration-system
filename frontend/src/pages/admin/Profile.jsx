
import { useEffect, useState } from "react";
import {
    FaUserCircle,
    FaEnvelope,
    FaPhone,
    FaBuilding,
    FaGraduationCap,
    FaUserShield
} from "react-icons/fa";

import { getAdminProfile } from "../../services/AdminService";

function Profile() {

    const [admin, setAdmin] = useState({});

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {

            const response = await getAdminProfile(4);

            console.log(response.data);

            setAdmin(response.data);

        } catch (error) {

            console.error("Error loading profile:", error);

        }
    };

    return (

        <div className="dashboard">

            <div className="card shadow border-0 rounded-4">

                <div className="card-body p-5">

                    <div className="text-center">

                        <FaUserCircle
                            size={120}
                            color="#0d6efd"
                        />

                        <h2 className="mt-3">{admin.fullName}</h2>

                        <span className="badge bg-primary">
                            {admin.role}
                        </span>

                    </div>

                    <hr className="my-4" />

                    <div className="row">

                        <div className="col-md-6 mb-4">
                            <h6><FaEnvelope className="me-2" />Email</h6>
                            <p>{admin.email}</p>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h6><FaPhone className="me-2" />Phone</h6>
                            <p>{admin.phoneNumber}</p>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h6><FaBuilding className="me-2" />Department</h6>
                            <p>{admin.department}</p>
                        </div>

                        <div className="col-md-6 mb-4">
                            <h6><FaGraduationCap className="me-2" />Year</h6>
                            <p>{admin.year}</p>
                        </div>

                        <div className="col-md-6">
                            <h6><FaUserShield className="me-2" />Role</h6>
                            <p>{admin.role}</p>
                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Profile;