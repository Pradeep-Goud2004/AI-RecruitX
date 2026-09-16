package com.airecruitx.airecruitx_backend.dto;

import com.airecruitx.airecruitx_backend.entity.Application;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminApplicationResponse {

    private Long id;

    private Long jobId;

    private String jobTitle;

    private Long candidateId;

    private String candidateName;

    private String candidateEmail;

    private Long recruiterId;

    private String recruiterName;

    private String recruiterEmail;

    private String status;

    private LocalDateTime appliedAt;

    public static AdminApplicationResponse fromEntity(
            Application application) {

        return new AdminApplicationResponse(
                application.getId(),

                application.getJob().getId(),

                application.getJob().getTitle(),

                application.getCandidate().getId(),

                application.getCandidate()
                        .getUser()
                        .getName(),

                application.getCandidate()
                        .getUser()
                        .getEmail(),

                application.getJob()
                        .getRecruiter()
                        .getId(),

                application.getJob()
                        .getRecruiter()
                        .getName(),

                application.getJob()
                        .getRecruiter()
                        .getEmail(),

                application.getStatus().name(),

                application.getAppliedAt()
        );
    }
}
