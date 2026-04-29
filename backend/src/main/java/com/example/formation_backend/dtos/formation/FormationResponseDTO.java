package com.example.formation_backend.dtos.formation;

import com.example.formation_backend.dtos.domaine.DomaineResponseDTO;
import com.example.formation_backend.dtos.formateur.FormateurResponseDTO;
import com.example.formation_backend.dtos.participants.ParticipantResponse;
import lombok.*;
import java.util.List;
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
    
    private DomaineResponseDTO domaine;
    private FormateurResponseDTO formateur;

    private List<ParticipantResponse> participants;
}
