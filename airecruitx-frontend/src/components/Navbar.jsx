import {
    FaBriefcase,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";
import NotificationBell from "./NotificationBell";

const Navbar = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header className="navbar">

            {/* =========================
                BRAND
            ========================= */}
            <div className="navbar-brand">

                <FaBriefcase />

                <span>
                    AI RecruitX
                </span>

            </div>


            {/* =========================
                RIGHT SIDE
            ========================= */}
            <div className="navbar-right">

                {/* Notification Bell */}
                <NotificationBell />


                {/* User Information */}
                <div className="navbar-user">

                    <FaUserCircle />

                    <div className="navbar-user-info">

                        <strong>
                            {user?.name || "User"}
                        </strong>

                        <span>
                            {user?.role || "User"}
                        </span>

                    </div>

                </div>


                {/* Logout */}
                <button
                    className="logout-button"
                    onClick={handleLogout}
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </header>
    );
};

export default Navbar;