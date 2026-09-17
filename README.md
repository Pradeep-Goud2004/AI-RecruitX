# AI RecruitX – AI-Powered Recruitment Platform

AI RecruitX is a full-stack recruitment platform designed to connect candidates and recruiters through a streamlined job application process. It provides job management, application tracking, resume analysis, and candidate-job matching features.

## 🚀 Features

### 👤 Candidate

* Register and log in securely.
* Browse and search available jobs.
* Apply for jobs and track application status.
* Upload resumes for analysis.
* View job matching information.
* Receive application notifications.

### 🏢 Recruiter

* Create and manage job postings.
* View applications for posted jobs.
* Review candidate profiles and resumes.
* Update application statuses.
* Track recruitment activity through dashboards.

### 🛡️ Admin

* Access role-protected admin functionality.
* Manage platform operations.

### 🔐 Security

* JWT-based authentication.
* Role-based access control for Candidates, Recruiters, and Admins.
* Password encryption using BCrypt.
* Protected REST API endpoints.

## 🛠️ Tech Stack

| Technology                  | Purpose                                    |
| --------------------------- | ------------------------------------------ |
| Java 21                     | Backend development                        |
| Spring Boot                 | REST API development                       |
| Spring Security             | Authentication and authorization           |
| JWT                         | Token-based authentication                 |
| Spring Data JPA & Hibernate | Database access and ORM                    |
| MySQL                       | Relational database                        |
| React.js                    | Frontend development                       |
| Vite                        | Frontend development server and build tool |
| Tailwind CSS                | UI styling                                 |

## 📁 Project Structure

AI-RecruitX/
│
├── airecruitx_backend/
│   │
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/
│   │   │   │       └── airecruitx/
│   │   │   │           └── airecruitx_backend/
│   │   │   │
│   │   │   │               ├── AirecruitxBackendApplication.java
│   │   │   │               │
│   │   │   │               ├── config/
│   │   │   │               │   ├── CorsConfig.java
│   │   │   │               │   └── SecurityConfig.java
│   │   │   │               │
│   │   │   │               ├── controller/
│   │   │   │               │   ├── AuthController.java
│   │   │   │               │   ├── JobController.java
│   │   │   │               │   ├── ApplicationController.java
│   │   │   │               │   ├── CandidateController.java
│   │   │   │               │   ├── RecruiterController.java
│   │   │   │               │   ├── RecruiterApplicationController.java
│   │   │   │               │   ├── AdminController.java
│   │   │   │               │   ├── ResumeController.java
│   │   │   │               │   ├── DashboardController.java
│   │   │   │               │   └── NotificationController.java
│   │   │   │               │
│   │   │   │               ├── service/
│   │   │   │               │   ├── AuthService.java
│   │   │   │               │   ├── JobService.java
│   │   │   │               │   ├── ApplicationService.java
│   │   │   │               │   ├── CandidateService.java
│   │   │   │               │   ├── RecruiterService.java
│   │   │   │               │   ├── ResumeService.java
│   │   │   │               │   ├── ResumeAnalysisService.java
│   │   │   │               │   ├── JobMatchingService.java
│   │   │   │               │   ├── DashboardService.java
│   │   │   │               │   └── NotificationService.java
│   │   │   │               │
│   │   │   │               ├── repository/
│   │   │   │               │   ├── UserRepository.java
│   │   │   │               │   ├── JobRepository.java
│   │   │   │               │   ├── ApplicationRepository.java
│   │   │   │               │   ├── CandidateRepository.java
│   │   │   │               │   ├── RecruiterRepository.java
│   │   │   │               │   ├── ResumeRepository.java
│   │   │   │               │   └── NotificationRepository.java
│   │   │   │               │
│   │   │   │               ├── entity/
│   │   │   │               │   ├── User.java
│   │   │   │               │   ├── Job.java
│   │   │   │               │   ├── Application.java
│   │   │   │               │   ├── Candidate.java
│   │   │   │               │   ├── Recruiter.java
│   │   │   │               │   ├── Resume.java
│   │   │   │               │   ├── Notification.java
│   │   │   │               │   └── ApplicationStatus.java
│   │   │   │               │
│   │   │   │               ├── dto/
│   │   │   │               │   ├── LoginRequest.java
│   │   │   │               │   ├── RegisterRequest.java
│   │   │   │               │   ├── AuthResponse.java
│   │   │   │               │   ├── JobRequest.java
│   │   │   │               │   ├── JobResponse.java
│   │   │   │               │   ├── ApplicationRequest.java
│   │   │   │               │   ├── ApplicationResponse.java
│   │   │   │               │   └── ResumeAnalysisResponse.java
│   │   │   │               │
│   │   │   │               ├── security/
│   │   │   │               │   ├── JwtAuthenticationFilter.java
│   │   │   │               │   ├── JwtService.java
│   │   │   │               │   └── CustomUserDetailsService.java
│   │   │   │               │
│   │   │   │               ├── exception/
│   │   │   │               │   ├── GlobalExceptionHandler.java
│   │   │   │               │   └── ResourceNotFoundException.java
│   │   │   │               │
│   │   │   │               └── mapper/
│   │   │   │                   ├── JobMapper.java
│   │   │   │                   └── ApplicationMapper.java
│   │   │   │
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── static/
│   │   │       └── templates/
│   │   │
│   │   └── test/
│   │       └── java/
│   │           └── com/
│   │               └── airecruitx/
│   │                   └── airecruitx_backend/
│   │
│   ├── .mvn/
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── README.md
│
├── frontend/
│   │
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   ├── JobCard.jsx
│   │   │   └── ApplicationCard.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   │
│   │   │   ├── candidate/
│   │   │   │   ├── CandidateDashboard.jsx
│   │   │   │   ├── CandidateJobs.jsx
│   │   │   │   ├── CandidateApplications.jsx
│   │   │   │   ├── CandidateProfile.jsx
│   │   │   │   └── ResumeAnalysis.jsx
│   │   │   │
│   │   │   ├── recruiter/
│   │   │   │   ├── RecruiterDashboard.jsx
│   │   │   │   ├── RecruiterJobs.jsx
│   │   │   │   ├── CreateJob.jsx
│   │   │   │   ├── RecruiterApplications.jsx
│   │   │   │   └── RecruiterProfile.jsx
│   │   │   │
│   │   │   └── admin/
│   │   │       └── AdminDashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── .env.example
│   ├── .gitignore
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── README.md
│
├── .gitignore
└── README.md
## ⚙️ Getting Started

### Prerequisites

Install the following:

* Java 21
* Node.js and npm
* MySQL
* Maven, or use the project's Maven wrapper
* Git

### 1. Clone the repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd YOUR-REPOSITORY
```

Replace the URL with your GitHub repository URL.

### 2. Configure the database

Create a MySQL database:

```sql
CREATE DATABASE airecruitx;
```

Configure your database connection and JWT settings in the backend's `application.properties`, or provide them through environment variables.

### 3. Run the backend

Open a terminal in the backend directory and run:

```bash
./mvnw spring-boot:run
```

On Windows, use:

```powershell
.\mvnw.cmd spring-boot:run
```

If the project does not contain the Maven wrapper, use:

```bash
mvn spring-boot:run
```

The backend runs on the port configured in your application settings, commonly `8080`.

### 4. Run the frontend

Open another terminal in the frontend directory:

```bash
npm install
npm run dev
```

Open the local URL displayed by Vite in your terminal.

## 🔑 User Roles

| Role      | Access                                         |
| --------- | ---------------------------------------------- |
| Candidate | Browse jobs, apply, and track applications     |
| Recruiter | Manage job postings and candidate applications |
| Admin     | Access administrative functionality            |

## 📌 Application Statuses

Applications can move through the following statuses:

* `APPLIED`
* `SHORTLISTED`
* `INTERVIEW`
* `SELECTED`
* `REJECTED`

## 🌐 Deployment

The frontend and backend can be deployed separately or through a suitable hosting platform.

Before deployment:

* Configure production database credentials securely.
* Set the required JWT secret as an environment variable.
* Configure the frontend API base URL.
* Configure CORS to allow the deployed frontend origin.
* Ensure secrets and environment files are excluded from Git.

## 🎯 Project Objective

The objective of AI RecruitX is to simplify recruitment by providing a centralized platform for job discovery, applications, recruiter workflows, resume analysis, and candidate-job matching.

## 👨‍💻 Author

M Pradeep kumar

Full Stack Java Developer

LinkedIn: [Your LinkedIn Profile](www.linkedin.com/in/pradeep-kumar-mukkannappagari-6547b828a)

---

⭐ If you find this project useful, consider giving the repository a star.
