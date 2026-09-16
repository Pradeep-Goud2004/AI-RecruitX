package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.ApplicationResponse;
import com.airecruitx.airecruitx_backend.entity.Application;
import com.airecruitx.airecruitx_backend.entity.JobMatch;
import com.airecruitx.airecruitx_backend.service.ApplicationService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    private final ApplicationService applicationService;

    public ApplicationController(
            ApplicationService applicationService) {

        this.applicationService = applicationService;
    }

    // Candidate applies for a job
    @PostMapping("/apply/{jobId}")
    public ApplicationResponse applyForJob(
            @PathVariable Long jobId,
            Authentication authentication) {

        Application application =
                applicationService.applyForJob(
                        jobId,
                        authentication.getName()
                );

        JobMatch jobMatch =
                applicationService.getApplicationMatch(
                        application.getId()
                );

        return ApplicationResponse.fromEntity(
                application,
                jobMatch
        );
    }

    // Candidate views all applications
    @GetMapping("/my")
    public List<ApplicationResponse> getMyApplications(
            Authentication authentication) {

        return applicationService
                .getCandidateApplications(
                        authentication.getName()
                )
                .stream()
                .map(application -> {

                    JobMatch jobMatch =
                            applicationService
                                    .getApplicationMatch(
                                            application.getId()
                                    );

                    return ApplicationResponse.fromEntity(
                            application,
                            jobMatch
                    );
                })
                .toList();
    }

    // Candidate views one application
    @GetMapping("/{applicationId}")
    public ApplicationResponse getApplication(
            @PathVariable Long applicationId,
            Authentication authentication) {

        Application application =
                applicationService.getCandidateApplication(
                        applicationId,
                        authentication.getName()
                );

        JobMatch jobMatch =
                applicationService.getApplicationMatch(
                        application.getId()
                );

        return ApplicationResponse.fromEntity(
                application,
                jobMatch
        );
    }
}