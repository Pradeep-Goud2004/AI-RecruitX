import {
    FaHome,
    FaUser,
    FaFileAlt,
    FaBriefcase,
    FaClipboardList,
    FaStar
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const Sidebar = () => {

    const navigationItems = [
        {
            name: "Dashboard",
            path: "/candidate/dashboard",
            icon: <FaHome />
        },
        {
            name: "My Profile",
            path: "/candidate/profile",
            icon: <FaUser />
        },
        {
            name: "Resume",
            path: "/candidate/resume",
            icon: <FaFileAlt />
        },
        {
            name: "Jobs",
            path: "/candidate/jobs",
            icon: <FaBriefcase />
        },
        {
            name: "Recommended Jobs",
            path: "/candidate/recommended-jobs",
            icon: <FaStar />
        },
        {
            name: "Applications",
            path: "/candidate/applications",
            icon: <FaClipboardList />
        }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-title">
                Candidate Portal
            </div>

            <nav className="sidebar-navigation">

                {navigationItems.map((item) => (

                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `sidebar-link ${
                                isActive ? "active" : ""
                            }`
                        }
                    >

                        <span className="sidebar-icon">
                            {item.icon}
                        </span>

                        <span>
                            {item.name}
                        </span>

                    </NavLink>

                ))}

            </nav>

        </aside>
    );
};

export default Sidebar;