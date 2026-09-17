# AI RecruitX — AI-Powered Recruitment Platform

AI RecruitX is a full-stack recruitment platform designed to simplify and improve the hiring process by connecting candidates with recruiters. It provides role-based dashboards, job management, application tracking, resume analysis, and candidate matching features.

## 🚀 Features

### 👤 Candidate

* Register and log in securely.
* Browse and search for job opportunities.
* Manage candidate profiles and upload resumes.
* Apply for jobs and track application status.
* View recommended job opportunities.

### 🧑‍💼 Recruiter

* Create, update, and manage job postings.
* View and manage job applications.
* Review candidate profiles and resumes.
* Rank candidates based on matching criteria.
* Update application statuses, such as shortlisted, interview, selected, or rejected.

### 🛡️ Admin

* Access an administrative dashboard.
* Manage users and job postings.
* View and manage applications.

### 🤖 AI-Powered Capabilities

* Resume analysis and candidate matching.
* Support for identifying candidates whose profiles align with job requirements.

> AI-related features depend on the configuration and availability of the AI service.

## 🛠️ Tech Stack

| Layer      | Technologies                  |
| ---------- | ----------------------------- |
| Frontend   | React.js, Vite, Tailwind CSS  |
| Backend    | Java, Spring Boot, Spring MVC |
| Security   | Spring Security, JWT, BCrypt  |
| Database   | MySQL                         |
| ORM        | Spring Data JPA, Hibernate    |
| API        | REST API                      |
| Build Tool | Maven                         |


## 📁 Project Structure

```text
AI-RecruitX/
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
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── test/
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
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

Install the following before running the project:

* Java Development Kit (JDK) 21
* Node.js and npm
* MySQL
* Maven, or use the included Maven wrapper
* Git

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
cd AI-RecruitX
```

Replace the repository URL with your GitHub repository URL.

### 2. Configure the Database

Create a MySQL database:

```sql
CREATE DATABASE airecruitx;
```

Configure your database connection and JWT settings in:

```text
airecruitx-backend/src/main/resources/application.properties
```

Example configuration:

```properties
spring.datasource.url=${DB_URL:jdbc:mysql://localhost:3306/airecruitx}
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD:}

spring.jpa.hibernate.ddl-auto=update

jwt.secret=${JWT_SECRET}
jwt.expiration=${JWT_EXPIRATION:86400000}
```

Set the required environment variables before starting the backend. Use the exact property names expected by your application. Do not commit database passwords, JWT secrets, or API keys to GitHub.

### 3. Run the Backend

Open a terminal:

```bash
cd airecruitx-backend
```

Using the Maven wrapper:

**Windows**

```bash
mvnw.cmd spring-boot:run
```

**macOS/Linux**

```bash
./mvnw spring-boot:run
```

The backend is configured to run on port `8080` by default, unless your application configuration specifies otherwise.

### 4. Run the Frontend

Open another terminal:

```bash
cd airecruitx-frontend
npm install
npm run dev
```

Open the local URL printed by Vite in your terminal, usually:

```text
http://localhost:5173
```

Ensure the frontend API configuration points to your running backend.

## 🔐 Authentication & Authorization

AI RecruitX uses JWT-based authentication and role-based access control.

Supported roles:

* `CANDIDATE`
* `RECRUITER`
* `ADMIN`

Protected pages and API endpoints require the appropriate authenticated role.

## 🌐 Live Demo

* **Live Application:** Add your deployed application URL here.
* **GitHub Repository:** Add your repository URL here.

## 🔮 Future Enhancements

* Improve AI-based resume and job matching.
* Add interview scheduling and calendar integration.
* Enhance recruitment analytics and reporting.
* Add email notifications for application updates.

## 👨‍💻 Author

**M Pradeep Kumar**

Full-Stack Developer | Java | Spring Boot | React.js

## 📄 License

This project is intended for learning and portfolio purposes. Add a license file if you plan to distribute or reuse the project under specific terms.
