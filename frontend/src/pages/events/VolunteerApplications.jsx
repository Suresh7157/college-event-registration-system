import { useEffect, useState } from "react";
import volunteerService from "../../services/volunteerService";

const statusMeta = {
    APPROVED: { bg: "bg-success",          icon: "bi-check-circle-fill",  rowBg: "rgba(16,185,129,0.06)",  border: "#10b981" },
    PENDING:  { bg: "bg-warning text-dark", icon: "bi-hourglass-split",    rowBg: "rgba(245,158,11,0.06)",  border: "#f59e0b" },
    REJECTED: { bg: "bg-danger",            icon: "bi-x-circle-fill",      rowBg: "rgba(239,68,68,0.06)",   border: "#ef4444" },
};

function getInitials(name = "") {
    return name.trim().split(" ").slice(0, 2).map(w => w[0]?.toUpperCase()).join("");
}

const AVATAR_COLORS = ["#2563eb", "#065f46", "#0e7490", "#7c3aed", "#b45309", "#be123c"];
function avatarColor(name = "") {
    let hash = 0;
    for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function InfoRow({ icon, label, value }) {
    return (
        <div className="d-flex align-items-start gap-2 mb-2">
            <i className={`bi ${icon} text-primary mt-1`} style={{ fontSize: "0.9rem", flexShrink: 0 }}></i>
            <div>
                <span style={{ fontSize: "0.75rem", color: "#64748b", textTransform: "uppercase", letterSpacing: "0.04em" }}>{label}</span>
                <div className="fw-semibold" style={{ color: "#1e293b", fontSize: "0.93rem" }}>{value || "—"}</div>
            </div>
        </div>
    );
}

function VolunteerApplications() {
    const [volunteers, setVolunteers] = useState([]);
    const [filtered, setFiltered] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const [selectedVolunteer, setSelectedVolunteer] = useState(null);
    const [editVolunteer, setEditVolunteer] = useState(null);
    const [editStatus, setEditStatus] = useState("");

    const fetchVolunteers = async () => {
        try {
            setLoading(true);
            setError("");
            const response = await volunteerService.getAllVolunteers();
            setVolunteers(response.data);
            setFiltered(response.data);
        } catch (err) {
            console.error("Error fetching volunteer applications:", err);
            setError("Failed to load volunteer applications. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchVolunteers(); }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.trim() === "") { setFiltered(volunteers); return; }
        const lower = query.toLowerCase();
        setFiltered(
            volunteers.filter(v =>
                v.user?.fullName.toLowerCase().includes(lower) ||
                v.event?.title.toLowerCase().includes(lower)
            )
        );
    };

    const handleReset = () => { setSearchQuery(""); setFiltered(volunteers); };

    const handleEdit = (volunteer) => { setEditVolunteer(volunteer); setEditStatus(volunteer.status); };

    const handleUpdate = async () => {
        try {
            await volunteerService.updateVolunteer(editVolunteer.id, { ...editVolunteer, status: editStatus });
            setSuccessMsg(`${editVolunteer.user?.fullName}'s status updated to ${editStatus}.`);
            setTimeout(() => setSuccessMsg(""), 3000);
            setEditVolunteer(null);
            fetchVolunteers();
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update volunteer status.");
        }
    };

    const handleApprove = async (volunteer) => {
        try {
            await volunteerService.approveVolunteer(volunteer.id);
            setSuccessMsg(`${volunteer.user?.fullName} has been approved successfully.`);
            setTimeout(() => setSuccessMsg(""), 3000);
            setSelectedVolunteer(null);
            fetchVolunteers();
        } catch (err) {
            console.error("Approve failed:", err);
            alert("Failed to approve volunteer application.");
        }
    };

    const handleReject = async (volunteer) => {
        try {
            await volunteerService.rejectVolunteer(volunteer.id);
            setSuccessMsg(`${volunteer.user?.fullName} has been rejected.`);
            setTimeout(() => setSuccessMsg(""), 3000);
            setSelectedVolunteer(null);
            fetchVolunteers();
        } catch (err) {
            console.error("Reject failed:", err);
            alert("Failed to reject volunteer application.");
        }
    };

    const counts = {
        total:    volunteers.length,
        pending:  volunteers.filter(v => v.status === "PENDING").length,
        approved: volunteers.filter(v => v.status === "APPROVED").length,
        rejected: volunteers.filter(v => v.status === "REJECTED").length,
    };

    const summaryCards = [
        { label: "Total Applications", value: counts.total,    icon: "bi-person-badge-fill", accent: "#2563eb", iconBg: "#eff6ff", iconColor: "#2563eb" },
        { label: "Pending",            value: counts.pending,  icon: "bi-hourglass-split",   accent: "#f59e0b", iconBg: "#fffbeb", iconColor: "#d97706" },
        { label: "Approved",           value: counts.approved, icon: "bi-check-circle-fill", accent: "#10b981", iconBg: "#f0fdf4", iconColor: "#059669" },
        { label: "Rejected",           value: counts.rejected, icon: "bi-x-circle-fill",     accent: "#ef4444", iconBg: "#fff1f2", iconColor: "#dc2626" },
    ];

    return (
        <div className="container-fluid py-4 px-4" style={{ background: "#f1f5f9", minHeight: "100vh" }}>

            {/* ── Header ── */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2 className="fw-bold mb-1" style={{ color: "#1e293b" }}>
                        <i className="bi bi-person-badge me-2 text-primary"></i>Volunteer Applications
                    </h2>
                    <p className="text-muted mb-0" style={{ fontSize: "0.93rem" }}>
                        Review and manage student volunteer applications.
                    </p>
                </div>
                <span className="badge bg-primary px-3 py-2" style={{ borderRadius: "10px", fontSize: "0.88rem" }}>
                    <i className="bi bi-list-ul me-1"></i>{filtered.length} records
                </span>
            </div>

            {/* ── Alerts ── */}
            {successMsg && (
                <div className="alert alert-success d-flex align-items-center gap-2 border-0 mb-4" style={{ borderRadius: "12px" }}>
                    <i className="bi bi-check-circle-fill text-success"></i>{successMsg}
                </div>
            )}
            {error && (
                <div className="alert alert-danger border-0 mb-4" style={{ borderRadius: "12px" }}>{error}</div>
            )}

            {/* ── Summary Cards ── */}
            <div className="row g-3 mb-4">
                {summaryCards.map(card => (
                    <div className="col-6 col-xl-3" key={card.label}>
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
                            <button className="btn btn-outline-secondary fw-semibold px-3" style={{ borderRadius: "12px" }} onClick={handleReset}>
                                <i className="bi bi-arrow-counterclockwise me-1"></i>Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Loading ── */}
            {loading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3 text-muted">Loading volunteer applications...</p>
                </div>
            )}

            {/* ── Table Card ── */}
            {!loading && !error && (
                <div className="card border-0" style={{ borderRadius: "20px", boxShadow: "0 4px 24px rgba(0,0,0,0.09)", overflow: "hidden" }}>
                    <div className="card-header border-0 px-4 py-3" style={{ background: "#fff" }}>
                        <span className="fw-semibold" style={{ color: "#1e293b", fontSize: "1rem" }}>
                            <i className="bi bi-table me-2 text-primary"></i>
                            All Applications
                            <span className="badge bg-primary ms-2" style={{ borderRadius: "8px", fontSize: "0.78rem" }}>{filtered.length}</span>
                        </span>
                    </div>

                    <div className="table-responsive" style={{ maxHeight: "540px", overflowY: "auto" }}>
                        <table className="table table-hover align-middle mb-0">
                            <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "#f8fafc" }}>
                                <tr style={{ fontSize: "0.82rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b" }}>
                                    <th className="ps-4 py-3">Volunteer</th>
                                    <th className="py-3">Event</th>
                                    <th className="py-3">Department</th>
                                    <th className="py-3">Year</th>
                                    <th className="py-3">Status</th>
                                    <th className="py-3 text-center pe-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-5 text-muted">
                                            <i className="bi bi-inbox" style={{ fontSize: "2.5rem", display: "block", marginBottom: 8 }}></i>
                                            No volunteer applications found.
                                        </td>
                                    </tr>
                                ) : filtered.map(volunteer => {
                                    const meta = statusMeta[volunteer.status] || { bg: "bg-secondary", icon: "bi-circle", rowBg: "transparent", border: "transparent" };
                                    const color = avatarColor(volunteer.user?.fullName ?? "");
                                    return (
                                        <tr key={volunteer.id} style={{ background: meta.rowBg, borderLeft: `3px solid ${meta.border}`, fontSize: "0.93rem" }}>

                                            {/* Volunteer */}
                                            <td className="ps-4 py-3">
                                                <div className="d-flex align-items-center gap-3">
                                                    <div style={{
                                                        width: 40, height: 40, borderRadius: "50%",
                                                        background: color, flexShrink: 0,
                                                        display: "flex", alignItems: "center", justifyContent: "center",
                                                        color: "#fff", fontWeight: 700, fontSize: "0.88rem",
                                                    }}>
                                                        {getInitials(volunteer.user?.fullName ?? "")}
                                                    </div>
                                                    <div>
                                                        <div className="fw-semibold" style={{ color: "#1e293b" }}>{volunteer.user?.fullName}</div>
                                                        <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                                                            <i className="bi bi-envelope me-1"></i>{volunteer.user?.email}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Event */}
                                            <td>
                                                <div className="fw-semibold" style={{ color: "#1e293b" }}>{volunteer.event?.title}</div>
                                                <div style={{ fontSize: "0.78rem", color: "#64748b" }}>
                                                    <i className="bi bi-geo-alt me-1 text-danger"></i>{volunteer.event?.venue}
                                                </div>
                                            </td>

                                            {/* Department */}
                                            <td style={{ color: "#475569" }}>
                                                <i className="bi bi-building me-1 text-primary"></i>
                                                {volunteer.user?.department || "—"}
                                            </td>

                                            {/* Year */}
                                            <td>
                                                <span className="badge bg-light text-dark border" style={{ borderRadius: "8px", padding: "4px 10px", fontSize: "0.78rem" }}>
                                                    Year {volunteer.user?.year || "—"}
                                                </span>
                                            </td>

                                            {/* Status */}
                                            <td>
                                                <span className={`badge ${meta.bg} d-inline-flex align-items-center gap-1`}
                                                    style={{ borderRadius: "8px", padding: "5px 10px", fontSize: "0.78rem" }}>
                                                    <i className={`bi ${meta.icon}`}></i>
                                                    {volunteer.status}
                                                </span>
                                            </td>

                                            {/* Actions */}
                                            <td className="text-center pe-4">
                                                <div className="d-flex justify-content-center gap-2">
                                                    {/* View Details */}
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        style={{ borderRadius: "8px", width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                                        title="View Details"
                                                        onClick={() => setSelectedVolunteer(volunteer)}
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </button>

                                                    {volunteer.status === "PENDING" ? (
                                                        <>
                                                            <button
                                                                className="btn btn-sm btn-outline-success"
                                                                style={{ borderRadius: "8px", width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                                                title="Approve"
                                                                onClick={() => handleApprove(volunteer)}
                                                            >
                                                                <i className="bi bi-check-lg"></i>
                                                            </button>
                                                            <button
                                                                className="btn btn-sm btn-outline-danger"
                                                                style={{ borderRadius: "8px", width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                                                title="Reject"
                                                                onClick={() => handleReject(volunteer)}
                                                            >
                                                                <i className="bi bi-x-lg"></i>
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <button
                                                            className="btn btn-sm btn-outline-warning"
                                                            style={{ borderRadius: "8px", width: 34, height: 34, padding: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
                                                            title="Edit Status"
                                                            onClick={() => handleEdit(volunteer)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                    )}
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Edit Modal ── */}
            {editVolunteer && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.45)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0" style={{ borderRadius: "18px", overflow: "hidden" }}>
                            <div className="modal-header border-0 px-4 pt-4 pb-2">
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ color: "#1e293b" }}>Edit Volunteer Status</h5>
                                    <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>Update the application status for this volunteer.</p>
                                </div>
                                <button className="btn-close ms-auto" onClick={() => setEditVolunteer(null)} />
                            </div>
                            <div className="modal-body px-4 py-3">
                                <div className="p-3 mb-3" style={{ background: "#f8fafc", borderRadius: "12px" }}>
                                    <InfoRow icon="bi-person" label="Student" value={editVolunteer.user?.fullName} />
                                    <InfoRow icon="bi-calendar-event" label="Event" value={editVolunteer.event?.title} />
                                    <div className="d-flex align-items-center gap-2 mt-1">
                                        <i className="bi bi-circle-fill text-primary" style={{ fontSize: "0.5rem" }}></i>
                                        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Current Status:</span>
                                        <span className={`badge ${(statusMeta[editVolunteer.status] || {}).bg || "bg-secondary"} d-inline-flex align-items-center gap-1`}
                                            style={{ borderRadius: "8px", fontSize: "0.75rem" }}>
                                            <i className={`bi ${(statusMeta[editVolunteer.status] || {}).icon || "bi-circle"}`}></i>
                                            {editVolunteer.status}
                                        </span>
                                    </div>
                                </div>
                                <label className="form-label fw-semibold" style={{ color: "#1e293b", fontSize: "0.88rem" }}>Update Status</label>
                                <select
                                    className="form-select"
                                    style={{ borderRadius: "10px" }}
                                    value={editStatus}
                                    onChange={e => setEditStatus(e.target.value)}
                                >
                                    <option value="PENDING">PENDING</option>
                                    <option value="APPROVED">APPROVED</option>
                                    <option value="REJECTED">REJECTED</option>
                                </select>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                <button className="btn btn-outline-secondary fw-semibold px-4" style={{ borderRadius: "10px" }} onClick={() => setEditVolunteer(null)}>
                                    Cancel
                                </button>
                                <button className="btn btn-primary fw-semibold px-4" style={{ borderRadius: "10px" }} onClick={handleUpdate}>
                                    <i className="bi bi-check-lg me-2"></i>Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ── View Details Modal ── */}
            {selectedVolunteer && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.45)" }}>
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content border-0" style={{ borderRadius: "18px", overflow: "hidden" }}>
                            <div className="modal-header border-0 px-4 pt-4 pb-2">
                                <div>
                                    <h5 className="fw-bold mb-0" style={{ color: "#1e293b" }}>Volunteer Application Details</h5>
                                    <p className="text-muted mb-0" style={{ fontSize: "0.85rem" }}>Full information about this application.</p>
                                </div>
                                <button className="btn-close ms-auto" onClick={() => setSelectedVolunteer(null)} />
                            </div>
                            <div className="modal-body px-4 py-3">
                                <div className="row g-3">
                                    {/* Student Info */}
                                    <div className="col-md-6">
                                        <div className="p-3 h-100" style={{ background: "#f0f9ff", borderRadius: "14px", border: "1px solid #bae6fd" }}>
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <i className="bi bi-person-circle text-primary" style={{ fontSize: "1.2rem" }}></i>
                                                <span className="fw-bold" style={{ color: "#1e293b" }}>Student Information</span>
                                            </div>
                                            <InfoRow icon="bi-person"       label="Full Name"    value={selectedVolunteer.user?.fullName} />
                                            <InfoRow icon="bi-envelope"     label="Email"        value={selectedVolunteer.user?.email} />
                                            <InfoRow icon="bi-telephone"    label="Phone"        value={selectedVolunteer.user?.phoneNumber} />
                                            <InfoRow icon="bi-building"     label="Department"   value={selectedVolunteer.user?.department} />
                                            <InfoRow icon="bi-mortarboard" label="Year"          value={selectedVolunteer.user?.year} />
                                        </div>
                                    </div>
                                    {/* Event Info */}
                                    <div className="col-md-6">
                                        <div className="p-3 h-100" style={{ background: "#f0fdf4", borderRadius: "14px", border: "1px solid #bbf7d0" }}>
                                            <div className="d-flex align-items-center gap-2 mb-3">
                                                <i className="bi bi-calendar-event text-success" style={{ fontSize: "1.2rem" }}></i>
                                                <span className="fw-bold" style={{ color: "#1e293b" }}>Event Information</span>
                                            </div>
                                            <InfoRow icon="bi-card-text"    label="Event Title"  value={selectedVolunteer.event?.title} />
                                            <InfoRow icon="bi-geo-alt"      label="Venue"        value={selectedVolunteer.event?.venue} />
                                            <InfoRow icon="bi-calendar3"    label="Event Date"   value={selectedVolunteer.event?.eventDate} />
                                            <InfoRow icon="bi-clock"        label="Event Time"   value={selectedVolunteer.event?.eventTime} />
                                        </div>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className="mt-3 p-3 d-flex align-items-center gap-3" style={{ background: "#f8fafc", borderRadius: "12px" }}>
                                    <span className="fw-semibold" style={{ color: "#475569", fontSize: "0.88rem" }}>Application Status:</span>
                                    <span className={`badge ${(statusMeta[selectedVolunteer.status] || {}).bg || "bg-secondary"} d-inline-flex align-items-center gap-1`}
                                        style={{ borderRadius: "8px", padding: "6px 12px", fontSize: "0.82rem" }}>
                                        <i className={`bi ${(statusMeta[selectedVolunteer.status] || {}).icon || "bi-circle"}`}></i>
                                        {selectedVolunteer.status}
                                    </span>
                                </div>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                <button className="btn btn-outline-secondary fw-semibold px-4" style={{ borderRadius: "10px" }} onClick={() => setSelectedVolunteer(null)}>
                                    Close
                                </button>
                                {selectedVolunteer.status === "PENDING" && (
                                    <>
                                        <button className="btn btn-success fw-semibold px-4" style={{ borderRadius: "10px" }} onClick={() => handleApprove(selectedVolunteer)}>
                                            <i className="bi bi-check-lg me-2"></i>Approve
                                        </button>
                                        <button className="btn btn-danger fw-semibold px-4" style={{ borderRadius: "10px" }} onClick={() => handleReject(selectedVolunteer)}>
                                            <i className="bi bi-x-lg me-2"></i>Reject
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default VolunteerApplications;
