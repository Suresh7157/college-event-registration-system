import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: "/", label: "Home", icon: "bi-house-fill" },
    { to: "/manage-events", label: "Manage Events", icon: "bi-calendar-event-fill" },
    { to: "/registrations", label: "Registrations", icon: "bi-people-fill" },
    { to: "/volunteer-applications", label: "Volunteers", icon: "bi-person-badge-fill" },
    { to: "/profile", label: "Profile", icon: "bi-person-circle" },
  ];

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background: "linear-gradient(135deg, #1e40af 0%, #2563eb 60%, #3b82f6 100%)",
        padding: "0.6rem 0",
      }}
    >
      <div className="container">
        <Link
          className="navbar-brand d-flex align-items-center gap-2 fw-bold"
          to="/"
          style={{ fontSize: "1.4rem", letterSpacing: "0.3px" }}
        >
          <span style={{ fontSize: "1.6rem" }}>🎓</span>
          College Events
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            {navLinks.map(({ to, label, icon }) => (
              <li className="nav-item" key={to}>
                <Link
                  to={to}
                  className="nav-link d-flex align-items-center gap-2 px-3 py-2"
                  style={{
                    borderRadius: "8px",
                    fontWeight: isActive(to) ? "600" : "400",
                    background: isActive(to)
                      ? "rgba(255,255,255,0.18)"
                      : "transparent",
                    transition: "background 0.2s ease",
                  }}
                >
                  <i className={`bi ${icon}`}></i>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;