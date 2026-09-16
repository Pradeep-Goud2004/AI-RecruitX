package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.JobResponse;
import com.airecruitx.airecruitx_backend.service.JobService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    private final JobService jobService;

    public JobController(JobService jobService) {
        this.jobService = jobService;
    }

    @GetMapping
    public List<JobResponse> getActiveJobs() {

        return jobService
                .getActiveJobs()
                .stream()
                .map(JobResponse::fromEntity)
                .toList();
    }
}