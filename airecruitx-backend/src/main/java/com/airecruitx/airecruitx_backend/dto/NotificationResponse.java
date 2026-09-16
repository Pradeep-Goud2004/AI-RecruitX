package com.airecruitx.airecruitx_backend.dto;

import com.airecruitx.airecruitx_backend.entity.Notification;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationResponse {

    private Long id;

    private String message;

    private String type;

    private boolean read;

    private LocalDateTime createdAt;

    public static NotificationResponse fromEntity(
            Notification notification) {

        return new NotificationResponse(
                notification.getId(),
                notification.getMessage(),
                notification.getType(),
                notification.isRead(),
                notification.getCreatedAt()
        );
    }
}