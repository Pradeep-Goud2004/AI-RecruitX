
package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.dto.CandidateProfileResponse;
import com.airecruitx.airecruitx_backend.entity.Application;
import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.User;

import com.airecruitx.airecruitx_backend.repository.ApplicationRepository;
import com.airecruitx.airecruitx_backend.repository.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

@Service
public class RecruiterCandidateProfileService {

    private final ApplicationRepository applicationRepository;
    private final UserRepository userRepository;

    public RecruiterCandidateProfileService(
            ApplicationRepository applicationRepository,
            UserRepository userRepository) {

        this.applicationRepository = applicationRepository;
        this.userRepository = userRepository;
    }

    @Transactional(readOnly = true)
    public CandidateProfileResponse getCandidateProfile(
            Long applicationId,
            String recruiterEmail) {

        Application application =
                applicationRepository.findById(applicationId)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Application not found"
                                )
                        );

        User recruiter =
                userRepository.findByEmail(recruiterEmail)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.NOT_FOUND,
                                        "Recruiter account not found"
                                )
                        );

        if (application.getJob() == null
                || application.getJob().getRecruiter() == null
                || application.getJob().getRecruiter().getId() == null) {

            throw new ResponseStatusException(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    "Application job or recruiter information is missing"
            );
        }

        Long jobRecruiterId =
                application.getJob().getRecruiter().getId();

        if (!jobRecruiterId.equals(recruiter.getId())) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN,
                    "You are not authorized to view this candidate"
            );
        }

        Candidate candidate = application.getCandidate();

        if (candidate == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Candidate profile not found"
            );
        }

        User candidateUser = candidate.getUser();

        if (candidateUser == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND,
                    "Candidate account not found"
            );
        }

        return new CandidateProfileResponse(
                candidate.getId(),
                candidateUser.getName(),
                candidateUser.getEmail(),
                candidate.getPhone(),
                candidate.getLocation(),
                candidate.getHeadline(),
                candidate.getBio(),
                candidate.getExperienceYears()
        );
    }
}