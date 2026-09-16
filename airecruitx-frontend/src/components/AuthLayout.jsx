import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";

const AuthLayout = ({ children, title, subtitle }) => {
    return (
        <div className="auth-page">

            <div className="auth-brand">
                <FaBriefcase />
                <span>AI RecruitX</span>
            </div>

            <div className="auth-container">

                <div className="auth-header">
                    <h1>{title}</h1>
                    <p>{subtitle}</p>
                </div>

                {children}

            </div>

            <div className="auth-footer">
                <p>
                    AI-powered recruitment platform
                </p>

                <div>
                    <Link to="/login">Login</Link>
                    <span> • </span>
                    <Link to="/register">Register</Link>
                </div>
            </div>

        </div>
    );
};

export default AuthLayout;