package com.example.formation_backend.dtos.structure;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StructureRequestDTO {

    @NotBlank(message = "Le libellé de la structure est obligatoire")
    @Size(min = 2, max = 100, message = "Le libellé doit faire entre 2 et 100 caractères")
    private String libelle;
}
