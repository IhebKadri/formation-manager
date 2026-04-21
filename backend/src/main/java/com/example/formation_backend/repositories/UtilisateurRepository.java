package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, UUID> {
    Optional<Utilisateur> findByLogin(String login);

    @Query("SELECT u.role.nom, COUNT(u) FROM Utilisateur u GROUP BY u.role.nom")
    List<Object[]> countByRole();
}
