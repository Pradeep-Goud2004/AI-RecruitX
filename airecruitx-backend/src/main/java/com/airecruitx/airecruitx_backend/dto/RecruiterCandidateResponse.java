package com.airecruitx.airecruitx_backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecruiterCandidateResponse {

    private Long candidateId;

    private String name;

    private String email;

    private String phone;

    private String location;

    private String headline;

    private String bio;

    private Integer experienceYears;

    private boolean resumeUploaded;

    private boolean resumeAnalyzed;

    private String resumeSummary;

    private String skills;

    private String experience;

    private String education;

    private String projects;

    private String certifications;
}
