
import { useEffect, useState } from "react";
import api from "../services/api";
import "./CandidateProfileModal.css";

export default function CandidateProfileModal({
  applicationId,
  onClose,
}) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await api.get(
          `/recruiters/applications/${applicationId}/candidate-profile`
        );

        setProfile(response.data);
      } catch (err) {
        console.error("Error loading candidate profile:", err);
        setError(
          err.response?.data?.message ||
            "Unable to load candidate profile."
        );
      } finally {
        setLoading(false);
      }
    };

    if (applicationId) {
      fetchProfile();
    }
  }, [applicationId]);

  return (
    <div className="candidate-modal-backdrop" onClick={onClose}>
      <section
        className="candidate-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="candidate-profile-title"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="candidate-modal-header">
          <div>
            <p className="candidate-modal-eyebrow">
              CANDIDATE DETAILS
            </p>
            <h2 id="candidate-profile-title">
              Candidate Profile
            </h2>
          </div>

          <button
            type="button"
            className="candidate-modal-close"
            onClick={onClose}
            aria-label="Close profile"
          >
            ×
          </button>
        </header>

        {loading ? (
          <div className="candidate-modal-state">
            Loading candidate profile...
          </div>
        ) : error ? (
          <div className="candidate-modal-error" role="alert">
            {error}
          </div>
        ) : profile ? (
          <div className="candidate-profile-content">
            <div className="candidate-profile-avatar">
              {(profile.name || "C").charAt(0).toUpperCase()}
            </div>

            <h3>{profile.name || "Candidate"}</h3>

            <p className="candidate-profile-headline">
              {profile.headline || "No headline provided"}
            </p>

            <div className="candidate-profile-details">
              <div>
                <span>Email</span>
                <p>{profile.email || "—"}</p>
              </div>

              <div>
                <span>Phone</span>
                <p>{profile.phone || "—"}</p>
              </div>

              <div>
                <span>Location</span>
                <p>{profile.location || "—"}</p>
              </div>

              <div>
                <span>Experience</span>
                <p>
                  {profile.experienceYears ?? "—"}
                  {profile.experienceYears != null ? " years" : ""}
                </p>
              </div>
            </div>

            <div className="candidate-profile-bio">
              <h4>About</h4>
              <p>{profile.bio || "No bio provided."}</p>
            </div>
          </div>
        ) : null}

        <footer className="candidate-modal-footer">
          <button
            type="button"
            className="candidate-modal-done"
            onClick={onClose}
          >
            Close
          </button>
        </footer>
      </section>
    </div>
  );
}