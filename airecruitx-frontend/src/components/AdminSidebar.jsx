import {
    FaHome,
    FaUsers,
    FaBriefcase,
    FaClipboardList
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const AdminSidebar = () => {

    const items = [
        {
            name: "Dashboard",
            path: "/admin/dashboard",
            icon: <FaHome />
        },
        {
            name: "Users",
            path: "/admin/users",
            icon: <FaUsers />
        },
        {
            name: "Jobs",
            path: "/admin/jobs",
            icon: <FaBriefcase />
        },
        {
            name: "Applications",
            path: "/admin/applications",
            icon: <FaClipboardList />
        }
    ];

    return (
        <aside className="sidebar">

            <div className="sidebar-title">
                Admin Portal
            </div>

            <nav className="sidebar-navigation">

                {items.map((item) => (
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

export default AdminSidebar;