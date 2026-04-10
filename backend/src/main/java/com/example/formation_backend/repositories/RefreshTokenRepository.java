package com.example.formation_backend.repositories;

import com.example.formation_backend.entities.RefreshToken;
import com.example.formation_backend.entities.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {
    Optional<RefreshToken> findByToken(String token);
    Optional<RefreshToken> findByUtilisateur(Utilisateur utilisateur);
    
    @Modifying
    void deleteByUtilisateur(Utilisateur utilisateur);
}
