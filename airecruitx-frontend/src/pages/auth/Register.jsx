import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaUserTag,
    FaUserPlus
} from "react-icons/fa";

import AuthLayout from "../../components/AuthLayout";
import api from "../../services/api";

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "CANDIDATE"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.name ||
            !formData.email ||
            !formData.password
        ) {
            setError("Please fill in all required fields.");
            return;
        }

        if (formData.password.length < 6) {
            setError(
                "Password must contain at least 6 characters."
            );
            return;
        }

        try {

            setLoading(true);

            await api.post(
                "/auth/register",
                formData
            );

            setSuccess(
                "Registration successful! Redirecting to login..."
            );

            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            console.error(
                "Registration error:",
                error
            );

            const message =
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Registration failed. Please try again.";

            setError(message);

        } finally {
            setLoading(false);
        }
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Join AI RecruitX today"
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

                {success && (
                    <div className="auth-success">
                        {success}
                    </div>
                )}

                <div className="form-group">

                    <label htmlFor="name">
                        Full Name
                    </label>

                    <div className="input-wrapper">

                        <FaUser />

                        <input
                            id="name"
                            type="text"
                            name="name"
                            placeholder="Enter your full name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="name"
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label htmlFor="register-email">
                        Email
                    </label>

                    <div className="input-wrapper">

                        <FaEnvelope />

                        <input
                            id="register-email"
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

                    <label htmlFor="register-password">
                        Password
                    </label>

                    <div className="input-wrapper">

                        <FaLock />

                        <input
                            id="register-password"
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="new-password"
                        />

                    </div>

                </div>

                <div className="form-group">

                    <label htmlFor="role">
                        Account Type
                    </label>

                    <div className="input-wrapper">

                        <FaUserTag />

                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                        >

                            <option value="CANDIDATE">
                                Candidate
                            </option>

                            <option value="RECRUITER">
                                Recruiter
                            </option>

                        </select>

                    </div>

                </div>

                <button
                    type="submit"
                    className="auth-button"
                    disabled={loading}
                >

                    <FaUserPlus />

                    {loading
                        ? "Creating account..."
                        : "Create Account"
                    }

                </button>

            </form>

            <div className="auth-switch">

                <span>
                    Already have an account?
                </span>

                <Link to="/login">
                    Login
                </Link>

            </div>

        </AuthLayout>
    );
};

export default Register;