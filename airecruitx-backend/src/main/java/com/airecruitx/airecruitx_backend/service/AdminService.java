package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.dto.AdminApplicationResponse;
import com.airecruitx.airecruitx_backend.dto.AdminDashboardResponse;
import com.airecruitx.airecruitx_backend.dto.AdminJobResponse;
import com.airecruitx.airecruitx_backend.dto.AdminUserResponse;
import com.airecruitx.airecruitx_backend.entity.Application;
import com.airecruitx.airecruitx_backend.entity.ApplicationStatus;
import com.airecruitx.airecruitx_backend.entity.Job;
import com.airecruitx.airecruitx_backend.entity.Role;
import com.airecruitx.airecruitx_backend.entity.User;
import com.airecruitx.airecruitx_backend.repository.ApplicationRepository;
import com.airecruitx.airecruitx_backend.repository.JobRepository;
import com.airecruitx.airecruitx_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public AdminService(
            UserRepository userRepository,
            JobRepository jobRepository,
            ApplicationRepository applicationRepository) {

        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    // =========================================================
    // ADMIN DASHBOARD
    // =========================================================

    public AdminDashboardResponse getDashboard() {

        List<User> users =
                userRepository.findAll();

        List<Job> jobs =
                jobRepository.findAll();

        List<Application> applications =
                applicationRepository.findAll();

        int totalCandidates = 0;
        int totalRecruiters = 0;
        int totalAdmins = 0;

        for (User user : users) {

            if (user.getRole() == Role.CANDIDATE) {
                totalCandidates++;
            }

            if (user.getRole() == Role.RECRUITER) {
                totalRecruiters++;
            }

            if (user.getRole() == Role.ADMIN) {
                totalAdmins++;
            }
        }

        int activeJobs = 0;
        int inactiveJobs = 0;

        for (Job job : jobs) {

            if (job.isActive()) {
                activeJobs++;
            } else {
                inactiveJobs++;
            }
        }

        int appliedApplications = 0;
        int shortlistedApplications = 0;
        int interviewApplications = 0;
        int rejectedApplications = 0;

        for (Application application :
                applications) {

            ApplicationStatus status =
                    application.getStatus();

            if (status == ApplicationStatus.APPLIED) {
                appliedApplications++;
            }

            if (status == ApplicationStatus.SHORTLISTED) {
                shortlistedApplications++;
            }

            if (status == ApplicationStatus.INTERVIEW) {
                interviewApplications++;
            }

            if (status == ApplicationStatus.REJECTED) {
                rejectedApplications++;
            }
        }

        return new AdminDashboardResponse(
                users.size(),
                totalCandidates,
                totalRecruiters,
                totalAdmins,
                jobs.size(),
                activeJobs,
                inactiveJobs,
                applications.size(),
                appliedApplications,
                shortlistedApplications,
                interviewApplications,
                rejectedApplications
        );
    }

    // =========================================================
    // GET ALL USERS
    // =========================================================

    public List<AdminUserResponse> getAllUsers() {

        return userRepository
                .findAll()
                .stream()
                .map(AdminUserResponse::fromEntity)
                .toList();
    }

    // =========================================================
    // GET ALL JOBS
    // =========================================================

    public List<AdminJobResponse> getAllJobs() {

        return jobRepository
                .findAll()
                .stream()
                .map(AdminJobResponse::fromEntity)
                .toList();
    }

    // =========================================================
    // GET ALL APPLICATIONS
    // =========================================================

    public List<AdminApplicationResponse>
    getAllApplications() {

        return applicationRepository
                .findAll()
                .stream()
                .map(AdminApplicationResponse::fromEntity)
                .toList();
    }
}