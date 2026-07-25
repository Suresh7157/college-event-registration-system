import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../../services/userService";

function getInitials(fullName = "") {
    return fullName.trim().split(" ").filter(Boolean).map(w => w[0].toUpperCase()).join("");
}

const AVATAR_COLORS = ["#2563eb", "#065f46", "#0e7490", "#7c3aed", "#b45309", "#be123c"];
function avatarColor(name = "") {
    let hash = 0;
    for (const c of name) hash = (hash * 31 + c.charCodeAt(0)) & 0xffff;
    return AVATAR_COLORS[hash % AVATAR_COLORS.length];
}

function formatDate(dateStr) {
    if (!dateStr) return "—";
    return new Date(dateStr).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" });
}

function InfoField({ icon, label, value }) {
    return (
        <div
            className="d-flex align-items-start gap-3 p-3"
            style={{ background: "#f8fafc", borderRadius: 12, border: "1px solid #e2e8f0" }}
        >
            <div style={{
                width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                background: "rgba(37,99,235,0.08)",
                display: "flex", alignItems: "center", justifyContent: "center",
            }}>
                <i className={`bi ${icon} text-primary`} style={{ fontSize: "1rem" }}></i>
            </div>
            <div>
                <div style={{ fontSize: "0.72rem", color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>{label}</div>
                <div className="fw-semibold" style={{ color: "#1e293b", fontSize: "0.95rem" }}>{value || "—"}</div>
            </div>
        </div>
    );
}

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        userService.getProfile()
            .then(res => setProfile(res.data))
            .catch(() => setError("Failed to load profile. Please try again."))
            .finally(() => setLoading(false));
    }, []);

    const confirmLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    if (loading) {
        return (
            <div className="container-fluid px-4 py-5" style={{ background: "#f1f5f9", minHeight: "100vh" }}>
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status" />
                    <p className="mt-3 text-muted">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container-fluid px-4 py-5" style={{ background: "#f1f5f9", minHeight: "100vh" }}>
                <div className="alert alert-danger" style={{ borderRadius: 12 }}>{error}</div>
            </div>
        );
    }

    const color = avatarColor(profile?.fullName ?? "");

    return (
        <div className="container-fluid px-4 py-4" style={{ background: "#f1f5f9", minHeight: "100vh" }}>

            {/* ── Header ── */}
            <div className="mb-4">
                <h2 className="fw-bold mb-1" style={{ color: "#1e293b" }}>
                    <i className="bi bi-person-circle me-2 text-primary"></i>My Profile
                </h2>
                <p className="text-muted mb-0" style={{ fontSize: "0.93rem" }}>
                    View and manage your account information.
                </p>
            </div>

            <div className="row g-4 justify-content-center">

                {/* ── Left: Avatar Card ── */}
                <div className="col-lg-3 col-md-4">
                    <div
                        className="card border-0 text-center h-100"
                        style={{ borderRadius: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.09)", overflow: "hidden" }}
                    >
                        {/* Gradient top strip */}
                        <div style={{ height: 80, background: "linear-gradient(135deg,#1e40af,#3b82f6)" }} />

                        <div className="card-body pt-0 pb-4 px-4">
                            {/* Avatar */}
                            <div
                                className="mx-auto d-flex align-items-center justify-content-center fw-bold"
                                style={{
                                    width: 90, height: 90, borderRadius: "50%",
                                    background: color, color: "#fff",
                                    fontSize: "1.8rem", marginTop: -45,
                                    border: "4px solid #fff",
                                    boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
                                }}
                            >
                                {getInitials(profile?.fullName)}
                            </div>

                            <h5 className="fw-bold mt-3 mb-1" style={{ color: "#1e293b" }}>{profile?.fullName}</h5>
                            <p className="text-muted mb-3" style={{ fontSize: "0.85rem" }}>{profile?.email}</p>

                            <span
                                className="badge px-3 py-2 mb-4 d-inline-block"
                                style={{ background: "rgba(37,99,235,0.1)", color: "#2563eb", borderRadius: 10, fontSize: "0.82rem", fontWeight: 600 }}
                            >
                                <i className="bi bi-shield-fill me-1"></i>{profile?.role}
                            </span>

                            <div className="d-grid">
                                <button
                                    className="btn btn-outline-danger fw-semibold"
                                    style={{ borderRadius: 12 }}
                                    onClick={() => setShowLogoutModal(true)}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Right: Info Card ── */}
                <div className="col-lg-7 col-md-8">
                    <div
                        className="card border-0"
                        style={{ borderRadius: 20, boxShadow: "0 4px 24px rgba(0,0,0,0.09)" }}
                    >
                        <div className="card-header border-0 px-4 py-3" style={{ background: "#fff", borderRadius: "20px 20px 0 0" }}>
                            <span className="fw-semibold" style={{ color: "#1e293b", fontSize: "1rem" }}>
                                <i className="bi bi-person-lines-fill me-2 text-primary"></i>Account Details
                            </span>
                        </div>

                        <div className="card-body px-4 pb-4 pt-2">
                            <div className="row g-3">
                                <div className="col-md-6">
                                    <InfoField icon="bi-person-fill"         label="Full Name"       value={profile?.fullName} />
                                </div>
                                <div className="col-md-6">
                                    <InfoField icon="bi-envelope-fill"       label="Email"           value={profile?.email} />
                                </div>
                                <div className="col-md-6">
                                    <InfoField icon="bi-telephone-fill"      label="Phone Number"    value={profile?.phoneNumber} />
                                </div>
                                <div className="col-md-6">
                                    <InfoField icon="bi-building"            label="Department"      value={profile?.department} />
                                </div>
                                <div className="col-md-6">
                                    <InfoField icon="bi-mortarboard-fill"    label="Year"            value={profile?.year} />
                                </div>
                                <div className="col-md-6">
                                    <InfoField icon="bi-shield-fill"         label="Role"            value={profile?.role} />
                                </div>
                                <div className="col-12">
                                    <InfoField icon="bi-calendar-check-fill" label="Account Created" value={formatDate(profile?.createdAt)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* ── Logout Modal ── */}
            {showLogoutModal && (
                <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,.45)" }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content border-0" style={{ borderRadius: 18, overflow: "hidden" }}>
                            <div className="modal-header border-0 pb-0 px-4 pt-4">
                                <div style={{
                                    background: "rgba(239,68,68,0.1)", borderRadius: 12,
                                    width: 52, height: 52,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                }}>
                                    <i className="bi bi-box-arrow-right text-danger" style={{ fontSize: "1.5rem" }}></i>
                                </div>
                            </div>
                            <div className="modal-body px-4 pt-3 pb-2">
                                <h5 className="fw-bold mb-1" style={{ color: "#1e293b" }}>Confirm Logout</h5>
                                <p className="text-muted mb-0" style={{ fontSize: "0.93rem" }}>
                                    Are you sure you want to logout? You will need to sign in again to access the dashboard.
                                </p>
                            </div>
                            <div className="modal-footer border-0 px-4 pb-4 pt-2 gap-2">
                                <button
                                    className="btn btn-outline-secondary fw-semibold px-4"
                                    style={{ borderRadius: 10 }}
                                    onClick={() => setShowLogoutModal(false)}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-danger fw-semibold px-4"
                                    style={{ borderRadius: 10 }}
                                    onClick={confirmLogout}
                                >
                                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Profile;
