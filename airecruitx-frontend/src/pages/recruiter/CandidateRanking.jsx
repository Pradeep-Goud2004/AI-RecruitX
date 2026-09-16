import { useEffect, useState } from "react";
import api from "../../services/api";

const CandidateRanking = () => {
    const [jobs, setJobs] = useState([]);
    const [selectedJob, setSelectedJob] = useState("");
    const [candidates, setCandidates] = useState([]);
    const [loadingJobs, setLoadingJobs] = useState(true);
    const [analyzing, setAnalyzing] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadJobs();
    }, []);

    const loadJobs = async () => {
        try {
            setLoadingJobs(true);
            setError("");

            const response = await api.get("/recruiters/jobs");

            setJobs(response.data || []);
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to load your jobs."
            );
        } finally {
            setLoadingJobs(false);
        }
    };

    const analyzeCandidates = async () => {
        if (!selectedJob) {
            setError("Please select a job first.");
            return;
        }

        try {
            setAnalyzing(true);
            setError("");
            setSuccess("");
            setCandidates([]);

            const response = await api.post(
                `/recruiters/jobs/${selectedJob}/analyze-candidates`
            );

            const rankedCandidates = response.data || [];

            setCandidates(rankedCandidates);

            setSuccess(
                rankedCandidates.length > 0
                    ? `${rankedCandidates.length} candidate(s) analyzed successfully.`
                    : "No candidates with completed resume analysis were found."
            );
        } catch (err) {
            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to analyze candidates."
            );
        } finally {
            setAnalyzing(false);
        }
    };

    const getScoreClass = (score) => {
        if (score >= 80) return "ranking-score excellent";
        if (score >= 60) return "ranking-score good";
        if (score >= 40) return "ranking-score moderate";

        return "ranking-score low";
    };

    const getRankIcon = (index) => {
        if (index === 0) return "🥇";
        if (index === 1) return "🥈";
        if (index === 2) return "🥉";

        return `#${index + 1}`;
    };

    return (
        <div className="candidate-ranking-page">

            <div className="page-header">
                <div>
                    <h1>AI Candidate Ranking</h1>

                    <p>
                        Analyze candidates and rank them according
                        to their job compatibility.
                    </p>
                </div>
            </div>

            <div className="ranking-control-card">

                <div className="ranking-control-content">

                    <div className="form-group">
                        <label>Select Job</label>

                        <select
                            value={selectedJob}
                            onChange={(e) => {
                                setSelectedJob(e.target.value);
                                setCandidates([]);
                                setSuccess("");
                                setError("");
                            }}
                            disabled={loadingJobs || analyzing}
                        >
                            <option value="">
                                -- Select a Job --
                            </option>

                            {jobs.map((job) => (
                                <option
                                    key={job.id}
                                    value={job.id}
                                >
                                    {job.title}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="primary-button ranking-button"
                        onClick={analyzeCandidates}
                        disabled={
                            !selectedJob ||
                            analyzing ||
                            loadingJobs
                        }
                    >
                        {analyzing
                            ? "Analyzing..."
                            : "🤖 Analyze Candidates"}
                    </button>

                </div>

                {selectedJob && (
                    <div className="selected-job-info">

                        {(() => {
                            const job = jobs.find(
                                (item) =>
                                    String(item.id) ===
                                    String(selectedJob)
                            );

                            if (!job) return null;

                            return (
                                <>
                                    <strong>
                                        {job.title}
                                    </strong>

                                    <span>
                                        {job.location}
                                    </span>

                                    <span>
                                        {job.employmentType}
                                    </span>

                                    <span>
                                        Required Skills:{" "}
                                        {job.requiredSkills}
                                    </span>
                                </>
                            );
                        })()}

                    </div>
                )}

            </div>

            {error && (
                <div className="alert error-alert">
                    {error}
                </div>
            )}

            {success && (
                <div className="alert success-alert">
                    {success}
                </div>
            )}

            {candidates.length > 0 && (
                <div className="ranking-results">

                    <div className="ranking-results-header">
                        <div>
                            <h2>Candidate Rankings</h2>

                            <p>
                                Candidates are ranked from highest
                                to lowest compatibility.
                            </p>
                        </div>

                        <div className="candidate-count">
                            {candidates.length} Candidates
                        </div>
                    </div>

                    <div className="ranking-list">

                        {candidates.map((candidate, index) => (
                            <div
                                className="ranking-card"
                                key={
                                    candidate.id ||
                                    `${candidate.jobId}-${candidate.candidateId}`
                                }
                            >

                                <div className="candidate-rank">
                                    {getRankIcon(index)}
                                </div>

                                <div className="candidate-main">

                                    <div className="candidate-heading">

                                        <div>
                                            <h3>
                                                Candidate #
                                                {candidate.candidateId}
                                            </h3>

                                            <span>
                                                Job ID:{" "}
                                                {candidate.jobId}
                                            </span>
                                        </div>

                                        <div
                                            className={getScoreClass(
                                                candidate.matchScore
                                            )}
                                        >
                                            {candidate.matchScore?.toFixed
                                                ? candidate.matchScore.toFixed(1)
                                                : candidate.matchScore}
                                            %
                                        </div>

                                    </div>

                                    <div className="candidate-match-details">

                                        <div className="match-section">

                                            <h4>
                                                Matched Skills
                                            </h4>

                                            <p className="matched-skills">
                                                {candidate.matchedSkills ||
                                                    "No matched skills"}
                                            </p>

                                        </div>

                                        <div className="match-section">

                                            <h4>
                                                Missing Skills
                                            </h4>

                                            <p className="missing-skills">
                                                {candidate.missingSkills ||
                                                    "No missing skills"}
                                            </p>

                                        </div>

                                        <div className="match-section">

                                            <h4>
                                                Recommendation
                                            </h4>

                                            <p>
                                                {candidate.recommendation ||
                                                    "No recommendation available"}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        ))}

                    </div>

                </div>
            )}

            {!analyzing &&
                selectedJob &&
                candidates.length === 0 &&
                !success && (
                    <div className="empty-ranking">

                        <div className="empty-icon">
                            🤖
                        </div>

                        <h2>
                            Ready to Analyze
                        </h2>

                        <p>
                            Select a job and click
                            <strong>
                                {" "}Analyze Candidates
                            </strong>
                            {" "}to generate the AI ranking.
                        </p>

                    </div>
                )}

            {analyzing && (
                <div className="analysis-loading">

                    <div className="loading-spinner"></div>

                    <h2>
                        AI is analyzing candidates...
                    </h2>

                    <p>
                        Comparing resumes against the selected
                        job requirements.
                    </p>

                </div>
            )}

        </div>
    );
};

export default CandidateRanking;