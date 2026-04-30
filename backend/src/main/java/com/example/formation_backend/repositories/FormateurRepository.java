package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Formateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.UUID;

public interface FormateurRepository extends JpaRepository<Formateur, UUID> {
    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, UUID id);

    @Query("SELECT f.type, COUNT(f) FROM Formateur f GROUP BY f.type")
    List<Object[]> countFormateursByType();
}
