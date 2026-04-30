package com.example.formation_backend.controllers;

import com.example.formation_backend.dtos.formation.FormationRequestDTO;
import com.example.formation_backend.dtos.formation.FormationResponseDTO;
import com.example.formation_backend.services.FormationService;
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
@RequestMapping("/api/formations")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMINISTRATEUR','SIMPLE_UTILISATEUR')")
public class FormationController {

    private final FormationService formationService;

    @GetMapping
    public ResponseEntity<List<FormationResponseDTO>> getAll() {
        return ResponseEntity.ok(formationService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormationResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(formationService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<FormationResponseDTO> create(
            @Valid @RequestBody FormationRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(formationService.save(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<FormationResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody FormationRequestDTO dto) {
        return ResponseEntity.ok(formationService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        formationService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException ex) {
        return ResponseEntity.badRequest()
                .body(Map.of("message", ex.getMessage()));
    }
}
