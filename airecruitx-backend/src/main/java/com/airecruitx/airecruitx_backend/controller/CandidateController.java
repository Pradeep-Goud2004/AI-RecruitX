package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.CandidateProfileRequest;
import com.airecruitx.airecruitx_backend.dto.ResumeAnalysisResponse;
import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.Resume;
import com.airecruitx.airecruitx_backend.entity.ResumeAnalysis;
import com.airecruitx.airecruitx_backend.service.CandidateService;
import com.airecruitx.airecruitx_backend.service.ResumeAnalysisService;
import com.airecruitx.airecruitx_backend.service.ResumeService;

import jakarta.validation.Valid;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

    private final CandidateService candidateService;
    private final ResumeService resumeService;
    private final ResumeAnalysisService resumeAnalysisService;

    public CandidateController(
            CandidateService candidateService,
            ResumeService resumeService,
            ResumeAnalysisService resumeAnalysisService) {

        this.candidateService = candidateService;
        this.resumeService = resumeService;
        this.resumeAnalysisService = resumeAnalysisService;
    }

    // ============================================================
    // CANDIDATE PROFILE
    // ============================================================

    @PostMapping("/profile")
    public ResponseEntity<Candidate> createOrUpdateProfile(
            @Valid @RequestBody CandidateProfileRequest request,
            Authentication authentication) {

        Candidate candidate =
                candidateService.createOrUpdateProfile(
                        authentication.getName(),
                        request
                );

        return ResponseEntity.ok(candidate);
    }

    @GetMapping("/profile")
    public ResponseEntity<Candidate> getProfile(
            Authentication authentication) {

        Candidate candidate =
                candidateService.getProfile(
                        authentication.getName()
                );

        return ResponseEntity.ok(candidate);
    }

    // ============================================================
    // RESUME UPLOAD
    // ============================================================

    @PostMapping("/resume/upload")
    public ResponseEntity<Resume> uploadResume(
            @RequestParam("file") MultipartFile file,
            Authentication authentication) throws IOException {

        Resume resume =
                resumeService.uploadResume(
                        authentication.getName(),
                        file
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(resume);
    }

    // ============================================================
    // RESUME ANALYSIS
    // ============================================================

    @PostMapping("/resume/analyze")
    public ResponseEntity<ResumeAnalysisResponse> analyzeResume(
            Authentication authentication) {

        ResumeAnalysis analysis =
                resumeAnalysisService.analyzeResume(
                        authentication.getName()
                );

        ResumeAnalysisResponse response =
                ResumeAnalysisResponse.fromEntity(analysis);

        return ResponseEntity.ok(response);
    }
}