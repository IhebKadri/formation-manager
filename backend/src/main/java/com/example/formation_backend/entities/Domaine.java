package com.example.formation_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "domaines")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Domaine {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String libelle;
}
