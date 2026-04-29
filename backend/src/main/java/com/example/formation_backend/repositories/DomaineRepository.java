package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Domaine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface DomaineRepository extends JpaRepository<Domaine, UUID> {
    boolean existsByLibelle(String libelle);
    boolean existsByLibelleAndIdNot(String libelle, UUID id);
}
