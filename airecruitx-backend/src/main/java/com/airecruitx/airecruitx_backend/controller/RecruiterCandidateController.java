package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.RecruiterCandidateResponse;
import com.airecruitx.airecruitx_backend.service.RecruiterCandidateService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/recruiters/candidates")
public class RecruiterCandidateController {

    private final RecruiterCandidateService recruiterCandidateService;

    public RecruiterCandidateController(
            RecruiterCandidateService recruiterCandidateService) {

        this.recruiterCandidateService =
                recruiterCandidateService;
    }

    @GetMapping
    public List<RecruiterCandidateResponse> getAllCandidates() {

        return recruiterCandidateService
                .getAllCandidates();
    }

    @GetMapping("/{candidateId}")
    public RecruiterCandidateResponse getCandidate(
            @PathVariable Long candidateId) {

        return recruiterCandidateService
                .getCandidate(candidateId);
    }
}