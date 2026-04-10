package com.example.formation_backend.dtos.auth;

import com.example.formation_backend.entities.Utilisateur;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private String accessToken;
    private String refreshToken;
    private UserResponse user;
}
