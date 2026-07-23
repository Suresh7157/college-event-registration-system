function SearchBar({ searchTerm, setSearchTerm }) {
    return (
        <div className="row mb-4">

            <div className="col-md-12">

                <div className="input-group">

                    <span className="input-group-text">
                        <i className="bi bi-search"></i>
                    </span>

                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search events..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                </div>

            </div>

        </div>
    );
}

export default SearchBar;