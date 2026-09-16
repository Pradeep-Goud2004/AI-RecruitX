import { useEffect, useState } from "react";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaMoneyBillWave,
    FaClock,
    FaGraduationCap,
    FaCheckCircle
} from "react-icons/fa";

import api from "../../services/api";

const CandidateJobs = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [applyingJobId, setApplyingJobId] = useState(null);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get("/jobs");

            setJobs(response.data || []);

        } catch (error) {

            console.error(
                "Jobs loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load jobs."
            );

        } finally {
            setLoading(false);
        }
    };

    const applyForJob = async (jobId) => {

        try {

            setApplyingJobId(jobId);
            setError("");
            setSuccess("");

            await api.post(
                `/applications/apply/${jobId}`
            );

            setSuccess(
                "Application submitted successfully."
            );

        } catch (error) {

            console.error(
                "Application error:",
                error
            );

            setError(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Unable to apply for this job."
            );

        } finally {
            setApplyingJobId(null);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">

                <div className="spinner"></div>

                <p>
                    Loading available jobs...
                </p>

            </div>
        );
    }

    return (
        <div className="candidate-dashboard">

            <div className="dashboard-header">

                <div>

                    <p className="dashboard-welcome">
                        Career Opportunities
                    </p>

                    <h1>
                        Find Jobs
                    </h1>

                    <p className="dashboard-subtitle">
                        Explore opportunities and apply
                        for jobs that match your skills.
                    </p>

                </div>

                <div className="resume-header-icon">
                    <FaBriefcase />
                </div>

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
                        No jobs available
                    </h3>

                    <p>
                        There are currently no active
                        job opportunities.
                    </p>

                </div>

            ) : (

                <div className="jobs-grid">

                    {jobs.map((job) => (

                        <div
                            className="job-card candidate-job-card"
                            key={job.id}
                        >

                            <div className="job-card-header">

                                <div className="job-icon">
                                    <FaBriefcase />
                                </div>

                                <div>

                                    <h2>
                                        {job.title}
                                    </h2>

                                    <p>
                                        {job.recruiter?.name ||
                                            job.recruiterName ||
                                            "Recruiter"}
                                    </p>

                                </div>

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

                                {job.employmentType && (
                                    <div>
                                        <FaClock />
                                        <span>
                                            {job.employmentType}
                                        </span>
                                    </div>
                                )}

                                {job.experienceLevel && (
                                    <div>
                                        <FaGraduationCap />
                                        <span>
                                            {job.experienceLevel}
                                        </span>
                                    </div>
                                )}

                                {(job.salaryMin != null ||
                                    job.salaryMax != null) && (

                                    <div>
                                        <FaMoneyBillWave />

                                        <span>
                                            {job.salaryMin ?? "N/A"}
                                            {" - "}
                                            {job.salaryMax ?? "N/A"}
                                        </span>
                                    </div>

                                )}

                            </div>

                            {job.description && (

                                <div className="job-description">

                                    <h4>
                                        Job Description
                                    </h4>

                                    <p>
                                        {job.description}
                                    </p>

                                </div>

                            )}

                            {job.requiredSkills && (

                                <div className="skill-section">

                                    <h4>
                                        Required Skills
                                    </h4>

                                    <p>
                                        {job.requiredSkills}
                                    </p>

                                </div>

                            )}

                            <button
                                className="apply-button"
                                onClick={() =>
                                    applyForJob(job.id)
                                }
                                disabled={
                                    applyingJobId === job.id
                                }
                            >

                                {applyingJobId === job.id ? (
                                    <>
                                        Applying...
                                    </>
                                ) : (
                                    <>
                                        <FaCheckCircle />
                                        Apply Now
                                    </>
                                )}

                            </button>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
};

export default CandidateJobs;