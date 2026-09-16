package com.airecruitx.airecruitx_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecruiterDashboardResponse {

    private Long recruiterId;
    private String recruiterName;
    private String recruiterEmail;

    private int totalJobs;
    private int activeJobs;
    private int inactiveJobs;

    private int totalApplications;
    private int appliedApplications;
    private int shortlistedApplications;
    private int interviewApplications;
    private int selectedApplications;
    private int rejectedApplications;

    private List<RecruiterJobSummaryResponse> jobs;
}