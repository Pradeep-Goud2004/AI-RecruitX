
package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.ApplicationResponse;
import com.airecruitx.airecruitx_backend.dto.JobMatchResponse;
import com.airecruitx.airecruitx_backend.dto.JobRequest;
import com.airecruitx.airecruitx_backend.dto.JobResponse;
import com.airecruitx.airecruitx_backend.entity.Job;
import com.airecruitx.airecruitx_backend.entity.JobMatch;
import com.airecruitx.airecruitx_backend.service.ApplicationService;
import com.airecruitx.airecruitx_backend.service.JobMatchService;
import com.airecruitx.airecruitx_backend.service.JobService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterController {

    private final JobService jobService;
    private final JobMatchService jobMatchService;
    private final ApplicationService applicationService;

    public RecruiterController(
            JobService jobService,
            JobMatchService jobMatchService,
            ApplicationService applicationService) {

        this.jobService = jobService;
        this.jobMatchService = jobMatchService;
        this.applicationService = applicationService;
    }

    // CREATE JOB
    @PostMapping("/jobs")
    public ResponseEntity<JobResponse> createJob(
            @Valid @RequestBody JobRequest request,
            Authentication authentication) {

        Job job = jobService.createJob(
                request,
                authentication.getName()
        );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(JobResponse.fromEntity(job));
    }

    // GET RECRUITER JOBS
    @GetMapping("/jobs")
    public ResponseEntity<List<JobResponse>> getRecruiterJobs(
            Authentication authentication) {

        List<JobResponse> jobs = jobService
                .getRecruiterJobs(authentication.getName())
                .stream()
                .map(JobResponse::fromEntity)
                .toList();

        return ResponseEntity.ok(jobs);
    }

    // CALCULATE MATCH
    @PostMapping("/jobs/{jobId}/match/{candidateId}")
    public JobMatchResponse calculateMatch(
            @PathVariable Long jobId,
            @PathVariable Long candidateId,
            Authentication authentication) {

        JobMatch match = jobMatchService.calculateMatch(
                jobId,
                candidateId,
                authentication.getName()
        );

        return JobMatchResponse.fromEntity(match);
    }

    // GET MATCHES FOR JOB
    @GetMapping("/jobs/{jobId}/matches")
    public List<JobMatchResponse> getMatchesForJob(
            @PathVariable Long jobId,
            Authentication authentication) {

        return jobMatchService
                .getMatchesForJob(
                        jobId,
                        authentication.getName()
                )
                .stream()
                .map(JobMatchResponse::fromEntity)
                .toList();
    }

    // ANALYZE ALL CANDIDATES
    @PostMapping("/jobs/{jobId}/analyze-candidates")
    public List<JobMatchResponse> analyzeAllCandidates(
            @PathVariable Long jobId,
            Authentication authentication) {

        return jobMatchService
                .analyzeAllCandidates(
                        jobId,
                        authentication.getName()
                )
                .stream()
                .map(JobMatchResponse::fromEntity)
                .toList();
    }

    // GET APPLICATIONS FOR ONE JOB
    @GetMapping("/jobs/{jobId}/applications")
    public List<ApplicationResponse> getJobApplications(
            @PathVariable Long jobId,
            Authentication authentication) {

        return applicationService
                .getJobApplications(
                        jobId,
                        authentication.getName()
                )
                .stream()
                .map(application -> {

                    JobMatch jobMatch =
                            applicationService.getApplicationMatch(
                                    application.getId()
                            );

                    return ApplicationResponse.fromEntity(
                            application,
                            jobMatch
                    );
                })
                .toList();
    }
}