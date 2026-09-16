import { useEffect, useState } from "react";
import {
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBriefcase,
    FaSave
} from "react-icons/fa";

import api from "../../services/api";

const CandidateProfile = () => {

    const [profile, setProfile] = useState({
        phone: "",
        location: "",
        headline: "",
        bio: "",
        experienceYears: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [user, setUser] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await api.get(
                "/candidates/profile"
            );

            const data = response.data;

            setProfile({
                phone: data.phone || "",
                location: data.location || "",
                headline: data.headline || "",
                bio: data.bio || "",
                experienceYears:
                    data.experienceYears ?? ""
            });

            setUser(data.user || null);

        } catch (error) {

            console.error(
                "Profile loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to load your profile."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {

        const { name, value } = event.target;

        setProfile((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setSaving(true);
        setError("");
        setSuccess("");

        try {

            await api.post(
                "/candidates/profile",
                {
                    phone: profile.phone,
                    location: profile.location,
                    headline: profile.headline,
                    bio: profile.bio,
                    experienceYears:
                        profile.experienceYears === ""
                            ? null
                            : Number(profile.experienceYears)
                }
            );

            setSuccess(
                "Profile updated successfully."
            );

        } catch (error) {

            console.error(
                "Profile update error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to update your profile."
            );

        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="dashboard-loading">
                <div className="spinner"></div>
                <p>Loading your profile...</p>
            </div>
        );
    }

    return (
        <div className="candidate-dashboard">

            <div className="dashboard-header">

                <div>

                    <p className="dashboard-welcome">
                        Candidate Profile
                    </p>

                    <h1>
                        My Profile
                    </h1>

                    <p className="dashboard-subtitle">
                        Keep your professional information
                        up to date.
                    </p>

                </div>

                <div className="profile-avatar">
                    <FaUser />
                </div>

            </div>

            <div className="profile-page-grid">

                {/* Account Information */}

                <div className="dashboard-section">

                    <div className="section-header">

                        <h2>
                            Account Information
                        </h2>

                        <p>
                            Your registered account details.
                        </p>

                    </div>

                    <div className="account-info">

                        <div className="account-info-item">

                            <FaUser />

                            <div>
                                <span>Name</span>

                                <strong>
                                    {user?.name || "Not available"}
                                </strong>
                            </div>

                        </div>

                        <div className="account-info-item">

                            <FaEnvelope />

                            <div>
                                <span>Email</span>

                                <strong>
                                    {user?.email ||
                                        "Not available"}
                                </strong>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Profile Form */}

                <div className="dashboard-section">

                    <div className="section-header">

                        <h2>
                            Professional Information
                        </h2>

                        <p>
                            This information helps recruiters
                            understand your background.
                        </p>

                    </div>

                    <form
                        className="profile-form"
                        onSubmit={handleSubmit}
                    >

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

                        <div className="profile-form-grid">

                            <div className="form-group">

                                <label htmlFor="phone">
                                    Phone Number
                                </label>

                                <div className="input-wrapper">

                                    <FaPhone />

                                    <input
                                        id="phone"
                                        type="tel"
                                        name="phone"
                                        placeholder="Enter phone number"
                                        value={profile.phone}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                            <div className="form-group">

                                <label htmlFor="location">
                                    Location
                                </label>

                                <div className="input-wrapper">

                                    <FaMapMarkerAlt />

                                    <input
                                        id="location"
                                        type="text"
                                        name="location"
                                        placeholder="e.g. Hyderabad"
                                        value={profile.location}
                                        onChange={handleChange}
                                    />

                                </div>

                            </div>

                        </div>

                        <div className="form-group">

                            <label htmlFor="headline">
                                Professional Headline
                            </label>

                            <div className="input-wrapper">

                                <FaBriefcase />

                                <input
                                    id="headline"
                                    type="text"
                                    name="headline"
                                    placeholder="e.g. Java Full Stack Developer"
                                    value={profile.headline}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label htmlFor="experienceYears">
                                Years of Experience
                            </label>

                            <div className="input-wrapper">

                                <FaBriefcase />

                                <input
                                    id="experienceYears"
                                    type="number"
                                    name="experienceYears"
                                    min="0"
                                    placeholder="e.g. 2"
                                    value={profile.experienceYears}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label htmlFor="bio">
                                Professional Summary
                            </label>

                            <textarea
                                id="bio"
                                name="bio"
                                rows="6"
                                placeholder="Tell recruiters about yourself..."
                                value={profile.bio}
                                onChange={handleChange}
                            />

                        </div>

                        <button
                            type="submit"
                            className="profile-save-button"
                            disabled={saving}
                        >

                            <FaSave />

                            {saving
                                ? "Saving..."
                                : "Save Profile"
                            }

                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CandidateProfile;