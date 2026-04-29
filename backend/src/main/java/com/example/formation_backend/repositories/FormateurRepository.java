package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Formateur;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface FormateurRepository extends JpaRepository<Formateur, UUID> {
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, UUID id);
}
