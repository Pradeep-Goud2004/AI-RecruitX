package com.airecruitx.airecruitx_backend.repository;

import com.airecruitx.airecruitx_backend.entity.Notification;
import com.airecruitx.airecruitx_backend.entity.User;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByUserOrderByCreatedAtDesc(
            User user
    );

    long countByUserAndReadFalse(
            User user
    );
}
