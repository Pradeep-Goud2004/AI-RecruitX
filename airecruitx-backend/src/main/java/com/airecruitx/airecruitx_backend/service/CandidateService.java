package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.dto.CandidateProfileRequest;
import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.User;
import com.airecruitx.airecruitx_backend.repository.CandidateRepository;
import com.airecruitx.airecruitx_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class CandidateService {

    private final CandidateRepository candidateRepository;
    private final UserRepository userRepository;

    public CandidateService(
            CandidateRepository candidateRepository,
            UserRepository userRepository) {

        this.candidateRepository = candidateRepository;
        this.userRepository = userRepository;
    }

    public Candidate createOrUpdateProfile(
            String email,
            CandidateProfileRequest request) {

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        Candidate candidate =
                candidateRepository
                        .findByUser(user)
                        .orElse(new Candidate());

        candidate.setUser(user);
        candidate.setPhone(request.getPhone());
        candidate.setLocation(request.getLocation());
        candidate.setHeadline(request.getHeadline());
        candidate.setBio(request.getBio());
        candidate.setExperienceYears(
                request.getExperienceYears()
        );

        return candidateRepository.save(candidate);
    }

    public Candidate getProfile(String email) {

        return candidateRepository
                .findByUserEmail(email)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"
                        )
                );
    }
}