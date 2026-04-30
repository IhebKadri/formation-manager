package com.example.formation_backend.dtos.auth;
import lombok.*;

import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private UUID id;
    private String login;
    private String email;
    private String role;
}
