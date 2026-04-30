// services/UserService.java
package com.example.formation_backend.services;

import com.example.formation_backend.dtos.auth.UserResponse;
import com.example.formation_backend.dtos.users.CreateUser;
import com.example.formation_backend.dtos.users.UpdateProfile;
import com.example.formation_backend.dtos.users.UpdateUser;
import com.example.formation_backend.entities.Role;
import com.example.formation_backend.entities.Utilisateur;
import com.example.formation_backend.exceptions.ResourceNotFoundException;
import com.example.formation_backend.repositories.RoleRepository;
import com.example.formation_backend.repositories.UtilisateurRepository;
import com.example.formation_backend.utils.PasswordUtils;
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
@lombok.extern.slf4j.Slf4j
public class UserService {

    private final UtilisateurRepository utilisateurRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

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
        if (utilisateurRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new IllegalArgumentException("Email déjà utilisé : " + request.getEmail());
        }

        Role role = roleRepository.findByNom(request.getRole())
                .orElseThrow(() -> new ResourceNotFoundException("Rôle non trouvé"));

        String plainPassword = PasswordUtils.generateRandomPassword();

        Utilisateur user = Utilisateur.builder()
                .login(request.getLogin())
                .email(request.getEmail())
                .password(passwordEncoder.encode(plainPassword))
                .role(role)
                .build();

        Utilisateur savedUser = utilisateurRepository.save(user);

        // Envoi de l'email (échec gracieux)
        emailService.sendPasswordEmail(savedUser.getEmail(), savedUser.getLogin(), plainPassword);

        return toDTO(savedUser);
    }

    public UserResponse update(UUID id, UpdateUser request) {
        log.info("Updating user with ID: {}. New role: {}", id, request.getRole());

        Utilisateur user = utilisateurRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé : " + id));

        if (request.getRole() != null) {
            Role role = roleRepository.findByNom(request.getRole())
                    .orElseThrow(() -> new ResourceNotFoundException("Rôle non trouvé"));
            user.setRole(role);
        }

        Utilisateur savedUser = utilisateurRepository.save(user);
        log.info("User {} role updated successfully to: {}", id, savedUser.getRole().getNom());
        return toDTO(savedUser);
    }

    public UserResponse updateMe(String currentLogin, UpdateProfile request) {
        Utilisateur user = utilisateurRepository.findByLogin(currentLogin)
                .orElseThrow(() -> new ResourceNotFoundException("Utilisateur non trouvé : " + currentLogin));

        if (request.getLogin() != null && !request.getLogin().isBlank() && !request.getLogin().equals(user.getLogin())) {
            if (utilisateurRepository.findByLogin(request.getLogin()).isPresent()) {
                throw new IllegalArgumentException("Ce nom d'utilisateur est déjà utilisé");
            }
            user.setLogin(request.getLogin());
        }

        if (request.getEmail() != null && !request.getEmail().isBlank() && !request.getEmail().equals(user.getEmail())) {
            if (utilisateurRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new IllegalArgumentException("Cette adresse email est déjà utilisée");
            }
            user.setEmail(request.getEmail());
        }

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
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
                .email(user.getEmail())
                .role(user.getRole().getNom().name())
                .build();
    }
}