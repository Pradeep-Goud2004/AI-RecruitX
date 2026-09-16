import { useEffect, useState } from "react";
import { FaUserTie, FaBrain } from "react-icons/fa";

import api from "../../services/api";

const RecruiterCandidates = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/recruiters/candidates");

            setCandidates(response.data || []);
        } catch (error) {
            console.error("Candidates loading error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load candidates."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading candidates...</p>
            </div>
        );
    }

    return (
        <div className="candidate-dashboard">
            <div className="dashboard-header">
                <div>
                    <p className="dashboard-welcome">Recruiter</p>

                    <h1>Candidates</h1>

                    <p className="dashboard-subtitle">
                        Review candidate profiles and resume analysis.
                    </p>
                </div>

                <FaUserTie className="page-header-icon" />
            </div>

            {error && (
                <div className="auth-error jobs-message">
                    {error}
                </div>
            )}

            {candidates.length === 0 ? (
                <div className="empty-state">
                    <FaUserTie />

                    <h3>No candidates found</h3>

                    <p>
                        Candidates will appear here when available.
                    </p>
                </div>
            ) : (
                <div className="candidates-grid">
                    {candidates.map((candidate) => (
                        <div
                            className="candidate-card"
                            key={candidate.id}
                        >
                            <div className="candidate-card-header">
                                <div className="candidate-avatar">
                                    <FaUserTie />
                                </div>

                                <div>
                                    <h2>
                                        {candidate.name ||
                                            candidate.candidateName ||
                                            "Candidate"}
                                    </h2>

                                    <p>
                                        {candidate.email ||
                                            candidate.candidateEmail ||
                                            ""}
                                    </p>
                                </div>
                            </div>

                            <div className="candidate-info">
                                <p>
                                    <strong>Profile:</strong>{" "}
                                    {candidate.profileCompleted
                                        ? "Completed"
                                        : "Incomplete"}
                                </p>

                                <p>
                                    <strong>Resume:</strong>{" "}
                                    {candidate.resumeUploaded
                                        ? "Uploaded"
                                        : "Not uploaded"}
                                </p>

                                <p>
                                    <strong>AI Analysis:</strong>{" "}
                                    {candidate.resumeAnalyzed
                                        ? "Available"
                                        : "Not analyzed"}
                                </p>
                            </div>

                            {candidate.resumeAnalysis && (
                                <div className="candidate-analysis">
                                    <div className="analysis-title">
                                        <FaBrain />
                                        Resume Analysis
                                    </div>

                                    {candidate.resumeAnalysis.skills && (
                                        <p>
                                            <strong>Skills:</strong>{" "}
                                            {candidate.resumeAnalysis.skills}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RecruiterCandidates;