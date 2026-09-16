import { useEffect, useState } from "react";
import {
    FaUsers,
    FaUserTie,
    FaBriefcase,
    FaClipboardList,
    FaCheckCircle,
    FaClock,
    FaTimesCircle
} from "react-icons/fa";

import api from "../../services/api";

const AdminDashboard = () => {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/admin/dashboard"
            );

            setDashboard(response.data);

        } catch (error) {

            console.error(
                "Admin dashboard error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load admin dashboard."
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
                    Loading admin dashboard...
                </p>

            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-error">

                <h2>
                    Unable to load dashboard
                </h2>

                <p>
                    {error}
                </p>

                <button onClick={loadDashboard}>
                    Try Again
                </button>

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
                        Admin Dashboard
                    </h1>

                    <p className="dashboard-subtitle">
                        Monitor users, jobs and
                        applications across AI RecruitX.
                    </p>

                </div>

                <div className="candidate-status">
                    ADMIN
                </div>

            </div>

            <div className="stats-grid">

                <AdminStat
                    icon={<FaUsers />}
                    title="Total Users"
                    value={dashboard?.totalUsers ?? 0}
                />

                <AdminStat
                    icon={<FaUserTie />}
                    title="Candidates"
                    value={dashboard?.totalCandidates ?? 0}
                />

                <AdminStat
                    icon={<FaBriefcase />}
                    title="Recruiters"
                    value={dashboard?.totalRecruiters ?? 0}
                />

                <AdminStat
                    icon={<FaBriefcase />}
                    title="Total Jobs"
                    value={dashboard?.totalJobs ?? 0}
                />

                <AdminStat
                    icon={<FaCheckCircle />}
                    title="Active Jobs"
                    value={dashboard?.activeJobs ?? 0}
                />

                <AdminStat
                    icon={<FaClipboardList />}
                    title="Applications"
                    value={
                        dashboard?.totalApplications ?? 0
                    }
                />

            </div>

            <div className="dashboard-section">

                <div className="section-header">

                    <h2>
                        Application Overview
                    </h2>

                    <p>
                        Current application status
                        across the platform.
                    </p>

                </div>

                <div className="admin-status-grid">

                    <StatusCard
                        icon={<FaClipboardList />}
                        title="Applied"
                        value={
                            dashboard
                                ?.appliedApplications ?? 0
                        }
                    />

                    <StatusCard
                        icon={<FaCheckCircle />}
                        title="Shortlisted"
                        value={
                            dashboard
                                ?.shortlistedApplications ?? 0
                        }
                    />

                    <StatusCard
                        icon={<FaClock />}
                        title="Interviews"
                        value={
                            dashboard
                                ?.interviewApplications ?? 0
                        }
                    />

                    <StatusCard
                        icon={<FaTimesCircle />}
                        title="Rejected"
                        value={
                            dashboard
                                ?.rejectedApplications ?? 0
                        }
                    />

                </div>

            </div>

        </div>
    );
};

const AdminStat = ({
    icon,
    title,
    value
}) => {

    return (
        <div className="stat-card">

            <div className="stat-icon">
                {icon}
            </div>

            <div>

                <p>{title}</p>

                <h2>{value}</h2>

            </div>

        </div>
    );
};

const StatusCard = ({
    icon,
    title,
    value
}) => {

    return (
        <div className="admin-status-card">

            <div className="admin-status-icon">
                {icon}
            </div>

            <div>

                <span>
                    {title}
                </span>

                <strong>
                    {value}
                </strong>

            </div>

        </div>
    );
};

export default AdminDashboard;