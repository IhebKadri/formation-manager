package com.example.formation_backend.controllers;

import com.example.formation_backend.dtos.auth.AuthRequest;
import com.example.formation_backend.dtos.auth.AuthResponse;
import com.example.formation_backend.dtos.auth.RefreshRequest;
import com.example.formation_backend.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody RefreshRequest request) {
        return ResponseEntity.ok(authService.refreshToken(request));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            authService.logout(auth.getName());
            return ResponseEntity.ok("Déconnexion réussie");
        }
        return ResponseEntity.badRequest().body("Utilisateur non authentifié");
    }
}
