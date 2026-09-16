package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.entity.Application;
import com.airecruitx.airecruitx_backend.entity.ApplicationStatus;
import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.Job;
import com.airecruitx.airecruitx_backend.entity.JobMatch;
import com.airecruitx.airecruitx_backend.entity.User;

import com.airecruitx.airecruitx_backend.repository.ApplicationRepository;
import com.airecruitx.airecruitx_backend.repository.CandidateRepository;
import com.airecruitx.airecruitx_backend.repository.JobRepository;
import com.airecruitx.airecruitx_backend.repository.JobMatchRepository;
import com.airecruitx.airecruitx_backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final CandidateRepository candidateRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final JobMatchRepository jobMatchRepository;
    private final NotificationService notificationService;

    public ApplicationService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository,
            CandidateRepository candidateRepository,
            JobRepository jobRepository,
            JobMatchRepository jobMatchRepository,
            NotificationService notificationService) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
        this.candidateRepository = candidateRepository;
        this.jobRepository = jobRepository;
        this.jobMatchRepository = jobMatchRepository;
        this.notificationService = notificationService;
    }

    // =========================================================
    // CANDIDATE - APPLY FOR JOB
    // =========================================================

    @Transactional
    public Application applyForJob(
            Long jobId,
            String candidateEmail) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        Candidate candidate = candidateRepository
                .findByUserEmail(candidateEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"));

        // Prevent duplicate application
        if (applicationRepository
                .findByJobIdAndCandidateId(
                        jobId,
                        candidate.getId())
                .isPresent()) {

            throw new RuntimeException(
                    "You have already applied for this job");
        }

        Application application = new Application();

        application.setJob(job);
        application.setCandidate(candidate);
        application.setStatus(ApplicationStatus.APPLIED);
        application.setAppliedAt(LocalDateTime.now());

        Application savedApplication =
                applicationRepository.save(application);

        // Notify recruiter about the new application
        Long recruiterId = job.getRecruiter().getId();

        notificationService.createNotification(
                recruiterId,
                "New application received for job: "
                        + job.getTitle(),
                "APPLICATION"
        );

        return savedApplication;
    }

    // =========================================================
    // CANDIDATE - VIEW MY APPLICATIONS
    // =========================================================

    public List<Application> getCandidateApplications(
            String candidateEmail) {

        Candidate candidate = candidateRepository
                .findByUserEmail(candidateEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"));

        return applicationRepository
                .findByCandidateIdOrderByAppliedAtDesc(
                        candidate.getId());
    }

    // =========================================================
    // RECRUITER - VIEW APPLICATIONS FOR ONE JOB
    // =========================================================

    public List<Application> getJobApplications(
            Long jobId,
            String recruiterEmail) {

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException("Job not found"));

        User recruiter = userRepository
                .findByEmail(recruiterEmail)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        if (!job.getRecruiter()
                .getId()
                .equals(recruiter.getId())) {

            throw new RuntimeException(
                    "You are not authorized to access this job");
        }

        return applicationRepository
                .findByJobIdOrderByAppliedAtDesc(jobId);
    }

    // =========================================================
    // RECRUITER - VIEW ALL APPLICATIONS FOR THEIR JOBS
    // =========================================================

    public List<Application> getRecruiterApplications(
            String recruiterEmail) {

        User recruiter = userRepository
                .findByEmail(recruiterEmail)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        List<Job> recruiterJobs =
                jobRepository.findByRecruiter(recruiter);

        return recruiterJobs.stream()
                .flatMap(job ->
                        applicationRepository
                                .findByJobIdOrderByAppliedAtDesc(
                                        job.getId())
                                .stream())
                .toList();
    }

    // =========================================================
    // RECRUITER - UPDATE APPLICATION STATUS
    // =========================================================

    @Transactional
    public Application updateApplicationStatus(
            Long applicationId,
            ApplicationStatus status,
            String recruiterEmail) {

        Application application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"));

        User recruiter =
                userRepository.findByEmail(recruiterEmail)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Recruiter not found"));

        // Verify recruiter owns the job
        Long jobRecruiterId =
                application.getJob()
                        .getRecruiter()
                        .getId();

        if (!jobRecruiterId.equals(recruiter.getId())) {
            throw new RuntimeException(
                    "You are not authorized to modify this application");
        }

        application.setStatus(status);

        Application savedApplication =
                applicationRepository.save(application);

        // Build candidate notification message
        String jobTitle = application.getJob().getTitle();
        String message;

        switch (status) {
            case SHORTLISTED:
                message = "Your application for "
                        + jobTitle
                        + " has been shortlisted.";
                break;

            case INTERVIEW:
                message = "You have been selected for an interview for "
                        + jobTitle
                        + ".";
                break;

            case SELECTED:
                message = "Congratulations! You have been selected for "
                        + jobTitle
                        + ".";
                break;

            case REJECTED:
                message = "Your application for "
                        + jobTitle
                        + " was rejected.";
                break;

            case APPLIED:
            default:
                message = "Your application status for "
                        + jobTitle
                        + " has been updated to "
                        + status
                        + ".";
                break;
        }

        // Notify candidate
        Long candidateUserId =
                application.getCandidate()
                        .getUser()
                        .getId();

        notificationService.createNotification(
                candidateUserId,
                message,
                "APPLICATION_STATUS"
        );

        return savedApplication;
    }

    // =========================================================
    // CANDIDATE - GET SINGLE APPLICATION
    // =========================================================

    public Application getCandidateApplication(
            Long applicationId,
            String candidateEmail) {

        Candidate candidate = candidateRepository
                .findByUserEmail(candidateEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"));

        return applicationRepository
                .findByIdAndCandidateId(
                        applicationId,
                        candidate.getId())
                .orElseThrow(() ->
                        new RuntimeException(
                                "Application not found"));
    }

    // =========================================================
    // GET APPLICATION MATCH
    // =========================================================

    public JobMatch getApplicationMatch(
            Long applicationId) {

        Application application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Application not found"));

        return jobMatchRepository
                .findByJobIdAndCandidateId(
                        application.getJob().getId(),
                        application.getCandidate().getId())
                .orElse(null);
    }
}