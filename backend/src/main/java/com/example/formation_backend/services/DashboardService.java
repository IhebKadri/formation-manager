package com.example.formation_backend.services;

import com.example.formation_backend.dtos.dashboard.DashboardStats;
import com.example.formation_backend.entities.Role;
import com.example.formation_backend.repositories.ParticipantRepository;
import com.example.formation_backend.repositories.ProfilRepository;
import com.example.formation_backend.repositories.StructureRepository;
import com.example.formation_backend.repositories.UtilisateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final UtilisateurRepository utilisateurRepository;
    private final ProfilRepository profilRepository;
    private final StructureRepository structureRepository;
    private final ParticipantRepository participantRepository;

    public DashboardStats getStats() {
        List<Object[]> roleCounts = utilisateurRepository.countByRole();
        
        List<DashboardStats.UserRolePartition> userRolePartition = roleCounts.stream()
                .map(result -> {
                    Role.RoleNom roleNom = (Role.RoleNom) result[0];
                    Long count = (Long) result[1];
                    return new DashboardStats.UserRolePartition(mapRoleName(roleNom), count);
                })
                .collect(Collectors.toList());

        return DashboardStats.builder()
                .totalUsers(utilisateurRepository.count())
                .totalProfils(profilRepository.count())
                .totalStructures(structureRepository.count())
                .totalParticipants(participantRepository.count())
                .userRolePartition(userRolePartition)
                .build();
    }

    private String mapRoleName(Role.RoleNom roleNom) {
        return switch (roleNom) {
            case ADMINISTRATEUR -> "admin";
            case SIMPLE_UTILISATEUR -> "simple_utilisateur";
            case RESPONSABLE -> "responsable";
        };
    }
}
