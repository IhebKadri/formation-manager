package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Structure;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface StructureRepository extends JpaRepository<Structure, UUID> {
    boolean existsByLibelle(String libelle);
    boolean existsByLibelleAndIdNot(String libelle, UUID id);
}
