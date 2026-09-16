import { useEffect, useState } from "react";
import {
    FaFilePdf,
    FaUpload,
    FaBrain,
    FaCheckCircle,
    FaExclamationCircle
} from "react-icons/fa";

import api from "../../services/api";

const CandidateResume = () => {

    const [file, setFile] = useState(null);

    const [resume, setResume] = useState(null);
    const [analysis, setAnalysis] = useState(null);

    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadResumeStatus();
    }, []);

    const loadResumeStatus = async () => {

        try {

            setLoading(true);

            /*
             * The dashboard already tells us whether
             * a resume exists and whether it was analyzed.
             *
             * We use that information here so the page
             * remains compatible with the existing backend.
             */

            const response = await api.get(
                "/candidates/dashboard"
            );

            const data = response.data;

            setResume({
                uploaded: data.resumeUploaded ?? false,
                analyzed: data.resumeAnalyzed ?? false
            });

        } catch (error) {

            console.error(
                "Resume status error:",
                error
            );

        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {

        const selectedFile =
            event.target.files?.[0];

        setError("");
        setSuccess("");

        if (!selectedFile) {
            setFile(null);
            return;
        }

        if (
            selectedFile.type !==
            "application/pdf"
        ) {
            setError(
                "Only PDF resume files are allowed."
            );

            setFile(null);
            return;
        }

        setFile(selectedFile);
    };

    const handleUpload = async () => {

        if (!file) {
            setError(
                "Please select a PDF resume first."
            );
            return;
        }

        try {

            setUploading(true);
            setError("");
            setSuccess("");

            const formData = new FormData();

            formData.append(
                "file",
                file
            );

            await api.post(
                "/candidates/resume/upload",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data"
                    }
                }
            );

            setSuccess(
                "Resume uploaded successfully."
            );

            setFile(null);

            await loadResumeStatus();

        } catch (error) {

            console.error(
                "Resume upload error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to upload resume."
            );

        } finally {
            setUploading(false);
        }
    };

    const handleAnalyze = async () => {

        try {

            setAnalyzing(true);
            setError("");
            setSuccess("");

            const response = await api.post(
                "/candidates/resume/analyze"
            );

            setAnalysis(response.data);

            setSuccess(
                "Resume analyzed successfully."
            );

            await loadResumeStatus();

        } catch (error) {

            console.error(
                "Resume analysis error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to analyze resume."
            );

        } finally {
            setAnalyzing(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">

                <div className="spinner"></div>

                <p>
                    Loading resume information...
                </p>

            </div>
        );
    }

    return (
        <div className="candidate-dashboard">

            <div className="dashboard-header">

                <div>

                    <p className="dashboard-welcome">
                        Resume Management
                    </p>

                    <h1>
                        My Resume
                    </h1>

                    <p className="dashboard-subtitle">
                        Upload your resume and let AI
                        analyze your professional profile.
                    </p>

                </div>

                <div className="resume-header-icon">
                    <FaFilePdf />
                </div>

            </div>

            {/* Status */}

            <div className="resume-status-grid">

                <div className="resume-status-card">

                    <div className="resume-status-icon">
                        {resume?.uploaded
                            ? <FaCheckCircle />
                            : <FaExclamationCircle />
                        }
                    </div>

                    <div>

                        <h3>
                            Resume Uploaded
                        </h3>

                        <p>
                            {resume?.uploaded
                                ? "Your resume is available."
                                : "No resume uploaded yet."
                            }
                        </p>

                    </div>

                </div>

                <div className="resume-status-card">

                    <div className="resume-status-icon">
                        {resume?.analyzed
                            ? <FaCheckCircle />
                            : <FaExclamationCircle />
                        }
                    </div>

                    <div>

                        <h3>
                            AI Analysis
                        </h3>

                        <p>
                            {resume?.analyzed
                                ? "Your resume has been analyzed."
                                : "Your resume has not been analyzed yet."
                            }
                        </p>

                    </div>

                </div>

            </div>

            {/* Upload */}

            <div className="dashboard-section">

                <div className="section-header">

                    <h2>
                        Upload Resume
                    </h2>

                    <p>
                        Upload your latest resume in PDF
                        format.
                    </p>

                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="auth-success">
                        {success}
                    </div>
                )}

                <div className="resume-upload-box">

                    <FaFilePdf className="upload-pdf-icon" />

                    <h3>
                        {file
                            ? file.name
                            : "Choose your resume"
                        }
                    </h3>

                    <p>
                        PDF files only
                    </p>

                    <label
                        htmlFor="resume-file"
                        className="file-select-button"
                    >
                        <FaUpload />
                        Select PDF
                    </label>

                    <input
                        id="resume-file"
                        type="file"
                        accept=".pdf,application/pdf"
                        onChange={handleFileChange}
                        hidden
                    />

                    {file && (
                        <button
                            className="upload-button"
                            onClick={handleUpload}
                            disabled={uploading}
                        >

                            <FaUpload />

                            {uploading
                                ? "Uploading..."
                                : "Upload Resume"
                            }

                        </button>
                    )}

                </div>

            </div>

            {/* AI Analysis */}

            <div className="dashboard-section">

                <div className="section-header">

                    <h2>
                        AI Resume Analysis
                    </h2>

                    <p>
                        Analyze your resume to extract
                        professional information.
                    </p>

                </div>

                <div className="analysis-action">

                    <div>

                        <FaBrain />

                        <div>

                            <h3>
                                Analyze Resume
                            </h3>

                            <p>
                                AI RecruitX will analyze
                                your resume for skills,
                                experience, education,
                                projects and certifications.
                            </p>

                        </div>

                    </div>

                    <button
                        className="analyze-button"
                        onClick={handleAnalyze}
                        disabled={
                            analyzing ||
                            !resume?.uploaded
                        }
                    >

                        <FaBrain />

                        {analyzing
                            ? "Analyzing..."
                            : "Analyze Resume"
                        }

                    </button>

                </div>

            </div>

            {/* Analysis Result */}

            {analysis && (

                <div className="dashboard-section">

                    <div className="section-header">

                        <h2>
                            Resume Analysis Result
                        </h2>

                        <p>
                            Information extracted from
                            your resume.
                        </p>

                    </div>

                    <div className="analysis-grid">

                        <AnalysisItem
                            title="Summary"
                            value={analysis.summary}
                        />

                        <AnalysisItem
                            title="Skills"
                            value={analysis.skills}
                        />

                        <AnalysisItem
                            title="Experience"
                            value={analysis.experience}
                        />

                        <AnalysisItem
                            title="Education"
                            value={analysis.education}
                        />

                        <AnalysisItem
                            title="Projects"
                            value={analysis.projects}
                        />

                        <AnalysisItem
                            title="Certifications"
                            value={analysis.certifications}
                        />

                    </div>

                </div>

            )}

        </div>
    );
};

const AnalysisItem = ({
    title,
    value
}) => {

    return (
        <div className="analysis-item">

            <h3>
                {title}
            </h3>

            <p>
                {value || "No information available."}
            </p>

        </div>
    );
};

export default CandidateResume;