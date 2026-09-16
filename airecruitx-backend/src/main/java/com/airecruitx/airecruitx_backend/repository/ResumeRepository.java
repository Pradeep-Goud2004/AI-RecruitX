package com.airecruitx.airecruitx_backend.repository;

import com.airecruitx.airecruitx_backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ResumeRepository
        extends JpaRepository<Resume, Long> {

    Optional<Resume> findByCandidateId(Long candidateId);

    Optional<Resume> findByCandidateUserEmail(String email);
}