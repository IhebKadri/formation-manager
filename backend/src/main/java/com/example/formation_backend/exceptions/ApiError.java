package com.example.formation_backend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ApiError {
    private LocalDateTime timestamp;
    private int status;
    private ErrorDetail error;
    private String path;
    private Map<String, String> validationErrors;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class ErrorDetail {
        private String message;
    }

    // Helper to create easily
    public static ApiError of(int status, String message, String path) {
        return ApiError.builder()
                .timestamp(LocalDateTime.now())
                .status(status)
                .error(new ErrorDetail(message))
                .path(path)
                .build();
    }
}
