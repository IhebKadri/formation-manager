package com.example.formation_backend.utils;

import com.example.formation_backend.entities.Role;
import com.example.formation_backend.entities.Utilisateur;
import com.example.formation_backend.repositories.RoleRepository;
import com.example.formation_backend.repositories.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        String username = "fedy_admin";
        String password = "fedy12356";
        String email = "green.building.training@gmail.com";

        // 1. Create roles if they don't exist
        for (Role.RoleNom roleName : Role.RoleNom.values()) {
            if (roleRepository.findByNom(roleName).isEmpty()) {
                roleRepository.save(Role.builder().nom(roleName).build());
                System.out.println("✅ Role created: " + roleName);
            }
        }

        // 2. Seed a simple user if it doesn't exist
        if (utilisateurRepository.findByLogin(username).isEmpty()) {
            Role role = roleRepository.findByNom(Role.RoleNom.ADMINISTRATEUR)
                    .orElseThrow(() -> new RuntimeException("Role not found"));

            Utilisateur user = Utilisateur.builder()
                    .login(username)
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .role(role)
                    .build();

            utilisateurRepository.save(user);
            System.out.println("✅ Admin user seeded — login: " + username + " / email: " + email + " / password: " + password);
        }
    }
}