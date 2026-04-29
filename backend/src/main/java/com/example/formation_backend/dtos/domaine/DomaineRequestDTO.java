package com.example.formation_backend.dtos.domaine;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DomaineRequestDTO {

    @NotBlank(message = "Le libellé est obligatoire")
    @Size(min = 2, max = 100, message = "Le libellé doit faire entre 2 et 100 caractères")
    private String libelle;
}
