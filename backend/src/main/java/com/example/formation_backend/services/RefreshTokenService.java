package com.example.formation_backend.services;

import com.example.formation_backend.entities.RefreshToken;
import com.example.formation_backend.entities.Utilisateur;
import com.example.formation_backend.repositories.RefreshTokenRepository;
import com.example.formation_backend.repositories.UtilisateurRepository;
import com.example.formation_backend.exceptions.ResourceNotFoundException;
import com.example.formation_backend.exceptions.TokenRefreshException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.SecureRandom;
import java.time.Instant;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {

    @Value("${app.jwt.refresh-token-expiration}")
    private long refreshTokenDurationMs;

    private final RefreshTokenRepository refreshTokenRepository;
    private final UtilisateurRepository utilisateurRepository;

    private String generateRefreshToken() {
        SecureRandom random = new SecureRandom();
        byte[] bytes = new byte[64];
        random.nextBytes(bytes);
        StringBuilder hex = new StringBuilder();
        for (byte b : bytes) {
            hex.append(String.format("%02x", b));
        }
        return hex.toString();
    }

    public RefreshToken createRefreshToken(String login) {
        Utilisateur utilisateur = utilisateurRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé avec le login: " + login));

        // Suppression de l'ancien token s'il existe
        refreshTokenRepository.findByUtilisateur(utilisateur)
                .ifPresent(refreshTokenRepository::delete);

        RefreshToken refreshToken = RefreshToken.builder()
                .utilisateur(utilisateur)
                .expiryDate(Instant.now().plusMillis(refreshTokenDurationMs))
                .token(this.generateRefreshToken())
                .build();

        return refreshTokenRepository.save(refreshToken);
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.isExpired()) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException("Le refresh token a expiré. Veuillez vous reconnecter.");
        }
        return token;
    }

    @Transactional
    public void deleteByLogin(String login) {
        Utilisateur utilisateur = utilisateurRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
        refreshTokenRepository.deleteByUtilisateur(utilisateur);
    }
}
