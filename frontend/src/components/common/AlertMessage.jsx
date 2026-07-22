function AlertMessage({
    type = "success",
    message
}) {

    if (!message) return null;

    return (
        <div
            className={`alert alert-${type} mb-3`}
            role="alert"
        >
            {message}
        </div>
    );
}

export default AlertMessage;