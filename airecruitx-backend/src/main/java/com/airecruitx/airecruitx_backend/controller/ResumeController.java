
package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.service.ResumeService;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;

@RestController
@RequestMapping("/api/recruiters/applications")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @GetMapping("/{applicationId}/resume")
    public ResponseEntity<Resource> viewResume(
            @PathVariable Long applicationId,
            Authentication authentication) throws IOException {

        if (authentication == null
                || authentication.getName() == null) {

            throw new ResponseStatusException(
                    org.springframework.http.HttpStatus.UNAUTHORIZED,
                    "Please log in to view this resume"
            );
        }

        Resource resume =
                resumeService.getResumeForRecruiter(
                        applicationId,
                        authentication.getName()
                );

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_PDF)
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "inline; filename=\"resume.pdf\""
                )
                .body(resume);
    }
}