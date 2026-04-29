package com.example.formation_backend.controllers;

import com.example.formation_backend.dtos.employeur.EmployeurRequestDTO;
import com.example.formation_backend.dtos.employeur.EmployeurResponseDTO;
import com.example.formation_backend.services.EmployeurService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/employeurs")
@RequiredArgsConstructor
public class EmployeurController {

    private final EmployeurService employeurService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR','SIMPLE_UTILISATEUR')")
    public ResponseEntity<List<EmployeurResponseDTO>> getAll() {
        return ResponseEntity.ok(employeurService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR','SIMPLE_UTILISATEUR')")
    public ResponseEntity<EmployeurResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(employeurService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<EmployeurResponseDTO> create(
            @Valid @RequestBody EmployeurRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeurService.save(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<EmployeurResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody EmployeurRequestDTO dto) {
        return ResponseEntity.ok(employeurService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        employeurService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException ex) {
        return ResponseEntity.badRequest()
                .body(Map.of("message", ex.getMessage()));
    }
}
