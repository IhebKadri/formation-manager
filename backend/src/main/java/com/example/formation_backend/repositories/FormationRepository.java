package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Formation;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface FormationRepository extends JpaRepository<Formation, UUID> {
}
