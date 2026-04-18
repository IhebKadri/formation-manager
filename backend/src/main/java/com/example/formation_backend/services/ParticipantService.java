package com.example.formation_backend.services;

import com.example.formation_backend.dtos.participants.CreateParticipant;
import com.example.formation_backend.dtos.participants.ParticipantResponse;
import com.example.formation_backend.dtos.participants.UpdateParticipant;
import com.example.formation_backend.entities.Participant;
import com.example.formation_backend.entities.Profil;
import com.example.formation_backend.entities.Structure;
import com.example.formation_backend.repositories.ParticipantRepository;
import com.example.formation_backend.repositories.ProfilRepository;
import com.example.formation_backend.repositories.StructureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ParticipantService {

    private final ParticipantRepository participantRepository;
    private final StructureRepository structureRepository;
    private final ProfilRepository profilRepository;

    public List<ParticipantResponse> findAll() {
        return participantRepository.findAll().stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public ParticipantResponse findById(UUID id) {
        return participantRepository.findById(id)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Participant not found: " + id));
    }

    public List<ParticipantResponse> search(String keyword) {
        return participantRepository
                .findByNomContainingIgnoreCaseOrPrenomContainingIgnoreCase(keyword, keyword)
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public ParticipantResponse create(CreateParticipant request) {
        if (participantRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email déjà utilisé");
        }

        Structure structure = structureRepository.findById(request.getStructureId())
                .orElseThrow(() -> new RuntimeException("Structure non trouvée"));

        Profil profil = profilRepository.findById(request.getProfilId())
                .orElseThrow(() -> new RuntimeException("Profil non trouvé"));

        Participant participant = Participant.builder()
                .nom(request.getNom())
                .prenom(request.getPrenom())
                .email(request.getEmail())
                .tel(request.getTel())
                .structure(structure)
                .profil(profil)
                .build();

        return toResponseDTO(participantRepository.save(participant));
    }

    public ParticipantResponse update(UUID id, UpdateParticipant request) {
        Participant p = participantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Participant not found: " + id));

        if (request.getEmail() != null && !request.getEmail().equals(p.getEmail())) {
            if (participantRepository.existsByEmail(request.getEmail())) {
                throw new RuntimeException("Email déjà utilisé");
            }
            p.setEmail(request.getEmail());
        }

        if (request.getNom() != null) p.setNom(request.getNom());
        if (request.getPrenom() != null) p.setPrenom(request.getPrenom());
        if (request.getTel() != null) p.setTel(request.getTel());

        if (request.getStructureId() != null) {
            Structure structure = structureRepository.findById(request.getStructureId())
                    .orElseThrow(() -> new RuntimeException("Structure non trouvée"));
            p.setStructure(structure);
        }

        if (request.getProfilId() != null) {
            Profil profil = profilRepository.findById(request.getProfilId())
                    .orElseThrow(() -> new RuntimeException("Profil non trouvé"));
            p.setProfil(profil);
        }

        return toResponseDTO(participantRepository.save(p));
    }

    public void deleteById(UUID id) {
        if (!participantRepository.existsById(id)) {
            throw new RuntimeException("Participant not found: " + id);
        }
        participantRepository.deleteById(id);
    }

    private ParticipantResponse toResponseDTO(Participant p) {
        return ParticipantResponse.builder()
                .id(p.getId())
                .nom(p.getNom())
                .prenom(p.getPrenom())
                .email(p.getEmail())
                .tel(p.getTel())
                .structure(p.getStructure())
                .profil(p.getProfil())
                .build();
    }
}
