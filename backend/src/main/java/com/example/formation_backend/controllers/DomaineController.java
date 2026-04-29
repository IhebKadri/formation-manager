package com.example.formation_backend.controllers;

import com.example.formation_backend.dtos.domaine.DomaineRequestDTO;
import com.example.formation_backend.dtos.domaine.DomaineResponseDTO;
import com.example.formation_backend.services.DomaineService;
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
@RequestMapping("/api/domaines")
@RequiredArgsConstructor
public class DomaineController {

    private final DomaineService domaineService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR','SIMPLE_UTILISATEUR')")
    public ResponseEntity<List<DomaineResponseDTO>> getAll() {
        return ResponseEntity.ok(domaineService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR','SIMPLE_UTILISATEUR')")
    public ResponseEntity<DomaineResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(domaineService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<DomaineResponseDTO> create(
            @Valid @RequestBody DomaineRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(domaineService.save(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<DomaineResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody DomaineRequestDTO dto) {
        return ResponseEntity.ok(domaineService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        domaineService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException ex) {
        return ResponseEntity.badRequest()
                .body(Map.of("message", ex.getMessage()));
    }
}
