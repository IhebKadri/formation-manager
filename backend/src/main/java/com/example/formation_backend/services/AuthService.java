package com.example.formation_backend.services;

import com.example.formation_backend.dtos.auth.AuthRequest;
import com.example.formation_backend.dtos.auth.AuthResponse;
import com.example.formation_backend.dtos.auth.RefreshRequest;
import com.example.formation_backend.dtos.auth.UserResponse;
import com.example.formation_backend.entities.RefreshToken;
import com.example.formation_backend.entities.Utilisateur;
import com.example.formation_backend.repositories.RefreshTokenRepository;
import com.example.formation_backend.repositories.UtilisateurRepository;
import com.example.formation_backend.exceptions.ResourceNotFoundException;
import com.example.formation_backend.exceptions.TokenRefreshException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final UtilisateurRepository utilisateurRepository;
    private final RefreshTokenRepository refreshTokenRepository;

    public AuthResponse login(AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getLogin(),
                        request.getPassword()
                )
        );

        Utilisateur user = utilisateurRepository.findByLogin(request.getLogin())
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));

        String accessToken = jwtService.generateAccessToken(user);
        RefreshToken refreshToken = refreshTokenService.createRefreshToken(user.getLogin());
        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .login(user.getLogin())
                .role(user.getRole().getNom().name())
                .build();
        return AuthResponse.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken.getToken())
                .user(userResponse)
                .build();
    }

    public AuthResponse refreshToken(RefreshRequest request) {
        return refreshTokenRepository.findByToken(request.getRefreshToken())
                .map(refreshTokenService::verifyExpiration)
                .map(RefreshToken::getUtilisateur)
                .map(user -> {
                    UserResponse userResponse = UserResponse.builder()
                            .id(user.getId())
                            .login(user.getLogin())
                            .role(user.getRole().getNom().name())
                            .build();
                    String accessToken = jwtService.generateAccessToken(user);
                    return AuthResponse.builder()
                            .accessToken(accessToken)
                            .refreshToken(request.getRefreshToken())
                            .user(userResponse)
                            .build();
                })
                .orElseThrow(() -> new TokenRefreshException("Refresh token non trouvé dans la base de données"));
    }

    @Transactional
    public void logout(String login) {
        refreshTokenService.deleteByLogin(login);
    }
}
