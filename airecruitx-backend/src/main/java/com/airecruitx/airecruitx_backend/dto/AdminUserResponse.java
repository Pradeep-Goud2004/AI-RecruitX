package com.airecruitx.airecruitx_backend.dto;

import com.airecruitx.airecruitx_backend.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponse {

    private Long id;

    private String name;

    private String email;

    private String role;

    public static AdminUserResponse fromEntity(
            User user) {

        return new AdminUserResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole().name()
        );
    }
}
