package com.example.formation_backend.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "roles")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private RoleNom nom;

    public enum RoleNom {
        SIMPLE_UTILISATEUR,
        RESPONSABLE,
        ADMINISTRATEUR
    }
}
