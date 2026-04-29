package com.example.formation_backend.dtos.formation;

import jakarta.validation.constraints.*;
import lombok.*;
import java.util.List;
import java.util.UUID;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class FormationRequestDTO {

    @NotBlank(message = "Le titre est obligatoire")
    @Size(min = 2, max = 255)
    private String titre;

    @Min(value = 2000, message = "Année invalide")
    private int annee;

    @Min(value = 1, message = "La durée doit être d'au moins 1 jour")
    private int duree;

    @DecimalMin(value = "0.0", message = "Le budget ne peut pas être négatif")
    private double budget;

    @NotNull(message = "Le domaine est obligatoire")
    private UUID domaineId;

    private UUID formateurId;
    
    private List<UUID> participantIds;
}
