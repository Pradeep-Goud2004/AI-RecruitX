package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.dto.ApplicationResponse;
import com.airecruitx.airecruitx_backend.dto.CandidateDashboardResponse;
import com.airecruitx.airecruitx_backend.dto.RecommendedJobResponse;
import com.airecruitx.airecruitx_backend.entity.Application;
import com.airecruitx.airecruitx_backend.entity.ApplicationStatus;
import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.JobMatch;
import com.airecruitx.airecruitx_backend.entity.Resume;
import com.airecruitx.airecruitx_backend.entity.ResumeAnalysis;
import com.airecruitx.airecruitx_backend.repository.CandidateRepository;
import com.airecruitx.airecruitx_backend.repository.JobMatchRepository;
import com.airecruitx.airecruitx_backend.repository.ResumeAnalysisRepository;
import com.airecruitx.airecruitx_backend.repository.ResumeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CandidateDashboardService {

    private final CandidateRepository candidateRepository;
    private final ResumeRepository resumeRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final ApplicationService applicationService;
    private final JobMatchRepository jobMatchRepository;

    public CandidateDashboardService(
            CandidateRepository candidateRepository,
            ResumeRepository resumeRepository,
            ResumeAnalysisRepository resumeAnalysisRepository,
            ApplicationService applicationService,
            JobMatchRepository jobMatchRepository) {

        this.candidateRepository = candidateRepository;
        this.resumeRepository = resumeRepository;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
        this.applicationService = applicationService;
        this.jobMatchRepository = jobMatchRepository;
    }

    // CANDIDATE DASHBOARD
    public CandidateDashboardResponse getDashboard(
            String candidateEmail) {

        Candidate candidate = candidateRepository
                .findByUserEmail(candidateEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"));

        Resume resume = resumeRepository
                .findByCandidateId(candidate.getId())
                .orElse(null);

        ResumeAnalysis resumeAnalysis = null;

        if (resume != null) {

            resumeAnalysis = resumeAnalysisRepository
                    .findByResumeId(resume.getId())
                    .orElse(null);
        }

        List<Application> applications =
                applicationService
                        .getCandidateApplications(candidateEmail);

        int applied = 0;
        int shortlisted = 0;
        int interview = 0;
        int rejected = 0;

        for (Application application : applications) {

            ApplicationStatus status =
                    application.getStatus();

            if (status == ApplicationStatus.APPLIED) {
                applied++;
            }

            if (status == ApplicationStatus.SHORTLISTED) {
                shortlisted++;
            }

            if (status == ApplicationStatus.INTERVIEW) {
                interview++;
            }

            if (status == ApplicationStatus.REJECTED) {
                rejected++;
            }
        }

        List<ApplicationResponse> applicationResponses =
                applications.stream()
                        .map(application -> {

                            JobMatch jobMatch =
                                    applicationService
                                            .getApplicationMatch(
                                                    application.getId()
                                            );

                            return ApplicationResponse
                                    .fromEntity(
                                            application,
                                            jobMatch
                                    );
                        })
                        .toList();

        boolean profileCompleted =
                candidate.getPhone() != null
                        && !candidate.getPhone().isBlank()
                        && candidate.getLocation() != null
                        && !candidate.getLocation().isBlank()
                        && candidate.getHeadline() != null
                        && !candidate.getHeadline().isBlank()
                        && candidate.getBio() != null
                        && !candidate.getBio().isBlank();

        return new CandidateDashboardResponse(
                candidate.getId(),
                candidate.getUser().getName(),
                candidate.getUser().getEmail(),
                profileCompleted,
                resume != null,
                resumeAnalysis != null,
                applications.size(),
                applied,
                shortlisted,
                interview,
                rejected,
                applicationResponses
        );
    }

    // RECOMMENDED JOBS
    public List<RecommendedJobResponse> getRecommendedJobs(
            String candidateEmail) {

        Candidate candidate = candidateRepository
                .findByUserEmail(candidateEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"));

        List<JobMatch> matches =
                jobMatchRepository
                        .findByCandidateIdOrderByMatchScoreDesc(
                                candidate.getId()
                        );

        return matches.stream()
                .map(RecommendedJobResponse::fromEntity)
                .toList();
    }
}
