package com.example.formation_backend.dtos.participants;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.UUID;

@Data
public class CreateParticipant {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50)
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50)
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;

    @NotBlank(message = "Le téléphone est obligatoire")
    private String tel;

    @NotNull(message = "La structure est obligatoire")
    private UUID structureId;

    @NotNull(message = "Le profil est obligatoire")
    private UUID profilId;
}
