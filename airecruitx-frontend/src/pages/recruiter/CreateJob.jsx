import { useState } from "react";
import {
    FaBriefcase,
    FaMapMarkerAlt,
    FaGraduationCap,
    FaTools,
    FaMoneyBillWave,
    FaSave
} from "react-icons/fa";

import api from "../../services/api";

const CreateJob = () => {

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        location: "",
        employmentType: "FULL_TIME",
        experienceLevel: "FRESHER",
        requiredSkills: "",
        salaryMin: "",
        salaryMax: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));

        setError("");
        setSuccess("");
    };

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");

        if (
            !formData.title ||
            !formData.description ||
            !formData.location ||
            !formData.requiredSkills
        ) {
            setError(
                "Please fill in all required fields."
            );
            return;
        }

        try {

            setLoading(true);

            await api.post(
                "/recruiters/jobs",
                {
                    title: formData.title,
                    description: formData.description,
                    location: formData.location,
                    employmentType:
                        formData.employmentType,
                    experienceLevel:
                        formData.experienceLevel,
                    requiredSkills:
                        formData.requiredSkills,
                    salaryMin:
                        formData.salaryMin === ""
                            ? null
                            : Number(formData.salaryMin),
                    salaryMax:
                        formData.salaryMax === ""
                            ? null
                            : Number(formData.salaryMax)
                }
            );

            setSuccess(
                "Job created successfully."
            );

            setFormData({
                title: "",
                description: "",
                location: "",
                employmentType: "FULL_TIME",
                experienceLevel: "FRESHER",
                requiredSkills: "",
                salaryMin: "",
                salaryMax: ""
            });

        } catch (error) {

            console.error(
                "Create job error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Unable to create job."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="candidate-dashboard">

            <div className="dashboard-header">

                <div>

                    <p className="dashboard-welcome">
                        Recruiter
                    </p>

                    <h1>
                        Create Job
                    </h1>

                    <p className="dashboard-subtitle">
                        Publish a new opportunity for
                        candidates.
                    </p>

                </div>

                <FaBriefcase className="page-header-icon" />

            </div>

            <div className="dashboard-section">

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

                <form
                    className="profile-form"
                    onSubmit={handleSubmit}
                >

                    <div className="profile-form-grid">

                        <div className="form-group">

                            <label>
                                Job Title *
                            </label>

                            <div className="input-wrapper">

                                <FaBriefcase />

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Java Full Stack Developer"
                                    value={formData.title}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>
                                Location *
                            </label>

                            <div className="input-wrapper">

                                <FaMapMarkerAlt />

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Hyderabad"
                                    value={formData.location}
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>

                    <div className="profile-form-grid">

                        <div className="form-group">

                            <label>
                                Employment Type
                            </label>

                            <div className="input-wrapper">

                                <FaBriefcase />

                                <select
                                    name="employmentType"
                                    value={
                                        formData.employmentType
                                    }
                                    onChange={handleChange}
                                >
                                    <option value="FULL_TIME">
                                        Full Time
                                    </option>

                                    <option value="PART_TIME">
                                        Part Time
                                    </option>

                                    <option value="INTERNSHIP">
                                        Internship
                                    </option>

                                    <option value="CONTRACT">
                                        Contract
                                    </option>
                                </select>

                            </div>

                        </div>

                        <div className="form-group">

                            <label>
                                Experience Level
                            </label>

                            <div className="input-wrapper">

                                <FaGraduationCap />

                                <select
                                    name="experienceLevel"
                                    value={
                                        formData.experienceLevel
                                    }
                                    onChange={handleChange}
                                >
                                    <option value="FRESHER">
                                        Fresher
                                    </option>

                                    <option value="JUNIOR">
                                        Junior
                                    </option>

                                    <option value="MID">
                                        Mid Level
                                    </option>

                                    <option value="SENIOR">
                                        Senior
                                    </option>
                                </select>

                            </div>

                        </div>

                    </div>

                    <div className="form-group">

                        <label>
                            Required Skills *
                        </label>

                        <div className="input-wrapper">

                            <FaTools />

                            <input
                                type="text"
                                name="requiredSkills"
                                placeholder="Java, Spring Boot, MySQL, React"
                                value={
                                    formData.requiredSkills
                                }
                                onChange={handleChange}
                            />

                        </div>

                        <small>
                            Separate skills with commas.
                        </small>

                    </div>

                    <div className="form-group">

                        <label>
                            Job Description *
                        </label>

                        <textarea
                            name="description"
                            rows="8"
                            placeholder="Describe the role, responsibilities and requirements..."
                            value={
                                formData.description
                            }
                            onChange={handleChange}
                        />

                    </div>

                    <div className="profile-form-grid">

                        <div className="form-group">

                            <label>
                                Minimum Salary
                            </label>

                            <div className="input-wrapper">

                                <FaMoneyBillWave />

                                <input
                                    type="number"
                                    name="salaryMin"
                                    min="0"
                                    placeholder="300000"
                                    value={
                                        formData.salaryMin
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>
                                Maximum Salary
                            </label>

                            <div className="input-wrapper">

                                <FaMoneyBillWave />

                                <input
                                    type="number"
                                    name="salaryMax"
                                    min="0"
                                    placeholder="600000"
                                    value={
                                        formData.salaryMax
                                    }
                                    onChange={handleChange}
                                />

                            </div>

                        </div>

                    </div>

                    <button
                        type="submit"
                        className="profile-save-button"
                        disabled={loading}
                    >

                        <FaSave />

                        {loading
                            ? "Creating..."
                            : "Create Job"
                        }

                    </button>

                </form>

            </div>

        </div>
    );
};

export default CreateJob;