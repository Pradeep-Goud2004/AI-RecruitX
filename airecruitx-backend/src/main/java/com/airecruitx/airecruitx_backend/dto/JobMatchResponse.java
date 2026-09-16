package com.airecruitx.airecruitx_backend.dto;

import com.airecruitx.airecruitx_backend.entity.JobMatch;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobMatchResponse {

    private Long id;
    private Long jobId;
    private Long candidateId;
    private Double matchScore;
    private String matchedSkills;
    private String missingSkills;
    private String recommendation;
    private LocalDateTime analyzedAt;

    public static JobMatchResponse fromEntity(JobMatch match) {

        return new JobMatchResponse(
                match.getId(),
                match.getJob().getId(),
                match.getCandidate().getId(),
                match.getMatchScore(),
                match.getMatchedSkills(),
                match.getMissingSkills(),
                match.getRecommendation(),
                match.getAnalyzedAt()
        );
    }
}