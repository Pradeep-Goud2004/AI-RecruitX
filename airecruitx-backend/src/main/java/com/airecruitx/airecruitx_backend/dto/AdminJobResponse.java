package com.airecruitx.airecruitx_backend.dto;

import com.airecruitx.airecruitx_backend.entity.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminJobResponse {

    private Long id;

    private String title;

    private String location;

    private String employmentType;

    private String experienceLevel;

    private String requiredSkills;

    private Double salaryMin;

    private Double salaryMax;

    private boolean active;

    private LocalDateTime createdAt;

    private Long recruiterId;

    private String recruiterName;

    private String recruiterEmail;

    public static AdminJobResponse fromEntity(
            Job job) {

        return new AdminJobResponse(
                job.getId(),
                job.getTitle(),
                job.getLocation(),
                job.getEmploymentType(),
                job.getExperienceLevel(),
                job.getRequiredSkills(),
                job.getSalaryMin(),
                job.getSalaryMax(),
                job.isActive(),
                job.getCreatedAt(),
                job.getRecruiter().getId(),
                job.getRecruiter().getName(),
                job.getRecruiter().getEmail()
        );
    }
}