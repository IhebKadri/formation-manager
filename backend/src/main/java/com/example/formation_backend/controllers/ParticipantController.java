package com.example.formation_backend.controllers;

import com.example.formation_backend.dtos.participants.CreateParticipant;
import com.example.formation_backend.dtos.participants.ParticipantResponse;
import com.example.formation_backend.dtos.participants.UpdateParticipant;
import com.example.formation_backend.services.ParticipantService;
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
@RequestMapping("/api/participants")
@RequiredArgsConstructor
public class ParticipantController {

    private final ParticipantService participantService;


    @GetMapping
    @PreAuthorize("hasAnyRole('SIMPLE_UTILISATEUR', 'ADMINISTRATEUR')")
    public ResponseEntity<List<ParticipantResponse>> getAll() {
        List<ParticipantResponse> participants = participantService.findAll();
        return ResponseEntity.ok( participants);
    }

    
    @GetMapping("/search")
    @PreAuthorize("hasAnyRole('SIMPLE_UTILISATEUR', 'ADMINISTRATEUR')")
    public ResponseEntity<List<ParticipantResponse>> search(@RequestParam String keyword) {
        List<ParticipantResponse> participants = participantService.search(keyword);
        return ResponseEntity.ok(participants);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('SIMPLE_UTILISATEUR', 'ADMINISTRATEUR')")
    public ResponseEntity<ParticipantResponse> getById(@PathVariable UUID id) {
        ParticipantResponse participant = participantService.findById(id);
        return ResponseEntity.ok(participant);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('SIMPLE_UTILISATEUR', 'ADMINISTRATEUR')")
    public ResponseEntity<ParticipantResponse> create(
            @Valid @RequestBody CreateParticipant request) {
        ParticipantResponse participant = participantService.create(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(participant);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('SIMPLE_UTILISATEUR', 'ADMINISTRATEUR')")
    public ResponseEntity<ParticipantResponse> update(
            @PathVariable UUID id,
            @Valid @RequestBody UpdateParticipant request) {
        ParticipantResponse participant = participantService.update(id, request);
        return ResponseEntity.ok(participant);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAnyRole('SIMPLE_UTILISATEUR', 'ADMINISTRATEUR')")
    public ResponseEntity<Void> delete(@PathVariable UUID id) {
        participantService.deleteById(id);
        return ResponseEntity.ok( null);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, String>> handleError(RuntimeException ex) {
        return ResponseEntity.badRequest()
                .body(Map.of("message", ex.getMessage()));
    }
}
