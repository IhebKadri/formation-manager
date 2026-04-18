package com.example.formation_backend.dtos.structure;

import lombok.*;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StructureResponseDTO {

    private UUID id;
    private String libelle;
}
