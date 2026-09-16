package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.ai.AiAnalysisService;
import com.airecruitx.airecruitx_backend.entity.Resume;
import com.airecruitx.airecruitx_backend.entity.ResumeAnalysis;
import com.airecruitx.airecruitx_backend.repository.ResumeAnalysisRepository;
import com.airecruitx.airecruitx_backend.repository.ResumeRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ResumeAnalysisService {

    private final ResumeRepository resumeRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;

    private final AiAnalysisService aiAnalysisService;

    public ResumeAnalysisService(
            ResumeRepository resumeRepository,
            ResumeAnalysisRepository resumeAnalysisRepository,
            AiAnalysisService aiAnalysisService) {

        this.resumeRepository = resumeRepository;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
        this.aiAnalysisService = aiAnalysisService;
    }

    public ResumeAnalysis analyzeResume(String email) {

        Resume resume = resumeRepository
        .findByCandidateUserEmail(email)
        .orElseThrow(() ->
                new RuntimeException("Resume not found"));
        String text = resume.getExtractedText();

        if (text == null || text.isBlank()) {
            throw new RuntimeException("Resume text could not be extracted");
        }

        ResumeAnalysis analysis = resumeAnalysisRepository
                .findByResumeId(resume.getId())
                .orElse(new ResumeAnalysis());

        analysis.setResume(resume);
        analysis.setAnalyzedAt(LocalDateTime.now());


        /* Temporary analysis. AI integration will replace this section. */

        analysis.setSummary(
                aiAnalysisService.generateSummary(text)
        );

        analysis.setSkills(
                aiAnalysisService.extractSkills(text)
        );

        analysis.setExperience(
                aiAnalysisService.extractExperience(text)
        );

        analysis.setEducation(
                aiAnalysisService.extractEducation(text)
        );

        analysis.setProjects(
                aiAnalysisService.extractProjects(text)
        );

        analysis.setCertifications(
                aiAnalysisService.extractCertifications(text)
        );

        return resumeAnalysisRepository.save(analysis);
    }
}