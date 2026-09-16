package com.airecruitx.airecruitx_backend.repository;

import com.airecruitx.airecruitx_backend.entity.JobMatch;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface JobMatchRepository extends JpaRepository<JobMatch, Long> {

    Optional<JobMatch> findByJobIdAndCandidateId(
            Long jobId,
            Long candidateId
    );

    List<JobMatch> findByJobIdOrderByMatchScoreDesc(Long jobId);

    List<JobMatch> findByCandidateIdOrderByMatchScoreDesc(Long candidateId);
}
