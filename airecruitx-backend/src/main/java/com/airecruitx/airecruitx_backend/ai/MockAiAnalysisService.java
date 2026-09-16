package com.airecruitx.airecruitx_backend.ai;

import org.springframework.stereotype.Service;

@Service
public class MockAiAnalysisService implements AiAnalysisService {

    @Override
    public String generateSummary(String resumeText) {
        return "Candidate resume contains professional experience, "
                + "technical skills, education and project information.";
    }

  @Override
public String extractSkills(String resumeText) {

    String text = resumeText.toLowerCase();

    StringBuilder skills = new StringBuilder();

    String[] skillList = {
            "java",
            "spring boot",
            "spring",
            "hibernate",
            "jpa",
            "mysql",
            "sql",
            "react",
            "javascript",
            "html",
            "css",
            "git",
            "github",
            "docker",
            "aws",
            "rest api",
            "microservices",
            "python",
            "c++"
    };

    for (String skill : skillList) {

        if (text.contains(skill.toLowerCase())) {

            if (skills.length() > 0) {
                skills.append(", ");
            }

            skills.append(skill);
        }
    }

    if (skills.length() == 0) {
        return "No known technical skills detected.";
    }

    return skills.toString();
}

  @Override
public String extractExperience(String resumeText) {

    String text = resumeText.toLowerCase();

    StringBuilder experience = new StringBuilder();

    String[] experienceKeywords = {
            "software engineer",
            "software developer",
            "java developer",
            "full stack developer",
            "backend developer",
            "frontend developer",
            "web developer",
            "developer",
            "engineer",
            "intern",
            "internship",
            "trainee",
            "experience",
            "work experience",
            "professional experience"
    };

    for (String keyword : experienceKeywords) {

        if (text.contains(keyword)) {

            if (experience.length() > 0) {
                experience.append(", ");
            }

            experience.append(keyword);
        }
    }

    if (experience.length() == 0) {
        return "No known experience information detected.";
    }

    return experience.toString();
}

  @Override
public String extractEducation(String resumeText) {

    String text = resumeText.toLowerCase();

    StringBuilder education = new StringBuilder();

    String[] educationKeywords = {
            "b.tech",
            "btech",
            "b.e",
            "be",
            "bachelor of technology",
            "bachelor of engineering",
            "m.tech",
            "mtech",
            "m.e",
            "me",
            "master of technology",
            "master of engineering",
            "mca",
            "bca",
            "mba",
            "b.sc",
            "bsc",
            "m.sc",
            "msc",
            "diploma"
    };

    for (String keyword : educationKeywords) {

        if (text.contains(keyword)) {

            if (education.length() > 0) {
                education.append(", ");
            }

            education.append(keyword.toUpperCase());
        }
    }

    if (education.length() == 0) {
        return "No known education qualification detected.";
    }

    return education.toString();
}

    @Override
public String extractProjects(String resumeText) {

    String text = resumeText.toLowerCase();

    StringBuilder projects = new StringBuilder();

    String[] projectKeywords = {
            "project",
            "projects",
            "developed",
            "built",
            "implemented",
            "application",
            "website",
            "e-commerce",
            "ecommerce",
            "web application",
            "mobile application"
    };

    for (String keyword : projectKeywords) {

        if (text.contains(keyword)) {

            if (projects.length() > 0) {
                projects.append(", ");
            }

            projects.append(keyword);
        }
    }

    if (projects.length() == 0) {
        return "No project information detected.";
    }

    return projects.toString();
}

 @Override
public String extractCertifications(String resumeText) {

    String text = resumeText.toLowerCase();

    String[] certificationKeywords = {
            "certification",
            "certifications",
            "certified",
            "certificate",
            "certificates",
            "credential",
            "credentials",
            "course",
            "courses",
            "training",
            "trainings",
            "udemy",
            "coursera",
            "nptel",
            "great learning",
            "linkedin learning",
            "aws",
            "azure",
            "google cloud",
            "oracle",
            "microsoft",
            "hackerrank"
    };

    StringBuilder certifications = new StringBuilder();

    for (String keyword : certificationKeywords) {

        if (text.contains(keyword)) {

            if (certifications.length() > 0) {
                certifications.append(", ");
            }

            certifications.append(keyword);
        }
    }

    if (certifications.length() == 0) {
        return "No certification information detected.";
    }

    return certifications.toString();
}
}