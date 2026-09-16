package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.NotificationResponse;
import com.airecruitx.airecruitx_backend.service.NotificationService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    public NotificationController(
            NotificationService notificationService) {

        this.notificationService =
                notificationService;
    }

    // ============================================================
    // GET MY NOTIFICATIONS
    // ============================================================

    @GetMapping
    public ResponseEntity<List<NotificationResponse>>
    getMyNotifications(
            Authentication authentication) {

        return ResponseEntity.ok(
                notificationService.getMyNotifications(
                        authentication.getName()
                )
        );
    }

    // ============================================================
    // UNREAD COUNT
    // ============================================================

    @GetMapping("/unread-count")
    public ResponseEntity<Map<String, Long>>
    getUnreadCount(
            Authentication authentication) {

        long count =
                notificationService.getUnreadCount(
                        authentication.getName()
                );

        return ResponseEntity.ok(
                Map.of("count", count)
        );
    }

    // ============================================================
    // MARK ONE AS READ
    // ============================================================

    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationResponse>
    markAsRead(
            @PathVariable Long notificationId,
            Authentication authentication) {

        return ResponseEntity.ok(
                notificationService.markAsRead(
                        notificationId,
                        authentication.getName()
                )
        );
    }

    // ============================================================
    // MARK ALL AS READ
    // ============================================================

    @PutMapping("/read-all")
    public ResponseEntity<Map<String, String>>
    markAllAsRead(
            Authentication authentication) {

        notificationService.markAllAsRead(
                authentication.getName()
        );

        return ResponseEntity.ok(
                Map.of(
                        "message",
                        "All notifications marked as read"
                )
        );
    }
}