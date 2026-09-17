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

AI-RecruitX/
│
├── airecruitx-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/airecruitx/airecruitx_backend/
│   │   │   │       ├── ai/
│   │   │   │       ├── config/
│   │   │   │       ├── controller/
│   │   │   │       ├── dto/
│   │   │   │       ├── entity/
│   │   │   │       ├── exception/
│   │   │   │       ├── repository/
│   │   │   │       ├── security/
│   │   │   │       ├── service/
│   │   │   │       └── AirecruitxBackendApplication.java
│   │   │   │
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   │
│   │   └── test/
│   ├── uploads/
│   │   └── resumes/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── airecruitx-frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   ├── auth/
│   │   │   ├── candidate/
│   │   │   └── recruiter/
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
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
---

⭐ If you find this project useful, consider giving the repository a star.
