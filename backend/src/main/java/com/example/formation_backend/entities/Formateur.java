package com.example.formation_backend.entities;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "formateur")
@Data 
@NoArgsConstructor 
@AllArgsConstructor 
@Builder
public class Formateur {

    @Id 
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false, unique = true)
    private String email;

    @Column
    private String tel;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TypeFormateur type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employeur_id", nullable = true)
    private Employeur employeur;
}
