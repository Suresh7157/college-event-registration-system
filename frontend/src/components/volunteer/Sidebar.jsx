import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">

      <div className="sidebar-header">
        <h3>🎓 College Event</h3>
        <p>Volunteer Portal</p>
      </div>

      <div className="sidebar-menu">

        <NavLink
          to="/volunteer-dashboard"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          🏠 Dashboard
        </NavLink>

        <NavLink
          to="/my-profile"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          👤 My Profile
        </NavLink>

        <NavLink
          to="/assigned-event"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          🎉 Assigned Event
        </NavLink>

        <NavLink
          to="/attendance"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          📅 Attendance
        </NavLink>

        <NavLink
          to="/duty-schedule"
          className={({ isActive }) =>
            isActive ? "menu-item active" : "menu-item"
          }
        >
          🗓 Duty Schedule
        </NavLink>

      </div>

      <div className="logout-section">
        <button className="logout-btn">
          🚪 Logout
        </button>
      </div>

    </div>
  );
}

export default Sidebar;