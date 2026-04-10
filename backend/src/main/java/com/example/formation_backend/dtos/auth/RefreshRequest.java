package com.example.formation_backend.dtos.auth;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefreshRequest {
    private String refreshToken;
}
