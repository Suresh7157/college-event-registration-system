import { useState } from "react";
import "./StatusFilter.css";

function StatusFilter() {

    const statuses = [
        "All",
        "UPCOMING",
        "ACTIVE",
        "COMPLETED",
        "CANCELLED"
    ];

    const [selected, setSelected] = useState("All");

    return (

        <div className="status-section mt-3">

            <div className="d-flex flex-wrap gap-2">

                {statuses.map((status) => (

                    <button
                        key={status}
                        className={`btn ${
                            selected === status
                                ? "btn-primary"
                                : "btn-outline-primary"
                        } rounded-pill`}
                        onClick={() => setSelected(status)}
                    >
                        {status}
                    </button>

                ))}

            </div>

        </div>

    );
}

export default StatusFilter;