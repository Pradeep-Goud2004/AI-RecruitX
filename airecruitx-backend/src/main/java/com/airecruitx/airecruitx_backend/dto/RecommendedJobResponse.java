package com.airecruitx.airecruitx_backend.dto;

import com.airecruitx.airecruitx_backend.entity.JobMatch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecommendedJobResponse {

    private Long jobId;

    private String title;

    private String location;

    private String employmentType;

    private String experienceLevel;

    private String requiredSkills;

    private Double matchScore;

    private String matchedSkills;

    private String missingSkills;

    private String recommendation;

    public static RecommendedJobResponse fromEntity(
            JobMatch jobMatch) {

        return new RecommendedJobResponse(
                jobMatch.getJob().getId(),
                jobMatch.getJob().getTitle(),
                jobMatch.getJob().getLocation(),
                jobMatch.getJob().getEmploymentType(),
                jobMatch.getJob().getExperienceLevel(),
                jobMatch.getJob().getRequiredSkills(),
                jobMatch.getMatchScore(),
                jobMatch.getMatchedSkills(),
                jobMatch.getMissingSkills(),
                jobMatch.getRecommendation()
        );
    }
}