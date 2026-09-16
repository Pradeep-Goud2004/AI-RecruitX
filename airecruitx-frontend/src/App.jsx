import { Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";


import ProtectedRoute from "./components/ProtectedRoute";


import CandidateLayout from "./pages/candidate/CandidateLayout";
import CandidateDashboard from "./pages/candidate/CandidateDashboard";
import CandidateProfile from "./pages/candidate/CandidateProfile";
import CandidateResume from "./pages/candidate/CandidateResume";
import CandidateJobs from "./pages/candidate/CandidateJobs";
import RecommendedJobs from "./pages/candidate/RecommendedJobs";
import CandidateApplications from "./pages/candidate/CandidateApplications";


import RecruiterLayout from "./pages/recruiter/RecruiterLayout";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import CreateJob from "./pages/recruiter/CreateJob";
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import RecruiterCandidates from "./pages/recruiter/RecruiterCandidates";
import RecruiterApplications from "./pages/recruiter/RecruiterApplications";
import CandidateRanking from "./pages/recruiter/CandidateRanking";


import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminApplications from "./pages/admin/AdminApplications";

function App() {

    return (
        <Routes>

            {/* =========================
                PUBLIC ROUTES
            ========================= */}

            <Route
                path="/"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Register />}
            />


            {/* =========================
                CANDIDATE ROUTES
            ========================= */}

            <Route
                path="/candidate"
                element={
                    <ProtectedRoute
                        allowedRoles={["CANDIDATE"]}
                    >
                        <CandidateLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    index
                    element={
                        <Navigate
                            to="dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="dashboard"
                    element={
                        <CandidateDashboard />
                    }
                />

                <Route
                    path="profile"
                    element={
                        <CandidateProfile />
                    }
                />

                <Route
                    path="resume"
                    element={
                        <CandidateResume />
                    }
                />

                <Route
                    path="jobs"
                    element={
                        <CandidateJobs />
                    }
                />

                <Route
                    path="recommended-jobs"
                    element={
                        <RecommendedJobs />
                    }
                />

                <Route
                    path="applications"
                    element={
                        <CandidateApplications />
                    }
                />

            </Route>


            {/* =========================
                RECRUITER ROUTES
            ========================= */}

            <Route
                path="/recruiter"
                element={
                    <ProtectedRoute
                        allowedRoles={["RECRUITER"]}
                    >
                        <RecruiterLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    index
                    element={
                        <Navigate
                            to="dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="dashboard"
                    element={
                        <RecruiterDashboard />
                    }
                />

                <Route
                    path="create-job"
                    element={
                        <CreateJob />
                    }
                />

                <Route
                    path="jobs"
                    element={
                        <RecruiterJobs />
                    }
                />

                <Route
                    path="candidates"
                    element={
                        <RecruiterCandidates />
                    }
                />

                {/* AI CANDIDATE RANKING */}
                <Route
                    path="candidate-ranking"
                    element={
                        <CandidateRanking />
                    }
                />

                <Route
                    path="applications"
                    element={
                        <RecruiterApplications />
                    }
                />

            </Route>


            {/* =========================
                ADMIN ROUTES
            ========================= */}

            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        allowedRoles={["ADMIN"]}
                    >
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >

                <Route
                    index
                    element={
                        <Navigate
                            to="dashboard"
                            replace
                        />
                    }
                />

                <Route
                    path="dashboard"
                    element={
                        <AdminDashboard />
                    }
                />

                <Route
                    path="users"
                    element={
                        <AdminUsers />
                    }
                />

                <Route
                    path="jobs"
                    element={
                        <AdminJobs />
                    }
                />

                <Route
                    path="applications"
                    element={
                        <AdminApplications />
                    }
                />

            </Route>


            {/* =========================
                UNAUTHORIZED
            ========================= */}

            <Route
                path="/unauthorized"
                element={
                    <div className="error-page">

                        <h1>403</h1>

                        <h2>
                            Access Denied
                        </h2>

                        <p>
                            You are not authorized
                            to access this page.
                        </p>

                    </div>
                }
            />


            {/* =========================
                NOT FOUND
            ========================= */}

            <Route
                path="*"
                element={
                    <Navigate
                        to="/login"
                        replace
                    />
                }
            />

        </Routes>
    );
}

export default App;