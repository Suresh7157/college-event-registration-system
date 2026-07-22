// import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">

        <a className="navbar-brand fw-bold" href="#">
          🎓 College Events
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">

          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <a className="nav-link active" href="#">Home</a>
            </li>

            {/* <li className="nav-item">
              <a className="nav-link" href="#">Events</a>
            </li> */}

            <Link
    to="/manage-events"
    className="nav-link"
>
    Manage Events
</Link>

            <li className="nav-item">
              <a className="nav-link" href="#">Profile</a>
            </li>

          </ul>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;