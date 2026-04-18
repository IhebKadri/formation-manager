package com.example.formation_backend.controllers;

import com.example.formation_backend.dtos.structure.StructureRequestDTO;
import com.example.formation_backend.dtos.structure.StructureResponseDTO;
import com.example.formation_backend.services.StructureService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/structures")
@RequiredArgsConstructor
public class StructureController {

    private final StructureService structureService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR','RESPONSABLE','SIMPLE_UTILISATEUR')")
    public ResponseEntity<List<StructureResponseDTO>> getAll() {
        return ResponseEntity.ok(structureService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR','RESPONSABLE','SIMPLE_UTILISATEUR')")
    public ResponseEntity<StructureResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(structureService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<StructureResponseDTO> create(
            @Valid @RequestBody StructureRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(structureService.save(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<StructureResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody StructureRequestDTO dto) {
        return ResponseEntity.ok(structureService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMINISTRATEUR')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        structureService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
