import { useEffect, useState } from "react";
import {
    FaUsers,
    FaUserTie
} from "react-icons/fa";

import api from "../../services/api";

const AdminUsers = () => {

    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/admin/users"
            );

            setUsers(response.data || []);

        } catch (error) {

            console.error(
                "Admin users error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load users."
            );

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">

                <div className="spinner"></div>

                <p>
                    Loading users...
                </p>

            </div>
        );
    }

    return (
        <div className="candidate-dashboard">

            <div className="dashboard-header">

                <div>

                    <p className="dashboard-welcome">
                        Administration
                    </p>

                    <h1>
                        Users
                    </h1>

                    <p className="dashboard-subtitle">
                        View all registered AI RecruitX
                        users.
                    </p>

                </div>

                <FaUsers className="page-header-icon" />

            </div>

            {error && (
                <div className="auth-error jobs-message">
                    {error}
                </div>
            )}

            <div className="dashboard-section">

                {users.length === 0 ? (

                    <div className="empty-state">

                        <FaUsers />

                        <h3>
                            No users found
                        </h3>

                    </div>

                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                </tr>

                            </thead>

                            <tbody>

                                {users.map((user) => (

                                    <tr key={user.id}>

                                        <td>
                                            {user.id}
                                        </td>

                                        <td>
                                            <div className="admin-user-name">

                                                <FaUserTie />

                                                {user.name}

                                            </div>
                                        </td>

                                        <td>
                                            {user.email}
                                        </td>

                                        <td>
                                            <span
                                                className={`role-badge ${user.role?.toLowerCase()}`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default AdminUsers;