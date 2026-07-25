import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FilterBar from "../../components/events/FilterBar";
import AvailableEvents from "../../components/events/AvailableEvents";
import eventService from "../../services/eventService";
import registrationService from "../../services/registrationService";
import volunteerService from "../../services/volunteerService";
import bannerImg from "../../assets/images/events/banner.png";

function EventList() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const [stats, setStats] = useState({ totalEvents: 0, totalRegistrations: 0, totalVolunteers: 0, pendingVolunteers: 0 });
    const [statsLoading, setStatsLoading] = useState(true);
    const [statsError, setStatsError] = useState("");

    useEffect(() => { fetchEvents(); fetchStats(); }, []);

    const fetchStats = async () => {
        try {
            setStatsLoading(true);
            setStatsError("");
            const [eventsRes, registrationsRes, volunteersRes] = await Promise.all([
                eventService.getAllEvents(0, 1000),
                registrationService.getAllRegistrations(),
                volunteerService.getAllVolunteers(),
            ]);
            const volunteersData = volunteersRes.data;
            setStats({
                totalEvents: eventsRes.data.totalElements ?? eventsRes.data.content?.length ?? 0,
                totalRegistrations: registrationsRes.data.length,
                totalVolunteers: volunteersData.length,
                pendingVolunteers: volunteersData.filter(v => v.status === "PENDING").length,
            });
        } catch (error) {
            console.error("Stats fetch error:", error);
            setStatsError("Failed to load dashboard stats.");
        } finally {
            setStatsLoading(false);
        }
    };

    const fetchEvents = async () => {
        try {
            const response = await eventService.getAllEvents();
            setEvents(response.data.content);
        } catch (error) { console.error(error); }
    };

    const handleSearch = async (title) => {
        try {
            if (title.trim() === "") { fetchEvents(); return; }
            const response = await eventService.searchEvents(title);
            setEvents(response.data);
        } catch (error) { console.error(error); }
    };

    const handleFilter = async (status) => {
        try {
            if (status === "All") { fetchEvents(); return; }
            const response = await eventService.getEventsByStatus(status);
            setEvents(response.data);
        } catch (error) { console.error(error); }
    };

    const handleSort = async (value) => {
        if (!value) { fetchEvents(); return; }
        const [sortBy, direction] = value.split(",");
        try {
            const response = await eventService.getAllEvents(0, 20, sortBy, direction);
            setEvents(response.data.content);
        } catch (error) { console.error(error); }
    };

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long", year: "numeric", month: "long", day: "numeric",
    });

    const quotes = [
        "Great events don't just happen — they are planned with passion and executed with purpose.",
        "Every event is a canvas. Every organizer is an artist. Paint something unforgettable.",
        "The best events are not the biggest ones — they are the ones that leave a lasting impression.",
        "Behind every successful event is a team that refused to settle for ordinary.",
        "Events bring people together. Great events make them never want to leave.",
    ];
    const quote = quotes[Math.floor(Math.random() * quotes.length)];

    const analyticsCards = [
        { count: stats.totalEvents,        title: "Total Events",          desc: "All college events",    icon: "bi-calendar-event-fill", accent: "#2563eb", iconBg: "#eff6ff", iconColor: "#2563eb", route: "/manage-events" },
        { count: stats.totalRegistrations, title: "Registrations",         desc: "Student registrations", icon: "bi-people-fill",         accent: "#10b981", iconBg: "#f0fdf4", iconColor: "#059669", route: "/registrations" },
        { count: stats.totalVolunteers,    title: "Volunteer Applications", desc: "Volunteer requests",    icon: "bi-person-badge-fill",   accent: "#0ea5e9", iconBg: "#f0f9ff", iconColor: "#0284c7", route: "/volunteer-applications" },
        { count: stats.pendingVolunteers,  title: "Pending Volunteers",     desc: "Awaiting approval",     icon: "bi-hourglass-split",     accent: "#f59e0b", iconBg: "#fffbeb", iconColor: "#d97706", route: "/volunteer-applications" },
    ];

    return (
        <div style={{ background: "#f1f5f9", minHeight: "100vh" }}>
            <div className="container-fluid px-4">

                {/* ── 1. HERO BANNER ── */}
                <div style={{ paddingTop: 28, paddingBottom: 0 }}>
                    <div
                        style={{
                            background: "linear-gradient(135deg,#dbeafe 0%,#eff6ff 55%,#e0f2fe 100%)",
                            borderRadius: 24,
                            boxShadow: "0 6px 28px rgba(37,99,235,0.11)",
                            padding: "0 56px",
                            minHeight: 260,
                            display: "flex",
                            alignItems: "center",
                            overflow: "hidden",
                        }}
                    >
                        {/* Left — text */}
                        <div style={{ flex: "0 0 57%", paddingTop: 32, paddingBottom: 32 }}>
                            <span
                                className="d-inline-flex align-items-center gap-1 mb-3"
                                style={{
                                    background: "rgba(37,99,235,0.1)", color: "#2563eb",
                                    borderRadius: 8, padding: "3px 12px",
                                    fontSize: "0.78rem", fontWeight: 600, letterSpacing: "0.04em",
                                }}
                            >
                                <i className="bi bi-stars"></i> Admin Dashboard
                            </span>

                            <h1 className="fw-bold mb-2" style={{ fontSize: 52, lineHeight: 1.1, color: "#1e293b" }}>
                                Welcome back,{" "}
                                <span style={{ color: "#2563eb" }}>Organizer</span> 👋
                            </h1>

                            <p className="mb-3" style={{ fontSize: 22, color: "#475569", fontWeight: 500, lineHeight: 1.55 }}>
                                Plan. Organize. Inspire.
                            </p>

                            {/* Quote */}
                            <div
                                className="mb-4"
                                style={{
                                    borderLeft: "3px solid #2563eb",
                                    background: "rgba(37,99,235,0.06)",
                                    borderRadius: "0 8px 8px 0",
                                    padding: "10px 14px",
                                    maxWidth: 440,
                                }}
                            >
                                <span className="fst-italic" style={{ fontSize: 17, color: "#334155", lineHeight: 1.65 }}>
                                    "{quote}"
                                </span>
                            </div>

                            <div className="d-flex align-items-center">
                                <span style={{ fontSize: "0.83rem", color: "#64748b" }}>
                                    <i className="bi bi-calendar3 me-1" style={{ color: "#2563eb" }}></i>{today}
                                </span>
                            </div>
                        </div>

                        {/* Right — illustration fills the full banner height */}
                        <div
                            style={{
                                flex: "0 0 43%",
                                alignSelf: "stretch",
                                overflow: "hidden",
                            }}
                        >
                            <img
                                src={bannerImg}
                                alt="College Events"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center center",
                                    display: "block",
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ── 2. ANALYTICS CARDS ── */}
                <div style={{ marginTop: 35 }}>
                    {statsError && (
                        <div className="alert alert-danger mb-3" style={{ borderRadius: 12 }}>{statsError}</div>
                    )}
                    {statsLoading ? (
                        <div className="text-center py-4">
                            <div className="spinner-border text-primary" role="status" />
                            <p className="mt-2 text-muted" style={{ fontSize: "0.88rem" }}>Loading dashboard...</p>
                        </div>
                    ) : (
                        <div className="row g-3">
                            {analyticsCards.map(card => (
                                <div className="col-6 col-xl-3" key={card.title}>
                                    <div
                                        className="h-100"
                                        style={{
                                            background: "#fff",
                                            borderRadius: 20,
                                            cursor: "pointer",
                                            boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                                            padding: "22px 20px",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 16,
                                            borderLeft: `4px solid ${card.accent}`,
                                            transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                        }}
                                        onClick={() => navigate(card.route)}
                                        onMouseEnter={e => {
                                            e.currentTarget.style.transform = "translateY(-5px)";
                                            e.currentTarget.style.boxShadow = `0 8px 24px rgba(0,0,0,0.11)`;
                                        }}
                                        onMouseLeave={e => {
                                            e.currentTarget.style.transform = "translateY(0)";
                                            e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.07)";
                                        }}
                                    >
                                        <div style={{
                                            background: card.iconBg,
                                            borderRadius: 14,
                                            width: 58, height: 58, flexShrink: 0,
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                        }}>
                                            <i className={`bi ${card.icon}`} style={{ fontSize: "1.65rem", color: card.iconColor }}></i>
                                        </div>
                                        <div>
                                            <div className="fw-bold" style={{ fontSize: 36, lineHeight: 1, color: "#1e293b" }}>{card.count}</div>
                                            <div className="fw-semibold" style={{ fontSize: "0.88rem", color: "#374151", marginTop: 4 }}>{card.title}</div>
                                            <div style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 2 }}>{card.desc}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── 3. SEARCH + FILTER ── */}
                <div style={{ marginTop: 32 }}>
                    <FilterBar onSearch={handleSearch} onFilter={handleFilter} />
                </div>

                {/* ── 4. AVAILABLE EVENTS ── */}
                <div style={{ marginTop: 32 }}>
                    <AvailableEvents events={events} onSort={handleSort} />
                </div>

                {/* ── 5. MOTIVATIONAL BANNER ── */}
                <div style={{ marginTop: 32, paddingBottom: 48 }}>
                    <div
                        style={{
                            background: "linear-gradient(135deg,#1e40af 0%,#2563eb 60%,#3b82f6 100%)",
                            borderRadius: 24,
                            padding: "48px 48px",
                            boxShadow: "0 8px 32px rgba(37,99,235,0.25)",
                            textAlign: "center",
                        }}
                    >
                        <span style={{
                            background: "rgba(255,255,255,0.15)", borderRadius: 8,
                            padding: "3px 14px", fontSize: "0.78rem", color: "#fff",
                            letterSpacing: "0.06em", fontWeight: 600,
                        }}>
                            <i className="bi bi-stars me-1"></i>INSPIRE
                        </span>
                        <h2 className="fw-bold text-white mt-3 mb-2" style={{ fontSize: "1.85rem" }}>
                            Great events create lasting memories.
                        </h2>
                        <p className="text-white mb-4" style={{ fontSize: "0.97rem", opacity: 0.88, lineHeight: 1.85 }}>
                            Every registration is a new opportunity.<br />
                            Every volunteer is a future leader.<br />
                            Every event is a chance to inspire.
                        </p>
                        <button
                            className="btn btn-light fw-semibold px-4 py-2"
                            style={{ borderRadius: 12, fontSize: "0.93rem", color: "#2563eb", boxShadow: "0 4px 14px rgba(0,0,0,0.15)" }}
                            onClick={() => navigate("/manage-events")}
                        >
                            <i className="bi bi-calendar-plus me-2"></i>Create Your Next Event
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default EventList;
