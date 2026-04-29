package com.example.formation_backend.controllers;

import com.example.formation_backend.dtos.formateur.FormateurRequestDTO;
import com.example.formation_backend.dtos.formateur.FormateurResponseDTO;
import com.example.formation_backend.services.FormateurService;
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
@RequestMapping("/api/formateurs")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('ADMINISTRATEUR','SIMPLE_UTILISATEUR')")
public class FormateurController {

    private final FormateurService formateurService;

    @GetMapping
    public ResponseEntity<List<FormateurResponseDTO>> getAll() {
        return ResponseEntity.ok(formateurService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<FormateurResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(formateurService.findById(id));
    }

    @PostMapping
    public ResponseEntity<FormateurResponseDTO> create(
            @Valid @RequestBody FormateurRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(formateurService.save(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<FormateurResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody FormateurRequestDTO dto) {
        return ResponseEntity.ok(formateurService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        formateurService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException ex) {
        return ResponseEntity.badRequest()
                .body(Map.of("message", ex.getMessage()));
    }
}
