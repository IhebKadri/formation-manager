package com.example.formation_backend.dtos.formateur;

import com.example.formation_backend.entities.TypeFormateur;
import lombok.*;
import java.util.UUID;

@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class FormateurResponseDTO {
    private UUID          id;
    private String        nom;
    private String        prenom;
    private String        email;
    private String        tel;
    private TypeFormateur type;
    private UUID          employeurId;
    private String        employeurNom;
}
