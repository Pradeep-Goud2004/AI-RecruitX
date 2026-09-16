package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.ApplicationResponse;
import com.airecruitx.airecruitx_backend.entity.Application;
import com.airecruitx.airecruitx_backend.entity.ApplicationStatus;
import com.airecruitx.airecruitx_backend.entity.JobMatch;
import com.airecruitx.airecruitx_backend.service.ApplicationService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiters/applications")
public class RecruiterApplicationController {

    private final ApplicationService applicationService;

    public RecruiterApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    // =========================================================
    // RECRUITER - VIEW ALL APPLICATIONS
    // =========================================================

    @GetMapping
    public List<ApplicationResponse> getRecruiterApplications(
            Authentication authentication) {

        return applicationService
                .getRecruiterApplications(authentication.getName())
                .stream()
                .map(application -> {

                    JobMatch jobMatch =
                            applicationService.getApplicationMatch(
                                    application.getId());

                    return ApplicationResponse.fromEntity(
                            application,
                            jobMatch);
                })
                .toList();
    }

    // =========================================================
    // RECRUITER - VIEW APPLICATIONS FOR ONE JOB
    // =========================================================

    @GetMapping("/job/{jobId}")
    public List<ApplicationResponse> getJobApplications(
            @PathVariable Long jobId,
            Authentication authentication) {

        return applicationService
                .getJobApplications(
                        jobId,
                        authentication.getName())
                .stream()
                .map(application -> {

                    JobMatch jobMatch =
                            applicationService.getApplicationMatch(
                                    application.getId());

                    return ApplicationResponse.fromEntity(
                            application,
                            jobMatch);
                })
                .toList();
    }

    // =========================================================
    // RECRUITER - UPDATE APPLICATION STATUS
    // =========================================================

    @PutMapping("/{applicationId}/status")
    public ApplicationResponse updateApplicationStatus(
            @PathVariable Long applicationId,
            @RequestBody StatusUpdateRequest request,
            Authentication authentication) {

        Application application =
                applicationService.updateApplicationStatus(
                        applicationId,
                        request.status(),
                        authentication.getName());

        JobMatch jobMatch =
                applicationService.getApplicationMatch(
                        application.getId());

        return ApplicationResponse.fromEntity(
                application,
                jobMatch);
    }

    public record StatusUpdateRequest(
            ApplicationStatus status) {
    }
}
