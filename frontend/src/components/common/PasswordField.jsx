import { useState } from "react";

function PasswordField({
    label,
    name,
    value,
    onChange,
    placeholder,
    error,
    required = false
}) {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="mb-3">

            <label className="form-label fw-semibold">
                {label}
                {required && <span className="text-danger"> *</span>}
            </label>

            <div className="input-group">

                <span className="input-group-text bg-white">
                    <i className="bi bi-lock"></i>
                </span>

                <input
                    type={showPassword ? "text" : "password"}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`form-control ${error ? "is-invalid" : ""}`}
                />

                <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <i
                        className={
                            showPassword
                                ? "bi bi-eye-slash"
                                : "bi bi-eye"
                        }
                    ></i>
                </button>

            </div>

            {error && (
                <div className="text-danger small mt-1">
                    {error}
                </div>
            )}

        </div>
    );
}

export default PasswordField;