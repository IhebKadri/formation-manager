package com.example.formation_backend.controllers;

import com.example.formation_backend.dtos.profil.ProfilRequestDTO;
import com.example.formation_backend.dtos.profil.ProfilResponseDTO;
import com.example.formation_backend.services.ProfilService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/profils")
@RequiredArgsConstructor
public class ProfilController {

    private final ProfilService profilService;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR','SIMPLE_UTILISATEUR')")
    public ResponseEntity<List<ProfilResponseDTO>> getAll() {
        return ResponseEntity.ok(profilService.findAll());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR','SIMPLE_UTILISATEUR')")
    public ResponseEntity<ProfilResponseDTO> getById(@PathVariable UUID id) {
        return ResponseEntity.ok(profilService.findById(id));
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR')")
    public ResponseEntity<ProfilResponseDTO> create(
            @Valid @RequestBody ProfilRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(profilService.save(dto));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR')")
    public ResponseEntity<ProfilResponseDTO> update(
            @PathVariable UUID id,
            @Valid @RequestBody ProfilRequestDTO dto) {
        return ResponseEntity.ok(profilService.update(id, dto));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMINISTRATEUR')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        profilService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
