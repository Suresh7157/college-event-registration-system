import { useEffect, useState } from "react";
import {
    FaUsers,
    FaCalendarAlt,
    FaIdBadge,
    FaChartBar
} from "react-icons/fa";

import StatCard from "./StatCard";
import Analytics from "../../components/admin/Analytics";
import { getDashboard } from "../../services/AdminService";

function Dashboard() {

    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEvents: 0,
        totalVolunteers: 0,
        totalRegistrations: 0
    });

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await getDashboard();
            setStats(response.data);
        } catch (error) {
            console.error("Error loading dashboard:", error);
        }
    };

    return (
        <div className="dashboard">

            {/* Header */}
            <div className="dashboard-header">
                <h2>Welcome, Admin 👋</h2>
                <p>
                    Manage users, events, volunteers and reports from one place.
                </p>
            </div>

            {/* Statistic Cards */}
            <div className="row g-4">

                <StatCard
                    title="Users"
                    value={stats.totalUsers}
                    icon={<FaUsers />}
                    color="#0d6efd"
                />

                <StatCard
                    title="Events"
                    value={stats.totalEvents}
                    icon={<FaCalendarAlt />}
                    color="#198754"
                />

                <StatCard
                    title="Volunteers"
                    value={stats.totalVolunteers}
                    icon={<FaIdBadge />}
                    color="#ffc107"
                />

                <StatCard
                    title="Registrations"
                    value={stats.totalRegistrations}
                    icon={<FaChartBar />}
                    color="#dc3545"
                />

            </div>

            {/* Analytics Section */}
            <Analytics />

        </div>
    );
}

export default Dashboard;