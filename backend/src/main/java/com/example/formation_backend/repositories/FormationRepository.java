package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import java.util.List;
import java.util.UUID;

public interface FormationRepository extends JpaRepository<Formation, UUID> {
    @Query("SELECT DISTINCT f FROM Formation f LEFT JOIN FETCH f.participants LEFT JOIN FETCH f.domaine LEFT JOIN FETCH f.formateur")
    List<Formation> findAllWithParticipants();

    @Query("SELECT f FROM Formation f LEFT JOIN FETCH f.participants LEFT JOIN FETCH f.domaine LEFT JOIN FETCH f.formateur WHERE f.id = :id")
    java.util.Optional<Formation> findByIdWithDetails(UUID id);

    @Query("SELECT f.annee, COUNT(f), SUM(f.budget) FROM Formation f GROUP BY f.annee ORDER BY f.annee")
    List<Object[]> countFormationsByYear();

    @Query("SELECT f.domaine.libelle, COUNT(f) FROM Formation f GROUP BY f.domaine.libelle")
    List<Object[]> countFormationsByDomaine();

    @Query("SELECT f.annee, f.domaine.libelle, COUNT(f) FROM Formation f GROUP BY f.annee, f.domaine.libelle ORDER BY f.annee, f.domaine.libelle")
    List<Object[]> countFormationsByYearAndDomaine();
}
