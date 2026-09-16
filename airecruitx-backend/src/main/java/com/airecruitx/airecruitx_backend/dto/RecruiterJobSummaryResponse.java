package com.airecruitx.airecruitx_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecruiterJobSummaryResponse {

    private Long jobId;
    private String title;
    private String location;
    private String employmentType;
    private String experienceLevel;
    private boolean active;

    private int totalApplications;
    private int shortlistedApplications;
    private int interviewApplications;
    private int selectedApplications;
    private int rejectedApplications;
}