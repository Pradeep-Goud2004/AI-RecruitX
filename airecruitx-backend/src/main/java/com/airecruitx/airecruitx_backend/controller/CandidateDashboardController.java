package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.CandidateDashboardResponse;
import com.airecruitx.airecruitx_backend.dto.RecommendedJobResponse;
import com.airecruitx.airecruitx_backend.service.CandidateDashboardService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/candidates")
public class CandidateDashboardController {

    private final CandidateDashboardService candidateDashboardService;

    public CandidateDashboardController(
            CandidateDashboardService candidateDashboardService) {

        this.candidateDashboardService =
                candidateDashboardService;
    }

    // CANDIDATE DASHBOARD
    @GetMapping("/dashboard")
    public CandidateDashboardResponse getDashboard(
            Authentication authentication) {

        return candidateDashboardService
                .getDashboard(authentication.getName());
    }

    // RECOMMENDED JOBS
    @GetMapping("/recommended-jobs")
    public List<RecommendedJobResponse> getRecommendedJobs(
            Authentication authentication) {

        return candidateDashboardService
                .getRecommendedJobs(authentication.getName());
    }
}
