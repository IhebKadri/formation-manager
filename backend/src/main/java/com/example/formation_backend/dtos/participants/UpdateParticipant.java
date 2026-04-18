package com.example.formation_backend.dtos.participants;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.util.UUID;

@Data
public class UpdateParticipant {

    @Size(min = 2, max = 50)
    private String nom;

    @Size(min = 2, max = 50)
    private String prenom;

    @Email(message = "Format d'email invalide")
    private String email;

    private String tel;

    private UUID structureId;

    private UUID profilId;
}
