import { useEffect, useState } from "react";
import {
    FaBriefcase,
    FaCheckCircle,
    FaFileAlt,
    FaChartLine,
    FaClock,
    FaTimesCircle
} from "react-icons/fa";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const CandidateDashboard = () => {

    const { user } = useAuth();

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
                "/candidates/dashboard"
            );

            setDashboard(response.data);

        } catch (error) {

            console.error(
                "Dashboard error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load candidate dashboard."
            );

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading your dashboard...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-error">
                <h2>Something went wrong</h2>
                <p>{error}</p>

                <button onClick={loadDashboard}>
                    Try Again
                </button>
            </div>
        );
    }

    const totalApplications =
        dashboard?.totalApplications ?? 0;

    const appliedApplications =
        dashboard?.appliedApplications ?? 0;

    const shortlistedApplications =
        dashboard?.shortlistedApplications ?? 0;

    const interviewApplications =
        dashboard?.interviewApplications ?? 0;

    const rejectedApplications =
        dashboard?.rejectedApplications ?? 0;

    const profileCompleted =
        dashboard?.profileCompleted ?? false;

    const resumeUploaded =
        dashboard?.resumeUploaded ?? false;

    const resumeAnalyzed =
        dashboard?.resumeAnalyzed ?? false;

    return (
        <div className="candidate-dashboard">

            {/* Header */}

            <div className="dashboard-header">

                <div>
                    <p className="dashboard-welcome">
                        Welcome back,
                    </p>

                    <h1>
                        {dashboard?.candidateName ||
                            user?.name ||
                            "Candidate"}
                    </h1>

                    <p className="dashboard-subtitle">
                        Track your applications and
                        improve your job opportunities.
                    </p>
                </div>

                <div className="candidate-status">

                    <FaChartLine />

                    <span>
                        Candidate
                    </span>

                </div>

            </div>

            {/* Statistics */}

            <div className="stats-grid">

                <DashboardStat
                    icon={<FaBriefcase />}
                    title="Applications"
                    value={totalApplications}
                />

                <DashboardStat
                    icon={<FaClock />}
                    title="Applied"
                    value={appliedApplications}
                />

                <DashboardStat
                    icon={<FaCheckCircle />}
                    title="Shortlisted"
                    value={shortlistedApplications}
                />

                <DashboardStat
                    icon={<FaChartLine />}
                    title="Interviews"
                    value={interviewApplications}
                />

                <DashboardStat
                    icon={<FaTimesCircle />}
                    title="Rejected"
                    value={rejectedApplications}
                />

            </div>

            {/* Profile Progress */}

            <div className="dashboard-section">

                <div className="section-header">

                    <div>
                        <h2>
                            Profile & Resume
                        </h2>

                        <p>
                            Complete your profile to
                            improve your opportunities.
                        </p>
                    </div>

                </div>

                <div className="profile-status-grid">

                    <StatusCard
                        icon={<FaCheckCircle />}
                        title="Profile"
                        completed={profileCompleted}
                    />

                    <StatusCard
                        icon={<FaFileAlt />}
                        title="Resume Uploaded"
                        completed={resumeUploaded}
                    />

                    <StatusCard
                        icon={<FaChartLine />}
                        title="Resume Analyzed"
                        completed={resumeAnalyzed}
                    />

                </div>

            </div>

            {/* Applications */}

            <div className="dashboard-section">

                <div className="section-header">

                    <div>
                        <h2>
                            Recent Applications
                        </h2>

                        <p>
                            Your latest job applications.
                        </p>
                    </div>

                </div>

                {dashboard?.applications?.length > 0 ? (

                    <div className="applications-table">

                        <div className="table-header">
                            <span>Job</span>
                            <span>Company</span>
                            <span>Status</span>
                            <span>Match</span>
                        </div>

                        {dashboard.applications
                            .slice(0, 5)
                            .map((application) => (

                                <div
                                    className="table-row"
                                    key={application.id}
                                >

                                    <span>
                                        {application.jobTitle ||
                                            "Unknown Job"}
                                    </span>

                                    <span>
                                        {application.recruiterName ||
                                            "Recruiter"}
                                    </span>

                                    <span>
                                        <StatusBadge
                                            status={
                                                application.status
                                            }
                                        />
                                    </span>

                                    <span>
                                        {application.matchScore != null
                                            ? `${application.matchScore}%`
                                            : "N/A"}
                                    </span>

                                </div>

                            ))}

                    </div>

                ) : (

                    <div className="empty-state">

                        <FaBriefcase />

                        <h3>
                            No applications yet
                        </h3>

                        <p>
                            Start exploring jobs and
                            apply for positions that
                            match your skills.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
};


/* Statistic Card */

const DashboardStat = ({
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


/* Profile / Resume Status */

const StatusCard = ({
    icon,
    title,
    completed
}) => {

    return (
        <div className="status-card">

            <div className="status-icon">
                {icon}
            </div>

            <div>

                <h3>{title}</h3>

                <p className={
                    completed
                        ? "status-complete"
                        : "status-incomplete"
                }>
                    {completed
                        ? "Completed"
                        : "Not completed"}
                </p>

            </div>

        </div>
    );
};


/* Application Status */

const StatusBadge = ({ status }) => {

    const normalizedStatus =
        status?.toUpperCase() || "UNKNOWN";

    return (
        <span
            className={`status-badge ${normalizedStatus.toLowerCase()}`}
        >
            {normalizedStatus}
        </span>
    );
};

export default CandidateDashboard;