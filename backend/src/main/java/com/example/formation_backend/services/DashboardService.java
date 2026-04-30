package com.example.formation_backend.services;

import com.example.formation_backend.dtos.dashboard.DashboardStats;
import com.example.formation_backend.entities.Role;
import com.example.formation_backend.repositories.ParticipantRepository;
import com.example.formation_backend.repositories.ProfilRepository;
import com.example.formation_backend.repositories.StructureRepository;
import com.example.formation_backend.repositories.UtilisateurRepository;
import com.example.formation_backend.repositories.FormationRepository;
import com.example.formation_backend.repositories.FormateurRepository;
import com.example.formation_backend.repositories.DomaineRepository;
import com.example.formation_backend.repositories.EmployeurRepository;
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
    private final FormationRepository formationRepository;
    private final FormateurRepository formateurRepository;
    private final DomaineRepository domaineRepository;
    private final EmployeurRepository employeurRepository;

    public DashboardStats getStats() {
        List<Object[]> roleCounts = utilisateurRepository.countByRole();
        
        List<DashboardStats.UserRolePartition> userRolePartition = roleCounts.stream()
                .map(result -> {
                    Role.RoleNom roleNom = (Role.RoleNom) result[0];
                    Long count = (Long) result[1];
                    return new DashboardStats.UserRolePartition(mapRoleName(roleNom), count);
                })
                .collect(Collectors.toList());

        List<DashboardStats.FormationYearStats> formationsByYear = formationRepository.countFormationsByYear().stream()
                .map(result -> new DashboardStats.FormationYearStats((Integer) result[0], (Long) result[1], (Double) result[2]))
                .collect(Collectors.toList());

        List<DashboardStats.DomaineStats> formationsByDomaine = formationRepository.countFormationsByDomaine().stream()
                .map(result -> new DashboardStats.DomaineStats((String) result[0], (Long) result[1]))
                .collect(Collectors.toList());

        List<DashboardStats.StructureStats> participantsByStructure = participantRepository.countParticipantsByStructure().stream()
                .map(result -> new DashboardStats.StructureStats((String) result[0], (Long) result[1]))
                .collect(Collectors.toList());

        List<DashboardStats.FormateurTypeStats> formateursByType = formateurRepository.countFormateursByType().stream()
                .map(result -> new DashboardStats.FormateurTypeStats(result[0].toString(), (Long) result[1]))
                .collect(Collectors.toList());

        List<DashboardStats.DomaineYearStats> formationsByDomaineAndYear = formationRepository.countFormationsByYearAndDomaine().stream()
                .map(result -> new DashboardStats.DomaineYearStats((Integer) result[0], (String) result[1], (Long) result[2]))
                .collect(Collectors.toList());

        return DashboardStats.builder()
                .totalUsers(utilisateurRepository.count())
                .totalProfils(profilRepository.count())
                .totalStructures(structureRepository.count())
                .totalParticipants(participantRepository.count())
                .totalFormations(formationRepository.count())
                .totalFormateurs(formateurRepository.count())
                .totalDomaines(domaineRepository.count())
                .totalEmployeurs(employeurRepository.count())
                .userRolePartition(userRolePartition)
                .formationsByYear(formationsByYear)
                .formationsByDomaine(formationsByDomaine)
                .participantsByStructure(participantsByStructure)
                .formateursByType(formateursByType)
                .formationsByDomaineAndYear(formationsByDomaineAndYear)
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
