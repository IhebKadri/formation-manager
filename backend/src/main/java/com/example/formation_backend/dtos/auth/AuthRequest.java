package com.example.formation_backend.dtos.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthRequest {

    @NotBlank(message = "Login est obligatoire")
    @Size(min = 3, max = 50, message = "Login doit contenir entre 3 et 50 caractères")
    private String login;

    @NotBlank(message = "Mot de passe est obligatoire")
    @Size(min = 6, message = "Mot de passe doit contenir au moins 6 caractères")
    private String password;
}
