package com.airecruitx.airecruitx_backend.dto;

import com.airecruitx.airecruitx_backend.entity.ResumeAnalysis;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeAnalysisResponse {

    private Long id;
    private String summary;
    private String skills;
    private String experience;
    private String education;
    private String projects;
    private String certifications;
    private LocalDateTime analyzedAt;

    public static ResumeAnalysisResponse fromEntity(ResumeAnalysis analysis) {

        return new ResumeAnalysisResponse(
                analysis.getId(),
                analysis.getSummary(),
                analysis.getSkills(),
                analysis.getExperience(),
                analysis.getEducation(),
                analysis.getProjects(),
                analysis.getCertifications(),
                analysis.getAnalyzedAt()
        );
    }
}