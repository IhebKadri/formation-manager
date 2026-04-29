package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Employeur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface EmployeurRepository extends JpaRepository<Employeur, UUID> {
    boolean existsByNom(String nom);
    boolean existsByNomAndIdNot(String nom, UUID id);
}
