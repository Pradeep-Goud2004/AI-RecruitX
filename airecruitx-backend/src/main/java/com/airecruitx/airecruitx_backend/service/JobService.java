package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.dto.JobRequest;
import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.Job;
import com.airecruitx.airecruitx_backend.entity.User;
import com.airecruitx.airecruitx_backend.repository.CandidateRepository;
import com.airecruitx.airecruitx_backend.repository.JobRepository;
import com.airecruitx.airecruitx_backend.repository.UserRepository;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class JobService {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final CandidateRepository candidateRepository;
    private final NotificationService notificationService;

    public JobService(
            JobRepository jobRepository,
            UserRepository userRepository,
            CandidateRepository candidateRepository,
            NotificationService notificationService) {

        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.candidateRepository = candidateRepository;
        this.notificationService = notificationService;
    }

    // =========================================================
    // RECRUITER - CREATE JOB
    // =========================================================

    @Transactional
    public Job createJob(
            JobRequest request,
            String recruiterEmail) {

        User recruiter = userRepository
                .findByEmail(recruiterEmail)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        Job job = new Job();

        job.setTitle(request.getTitle());
        job.setDescription(request.getDescription());
        job.setLocation(request.getLocation());
        job.setEmploymentType(request.getEmploymentType());
        job.setExperienceLevel(request.getExperienceLevel());
        job.setRequiredSkills(request.getRequiredSkills());
        job.setSalaryMin(request.getSalaryMin());
        job.setSalaryMax(request.getSalaryMax());
        job.setCreatedAt(LocalDateTime.now());
        job.setActive(true);
        job.setRecruiter(recruiter);

        // Save the job first
        Job savedJob = jobRepository.save(job);

        // Notify candidates about the new job
        List<Candidate> candidates = candidateRepository.findAll();

        for (Candidate candidate : candidates) {

            if (candidate.getUser() == null) {
                continue;
            }

            Long candidateUserId = candidate.getUser().getId();

            notificationService.createNotification(
                    candidateUserId,
                    "New job posted: " + savedJob.getTitle(),
                    "NEW_JOB"
            );
        }

        return savedJob;
    }

    // =========================================================
    // RECRUITER - GET MY JOBS
    // =========================================================

    @Transactional(readOnly = true)
    public List<Job> getRecruiterJobs(String recruiterEmail) {

        User recruiter = userRepository
                .findByEmail(recruiterEmail)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));

        return jobRepository.findByRecruiter(recruiter);
    }

    // =========================================================
    // CANDIDATE - GET ACTIVE JOBS
    // =========================================================

    @Transactional(readOnly = true)
    public List<Job> getActiveJobs() {

        return jobRepository.findByActiveTrue();
    }
}