// services/UserService.java
package com.example.formation_backend.services;

import com.example.formation_backend.dtos.auth.UserResponse;
import com.example.formation_backend.dtos.users.CreateUser;
import com.example.formation_backend.dtos.users.UpdateUser;
import com.example.formation_backend.entities.Role;
import com.example.formation_backend.entities.Utilisateur;
import com.example.formation_backend.exceptions.ResourceNotFoundException;
import com.example.formation_backend.repositories.RoleRepository;
import com.example.formation_backend.repositories.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class UserService {

    private final UtilisateurRepository utilisateurRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    // ── /users/me ────────────────────────────────────────────────
    public UserResponse getMe(String login) {
        Utilisateur user = utilisateurRepository.findByLogin(login)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé"));
        return toDTO(user);
    }

    // ── CRUD ─────────────────────────────────────────────────────
    public List<UserResponse> findAll() {
        return utilisateurRepository.findAll()
                .stream()
                .map(this::toDTO)
                .toList();
    }

    public UserResponse findById(UUID id) {
        return toDTO(utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé : " + id)));
    }

    public UserResponse create(CreateUser request) {
        if (utilisateurRepository.findByLogin(request.getLogin()).isPresent()) {
            throw new IllegalArgumentException("Login déjà utilisé : " + request.getLogin());
        }

        Role role = roleRepository.findByNom(request.getRole())
                .orElseThrow(() -> new ResourceNotFoundException("Rôle non trouvé"));

        Utilisateur user = Utilisateur.builder()
                .login(request.getLogin())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .build();

        return toDTO(utilisateurRepository.save(user));
    }

    public UserResponse update(UUID id, UpdateUser request) {
        Utilisateur user = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé : " + id));

        if (request.getLogin() != null) {
            user.setLogin(request.getLogin());
        }
        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }
        if (request.getRole() != null) {
            Role role = roleRepository.findByNom(request.getRole())
                    .orElseThrow(() -> new ResourceNotFoundException("Rôle non trouvé"));
            user.setRole(role);
        }

        return toDTO(utilisateurRepository.save(user));
    }

    public UserResponse delete(UUID id) {
        Utilisateur userToDelete = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé : " + id));

        utilisateurRepository.delete(userToDelete);
        return toDTO(userToDelete);
    }

    // ── Mapper ───────────────────────────────────────────────────
    private UserResponse toDTO(Utilisateur user) {
        return UserResponse.builder()
                .id(user.getId())
                .login(user.getLogin())
                .role(user.getRole().getNom().name())
                .build();
    }
}