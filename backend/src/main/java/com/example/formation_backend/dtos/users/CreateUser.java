package com.example.formation_backend.dtos.users;

import com.example.formation_backend.entities.Role;
import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class CreateUser {

    @NotBlank(message = "Login est obligatoire")
    @Size(min = 3, max = 50, message = "Login doit contenir entre 3 et 50 caractères")
    private String login;

    @NotBlank(message = "Mot de passe est obligatoire")
    @Size(min = 6, message = "Mot de passe doit contenir au moins 6 caractères")
    private String password;

    @NotNull(message = "Rôle est obligatoire")
    private Role.RoleNom role;
}