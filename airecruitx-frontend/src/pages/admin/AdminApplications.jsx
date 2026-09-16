import { useEffect, useState } from "react";
import {
    FaClipboardList,
    FaUserTie,
    FaBriefcase
} from "react-icons/fa";

import api from "../../services/api";

const AdminApplications = () => {

    const [applications, setApplications] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/admin/applications"
            );

            setApplications(
                response.data || []
            );

        } catch (error) {

            console.error(
                "Admin applications error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load applications."
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
                    Loading applications...
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
                        Applications
                    </h1>

                    <p className="dashboard-subtitle">
                        Monitor all applications across
                        the recruitment platform.
                    </p>

                </div>

                <FaClipboardList
                    className="page-header-icon"
                />

            </div>

            {error && (
                <div className="auth-error jobs-message">
                    {error}
                </div>
            )}

            <div className="dashboard-section">

                {applications.length === 0 ? (

                    <div className="empty-state">

                        <FaClipboardList />

                        <h3>
                            No applications found
                        </h3>

                    </div>

                ) : (

                    <div className="admin-table-wrapper">

                        <table className="admin-table">

                            <thead>

                                <tr>
                                    <th>Job</th>
                                    <th>Candidate</th>
                                    <th>Recruiter</th>
                                    <th>Status</th>
                                    <th>Applied</th>
                                </tr>

                            </thead>

                            <tbody>

                                {applications.map(
                                    (application) => (

                                        <tr
                                            key={
                                                application.id
                                            }
                                        >

                                            <td>

                                                <div className="admin-table-title">

                                                    <FaBriefcase />

                                                    {
                                                        application
                                                            .jobTitle
                                                    }

                                                </div>

                                            </td>

                                            <td>

                                                <div>

                                                    <strong>
                                                        {
                                                            application
                                                                .candidateName
                                                        }
                                                    </strong>

                                                    <small>
                                                        {
                                                            application
                                                                .candidateEmail
                                                        }
                                                    </small>

                                                </div>

                                            </td>

                                            <td>

                                                <div>

                                                    <strong>
                                                        {
                                                            application
                                                                .recruiterName
                                                        }
                                                    </strong>

                                                    <small>
                                                        {
                                                            application
                                                                .recruiterEmail
                                                        }
                                                    </small>

                                                </div>

                                            </td>

                                            <td>

                                                <span
                                                    className={`status-badge ${
                                                        application.status
                                                            ?.toLowerCase()
                                                    }`}
                                                >
                                                    {
                                                        application.status
                                                    }
                                                </span>

                                            </td>

                                            <td>
                                                {
                                                    application
                                                        .appliedAt
                                                        ? new Date(
                                                            application.appliedAt
                                                        ).toLocaleDateString()
                                                        : "N/A"
                                                }
                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>
    );
};

export default AdminApplications;