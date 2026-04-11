package com.example.formation_backend.controllers;

import com.example.formation_backend.dtos.auth.UserResponse;
import com.example.formation_backend.dtos.users.CreateUser;
import com.example.formation_backend.dtos.users.UpdateUser;
import com.example.formation_backend.services.UserService;
import com.example.formation_backend.utils.ApiResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UsersController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserResponse> getMe(Authentication authentication) {
        UserResponse me = userService.getMe(authentication.getName());

        return ResponseEntity.ok(me);
    }

    // ── GET /api/users ────────────────────────────────────────────
    @GetMapping
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<List<UserResponse>> getAll(Authentication authentication) {
        // 1. Get the full list
        List<UserResponse> allUsers = userService.findAll();

        // 2. Filter out the current admin (yourself)
        // We keep users whose email/username does NOT match the current authentication name
        List<UserResponse> filteredUsers = allUsers.stream()
                .filter(user -> !user.getLogin().equals(authentication.getName()))
                .toList();

        // 3. Return the FILTERED list
        return ResponseEntity.ok(filteredUsers);
    }

    // ── GET /api/users/{id} ───────────────────────────────────────
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<ApiResponse<UserResponse>> getById(@PathVariable UUID id) {
        UserResponse user = userService.findById(id);
        ApiResponse<UserResponse> response = new ApiResponse<>(
                "User retrieved successfully",
                user
        );
        return ResponseEntity.ok(response);
    }

    // ── POST /api/users ───────────────────────────────────────────
    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<UserResponse> create(@Valid @RequestBody CreateUser request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.create(request));
    }

    // ── PUT /api/users/{id} ───────────────────────────────────────
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<ApiResponse<UserResponse>> update(@PathVariable UUID id,
                                                  @Valid @RequestBody UpdateUser request) {

        UserResponse updatedUser = userService.update(id, request);
        ApiResponse<UserResponse> response = new ApiResponse<>(
                "User Updated successfully",
                updatedUser
        );

        return ResponseEntity.ok(response);
    }

    // ── DELETE /api/users/{id} ────────────────────────────────────
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<ApiResponse<UserResponse>> delete(@PathVariable UUID id) {
        UserResponse deletedUser = userService.delete(id);
        ApiResponse<UserResponse> response = new ApiResponse<>(
                "User Deleted successfully",
                deletedUser
        );
        return ResponseEntity.ok(response);

    }
}