package com.example.formation_backend.dtos.formateur;

import com.example.formation_backend.entities.TypeFormateur;
import jakarta.validation.constraints.*;
import lombok.*;
import java.util.UUID;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class FormateurRequestDTO {

    @NotBlank(message = "Le nom est obligatoire")
    @Size(min = 2, max = 50)
    private String nom;

    @NotBlank(message = "Le prénom est obligatoire")
    @Size(min = 2, max = 50)
    private String prenom;

    @NotBlank(message = "L'email est obligatoire")
    @Email(message = "Format d'email invalide")
    private String email;

    @Pattern(regexp = "^[0-9]{8}$", message = "Téléphone invalide (8 chiffres)")
    private String tel;

    @NotNull(message = "Le type est obligatoire")
    private TypeFormateur type;

    // No @NotNull — validated conditionally in the service
    private UUID employeurId;
}
