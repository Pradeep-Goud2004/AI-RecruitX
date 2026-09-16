import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";

import AuthLayout from "../../components/AuthLayout";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Login = () => {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");

        if (!formData.email || !formData.password) {
            setError("Please enter your email and password.");
            return;
        }

        try {

            setLoading(true);

            const response = await api.post(
                "/auth/login",
                formData
            );

            const token =
                response.data.token ||
                response.data.accessToken ||
                response.data.jwt;

            if (!token) {
                throw new Error(
                    "JWT token was not received from the server."
                );
            }

            login(token);

            const userRole =
                response.data.role ||
                response.data.user?.role;

            if (userRole === "CANDIDATE") {
                navigate("/candidate/dashboard");
            } else if (userRole === "RECRUITER") {
                navigate("/recruiter/dashboard");
            } else if (userRole === "ADMIN") {
                navigate("/admin/dashboard");
            } else {
                navigate("/");
            }

        } catch (error) {

            console.error("Login error:", error);

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Invalid email or password.";

            setError(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Welcome Back"
            subtitle="Login to your AI RecruitX account"
        >

            <form
                className="auth-form"
                onSubmit={handleSubmit}
            >

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <div className="form-group">

                    <label htmlFor="email">
                        Email
                    </label>

                    <div className="input-wrapper">

                        <FaEnvelope />

                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="email"
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label htmlFor="password">
                        Password
                    </label>

                    <div className="input-wrapper">

                        <FaLock />

                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="current-password"
                        />

                    </div>

                </div>

                <button
                    type="submit"
                    className="auth-button"
                    disabled={loading}
                >

                    <FaSignInAlt />

                    {loading
                        ? "Logging in..."
                        : "Login"
                    }

                </button>

            </form>

            <div className="auth-switch">

                <span>
                    Don't have an account?
                </span>

                <Link to="/register">
                    Create an account
                </Link>

            </div>

        </AuthLayout>
    );
};

export default Login;