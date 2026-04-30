package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Participant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ParticipantRepository extends JpaRepository<Participant, UUID> {

    boolean existsByEmail(String email);
    boolean existsByEmailAndIdNot(String email, UUID id);
    List<Participant> findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(
        String nom, String prenom);
    boolean existsByStructureId(UUID structureId);
    boolean existsByProfilId(UUID profilId);

    @Query("SELECT p.structure.libelle, COUNT(p) FROM Participant p GROUP BY p.structure.libelle")
    List<Object[]> countParticipantsByStructure();
}
