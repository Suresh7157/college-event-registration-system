function Loader({ text = "Loading..." }) {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center py-4">

            <div
                className="spinner-border text-primary"
                role="status"
            >
                <span className="visually-hidden">
                    Loading...
                </span>
            </div>

            <p className="mt-3 text-muted fw-semibold">
                {text}
            </p>

        </div>
    );
}

export default Loader;