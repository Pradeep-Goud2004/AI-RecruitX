import { useEffect, useState } from "react";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaUsers,
    FaBrain
} from "react-icons/fa";

import api from "../../services/api";

const RecruiterJobs = () => {

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(true);
    const [analyzingJobId, setAnalyzingJobId] =
        useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/recruiters/jobs"
            );

            setJobs(response.data || []);

        } catch (error) {

            console.error(
                "Recruiter jobs error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load your jobs."
            );

        } finally {
            setLoading(false);
        }
    };

    const analyzeCandidates = async (jobId) => {

        try {

            setAnalyzingJobId(jobId);
            setError("");
            setSuccess("");

            await api.post(
                `/recruiters/jobs/${jobId}/analyze-candidates`
            );

            setSuccess(
                "Candidate matching completed successfully."
            );

        } catch (error) {

            console.error(
                "Candidate analysis error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to analyze candidates."
            );

        } finally {
            setAnalyzingJobId(null);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">

                <div className="spinner"></div>

                <p>
                    Loading your jobs...
                </p>

            </div>
        );
    }

    return (
        <div className="candidate-dashboard">

            <div className="dashboard-header">

                <div>

                    <p className="dashboard-welcome">
                        Recruiter
                    </p>

                    <h1>
                        My Jobs
                    </h1>

                    <p className="dashboard-subtitle">
                        Manage your job postings and
                        analyze candidate matches.
                    </p>

                </div>

                <FaBriefcase className="page-header-icon" />

            </div>

            {error && (
                <div className="auth-error jobs-message">
                    {error}
                </div>
            )}

            {success && (
                <div className="auth-success jobs-message">
                    {success}
                </div>
            )}

            {jobs.length === 0 ? (

                <div className="empty-state">

                    <FaBriefcase />

                    <h3>
                        No jobs yet
                    </h3>

                    <p>
                        Create a job posting to start
                        finding candidates.
                    </p>

                </div>

            ) : (

                <div className="recruiter-jobs-grid">

                    {jobs.map((job) => (

                        <div
                            className="recruiter-job-card"
                            key={job.id}
                        >

                            <div className="recruiter-job-header">

                                <div className="job-icon">
                                    <FaBriefcase />
                                </div>

                                <div>

                                    <h2>
                                        {job.title}
                                    </h2>

                                    <span
                                        className={
                                            job.active
                                                ? "job-active"
                                                : "job-inactive"
                                        }
                                    >
                                        {job.active
                                            ? "ACTIVE"
                                            : "INACTIVE"}
                                    </span>

                                </div>

                            </div>

                            <div className="job-details">

                                <div>
                                    <FaMapMarkerAlt />
                                    {job.location}
                                </div>

                                <div>
                                    <FaUsers />
                                    {job.experienceLevel}
                                </div>

                            </div>

                            <p className="recruiter-job-description">
                                {job.description}
                            </p>

                            <div className="skill-section">

                                <h4>
                                    Required Skills
                                </h4>

                                <p>
                                    {job.requiredSkills}
                                </p>

                            </div>

                            <button
                                className="analyze-button"
                                onClick={() =>
                                    analyzeCandidates(
                                        job.id
                                    )
                                }
                                disabled={
                                    analyzingJobId ===
                                    job.id
                                }
                            >

                                <FaBrain />

                                {analyzingJobId ===
                                job.id
                                    ? "Analyzing..."
                                    : "Analyze Candidates"
                                }

                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default RecruiterJobs;