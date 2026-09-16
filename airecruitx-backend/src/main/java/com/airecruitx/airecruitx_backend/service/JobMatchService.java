package com.airecruitx.airecruitx_backend.service;

import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.Job;
import com.airecruitx.airecruitx_backend.entity.JobMatch;
import com.airecruitx.airecruitx_backend.entity.ResumeAnalysis;
import com.airecruitx.airecruitx_backend.entity.User;
import com.airecruitx.airecruitx_backend.repository.CandidateRepository;
import com.airecruitx.airecruitx_backend.repository.JobMatchRepository;
import com.airecruitx.airecruitx_backend.repository.JobRepository;
import com.airecruitx.airecruitx_backend.repository.ResumeAnalysisRepository;
import com.airecruitx.airecruitx_backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class JobMatchService {

    private final JobRepository jobRepository;
    private final CandidateRepository candidateRepository;
    private final ResumeAnalysisRepository resumeAnalysisRepository;
    private final JobMatchRepository jobMatchRepository;
    private final UserRepository userRepository;

    public JobMatchService(
            JobRepository jobRepository,
            CandidateRepository candidateRepository,
            ResumeAnalysisRepository resumeAnalysisRepository,
            JobMatchRepository jobMatchRepository,
            UserRepository userRepository) {

        this.jobRepository = jobRepository;
        this.candidateRepository = candidateRepository;
        this.resumeAnalysisRepository = resumeAnalysisRepository;
        this.jobMatchRepository = jobMatchRepository;
        this.userRepository = userRepository;
    }

    // =========================================================
    // CALCULATE MATCH FOR ONE CANDIDATE
    // =========================================================

    public JobMatch calculateMatch(
            Long jobId,
            Long candidateId,
            String recruiterEmail) {

        // 1. Find job
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job not found"));

        // 2. Find recruiter
        User recruiter = userRepository
                .findByEmail(recruiterEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Recruiter not found"));

        // 3. Verify that this recruiter owns the job
        if (!job.getRecruiter()
                .getId()
                .equals(recruiter.getId())) {

            throw new RuntimeException(
                    "You are not authorized to access this job");
        }

        // 4. Find candidate
        Candidate candidate = candidateRepository
                .findById(candidateId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Candidate profile not found"));

        // 5. Find resume analysis
        ResumeAnalysis analysis =
                resumeAnalysisRepository
                        .findByResumeCandidateId(
                                candidate.getId())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Resume analysis not found"));

        // 6. Get required skills from job
        String requiredSkills =
                job.getRequiredSkills();

        // 7. Get candidate skills from resume analysis
        String candidateSkills =
                analysis.getSkills();

        if (requiredSkills == null ||
                requiredSkills.isBlank()) {

            throw new RuntimeException(
                    "Job required skills are empty");
        }

        if (candidateSkills == null ||
                candidateSkills.isBlank()) {

            throw new RuntimeException(
                    "Candidate skills are empty");
        }

        // 8. Convert skills into lists
        List<String> requiredSkillList =
                parseSkills(requiredSkills);

        List<String> candidateSkillList =
                parseSkills(candidateSkills);

        List<String> matchedSkills =
                new ArrayList<>();

        List<String> missingSkills =
                new ArrayList<>();

        // 9. Compare skills
        for (String requiredSkill :
                requiredSkillList) {

            if (candidateSkillList
                    .contains(requiredSkill)) {

                matchedSkills.add(requiredSkill);

            } else {

                missingSkills.add(requiredSkill);
            }
        }

        // 10. Calculate score
        double score = 0;

        if (!requiredSkillList.isEmpty()) {

            score =
                    ((double) matchedSkills.size()
                            / requiredSkillList.size())
                            * 100;
        }

        // 11. Find existing match or create new
        JobMatch jobMatch =
                jobMatchRepository
                        .findByJobIdAndCandidateId(
                                jobId,
                                candidate.getId())
                        .orElse(new JobMatch());

        // 12. Set match information
        jobMatch.setJob(job);
        jobMatch.setCandidate(candidate);

        jobMatch.setMatchScore(score);

        jobMatch.setMatchedSkills(
                String.join(
                        ", ",
                        matchedSkills)
        );

        jobMatch.setMissingSkills(
                String.join(
                        ", ",
                        missingSkills)
        );

        jobMatch.setRecommendation(
                generateRecommendation(score)
        );

        jobMatch.setAnalyzedAt(
                LocalDateTime.now());

        // 13. Save
        return jobMatchRepository.save(jobMatch);
    }

    // =========================================================
    // GET MATCHES FOR A JOB
    // =========================================================

    public List<JobMatch> getMatchesForJob(
            Long jobId,
            String recruiterEmail) {

        // 1. Find job
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job not found"));

        // 2. Find recruiter
        User recruiter = userRepository
                .findByEmail(recruiterEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Recruiter not found"));

        // 3. Verify ownership
        if (!job.getRecruiter()
                .getId()
                .equals(recruiter.getId())) {

            throw new RuntimeException(
                    "You are not authorized to access this job");
        }

        // 4. Return candidates ranked by score
        return jobMatchRepository
                .findByJobIdOrderByMatchScoreDesc(
                        jobId);
    }

    // =========================================================
    // ANALYZE ALL CANDIDATES
    // =========================================================

    public List<JobMatch> analyzeAllCandidates(
            Long jobId,
            String recruiterEmail) {

        // 1. Find job
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Job not found"));

        // 2. Find recruiter
        User recruiter = userRepository
                .findByEmail(recruiterEmail)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Recruiter not found"));

        // 3. Verify ownership
        if (!job.getRecruiter()
                .getId()
                .equals(recruiter.getId())) {

            throw new RuntimeException(
                    "You are not authorized to access this job");
        }

        // 4. Get all candidates
        List<Candidate> candidates =
                candidateRepository
                        .findAllByOrderByIdAsc();

        List<JobMatch> matches =
                new ArrayList<>();

        // 5. Analyze every candidate
        for (Candidate candidate :
                candidates) {

            try {

                ResumeAnalysis analysis =
                        resumeAnalysisRepository
                                .findByResumeCandidateId(
                                        candidate.getId())
                                .orElse(null);

                // Skip candidates without resume analysis
                if (analysis == null) {
                    continue;
                }

                JobMatch match =
                        calculateMatch(
                                jobId,
                                candidate.getId(),
                                recruiterEmail);

                matches.add(match);

            } catch (Exception exception) {

                // Skip this candidate and continue
                System.out.println(
                        "Skipping candidate " +
                        candidate.getId() +
                        ": " +
                        exception.getMessage());
            }
        }

        // 6. Highest score first
        matches.sort(
                (a, b) ->
                        Double.compare(
                                b.getMatchScore(),
                                a.getMatchScore())
        );

        return matches;
    }

    // =========================================================
    // PARSE SKILLS
    // =========================================================

    private List<String> parseSkills(
            String skills) {

        List<String> result =
                new ArrayList<>();

        String[] skillArray =
                skills.split(",");

        for (String skill :
                skillArray) {

            String normalizedSkill =
                    skill.trim()
                            .toLowerCase();

            if (!normalizedSkill.isBlank()) {

                result.add(normalizedSkill);
            }
        }

        return result;
    }

    // =========================================================
    // GENERATE RECOMMENDATION
    // =========================================================

    private String generateRecommendation(
            double score) {

        if (score >= 80) {

            return "Excellent match. Candidate is highly suitable for this job.";
        }

        if (score >= 60) {

            return "Good match. Candidate meets several important requirements.";
        }

        if (score >= 40) {

            return "Moderate match. Candidate has some relevant skills but needs improvement.";
        }

        return "Low match. Candidate is missing many required skills.";
    }
}