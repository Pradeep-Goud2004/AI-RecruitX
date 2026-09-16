package com.airecruitx.airecruitx_backend.dto;

import com.airecruitx.airecruitx_backend.entity.Job;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobResponse {

    private Long id;

    private String title;

    private String description;

    private String location;

    private String employmentType;

    private String experienceLevel;

    private String requiredSkills;

    private Double salaryMin;

    private Double salaryMax;

    private LocalDateTime createdAt;

    private boolean active;

    private Long recruiterId;

    private String recruiterName;

    private String recruiterEmail;

    public static JobResponse fromEntity(Job job) {

        return new JobResponse(
                job.getId(),
                job.getTitle(),
                job.getDescription(),
                job.getLocation(),
                job.getEmploymentType(),
                job.getExperienceLevel(),
                job.getRequiredSkills(),
                job.getSalaryMin(),
                job.getSalaryMax(),
                job.getCreatedAt(),
                job.isActive(),
                job.getRecruiter().getId(),
                job.getRecruiter().getName(),
                job.getRecruiter().getEmail()
        );
    }
}