package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Profil;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface ProfilRepository extends JpaRepository<Profil, UUID> {
    boolean existsByLibelle(String libelle);
    boolean existsByLibelleAndIdNot(String libelle, UUID id);
}
