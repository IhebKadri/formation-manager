package com.example.formation_backend.dtos.profil;

import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProfilResponseDTO {

    private UUID id;
    private String libelle;
}
