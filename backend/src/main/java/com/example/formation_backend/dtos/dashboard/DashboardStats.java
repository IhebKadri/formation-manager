package com.example.formation_backend.dtos.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStats {
    private long totalUsers;
    private long totalProfils;
    private long totalStructures;
    private long totalParticipants;
    private long totalFormations;
    private long totalFormateurs;
    private long totalDomaines;
    private long totalEmployeurs;

    private List<UserRolePartition> userRolePartition;
    private List<FormationYearStats> formationsByYear;
    private List<DomaineStats> formationsByDomaine;
    private List<StructureStats> participantsByStructure;
    private List<FormateurTypeStats> formateursByType;
    private List<DomaineYearStats> formationsByDomaineAndYear;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class UserRolePartition {
        private String role;
        private long count;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class FormationYearStats {
        private int year;
        private long count;
        private double budget;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DomaineStats {
        private String domaine;
        private long count;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class StructureStats {
        private String structure;
        private long count;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class FormateurTypeStats {
        private String type;
        private long count;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class DomaineYearStats {
        private int year;
        private String domaine;
        private long count;
    }
}
