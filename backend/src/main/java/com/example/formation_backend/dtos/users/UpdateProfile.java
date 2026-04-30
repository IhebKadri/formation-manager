package com.example.formation_backend.dtos.users;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UpdateProfile {

    @Size(min = 3, max = 50, message = "Le nom d'utilisateur doit contenir entre 3 et 50 caractères")
    private String login;

    @Email(message = "L'adresse email doit être valide")
    private String email;

    @Size(min = 6, message = "Le mot de passe doit contenir au moins 6 caractères")
    private String password;
}
