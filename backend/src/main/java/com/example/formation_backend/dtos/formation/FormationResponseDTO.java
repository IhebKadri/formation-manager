package com.example.formation_backend.dtos.formation;

import lombok.*;
import java.util.UUID;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class FormationResponseDTO {
    private UUID   id;
    private String titre;
    private int    annee;
    private int    duree;
    private double budget;
    
    // Flattened Domaine info
    private UUID   domaineId;
    private String domaineLibelle;
    
    // Flattened Formateur info
    private UUID   formateurId;
    private String formateurNomComplet; // "Prenom Nom"
}
