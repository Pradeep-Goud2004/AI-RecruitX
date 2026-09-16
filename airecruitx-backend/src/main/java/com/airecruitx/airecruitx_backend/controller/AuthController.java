package com.airecruitx.airecruitx_backend.controller;

import com.airecruitx.airecruitx_backend.dto.AuthResponse;
import com.airecruitx.airecruitx_backend.dto.LoginRequest;
import com.airecruitx.airecruitx_backend.dto.RegisterRequest;
import com.airecruitx.airecruitx_backend.dto.UserResponse;
import com.airecruitx.airecruitx_backend.entity.User;
import com.airecruitx.airecruitx_backend.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<UserResponse> register(
            @Valid @RequestBody RegisterRequest request) {

        User user = authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        UserResponse.fromEntity(user)
                );
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request) {

        String token = authService.login(request);

        User user = authService.getUserByEmail(
                request.getEmail()
        );

        AuthResponse response = new AuthResponse(
                token,
                UserResponse.fromEntity(user)
        );

        return ResponseEntity.ok(response);
    }
}