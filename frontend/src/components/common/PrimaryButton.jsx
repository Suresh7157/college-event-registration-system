function PrimaryButton({
    children,
    text,
    type = "button",
    icon,
    onClick,
    className = "",
    disabled = false
}) {
    return (
        <button
            type={type}
            className={`btn btn-primary w-100 py-3 fw-semibold ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {icon && <i className={`${icon} me-2`}></i>}

            {children || text}
        </button>
    );
}

export default PrimaryButton;