import { useEffect, useState } from "react";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaUserTie
} from "react-icons/fa";

import api from "../../services/api";

const AdminJobs = () => {

    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/admin/jobs"
            );

            setJobs(response.data || []);

        } catch (error) {

            console.error(
                "Admin jobs error:",
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

    if (loading) {
        return (
            <div className="dashboard-loading">

                <div className="spinner"></div>

                <p>
                    Loading jobs...
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
                        All Jobs
                    </h1>

                    <p className="dashboard-subtitle">
                        Monitor job postings created by
                        recruiters.
                    </p>

                </div>

                <FaBriefcase className="page-header-icon" />

            </div>

            {error && (
                <div className="auth-error jobs-message">
                    {error}
                </div>
            )}

            <div className="admin-job-grid">

                {jobs.map((job) => (

                    <div
                        className="admin-job-card"
                        key={job.id}
                    >

                        <div className="admin-job-header">

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

                        <div className="admin-job-info">

                            <p>
                                <FaMapMarkerAlt />
                                {job.location}
                            </p>

                            <p>
                                <FaUserTie />
                                {job.recruiterName}
                            </p>

                            <p>
                                {job.recruiterEmail}
                            </p>

                        </div>

                        <div className="skill-section">

                            <h4>
                                Required Skills
                            </h4>

                            <p>
                                {job.requiredSkills}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
};

export default AdminJobs;