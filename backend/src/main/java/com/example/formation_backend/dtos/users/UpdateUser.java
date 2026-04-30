package com.example.formation_backend.dtos.users;

import com.example.formation_backend.entities.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class UpdateUser {

    @Size(min = 3, max = 50, message = "Le nom d'utilisateur doit contenir entre 3 et 50 caractères")
    private String login;

    @Email(message = "L'adresse email doit être valide")
    private String email;

    private Role.RoleNom role;
}