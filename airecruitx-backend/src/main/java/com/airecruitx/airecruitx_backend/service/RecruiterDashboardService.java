package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.dto.MonthlyApplicationAnalyticsResponse;
import com.airecruitx.airecruitx_backend.dto.RecruiterDashboardResponse;
import com.airecruitx.airecruitx_backend.dto.RecruiterJobSummaryResponse;
import com.airecruitx.airecruitx_backend.entity.Application;
import com.airecruitx.airecruitx_backend.entity.ApplicationStatus;
import com.airecruitx.airecruitx_backend.entity.Job;
import com.airecruitx.airecruitx_backend.entity.User;
import com.airecruitx.airecruitx_backend.repository.ApplicationRepository;
import com.airecruitx.airecruitx_backend.repository.JobRepository;
import com.airecruitx.airecruitx_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Service
public class RecruiterDashboardService {

    private final UserRepository userRepository;
    private final JobRepository jobRepository;
    private final ApplicationRepository applicationRepository;

    public RecruiterDashboardService(
            UserRepository userRepository,
            JobRepository jobRepository,
            ApplicationRepository applicationRepository) {

        this.userRepository = userRepository;
        this.jobRepository = jobRepository;
        this.applicationRepository = applicationRepository;
    }

    public RecruiterDashboardResponse getDashboard(String recruiterEmail) {
        return getDashboard(recruiterEmail, null, null, null);
    }

    public RecruiterDashboardResponse getDashboard(
            String recruiterEmail,
            LocalDate startDate,
            LocalDate endDate,
            Long jobId) {

        validateDateRange(startDate, endDate);

        User recruiter = getRecruiter(recruiterEmail);
        List<Job> allRecruiterJobs = jobRepository.findByRecruiter(recruiter);

        // Validate that the requested job belongs to this recruiter.
        if (jobId != null && allRecruiterJobs.stream()
                .noneMatch(job -> job.getId().equals(jobId))) {
            throw new IllegalArgumentException(
                    "The selected job does not belong to this recruiter");
        }

        int totalJobs = allRecruiterJobs.size();
        int activeJobs = 0;
        int inactiveJobs = 0;

        for (Job job : allRecruiterJobs) {
            if (job.isActive()) {
                activeJobs++;
            } else {
                inactiveJobs++;
            }
        }

        List<Job> filteredJobs = allRecruiterJobs.stream()
                .filter(job -> jobId == null || job.getId().equals(jobId))
                .toList();

        int totalApplications = 0;
        int appliedApplications = 0;
        int shortlistedApplications = 0;
        int interviewApplications = 0;
        int selectedApplications = 0;
        int rejectedApplications = 0;

        List<RecruiterJobSummaryResponse> jobSummaries =
                new ArrayList<>();

        for (Job job : filteredJobs) {

            List<Application> applications =
                    getFilteredApplications(job, startDate, endDate);

            int jobApplications = applications.size();
            int jobShortlisted = 0;
            int jobInterview = 0;
            int jobSelected = 0;
            int jobRejected = 0;

            for (Application application : applications) {

                totalApplications++;

                ApplicationStatus status = application.getStatus();

                if (status == ApplicationStatus.APPLIED) {
                    appliedApplications++;
                } else if (status == ApplicationStatus.SHORTLISTED) {
                    shortlistedApplications++;
                    jobShortlisted++;
                } else if (status == ApplicationStatus.INTERVIEW) {
                    interviewApplications++;
                    jobInterview++;
                } else if (status == ApplicationStatus.SELECTED) {
                    selectedApplications++;
                    jobSelected++;
                } else if (status == ApplicationStatus.REJECTED) {
                    rejectedApplications++;
                    jobRejected++;
                }
            }

            jobSummaries.add(
                    new RecruiterJobSummaryResponse(
                            job.getId(),
                            job.getTitle(),
                            job.getLocation(),
                            job.getEmploymentType(),
                            job.getExperienceLevel(),
                            job.isActive(),
                            jobApplications,
                            jobShortlisted,
                            jobInterview,
                            jobSelected,
                            jobRejected
                    )
            );
        }

        return new RecruiterDashboardResponse(
                recruiter.getId(),
                recruiter.getName(),
                recruiter.getEmail(),
                totalJobs,
                activeJobs,
                inactiveJobs,
                totalApplications,
                appliedApplications,
                shortlistedApplications,
                interviewApplications,
                selectedApplications,
                rejectedApplications,
                jobSummaries
        );
    }

    public List<MonthlyApplicationAnalyticsResponse> getApplicationsOverTime(
            String recruiterEmail) {

        return getApplicationsOverTime(
                recruiterEmail, null, null, null);
    }

    public List<MonthlyApplicationAnalyticsResponse> getApplicationsOverTime(
            String recruiterEmail,
            LocalDate startDate,
            LocalDate endDate,
            Long jobId) {

        validateDateRange(startDate, endDate);

        User recruiter = getRecruiter(recruiterEmail);
        List<Job> allRecruiterJobs = jobRepository.findByRecruiter(recruiter);

        if (jobId != null && allRecruiterJobs.stream()
                .noneMatch(job -> job.getId().equals(jobId))) {
            throw new IllegalArgumentException(
                    "The selected job does not belong to this recruiter");
        }

        List<Job> filteredJobs = allRecruiterJobs.stream()
                .filter(job -> jobId == null || job.getId().equals(jobId))
                .toList();

        Map<YearMonth, Integer> monthlyCounts = new TreeMap<>();

        YearMonth firstMonth;
        YearMonth lastMonth;

        if (startDate != null && endDate != null) {
            firstMonth = YearMonth.from(startDate);
            lastMonth = YearMonth.from(endDate);
        } else if (startDate != null) {
            firstMonth = YearMonth.from(startDate);
            lastMonth = YearMonth.now();
        } else if (endDate != null) {
            firstMonth = YearMonth.from(endDate).minusMonths(5);
            lastMonth = YearMonth.from(endDate);
        } else {
            lastMonth = YearMonth.now();
            firstMonth = lastMonth.minusMonths(5);
        }

        for (YearMonth month = firstMonth;
             !month.isAfter(lastMonth);
             month = month.plusMonths(1)) {

            monthlyCounts.put(month, 0);
        }

        for (Job job : filteredJobs) {

            List<Application> applications =
                    getFilteredApplications(job, startDate, endDate);

            for (Application application : applications) {

                if (application.getAppliedAt() == null) {
                    continue;
                }

                YearMonth applicationMonth =
                        YearMonth.from(application.getAppliedAt());

                if (monthlyCounts.containsKey(applicationMonth)) {
                    monthlyCounts.put(
                            applicationMonth,
                            monthlyCounts.get(applicationMonth) + 1
                    );
                }
            }
        }

        List<MonthlyApplicationAnalyticsResponse> result =
                new ArrayList<>();

        for (Map.Entry<YearMonth, Integer> entry
                : monthlyCounts.entrySet()) {

            result.add(
                    new MonthlyApplicationAnalyticsResponse(
                            entry.getKey().toString(),
                            entry.getValue()
                    )
            );
        }

        return result;
    }

    private User getRecruiter(String recruiterEmail) {
        return userRepository.findByEmail(recruiterEmail)
                .orElseThrow(() ->
                        new RuntimeException("Recruiter not found"));
    }

    private List<Application> getFilteredApplications(
            Job job,
            LocalDate startDate,
            LocalDate endDate) {

        return applicationRepository
                .findByJobIdOrderByAppliedAtDesc(job.getId())
                .stream()
                .filter(application -> {
                    if (application.getAppliedAt() == null) {
                        return startDate == null && endDate == null;
                    }

                    LocalDate applicationDate =
                            application.getAppliedAt().toLocalDate();

                    boolean afterStart =
                            startDate == null
                                    || !applicationDate.isBefore(startDate);

                    boolean beforeEnd =
                            endDate == null
                                    || !applicationDate.isAfter(endDate);

                    return afterStart && beforeEnd;
                })
                .toList();
    }

    private void validateDateRange(
            LocalDate startDate,
            LocalDate endDate) {

        if (startDate != null
                && endDate != null
                && startDate.isAfter(endDate)) {

            throw new IllegalArgumentException(
                    "Start date must be before or equal to end date");
        }
    }
}