import { useState } from "react";
import "./SearchBar.css";

function SearchBar({ onSearch }) {

    const [title, setTitle] = useState("");

    const handleSearch = () => {
        onSearch(title);
    };

    return (
        <section className="search-section">
            <div className="container">

                <div className="search-card shadow">

                    <div className="row g-3 align-items-center">

                        <div className="col-lg-10">

                            <div className="input-group">

                                <span className="input-group-text">
                                    <i className="bi bi-search"></i>
                                </span>

                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by event title..."
                                    value={title}
                                    onChange={(e) => {

    const value = e.target.value;

    setTitle(value);

    if (value.trim() === "") {
        onSearch("");
    }

}}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleSearch();
                                        }
                                    }}
                                />

                            </div>

                        </div>

                        <div className="col-lg-2 d-grid">

                            <button
                                className="btn btn-primary"
                                onClick={handleSearch}
                            >
                                Search
                            </button>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}

export default SearchBar;