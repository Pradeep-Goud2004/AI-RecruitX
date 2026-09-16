import { useEffect, useState } from "react";
import {
    FaClipboardList,
    FaBriefcase,
    FaUserTie,
    FaCalendarAlt,
    FaChartLine
} from "react-icons/fa";

import api from "../../services/api";

const CandidateApplications = () => {

    const [applications, setApplications] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/applications/my"
            );

            setApplications(
                response.data || []
            );

        } catch (error) {

            console.error(
                "Applications loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load your applications."
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
                    Loading your applications...
                </p>

            </div>
        );
    }

    return (
        <div className="candidate-dashboard">

            <div className="dashboard-header">

                <div>

                    <p className="dashboard-welcome">
                        Job Applications
                    </p>

                    <h1>
                        My Applications
                    </h1>

                    <p className="dashboard-subtitle">
                        Track the status of your job
                        applications.
                    </p>

                </div>

                <div className="resume-header-icon">
                    <FaClipboardList />
                </div>

            </div>

            {error && (
                <div className="auth-error jobs-message">
                    {error}
                </div>
            )}

            {applications.length === 0 ? (

                <div className="empty-state">

                    <FaClipboardList />

                    <h3>
                        No applications yet
                    </h3>

                    <p>
                        Apply for jobs to see your
                        applications here.
                    </p>

                </div>

            ) : (

                <div className="applications-list">

                    {applications.map((application) => (

                        <ApplicationCard
                            key={application.id}
                            application={application}
                        />

                    ))}

                </div>

            )}

        </div>
    );
};


const ApplicationCard = ({
    application
}) => {

    const status =
        application.status?.toUpperCase() ||
        "UNKNOWN";

    return (
        <div className="application-card">

            <div className="application-main">

                <div className="application-job-icon">
                    <FaBriefcase />
                </div>

                <div className="application-job-info">

                    <h2>
                        {application.jobTitle ||
                            "Job Opportunity"}
                    </h2>

                    <p>
                        <FaUserTie />

                        {application.recruiterName ||
                            "Recruiter"}
                    </p>

                    {application.appliedAt && (

                        <p>
                            <FaCalendarAlt />

                            {new Date(
                                application.appliedAt
                            ).toLocaleDateString()}
                        </p>

                    )}

                </div>

            </div>

            <div className="application-details">

                <div>

                    <span className="application-label">
                        Status
                    </span>

                    <span
                        className={`status-badge ${status.toLowerCase()}`}
                    >
                        {status}
                    </span>

                </div>

                <div>

                    <span className="application-label">
                        Match Score
                    </span>

                    <strong className="application-match">
                        {application.matchScore != null
                            ? `${application.matchScore}%`
                            : "N/A"}
                    </strong>

                </div>

            </div>

            {(application.matchedSkills ||
                application.missingSkills) && (

                <div className="application-analysis">

                    {application.matchedSkills && (

                        <div>

                            <div className="analysis-title">
                                <FaChartLine />
                                Matched Skills
                            </div>

                            <p>
                                {application.matchedSkills}
                            </p>

                        </div>

                    )}

                    {application.missingSkills && (

                        <div>

                            <div className="analysis-title">
                                Skills to Improve
                            </div>

                            <p>
                                {application.missingSkills}
                            </p>

                        </div>

                    )}

                </div>

            )}

        </div>
    );
};

export default CandidateApplications;