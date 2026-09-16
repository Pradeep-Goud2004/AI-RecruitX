
package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.CandidateProfileResponse;
import com.airecruitx.airecruitx_backend.service.RecruiterCandidateProfileService;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recruiters/applications")
public class RecruiterCandidateProfileController {

    private final RecruiterCandidateProfileService profileService;

    public RecruiterCandidateProfileController(
            RecruiterCandidateProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{applicationId}/candidate-profile")
    public CandidateProfileResponse getCandidateProfile(
            @PathVariable Long applicationId,
            Authentication authentication) {

        return profileService.getCandidateProfile(
                applicationId,
                authentication.getName()
        );
    }
}
