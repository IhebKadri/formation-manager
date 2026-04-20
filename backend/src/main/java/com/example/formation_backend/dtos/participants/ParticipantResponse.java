package com.example.formation_backend.dtos.participants;

import com.example.formation_backend.entities.Profil;
import com.example.formation_backend.entities.Structure;
import lombok.Builder;
import lombok.Data;
import java.util.UUID;

@Data
@Builder
public class ParticipantResponse {
    private UUID id;
    private String nom;
    private String prenom;
    private String email;
    private String tel;
    private Structure structure;
    private Profil profil;
}
