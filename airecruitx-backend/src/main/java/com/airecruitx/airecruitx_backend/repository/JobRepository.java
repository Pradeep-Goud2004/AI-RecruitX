package com.airecruitx.airecruitx_backend.repository;

import com.airecruitx.airecruitx_backend.entity.Job;
import com.airecruitx.airecruitx_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Long> {

    List<Job> findByRecruiter(User recruiter);

    List<Job> findByActiveTrue();
}