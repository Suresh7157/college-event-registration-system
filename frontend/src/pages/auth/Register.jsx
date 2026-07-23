import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import InputField from "../../components/common/InputField";
import PasswordField from "../../components/common/PasswordField";
import PrimaryButton from "../../components/common/PrimaryButton";
import AlertMessage from "../../components/common/AlertMessage";
import Loader from "../../components/common/Loader";

import { register } from "../../services/authService";

import heroImage from "../../assets/images/hero.png";

import "../../styles/auth.css";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        year: "",
        password: "",
        confirmPassword: "",
        role: "STUDENT",
        organizerCode: "",
        agree: false
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success");

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? checked
                : value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));

    };

    const validate = () => {

        const newErrors = {};

        if (!formData.fullName.trim()) {

            newErrors.fullName =
                "Full name is required";

        } else if (formData.fullName.length < 3) {

            newErrors.fullName =
                "Enter a valid full name";

        }

        if (!formData.email.trim()) {

            newErrors.email =
                "Email is required";

        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {

            newErrors.email =
                "Enter a valid email address";

        }

        if (!formData.phone.trim()) {

            newErrors.phone =
                "Phone number is required";

        } else if (
            !/^[6-9]\d{9}$/.test(formData.phone)
        ) {

            newErrors.phone =
                "Enter a valid 10-digit mobile number";

        }

        if (!formData.department.trim()) {

            newErrors.department =
                "Department is required";

        }

        if (!formData.year) {

            newErrors.year =
                "Year is required";

        }

        if (
            formData.role === "ORGANIZER" &&
            !formData.organizerCode.trim()
        ) {

            newErrors.organizerCode =
                "Organizer Secret Code is required";

        }

        if (!formData.password) {

            newErrors.password =
                "Password is required";

        } else if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(formData.password)
        ) {

            newErrors.password =
                "Minimum 8 characters with uppercase, lowercase, number and special character";

        }

        if (!formData.confirmPassword) {

            newErrors.confirmPassword =
                "Confirm your password";

        } else if (
            formData.password !== formData.confirmPassword
        ) {

            newErrors.confirmPassword =
                "Passwords do not match";

        }

        if (!formData.agree) {

            newErrors.agree =
                "Please accept Terms & Conditions";

        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setMessage("");

        if (!validate()) return;

        setLoading(true);

        try {

            const response = await register({

                fullName: formData.fullName,
                email: formData.email,
                phoneNumber: formData.phone,
                department: formData.department,
                year: Number(formData.year),
                password: formData.password,
                role: formData.role,
                organizerCode: formData.organizerCode

            });

            setMessageType("success");

            setMessage(
                response.data.message ||
                "Registration Successful!"
            );

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        } catch (error) {

            setMessageType("danger");

            if (error.response?.data?.message) {

                setMessage(error.response.data.message);

            } else {

                setMessage("Registration Failed!");

            }

        } finally {

            setLoading(false);

        }

    };
        return (

        <div className="register-page">

            {/* Left: Fixed Hero Panel */}

            <div className="register-hero d-none d-lg-flex">

                <div className="hero-section">

                            <div className="hero-badge">
                                <i className="bi bi-stars"></i>
                                Smart Campus Platform
                            </div>

                            <h1 className="hero-title">
                                Join Our Event
                                Management Platform
                            </h1>

                            <p className="hero-description">
                                Create your account to participate in college
                                events, workshops, hackathons, volunteer
                                programs and competitions from one platform.
                            </p>

                            <img
                                src={heroImage}
                                alt="Register Hero"
                                className="img-fluid hero-image"
                            />

                            <div className="stats-container">

                                <div className="stat-card">
                                    <h3>500+</h3>
                                    <p>Events</p>
                                </div>

                                <div className="stat-card">
                                    <h3>10K+</h3>
                                    <p>Students</p>
                                </div>

                                <div className="stat-card">
                                    <h3>100%</h3>
                                    <p>Secure</p>
                                </div>

                            </div>

                        </div>

                    </div>

            {/* Right: Scrollable Form Panel */}

            <div className="register-form-panel">

                <div className="login-card">

                            <div className="text-center mb-4">

                                <div className="display-4 text-primary mb-3">
                                    <i className="bi bi-person-plus-fill"></i>
                                </div>

                                <h2 className="fw-bold">
                                    Create Account
                                </h2>

                                <p className="text-muted">
                                    Register to continue
                                </p>

                            </div>

                            <AlertMessage
                                type={messageType}
                                message={message}
                            />

                            {
                                loading ? (

                                    <Loader text="Creating your account..." />

                                ) : (

                                    <form onSubmit={handleSubmit}>

                                        <InputField
                                            label="Full Name"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleChange}
                                            placeholder="Enter your full name"
                                            icon="bi bi-person-fill"
                                            error={errors.fullName}
                                            required
                                        />

                                        <InputField
                                            label="Email Address"
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            icon="bi bi-envelope-fill"
                                            error={errors.email}
                                            required
                                        />

                                        <InputField
                                            label="Phone Number"
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter your phone number"
                                            icon="bi bi-telephone-fill"
                                            error={errors.phone}
                                            required
                                        />

                                        <InputField
                                            label="Department"
                                            name="department"
                                            value={formData.department}
                                            onChange={handleChange}
                                            placeholder="Enter your department"
                                            icon="bi bi-building"
                                            error={errors.department}
                                            required
                                        />

                                        <div className="mb-3">

                                            <label className="form-label fw-semibold">
                                                Year
                                                <span className="text-danger"> *</span>
                                            </label>

                                            <div className="input-group">

                                                <span className="input-group-text bg-white">
                                                    <i className="bi bi-mortarboard-fill"></i>
                                                </span>

                                                <select
                                                    className="form-select"
                                                    name="year"
                                                    value={formData.year}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">Select Year</option>
                                                    <option value="1">1st Year</option>
                                                    <option value="2">2nd Year</option>
                                                    <option value="3">3rd Year</option>
                                                    <option value="4">4th Year</option>
                                                </select>

                                            </div>

                                            {
                                                errors.year && (
                                                    <div className="text-danger small mt-1">
                                                        {errors.year}
                                                    </div>
                                                )
                                            }

                                        </div>

                                        <PasswordField
                                            label="Password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Create password"
                                            error={errors.password}
                                            required
                                        />

                                        <div className="mb-3">

                                            <small className="text-muted">

                                                Password must contain:

                                                <br />

                                                • Minimum 8 characters

                                                <br />

                                                • Uppercase letter

                                                <br />

                                                • Lowercase letter

                                                <br />

                                                • Number

                                                <br />

                                                • Special character

                                            </small>

                                        </div>

                                        <PasswordField
                                            label="Confirm Password"
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm password"
                                            error={errors.confirmPassword}
                                            required
                                        />
                                                                                <div className="mb-3">

                                            <label className="form-label fw-semibold">
                                                Register As
                                            </label>

                                            <select
                                                className="form-select"
                                                name="role"
                                                value={formData.role}
                                                onChange={handleChange}
                                            >
                                                <option value="STUDENT">
                                                    Student
                                                </option>

                                                <option value="ORGANIZER">
                                                    Organizer
                                                </option>

                                            </select>

                                        </div>

                                        {
                                            formData.role === "ORGANIZER" && (

                                                <InputField
                                                    label="Organizer Secret Code"
                                                    name="organizerCode"
                                                    value={formData.organizerCode}
                                                    onChange={handleChange}
                                                    placeholder="Enter Organizer Secret Code"
                                                    icon="bi bi-shield-lock-fill"
                                                    error={errors.organizerCode}
                                                    required
                                                />

                                            )
                                        }

                                        <div className="form-check mb-3">

                                            <input
                                                className="form-check-input"
                                                type="checkbox"
                                                id="agree"
                                                name="agree"
                                                checked={formData.agree}
                                                onChange={handleChange}
                                            />

                                            <label
                                                className="form-check-label"
                                                htmlFor="agree"
                                            >
                                                I agree to the{" "}
                                                <Link
                                                    to="/terms"
                                                    className="text-decoration-none"
                                                >
                                                    Terms & Conditions
                                                </Link>
                                            </label>

                                        </div>

                                        {
                                            errors.agree && (
                                                <div className="text-danger small mb-3">
                                                    {errors.agree}
                                                </div>
                                            )
                                        }

                                        <PrimaryButton
                                            type="submit"
                                            className="w-100"
                                        >
                                            Create Account
                                        </PrimaryButton>

                                    </form>

                                )

                            }

                            <div className="text-center mt-4">

                                <span className="text-muted">
                                    Already have an account?{" "}
                                </span>

                                <Link
                                    to="/login"
                                    className="text-decoration-none fw-bold"
                                >
                                    Login
                                </Link>

                            </div>

                        </div>

            </div>

        </div>

    );

}

export default Register;