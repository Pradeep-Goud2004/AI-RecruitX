package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.dto.RecruiterCandidateResponse;
import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.Resume;
import com.airecruitx.airecruitx_backend.entity.ResumeAnalysis;
import com.airecruitx.airecruitx_backend.repository.CandidateRepository;
import com.airecruitx.airecruitx_backend.repository.ResumeAnalysisRepository;
import com.airecruitx.airecruitx_backend.repository.ResumeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RecruiterCandidateService {

    private final CandidateRepository candidateRepository;
    private final ResumeRepository resumeRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;

    public RecruiterCandidateService(
            CandidateRepository candidateRepository,
            ResumeRepository resumeRepository,
            ResumeAnalysisRepository resumeAnalysisRepository) {

        this.candidateRepository = candidateRepository;
        this.resumeRepository = resumeRepository;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
    }

    public List<RecruiterCandidateResponse> getAllCandidates() {

        return candidateRepository
                .findAllByOrderByIdAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    public RecruiterCandidateResponse getCandidate(
            Long candidateId) {

        Candidate candidate =
                candidateRepository.findById(candidateId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Candidate not found"));

        return toResponse(candidate);
    }

    private RecruiterCandidateResponse toResponse(
            Candidate candidate) {

        Resume resume = resumeRepository
                .findByCandidateId(candidate.getId())
                .orElse(null);

        ResumeAnalysis analysis = null;

        if (resume != null) {
            analysis = resumeAnalysisRepository
                    .findByResumeId(resume.getId())
                    .orElse(null);
        }

        return new RecruiterCandidateResponse(
                candidate.getId(),
                candidate.getUser().getName(),
                candidate.getUser().getEmail(),
                candidate.getPhone(),
                candidate.getLocation(),
                candidate.getHeadline(),
                candidate.getBio(),
                candidate.getExperienceYears(),

                resume != null,

                analysis != null,

                analysis != null
                        ? analysis.getSummary()
                        : null,

                analysis != null
                        ? analysis.getSkills()
                        : null,

                analysis != null
                        ? analysis.getExperience()
                        : null,

                analysis != null
                        ? analysis.getEducation()
                        : null,

                analysis != null
                        ? analysis.getProjects()
                        : null,

                analysis != null
                        ? analysis.getCertifications()
                        : null
        );
    }
}
