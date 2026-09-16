package com.airecruitx.airecruitx_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponse {

    private int totalUsers;

    private int totalCandidates;

    private int totalRecruiters;

    private int totalAdmins;

    private int totalJobs;

    private int activeJobs;

    private int inactiveJobs;

    private int totalApplications;

    private int appliedApplications;

    private int shortlistedApplications;

    private int interviewApplications;

    private int rejectedApplications;
}