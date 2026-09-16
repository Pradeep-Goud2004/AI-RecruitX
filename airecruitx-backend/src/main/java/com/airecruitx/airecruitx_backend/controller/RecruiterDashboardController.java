package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.MonthlyApplicationAnalyticsResponse;
import com.airecruitx.airecruitx_backend.dto.RecruiterDashboardResponse;
import com.airecruitx.airecruitx_backend.service.RecruiterDashboardService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/recruiters")
public class RecruiterDashboardController {

    private final RecruiterDashboardService recruiterDashboardService;

    public RecruiterDashboardController(
            RecruiterDashboardService recruiterDashboardService) {
        this.recruiterDashboardService = recruiterDashboardService;
    }

    @GetMapping("/dashboard")
    public RecruiterDashboardResponse getDashboard(
            Authentication authentication,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate,

            @RequestParam(required = false)
            Long jobId) {

        return recruiterDashboardService.getDashboard(
                authentication.getName(),
                startDate,
                endDate,
                jobId
        );
    }

    @GetMapping("/analytics/applications-over-time")
    public List<MonthlyApplicationAnalyticsResponse> getApplicationsOverTime(
            Authentication authentication,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate startDate,

            @RequestParam(required = false)
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
            LocalDate endDate,

            @RequestParam(required = false)
            Long jobId) {

        return recruiterDashboardService.getApplicationsOverTime(
                authentication.getName(),
                startDate,
                endDate,
                jobId
        );
    }
}