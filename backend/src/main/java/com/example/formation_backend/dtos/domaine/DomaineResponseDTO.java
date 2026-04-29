package com.example.formation_backend.dtos.domaine;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DomaineResponseDTO {

    private UUID id;
    private String libelle;
}
