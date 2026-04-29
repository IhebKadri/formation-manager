package com.example.formation_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "employeurs")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Employeur {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false, unique = true)
    private String nom;
}
