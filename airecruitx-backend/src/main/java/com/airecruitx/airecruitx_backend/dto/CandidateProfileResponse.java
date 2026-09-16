
package com.airecruitx.airecruitx_backend.dto;

public record CandidateProfileResponse(
        Long candidateId,
        String name,
        String email,
        String phone,
        String location,
        String headline,
        String bio,
        Integer experienceYears
) {
}
