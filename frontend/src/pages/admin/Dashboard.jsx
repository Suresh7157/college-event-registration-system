import StatCard from "./StatCard.jsx";
import Analytics from "../../components/admin/Analytics";

function Dashboard() {

    return (

        <div className="dashboard">

            <h2 className="dashboard-title">
                Welcome, Admin 👋
            </h2>

            <p className="dashboard-subtitle mb-4">
                Manage users, events, organizers and reports.
            </p>

            {/* Statistics Cards */}
            <div className="row">

                <StatCard
                    title="Users"
                    value="120"
                    icon="bi bi-people-fill"
                    color="primary"
                />

                <StatCard
                    title="Events"
                    value="18"
                    icon="bi bi-calendar-event"
                    color="success"
                />

                <StatCard
                    title="Organizers"
                    value="12"
                    icon="bi bi-person-badge-fill"
                    color="warning"
                />

                <StatCard
                    title="Reports"
                    value="25"
                    icon="bi bi-bar-chart-fill"
                    color="danger"
                />

            </div>

            {/* Analytics */}
            <Analytics />

        </div>

    );
}

export default Dashboard;