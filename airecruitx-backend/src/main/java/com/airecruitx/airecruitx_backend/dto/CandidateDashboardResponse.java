package com.airecruitx.airecruitx_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CandidateDashboardResponse {

    private Long candidateId;

    private String name;

    private String email;

    private boolean profileCompleted;

    private boolean resumeUploaded;

    private boolean resumeAnalyzed;

    private int totalApplications;

    private int appliedApplications;

    private int shortlistedApplications;

    private int interviewApplications;

    private int rejectedApplications;

    private List<ApplicationResponse> applications;
}