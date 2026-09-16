package com.airecruitx.airecruitx_backend.dto;

import com.airecruitx.airecruitx_backend.entity.Application;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import com.airecruitx.airecruitx_backend.entity.JobMatch;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationResponse {

    private Long id;

    private Long jobId;
    private String jobTitle;

    private Long candidateId;
    private String candidateName;
    private String candidateEmail;

    private String status;

    private Double matchScore;

    private String matchedSkills;

    private String missingSkills;

    private LocalDateTime appliedAt;

    public static ApplicationResponse fromEntity(
        Application application,
        JobMatch jobMatch) {

    return new ApplicationResponse(
            application.getId(),
            application.getJob().getId(),
            application.getJob().getTitle(),
            application.getCandidate().getId(),
            application.getCandidate().getUser().getName(),
            application.getCandidate().getUser().getEmail(),
            application.getStatus().name(),

            jobMatch != null
                    ? jobMatch.getMatchScore()
                    : null,

            jobMatch != null
                    ? jobMatch.getMatchedSkills()
                    : null,

            jobMatch != null
                    ? jobMatch.getMissingSkills()
                    : null,

            application.getAppliedAt()
    );
}
}