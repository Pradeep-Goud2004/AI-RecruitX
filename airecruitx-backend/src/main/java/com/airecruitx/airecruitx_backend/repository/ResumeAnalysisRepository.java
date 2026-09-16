package com.airecruitx.airecruitx_backend.repository;

import com.airecruitx.airecruitx_backend.entity.ResumeAnalysis;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeAnalysisRepository extends JpaRepository<ResumeAnalysis, Long> {

    Optional<ResumeAnalysis> findByResumeId(Long resumeId);
    Optional<ResumeAnalysis> findByResumeCandidateId(Long candidateId);
}