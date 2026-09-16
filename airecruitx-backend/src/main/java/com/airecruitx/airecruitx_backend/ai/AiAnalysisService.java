package com.airecruitx.airecruitx_backend.ai;

public interface AiAnalysisService {

    String generateSummary(String resumeText);

    String extractSkills(String resumeText);

    String extractExperience(String resumeText);

    String extractEducation(String resumeText);

    String extractProjects(String resumeText);

    String extractCertifications(String resumeText);
}
