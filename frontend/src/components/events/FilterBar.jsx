import { useState } from "react";
import "./FilterBar.css";

function FilterBar({ onSearch, onFilter }) {
    const [title, setTitle] = useState("");
    const [selected, setSelected] = useState("All");

    const statuses = ["All", "UPCOMING", "ACTIVE", "COMPLETED", "CANCELLED"];

    const handleSearch = () => onSearch(title);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setTitle(value);
        if (value.trim() === "") onSearch("");
    };

    const handleFilter = (status) => {
        setSelected(status);
        onFilter(status);
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="filter-combined-card w-100" style={{ maxWidth: 780 }}>

                {/* Row 1: Search input + button */}
                <div className="d-flex gap-2 align-items-center mb-3">
                    <div className="input-group flex-grow-1">
                        <span
                            className="input-group-text"
                            style={{
                                background: "#fff",
                                border: "1.5px solid #e2e8f0",
                                borderRight: "none",
                                borderRadius: "12px 0 0 12px",
                                color: "#2563eb",
                                fontSize: "1rem",
                            }}
                        >
                            <i className="bi bi-search"></i>
                        </span>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by event title..."
                            value={title}
                            onChange={handleInputChange}
                            onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
                            style={{
                                border: "1.5px solid #e2e8f0",
                                borderLeft: "none",
                                borderRadius: "0 12px 12px 0",
                                boxShadow: "none",
                                fontSize: "0.93rem",
                            }}
                        />
                    </div>

                    <button
                        className="btn fw-semibold"
                        onClick={handleSearch}
                        style={{
                            background: "#2563eb",
                            color: "#fff",
                            borderRadius: 12,
                            padding: "9px 26px",
                            fontSize: "0.93rem",
                            border: "none",
                            whiteSpace: "nowrap",
                            flexShrink: 0,
                        }}
                    >
                        Search
                    </button>
                </div>

                {/* Divider */}
                <div style={{ borderTop: "1px solid #f1f5f9", marginBottom: 14 }} />

                {/* Row 2: Filter pills */}
                <div className="d-flex flex-wrap gap-2">
                    {statuses.map(status => (
                        <button
                            key={status}
                            onClick={() => handleFilter(status)}
                            className="filter-pill"
                            style={{
                                background: selected === status ? "#2563eb" : "#f1f5f9",
                                color: selected === status ? "#fff" : "#475569",
                                border: selected === status ? "none" : "1.5px solid #e2e8f0",
                                borderRadius: 999,
                                padding: "5px 18px",
                                fontSize: "0.85rem",
                                fontWeight: selected === status ? 600 : 500,
                                cursor: "pointer",
                                transition: "all 0.18s ease",
                                boxShadow: selected === status ? "0 2px 8px rgba(37,99,235,0.25)" : "none",
                            }}
                        >
                            {status}
                        </button>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default FilterBar;
