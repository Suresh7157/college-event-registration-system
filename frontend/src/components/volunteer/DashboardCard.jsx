import React from "react";
import "../../styles/dashboardCard.css";

function DashboardCard({ title, value, icon, color }) {
    return (
        <div className={`dashboard-card ${color}`}>

            <div className="card-icon">
                {icon}
            </div>

            <div className="card-content">

                <h5>{title}</h5>

                <h3>{value}</h3>

            </div>

        </div>
    );
}

export default DashboardCard;