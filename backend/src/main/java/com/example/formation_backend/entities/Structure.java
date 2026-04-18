package com.example.formation_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "structure")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Structure {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(nullable = false)
    private String libelle;
}
