package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {
    Optional<Role> findByNom(Role.RoleNom nom);
}