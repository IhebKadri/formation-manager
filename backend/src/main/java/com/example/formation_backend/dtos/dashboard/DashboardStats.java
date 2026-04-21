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
    private List<UserRolePartition> userRolePartition;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class UserRolePartition {
        private String role;
        private long count;
    }
}
