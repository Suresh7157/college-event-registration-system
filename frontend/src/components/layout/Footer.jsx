import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer style={{ background: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>

            <div className="container" style={{ padding: "56px 24px 40px" }}>
                <div className="row g-5">

                    {/* ── Col 1: Brand ── */}
                    <div className="col-lg-3 col-md-6">

                        <div className="d-flex align-items-center gap-2 mb-3">
                            <span style={{ fontSize: "2rem" }}>🎓</span>
                            <span
                                className="fw-bold"
                                style={{ fontSize: "1.2rem", color: "#1e3a8a" }}
                            >
                                College Events
                            </span>
                        </div>

                        <p
                            className="fw-semibold mb-2"
                            style={{ color: "#2563eb", fontSize: "0.9rem" }}
                        >
                            Organize. Engage. Inspire.
                        </p>

                        <p style={{ fontSize: "0.88rem", color: "#64748b", lineHeight: 1.75 }}>
                            Empowering colleges to organize memorable events, simplify
                            registrations, and encourage student participation through one
                            unified platform.
                        </p>

                    </div>

                    {/* ── Col 2: Quick Links ── */}
                    <div className="col-lg-3 col-md-6">

                        <h6
                            className="fw-bold mb-4"
                            style={{ color: "#1e3a8a", fontSize: "1rem", letterSpacing: "0.3px" }}
                        >
                            Quick Links
                        </h6>

                        <ul className="list-unstyled mb-0" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                            {[
                                { to: "/",                       icon: "bi-house-fill",          label: "Home" },
                                { to: "/manage-events",          icon: "bi-calendar-event-fill", label: "Manage Events" },
                                { to: "/registrations",          icon: "bi-people-fill",         label: "Registrations" },
                                { to: "/volunteer-applications", icon: "bi-person-badge-fill",   label: "Volunteer Applications" },
                                { to: "/profile",                icon: "bi-person-circle",       label: "Profile" },
                            ].map(({ to, icon, label }) => (
                                <li key={to}>
                                    <Link
                                        to={to}
                                        style={{
                                            color: "#475569",
                                            textDecoration: "none",
                                            fontSize: "0.9rem",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "8px",
                                            transition: "color 0.2s",
                                        }}
                                        onMouseEnter={(e) => e.currentTarget.style.color = "#2563eb"}
                                        onMouseLeave={(e) => e.currentTarget.style.color = "#475569"}
                                    >
                                        <i className={`bi ${icon}`} style={{ color: "#2563eb", fontSize: "0.85rem" }}></i>
                                        {label}
                                    </Link>
                                </li>
                            ))}

                        </ul>

                    </div>

                    {/* ── Col 3: Mission ── */}
                    <div className="col-lg-3 col-md-6">

                        <h6
                            className="fw-bold mb-4"
                            style={{ color: "#1e3a8a", fontSize: "1rem", letterSpacing: "0.3px" }}
                        >
                            Our Mission
                        </h6>

                        <div
                            style={{
                                background: "#eff6ff",
                                borderLeft: "4px solid #2563eb",
                                borderRadius: "0 12px 12px 0",
                                padding: "16px 18px",
                                marginBottom: "16px",
                            }}
                        >
                            <i
                                className="bi bi-quote"
                                style={{ fontSize: "1.4rem", color: "#2563eb", display: "block", marginBottom: "6px" }}
                            ></i>
                            <p
                                className="fst-italic mb-0"
                                style={{ fontSize: "0.87rem", color: "#334155", lineHeight: 1.75 }}
                            >
                                Every successful event begins with a vision, grows through
                                teamwork, and leaves behind unforgettable memories.
                            </p>
                        </div>

                        <p style={{ fontSize: "0.87rem", color: "#64748b", lineHeight: 1.7 }}>
                            Creating opportunities for students to learn, lead, and connect.
                        </p>

                    </div>

                    {/* ── Col 4: Contact ── */}
                    <div className="col-lg-3 col-md-6">

                        <h6
                            className="fw-bold mb-4"
                            style={{ color: "#1e3a8a", fontSize: "1rem", letterSpacing: "0.3px" }}
                        >
                            Get in Touch
                        </h6>

                        <ul className="list-unstyled mb-0" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

                            <li className="d-flex align-items-start gap-3">
                                <i className="bi bi-geo-alt-fill" style={{ color: "#2563eb", fontSize: "1rem", marginTop: "2px" }}></i>
                                <span style={{ fontSize: "0.9rem", color: "#475569" }}>College Campus</span>
                            </li>

                            <li className="d-flex align-items-start gap-3">
                                <i className="bi bi-envelope-fill" style={{ color: "#2563eb", fontSize: "1rem", marginTop: "2px" }}></i>
                                <span style={{ fontSize: "0.9rem", color: "#475569" }}>support@collegeevents.edu</span>
                            </li>

                            <li className="d-flex align-items-start gap-3">
                                <i className="bi bi-telephone-fill" style={{ color: "#2563eb", fontSize: "1rem", marginTop: "2px" }}></i>
                                <span style={{ fontSize: "0.9rem", color: "#475569" }}>+91 90807 06050</span>
                            </li>

                        </ul>

                    </div>

                </div>
            </div>

            {/* ── Bottom Bar ── */}
            <div style={{ borderTop: "1px solid #e2e8f0", padding: "20px 24px" }}>
                <div className="container text-center">
                    <p className="mb-0" style={{ fontSize: "0.87rem", color: "#94a3b8" }}>
                        © 2026 College Events Management System. &nbsp;
                        Built with <span style={{ color: "#e11d48" }}>❤️</span> to inspire learning, leadership, and collaboration.
                    </p>
                </div>
            </div>

        </footer>
    );
}

export default Footer;
