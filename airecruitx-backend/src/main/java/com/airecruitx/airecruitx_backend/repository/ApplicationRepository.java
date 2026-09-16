package com.airecruitx.airecruitx_backend.repository;

import com.airecruitx.airecruitx_backend.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ApplicationRepository
        extends JpaRepository<Application, Long> {

    Optional<Application> findByJobIdAndCandidateId(
            Long jobId,
            Long candidateId
    );

    Optional<Application> findByIdAndCandidateId(
            Long id,
            Long candidateId
    );

    List<Application> findByCandidateIdOrderByAppliedAtDesc(
            Long candidateId
    );

    List<Application> findByJobIdOrderByAppliedAtDesc(
            Long jobId
    );
}