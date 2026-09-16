package com.airecruitx.airecruitx_backend.repository;

import com.airecruitx.airecruitx_backend.entity.Candidate;
import com.airecruitx.airecruitx_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface CandidateRepository
        extends JpaRepository<Candidate, Long> {

    Optional<Candidate> findByUser(User user);

    Optional<Candidate> findByUserEmail(String email);
    List<Candidate> findAllByOrderByIdAsc();
}
