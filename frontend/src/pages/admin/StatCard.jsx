import React from "react";

function StatCard({ title, value, icon, color }) {
    return (
        <div className="col-lg-3 col-md-6">
            <div className="admin-stat-card">

                <div className="admin-stat-left">
                    <p className="admin-stat-title">{title}</p>
                    <h2 className="admin-stat-value">{value}</h2>
                </div>

                <div
                    className="admin-stat-icon"
                    style={{ backgroundColor: color }}
                >
                    {icon}
                </div>

            </div>
        </div>
    );
}

export default StatCard;