import { useCallback, useEffect, useState } from "react";
import api from "../../services/api";
import "./RecruiterDashboard.css";

function RecruiterDashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedJobId, setSelectedJobId] = useState("");

  const fetchDashboard = useCallback(
    async (filters = {}) => {
      try {
        setLoading(true);
        setError("");

        const params = {};

        if (filters.startDate) params.startDate = filters.startDate;
        if (filters.endDate) params.endDate = filters.endDate;
        if (filters.jobId) params.jobId = filters.jobId;

        const [dashboardResponse, monthlyResponse] = await Promise.all([
          api.get("/recruiters/dashboard", { params }),
          api.get("/recruiters/analytics/applications-over-time", {
            params,
          }),
        ]);

        setDashboard(dashboardResponse.data);
        setMonthlyData(monthlyResponse.data);
      } catch (err) {
        console.error("Failed to load recruiter dashboard:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load dashboard. Please try again."
        );
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  const handleApplyFilters = (event) => {
    event.preventDefault();

    if (startDate && endDate && startDate > endDate) {
      setError("Start date must be before or equal to the end date.");
      return;
    }

    fetchDashboard({
      startDate,
      endDate,
      jobId: selectedJobId,
    });
  };

  const handleResetFilters = () => {
    setStartDate("");
    setEndDate("");
    setSelectedJobId("");
    fetchDashboard();
  };

  if (loading) {
    return (
      <div className="recruiter-dashboard">
        <div className="dashboard-message">Loading dashboard...</div>
      </div>
    );
  }

  if (error && !dashboard) {
    return (
      <div className="recruiter-dashboard">
        <div className="dashboard-error">{error}</div>
      </div>
    );
  }

  if (!dashboard) {
    return (
      <div className="recruiter-dashboard">
        <div className="dashboard-message">No dashboard data available.</div>
      </div>
    );
  }

  const statusData = [
    {
      label: "Applied",
      value: dashboard.appliedApplications ?? 0,
      className: "status-applied",
    },
    {
      label: "Shortlisted",
      value: dashboard.shortlistedApplications ?? 0,
      className: "status-shortlisted",
    },
    {
      label: "Interview",
      value: dashboard.interviewApplications ?? 0,
      className: "status-interview",
    },
    {
      label: "Selected",
      value: dashboard.selectedApplications ?? 0,
      className: "status-selected",
    },
    {
      label: "Rejected",
      value: dashboard.rejectedApplications ?? 0,
      className: "status-rejected",
    },
  ];

  const totalApplications = dashboard.totalApplications ?? 0;

  const maxMonthlyApplications = Math.max(
    1,
    ...monthlyData.map((item) => item.totalApplications ?? 0)
  );

  const maxJobApplications = Math.max(
    1,
    ...(dashboard.jobs ?? []).map((job) => job.totalApplications ?? 0)
  );

  const formatMonth = (month) => {
    if (!month) return "";

    const [year, monthNumber] = month.split("-");
    const date = new Date(Number(year), Number(monthNumber) - 1);

    return date.toLocaleDateString("en-US", {
      month: "short",
      year: "2-digit",
    });
  };

  return (
    <div className="recruiter-dashboard">
      <div className="dashboard-header">
        <div>
          <h1>Recruiter Dashboard</h1>
          <p>
            Welcome back, {dashboard.recruiterName || "Recruiter"}!
            Here is your recruitment overview.
          </p>
        </div>
      </div>

      {/* Analytics Filters */}
      <section className="analytics-panel dashboard-filters-panel">
        <div className="panel-header">
          <div>
            <h2>Filter Analytics</h2>
            <p>Filter application data by date range or job.</p>
          </div>
        </div>

        <form className="dashboard-filters-form" onSubmit={handleApplyFilters}>
          <div className="dashboard-filter-field">
            <label htmlFor="analytics-start-date">Start Date</label>
            <input
              id="analytics-start-date"
              type="date"
              value={startDate}
              max={endDate || undefined}
              onChange={(event) => setStartDate(event.target.value)}
            />
          </div>

          <div className="dashboard-filter-field">
            <label htmlFor="analytics-end-date">End Date</label>
            <input
              id="analytics-end-date"
              type="date"
              value={endDate}
              min={startDate || undefined}
              onChange={(event) => setEndDate(event.target.value)}
            />
          </div>

          <div className="dashboard-filter-field">
            <label htmlFor="analytics-job">Job</label>
            <select
              id="analytics-job"
              value={selectedJobId}
              onChange={(event) => setSelectedJobId(event.target.value)}
            >
              <option value="">All Jobs</option>
              {(dashboard.jobs ?? []).map((job) => (
                <option key={job.jobId} value={job.jobId}>
                  {job.title}
                </option>
              ))}
            </select>
          </div>

          <div className="dashboard-filter-actions">
            <button type="submit" className="filter-apply-button">
              Apply Filters
            </button>

            <button
              type="button"
              className="filter-reset-button"
              onClick={handleResetFilters}
            >
              Reset
            </button>
          </div>
        </form>

        {error && <div className="dashboard-error">{error}</div>}
      </section>

      {/* Summary Cards */}
      <section className="dashboard-cards">
        <div className="dashboard-card">
          <div className="card-label">Total Jobs</div>
          <div className="card-value">{dashboard.totalJobs ?? 0}</div>
        </div>

        <div className="dashboard-card">
          <div className="card-label">Active Jobs</div>
          <div className="card-value">{dashboard.activeJobs ?? 0}</div>
        </div>

        <div className="dashboard-card">
          <div className="card-label">Inactive Jobs</div>
          <div className="card-value">{dashboard.inactiveJobs ?? 0}</div>
        </div>

        <div className="dashboard-card">
          <div className="card-label">Total Applications</div>
          <div className="card-value">{totalApplications}</div>
        </div>
      </section>

      {/* Application Status Overview */}
      <section className="analytics-panel">
        <div className="panel-header">
          <div>
            <h2>Application Status Overview</h2>
            <p>Current status of applications received</p>
          </div>
        </div>

        <div className="status-list">
          {statusData.map((status) => {
            const percentage =
              totalApplications > 0
                ? (status.value / totalApplications) * 100
                : 0;

            return (
              <div className="status-row" key={status.label}>
                <div className="status-heading">
                  <span>{status.label}</span>
                  <strong>{status.value}</strong>
                </div>

                <div className="status-track">
                  <div
                    className={`status-fill ${status.className}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <div className="status-percentage">
                  {percentage.toFixed(1)}%
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Monthly Applications Analytics */}
      <section className="analytics-panel monthly-analytics-panel">
        <div className="panel-header">
          <div>
            <h2>Monthly Applications</h2>
            <p>
              {startDate || endDate
                ? "Applications within the selected date range"
                : "Applications received over the last six months"}
            </p>
          </div>
        </div>

        {monthlyData.length === 0 ? (
          <div className="empty-state">
            No monthly application analytics available.
          </div>
        ) : (
          <div className="monthly-chart">
            {monthlyData.map((item) => {
              const count = item.totalApplications ?? 0;
              const barHeight = (count / maxMonthlyApplications) * 100;

              return (
                <div className="monthly-chart-column" key={item.month}>
                  <div className="monthly-chart-count">{count}</div>

                  <div className="monthly-chart-bar-area">
                    <div
                      className="monthly-chart-bar"
                      style={{
                        height: `${barHeight}%`,
                        minHeight: count > 0 ? "6px" : "0",
                      }}
                      title={`${count} applications`}
                    />
                  </div>

                  <div className="monthly-chart-label">
                    {formatMonth(item.month)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Applications by Job */}
      <section className="analytics-panel">
        <div className="panel-header">
          <div>
            <h2>Applications by Job</h2>
            <p>Application volume for each posted job</p>
          </div>
        </div>

        {!dashboard.jobs || dashboard.jobs.length === 0 ? (
          <div className="empty-state">
            You have not posted any jobs yet.
          </div>
        ) : (
          <div className="job-application-list">
            {dashboard.jobs.map((job) => {
              const count = job.totalApplications ?? 0;
              const barWidth = (count / maxJobApplications) * 100;

              return (
                <div className="job-application-item" key={job.jobId}>
                  <div className="job-application-heading">
                    <span>{job.title}</span>
                    <strong>{count}</strong>
                  </div>

                  <div className="job-application-track">
                    <div
                      className="job-application-fill"
                      style={{ width: `${barWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Job Performance Table */}
      <section className="analytics-panel">
        <div className="panel-header">
          <div>
            <h2>Job Performance</h2>
            <p>Application and hiring progress for your jobs</p>
          </div>
        </div>

        {!dashboard.jobs || dashboard.jobs.length === 0 ? (
          <div className="empty-state">
            No job performance data available.
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="performance-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Applications</th>
                  <th>Shortlisted</th>
                  <th>Interview</th>
                  <th>Selected</th>
                  <th>Rejected</th>
                </tr>
              </thead>

              <tbody>
                {dashboard.jobs.map((job) => (
                  <tr key={job.jobId}>
                    <td className="job-title-cell">{job.title}</td>
                    <td>{job.location || "—"}</td>
                    <td>{job.employmentType || "—"}</td>
                    <td>
                      <span
                        className={`job-status ${
                          job.active ? "job-active" : "job-inactive"
                        }`}
                      >
                        {job.active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td>{job.totalApplications ?? 0}</td>
                    <td>{job.shortlistedApplications ?? 0}</td>
                    <td>{job.interviewApplications ?? 0}</td>
                    <td>{job.selectedApplications ?? 0}</td>
                    <td>{job.rejectedApplications ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default RecruiterDashboard;