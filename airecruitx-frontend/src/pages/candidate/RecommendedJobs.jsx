import { useEffect, useState } from "react";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaStar
} from "react-icons/fa";

import api from "../../services/api";

const RecommendedJobs = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadRecommendedJobs();
    }, []);

    const loadRecommendedJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/candidates/recommended-jobs"
            );

            setJobs(response.data || []);

        } catch (error) {

            console.error(
                "Recommended jobs error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load recommended jobs."
            );

        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Finding jobs for you...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dashboard-error">

                <h2>
                    Unable to load jobs
                </h2>

                <p>{error}</p>

                <button onClick={loadRecommendedJobs}>
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
                        AI Recommendations
                    </p>

                    <h1>
                        Recommended Jobs
                    </h1>

                    <p className="dashboard-subtitle">
                        Jobs ranked according to your
                        resume and skill match.
                    </p>

                </div>

                <div className="candidate-status">

                    <FaStar />

                    <span>
                        AI Matched
                    </span>

                </div>

            </div>

            {jobs.length === 0 ? (

                <div className="empty-state">

                    <FaBriefcase />

                    <h3>
                        No recommended jobs yet
                    </h3>

                    <p>
                        Upload and analyze your resume
                        to receive personalized
                        recommendations.
                    </p>

                </div>

            ) : (

                <div className="jobs-grid">

                    {jobs.map((job) => (

                        <div
                            className="job-card"
                            key={job.jobId || job.id}
                        >

                            <div className="job-card-header">

                                <div className="job-icon">
                                    <FaBriefcase />
                                </div>

                                <div>

                                    <h2>
                                        {job.jobTitle ||
                                            job.title ||
                                            "Job Opportunity"}
                                    </h2>

                                    <p>
                                        {job.recruiterName ||
                                            "Recruiter"}
                                    </p>

                                </div>

                            </div>

                            <div className="match-score">

                                <FaStar />

                                <strong>
                                    {job.matchScore ?? 0}%
                                </strong>

                                <span>
                                    Match
                                </span>

                            </div>

                            <div className="job-details">

                                {job.location && (
                                    <div>
                                        <FaMapMarkerAlt />
                                        <span>
                                            {job.location}
                                        </span>
                                    </div>
                                )}

                                {job.salaryMin != null && (
                                    <div>
                                        <FaMoneyBillWave />
                                        <span>
                                            {job.salaryMin}
                                            {" - "}
                                            {job.salaryMax}
                                        </span>
                                    </div>
                                )}

                            </div>

                            {job.matchedSkills && (
                                <div className="skill-section">

                                    <h4>
                                        Matched Skills
                                    </h4>

                                    <p>
                                        {job.matchedSkills}
                                    </p>

                                </div>
                            )}

                            {job.missingSkills && (
                                <div className="skill-section">

                                    <h4>
                                        Skills to Improve
                                    </h4>

                                    <p>
                                        {job.missingSkills}
                                    </p>

                                </div>
                            )}

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default RecommendedJobs;