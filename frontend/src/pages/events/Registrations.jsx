import { useEffect, useState } from "react";
import registrationService from "../../services/registrationService";

const statusMeta = {
    CONFIRMED: { bg: "bg-success",   icon: "bi-check-circle-fill" },
    PENDING:   { bg: "bg-warning text-dark", icon: "bi-hourglass-split" },
    CANCELLED: { bg: "bg-danger",    icon: "bi-x-circle-fill" },
};

function formatDate(raw) {
    if (!raw) return { date: "—", time: "" };
    const d = new Date(raw);
    if (isNaN(d)) {
        // try "yyyy-MM-dd HH:mm" or plain string
        const parts = raw.split("T").join(" ").split(" ");
        return { date: parts[0] ?? raw, time: parts[1] ?? "" };
    }
    const date = d.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    const time = d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    return { date, time };
}

function getInitials(name = "") {
    return name.trim().split(" ").slice(0, 2).map(w => w[0]?.toUpperCase()).join("");
}

const AVATAR_COLORS = ["#2563eb", "#065f46", "#0e7490", "#7c3aed", "#b45309", "#be123c"];
function avatarColor(name = "") {
    let hash = 0;
    for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function Registrations() {
    const [registrations, setRegistrations] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedReg, setSelectedReg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchRegistrations = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await registrationService.getAllRegistrations();
            setRegistrations(response.data);
            setFiltered(response.data);
        } catch (err) {
            console.error("Error fetching registrations:", err);
            setError("Failed to load registrations. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchRegistrations(); }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === "") { setFiltered(registrations); return; }
        const lower = query.toLowerCase();
        setFiltered(
            registrations.filter(r =>
                r.studentName.toLowerCase().includes(lower) ||
                r.eventTitle.toLowerCase().includes(lower)
            )
        );
    };

    const handleReset = () => { setSearchQuery(""); setFiltered(registrations); };

    const handleDeleteClick = (reg) => { setSelectedReg(reg); setShowModal(true); };

    const confirmDelete = async () => {
        try {
            await registrationService.deleteRegistration(selectedReg.registrationId);
            alert(`Registration for "${selectedReg.studentName}" deleted successfully`);
            const updated = registrations.filter(r => r.registrationId !== selectedReg.registrationId);
            setRegistrations(updated);
            const lower = searchQuery.toLowerCase();
            setFiltered(
                updated.filter(r =>
                    r.studentName.toLowerCase().includes(lower) ||
                    r.eventTitle.toLowerCase().includes(lower)
                )
            );
            setShowModal(false);
        } catch (err) {
            console.error("Delete failed:", err);
            alert("Failed to delete registration.");
        }
    };

    const todayStr = new Date().toDateString();
    const counts = {
        total: registrations.length,
        today: registrations.filter(r => {
            const d = r.registrationDate ? new Date(r.registrationDate) : null;
            return d && d.toDateString() === todayStr;
        }).length,
        upcoming: registrations.filter(r => r.status === "CONFIRMED").length,
    };

    const summaryCards = [
        { label: "Total Registrations",     value: counts.total,    icon: "bi-people-fill",         accent: "#2563eb", iconBg: "#eff6ff", iconColor: "#2563eb" },
        { label: "Today's Registrations",   value: counts.today,    icon: "bi-calendar-check-fill", accent: "#10b981", iconBg: "#f0fdf4", iconColor: "#059669" },
        { label: "Confirmed Registrations", value: counts.upcoming, icon: "bi-patch-check-fill",    accent: "#0ea5e9", iconBg: "#f0f9ff", iconColor: "#0284c7" },
    ];

    return (
        <div className="container-fluid py-4 px-4" style={{ background: "#f1f5f9", minHeight: "100vh" }}>

            {/* ── Header ── */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: "#1e293b" }}>
                        <i className="bi bi-people me-2 text-primary"></i>Registrations
                    </h2>
                    <p className="text-muted mb-0" style={{ fontSize: "0.93rem" }}>
                        View and manage student event registrations.
                    </p>
                </div>
                <span className="badge bg-primary px-3 py-2" style={{ borderRadius: "10px", fontSize: "0.88rem" }}>
                    <i className="bi bi-list-ul me-1"></i>{filtered.length} records
                </span>
            </div>

            {/* ── Summary Cards ── */}
            <div className="row g-3 mb-4">
                {summaryCards.map(card => (
                    <div className="col-12 col-md-4" key={card.label}>
                        <div
                            className="d-flex align-items-center gap-3 p-3 h-100"
                            style={{
                                background: "#fff",
                                borderRadius: 18,
                                boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                                borderLeft: `4px solid ${card.accent}`,
                            }}
                        >
                            <div style={{
                                background: card.iconBg, borderRadius: 12,
                                width: 52, height: 52, flexShrink: 0,
                                display: "flex", alignItems: "center", justifyContent: "center",
                            }}>
                                <i className={`bi ${card.icon}`} style={{ fontSize: "1.5rem", color: card.iconColor }}></i>
                            </div>
                            <div>
                                <div className="fw-bold" style={{ fontSize: "1.85rem", lineHeight: 1, color: "#1e293b" }}>{card.value}</div>
                                <div className="fw-semibold" style={{ fontSize: "0.82rem", color: "#374151", marginTop: 3 }}>{card.label}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ── Search Card ── */}
            <div className="card border-0 mb-4" style={{ borderRadius: "18px", boxShadow: "0 2px 16px rgba(0,0,0,0.07)" }}>
                <div className="card-body p-3">
                    <div className="row g-2 align-items-center">
                        <div className="col">
                            <div className="input-group">
                                <span className="input-group-text bg-white border-end-0" style={{ borderRadius: "12px 0 0 12px" }}>
                                    <i className="bi bi-search text-muted"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control border-start-0 ps-0"
                                    placeholder="Search by student name or event title..."
                                    value={searchQuery}
                                    style={{ borderRadius: "0 12px 12px 0" }}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <div className="col-auto">
                            <button
                                className="btn btn-outline-secondary fw-semibold px-3"
                                style={{ borderRadius: "12px" }}
                                onClick={handleReset}
                            >
                                <i className="bi bi-arrow-counterclockwise me-1"></i>Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Loading / Error ── */}
            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3 text-muted">Loading registrations...</p>
                </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* ── Table Card ── */}
            {!loading && !error && (
                <div className="card border-0" style={{ borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.09)", overflow: "hidden" }}>
                    <div className="card-header border-0 px-4 py-3" style={{ background: "#fff" }}>
                        <span className="fw-semibold" style={{ color: "#1e293b", fontSize: "1rem" }}>
                            <i className="bi bi-table me-2 text-primary"></i>
                            All Registrations
                            <span className="badge bg-primary ms-2" style={{ borderRadius: "8px", fontSize: "0.78rem" }}>
                                {filtered.length}
                            </span>
                        </span>
                    </div>

                    <div className="table-responsive" style={{ maxHeight: "520px", overflowY: "auto" }}>
                        <table className="table table-hover table-striped align-middle mb-0">
                            <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "#f8fafc" }}>
                                <tr style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b" }}>
                                    <th className="ps-4 py-3">Student</th>
                                    <th className="py-3">Event</th>
                                    <th className="py-3">Registered On</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3 text-center pe-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-5 text-muted">
                                            <i className="bi bi-inbox" style={{ fontSize: "2.5rem", display: "block", marginBottom: 8 }}></i>
                                            No registrations found.
                                        </td>
                                    </tr>
                                ) : filtered.map(reg => {
                                    const meta = statusMeta[reg.status] || { bg: "bg-secondary", icon: "bi-circle" };
                                    const { date, time } = formatDate(reg.registrationDate);
                                    const color = avatarColor(reg.studentName);
                                    return (
                                        <tr key={reg.registrationId} style={{ fontSize: "0.93rem" }}>

                                            {/* Student */}
                                            <td className="ps-4 py-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div style={{
                                                        width: 40, height: 40, borderRadius: "50%",
                                                        background: color, flexShrink: 0,
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        color: "#fff", fontWeight: 700, fontSize: "0.88rem",
                                                    }}>
                                                        {getInitials(reg.studentName)}
                                                    </div>
                                                    <div>
                                                        <div className="fw-semibold" style={{ color: "#1e293b" }}>{reg.studentName}</div>
                                                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                                                            <i className="bi bi-envelope me-1"></i>{reg.studentEmail}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Event */}
                                            <td>
                                                <div className="fw-semibold" style={{ color: "#1e293b" }}>{reg.eventTitle}</div>
                                            </td>

                                            {/* Date */}
                                            <td>
                                                <div className="fw-semibold" style={{ color: "#1e293b", fontSize: "0.9rem" }}>
                                                    <i className="bi bi-calendar3 me-1 text-primary"></i>{date}
                                                </div>
                                                {time && (
                                                    <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: 2 }}>
                                                        <i className="bi bi-clock me-1"></i>{time}
                                                    </div>
                                                )}
                                            </td>

                                            {/* Status */}
                                            <td>
                                                <span className={`badge ${meta.bg} d-inline-flex align-items-center gap-1`}
                                                    style={{ borderRadius: "8px", padding: "5px 10px", fontSize: "0.78rem" }}>
                                                    <i className={`bi ${meta.icon}`}></i>
                                                    {reg.status}
                                                </span>
                                            </td>

                                            {/* Action */}
                                            <td className="text-center pe-4">
                                                <button
                                                    className="btn btn-sm btn-outline-danger"
                                                    style={{ borderRadius: "8px", width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                                    title="Delete Registration"
                                                    onClick={() => handleDeleteClick(reg)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Delete Modal ── */}
            {showModal && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.45)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0" style={{ borderRadius: "18px", overflow: "hidden" }}>
                            <div className="modal-header border-0 pb-0 px-4 pt-4">
                                <div style={{
                                    background: "rgba(239,68,68,0.1)", borderRadius: "12px",
                                    width: 52, height: 52,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <i className="bi bi-trash text-danger" style={{ fontSize: "1.5rem" }}></i>
                                </div>
                            </div>
                            <div className="modal-body px-4 pt-3 pb-2">
                                <h5 className="fw-bold mb-1" style={{ color: "#1e293b" }}>Delete Registration</h5>
                                <p className="text-muted mb-0" style={{ fontSize: "0.93rem" }}>
                                    Are you sure you want to delete the registration for{" "}
                                    <strong>{selectedReg?.studentName}</strong> —{" "}
                                    <strong>{selectedReg?.eventTitle}</strong>? This action cannot be undone.
                                </p>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                <button
                                    className="btn btn-outline-secondary fw-semibold px-4"
                                    style={{ borderRadius: "10px" }}
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger fw-semibold px-4"
                                    style={{ borderRadius: "10px" }}
                                    onClick={confirmDelete}
                                >
                                    <i className="bi bi-trash me-2"></i>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Registrations;
