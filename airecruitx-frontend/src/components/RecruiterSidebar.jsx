import {
    FaHome,
    FaPlusCircle,
    FaBriefcase,
    FaUserTie,
    FaRobot,
    FaClipboardList
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const RecruiterSidebar = () => {

    const navigationItems = [
        {
            name: "Dashboard",
            path: "/recruiter/dashboard",
            icon: <FaHome />
        },
        {
            name: "Create Job",
            path: "/recruiter/create-job",
            icon: <FaPlusCircle />
        },
        {
            name: "My Jobs",
            path: "/recruiter/jobs",
            icon: <FaBriefcase />
        },
        {
            name: "Candidates",
            path: "/recruiter/candidates",
            icon: <FaUserTie />
        },
        {
            name: "AI Candidate Ranking",
            path: "/recruiter/candidate-ranking",
            icon: <FaRobot />
        },
        {
            name: "Applications",
            path: "/recruiter/applications",
            icon: <FaClipboardList />
        }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-title">
                Recruiter Portal
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

export default RecruiterSidebar;