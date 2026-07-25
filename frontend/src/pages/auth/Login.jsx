import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import InputField from "../../components/common/InputField";
import PasswordField from "../../components/common/PasswordField";
import PrimaryButton from "../../components/common/PrimaryButton";
import AlertMessage from "../../components/common/AlertMessage";
import Loader from "../../components/common/Loader";
import { useAuth } from "../../context/AuthContext";
import { login } from "../../services/authService";

import heroImage from "../../assets/images/hero.png";

import "../../styles/auth.css";

function Login() {

    const navigate = useNavigate();
    const { login: authLogin } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        rememberMe: false
    });

    const [errors, setErrors] = useState({});

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [messageType, setMessageType] = useState("success");

    const handleChange = (e) => {

        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));

    };

    const validate = () => {

        const newErrors = {};

        if (!formData.email.trim()) {

            newErrors.email = "Email is required";

        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
        ) {

            newErrors.email = "Enter a valid email address";

        }

        if (!formData.password.trim()) {

            newErrors.password = "Password is required";

        } else if (formData.password.length < 6) {

            newErrors.password =
                "Password must contain at least 6 characters";

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

            const response = await login({
                email: formData.email,
                password: formData.password
            });

            /*
                Expected Response

                {
                    token,
                    role,
                    fullName,
                    email
                }
            */

            authLogin(response.data);

            setMessageType("success");
            setMessage("Login Successful!");

            setTimeout(() => {

                switch (response.data.role) {

                    case "ADMIN":
                        navigate("/admin/dashboard");
                        break;

                    case "ORGANIZER":
                        navigate("/manage-events");
                        break;

                    case "VOLUNTEER":
                        navigate("/volunteer/dashboard");
                        break;

                    default:
                        navigate("/student/dashboard");

                }

            }, 1000);

        } catch (error) {

            setMessageType("danger");

            if (error.response?.data?.message) {

                setMessage(error.response.data.message);

            } else {

                setMessage("Invalid Email or Password");

            }

        } finally {

            setLoading(false);

        }

    };
    return (

    <div className="login-page">

        <div className="container-fluid login-container">

            <div className="row align-items-center">

                {/* Left Section */}

                <div className="col-lg-7 d-none d-lg-flex">

                    <div className="hero-section">

                        <div className="hero-badge">
                            <i className="bi bi-stars"></i>
                            Smart Campus Platform
                        </div>

                        <h1 className="hero-title">
                            College Event Registration &
                            Volunteer Management
                        </h1>

                        <p className="hero-description">
                            One platform to organize events, register
                            participants, manage volunteers and manage
                            college activities efficiently.
                        </p>

                        <img
                            src={heroImage}
                            alt="College Event"
                            className="img-fluid hero-image"
                        />

                        <div className="stats-container">

                            <div className="stat-card">
                                <h3>500+</h3>
                                <p>Events Conducted</p>
                            </div>

                            <div className="stat-card">
                                <h3>10K+</h3>
                                <p>Students</p>
                            </div>

                            <div className="stat-card">
                                <h3>99%</h3>
                                <p>Success Rate</p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Right Section */}

                <div className="col-lg-5">

                    <div className="login-card">

                        <div className="text-center mb-4">

                            <div className="display-5 text-primary mb-3">
                                <i className="bi bi-person-circle"></i>
                            </div>

                            <h2 className="fw-bold">
                                Welcome Back 👋
                            </h2>

                            <p className="text-muted">
                                Sign in to continue to your dashboard
                            </p>

                        </div>

                        <AlertMessage
                            type={messageType}
                            message={message}
                        />

                        {
                            loading ? (

                                <Loader text="Signing you in..." />

                            ) : (

                                <form onSubmit={handleSubmit}>

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

                                    <PasswordField
                                        label="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        error={errors.password}
                                        required
                                    />

                                    <div className="d-flex justify-content-between align-items-center mb-4">

                                        <div className="form-check">

                                            <input
                                                type="checkbox"
                                                id="rememberMe"
                                                name="rememberMe"
                                                className="form-check-input"
                                                checked={formData.rememberMe}
                                                onChange={handleChange}
                                            />

                                            <label
                                                htmlFor="rememberMe"
                                                className="form-check-label"
                                            >
                                                Remember Me
                                            </label>

                                        </div>

                                        <Link
                                            to="/forgot-password"
                                            className="text-decoration-none"
                                        >
                                            Forgot Password?
                                        </Link>

                                    </div>

                                    <PrimaryButton
                                        type="submit"
                                        text={loading ? "Signing In..." : "Login"}
                                        icon="bi bi-box-arrow-in-right"
                                        disabled={loading}
                                    />

                                </form>

                            )
                        }

                        <hr className="my-4"/>

                        <div className="text-center">

                            <p className="mb-0">

                                Don't have an account?

                                <Link
                                    to="/register"
                                    className="fw-semibold text-decoration-none ms-2"
                                >
                                    Register
                                </Link>

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>

);

}

export default Login;