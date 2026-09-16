
import { useCallback, useEffect, useMemo, useState } from "react";
import api from "../../services/api";
import CandidateProfileModal from "../../components/CandidateProfileModal";
import "./RecruiterApplications.css";

const STATUSES = [
  "APPLIED",
  "SHORTLISTED",
  "INTERVIEW",
  "SELECTED",
  "REJECTED",
];

const formatStatus = (status = "UNKNOWN") =>
  status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

const formatDate = (date) => {
  if (!date) return "—";

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? "—"
    : parsed.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const getInitial = (name) =>
  (name || "C").trim().charAt(0).toUpperCase();

export default function RecruiterApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState(null);
  const [selectedProfileApplicationId, setSelectedProfileApplicationId] =
    useState(null);

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/recruiters/applications");
      const data = response.data;

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.content)
          ? data.content
          : Array.isArray(data?.applications)
            ? data.applications
            : [];

      setApplications(list);
    } catch (err) {
      console.error("Error loading applications:", err);
      setError(
        err.response?.data?.message ||
          "Unable to load applications. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return applications.filter((application) => {
      const candidateName = application.candidateName || "";
      const candidateEmail = application.candidateEmail || "";
      const jobTitle = application.jobTitle || "";
      const status = application.status || "";

      const matchesSearch =
        !query ||
        candidateName.toLowerCase().includes(query) ||
        candidateEmail.toLowerCase().includes(query) ||
        jobTitle.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" || status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const handleStatusChange = async (applicationId, newStatus) => {
    try {
      setUpdatingId(applicationId);
      setError("");

      await api.put(
        `/recruiters/applications/${applicationId}/status`,
        { status: newStatus }
      );

      setApplications((current) =>
        current.map((application) =>
          application.id === applicationId
            ? { ...application, status: newStatus }
            : application
        )
      );
    } catch (err) {
      console.error("Error updating application status:", err);
      setError(
        err.response?.data?.message ||
          "Unable to update application status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const handleViewResume = async (applicationId) => {
    try {
      setError("");

      const response = await api.get(
        `/recruiters/applications/${applicationId}/resume`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type:
          response.headers["content-type"] ||
          "application/pdf",
      });

      const fileUrl = window.URL.createObjectURL(blob);
      const newWindow = window.open(fileUrl, "_blank");

      if (!newWindow) {
        window.URL.revokeObjectURL(fileUrl);
        setError("Your browser blocked the resume window. Allow pop-ups and try again.");
        return;
      }

      window.setTimeout(() => {
        window.URL.revokeObjectURL(fileUrl);
      }, 60000);
    } catch (err) {
      console.error("Error opening resume:", err);
      setError(
        err.response?.data?.message ||
          "Unable to open the candidate resume."
      );
    }
  };

  const getMatchScore = (score) => {
    if (score === null || score === undefined || score === "") {
      return "—";
    }

    const numericScore = Number(score);

    return Number.isFinite(numericScore)
      ? `${Math.round(numericScore)}%`
      : "—";
  };

  return (
    <main className="recruiter-applications-page">
      <header className="applications-header">
        <div>
          <p className="applications-eyebrow">RECRUITER DASHBOARD</p>
          <h1>Applications</h1>
          <p className="applications-subtitle">
            Review candidates and manage their application progress.
          </p>
        </div>

        <button
          type="button"
          className="refresh-applications-btn"
          onClick={fetchApplications}
          disabled={loading}
        >
          {loading ? "Refreshing..." : "↻ Refresh"}
        </button>
      </header>

      <section className="applications-toolbar">
        <div className="applications-search">
          <span aria-hidden="true">⌕</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search candidate, email, or job..."
            aria-label="Search applications"
          />
        </div>

        <select
          className="applications-status-filter"
          value={statusFilter}
          onChange={(event) => setStatusFilter(event.target.value)}
          aria-label="Filter by application status"
        >
          <option value="ALL">All statuses</option>
          {STATUSES.map((status) => (
            <option key={status} value={status}>
              {formatStatus(status)}
            </option>
          ))}
        </select>
      </section>

      {error && (
        <div className="applications-error" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError("")}>
            Dismiss
          </button>
        </div>
      )}

      <div className="applications-summary">
        Showing <strong>{filteredApplications.length}</strong> of{" "}
        <strong>{applications.length}</strong> applications
      </div>

      {loading ? (
        <section className="applications-state">
          <div className="applications-spinner" />
          <p>Loading applications...</p>
        </section>
      ) : filteredApplications.length === 0 ? (
        <section className="applications-state applications-empty">
          <div className="applications-empty-icon">📄</div>
          <h2>No applications found</h2>
          <p>
            {applications.length === 0
              ? "Applications for your job postings will appear here."
              : "Try changing your search or status filter."}
          </p>

          {(search || statusFilter !== "ALL") && (
            <button
              type="button"
              className="clear-filters-btn"
              onClick={() => {
                setSearch("");
                setStatusFilter("ALL");
              }}
            >
              Clear filters
            </button>
          )}
        </section>
      ) : (
        <section className="applications-list">
          {filteredApplications.map((application) => {
            const applicationId = application.id;
            const candidateName =
              application.candidateName || "Candidate";
            const candidateEmail =
              application.candidateEmail || "No email provided";
            const jobTitle = application.jobTitle || "Job position";
            const status = application.status || "APPLIED";
            const isUpdating = updatingId === applicationId;

            return (
              <article
                className="application-card"
                key={applicationId}
              >
                <div className="application-card-main">
                  <div className="candidate-avatar">
                    {getInitial(candidateName)}
                  </div>

                  <div className="application-candidate-info">
                    <div className="candidate-name-row">
                      <h2>{candidateName}</h2>
                      <span
                        className={`status-badge status-${status.toLowerCase()}`}
                      >
                        {formatStatus(status)}
                      </span>
                    </div>

                    <p className="candidate-email">
                      {candidateEmail}
                    </p>

                    <p className="application-job-title">
                      Applied for <strong>{jobTitle}</strong>
                    </p>

                    <div className="application-meta">
                      <span>
                        Applied: {formatDate(application.appliedAt)}
                      </span>
                      <span>
                        Match score:{" "}
                        <strong>
                          {getMatchScore(application.matchScore)}
                        </strong>
                      </span>
                    </div>

                    {Array.isArray(application.matchedSkills) &&
                      application.matchedSkills.length > 0 && (
                        <div className="application-skills">
                          <span className="skills-label">
                            Matched skills
                          </span>
                          <div className="skill-tags">
                            {application.matchedSkills.map(
                              (skill, index) => (
                                <span
                                  className="skill-tag"
                                  key={`${skill}-${index}`}
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}

                    {Array.isArray(application.missingSkills) &&
                      application.missingSkills.length > 0 && (
                        <div className="application-skills">
                          <span className="skills-label">
                            Missing skills
                          </span>
                          <div className="skill-tags missing-skill-tags">
                            {application.missingSkills.map(
                              (skill, index) => (
                                <span
                                  className="skill-tag"
                                  key={`${skill}-${index}`}
                                >
                                  {skill}
                                </span>
                              )
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                </div>

                <div className="application-card-actions">
                  <button
                    type="button"
                    className="application-action-btn profile-btn"
                    onClick={() =>
                      setSelectedProfileApplicationId(applicationId)
                    }
                    disabled={!applicationId}
                  >
                    View Profile
                  </button>

                  <button
                    type="button"
                    className="application-action-btn resume-btn"
                    onClick={() => handleViewResume(applicationId)}
                    disabled={!applicationId}
                  >
                    View Resume
                  </button>

                  <label className="status-select-label">
                    <span>Update status</span>
                    <select
                      value={status}
                      disabled={isUpdating}
                      onChange={(event) =>
                        handleStatusChange(
                          applicationId,
                          event.target.value
                        )
                      }
                    >
                      {STATUSES.map((option) => (
                        <option key={option} value={option}>
                          {formatStatus(option)}
                        </option>
                      ))}
                    </select>
                  </label>

                  {isUpdating && (
                    <span className="status-updating">
                      Updating...
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </section>
      )}

      {selectedProfileApplicationId !== null && (
        <CandidateProfileModal
          applicationId={selectedProfileApplicationId}
          onClose={() => setSelectedProfileApplicationId(null)}
        />
      )}
    </main>
  );
}