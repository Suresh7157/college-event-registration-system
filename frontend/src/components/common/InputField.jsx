function InputField({
    label,
    type = "text",
    name,
    value,
    onChange,
    placeholder,
    icon,
    error,
    required = false
}) {
    return (
        <div className="mb-3">

            <label className="form-label fw-semibold">
                {label}
                {required && <span className="text-danger"> *</span>}
            </label>

            <div className="input-group">

                {icon && (
                    <span className="input-group-text bg-white">
                        <i className={icon}></i>
                    </span>
                )}

                <input
                    type={type}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                />

            </div>

            {error && (
                <div className="text-danger small mt-1">
                    {error}
                </div>
            )}

        </div>
    );
}

export default InputField;