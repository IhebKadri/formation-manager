package com.example.formation_backend.services;

import com.example.formation_backend.dtos.domaine.DomaineResponseDTO;
import com.example.formation_backend.dtos.formateur.FormateurResponseDTO;
import com.example.formation_backend.dtos.formation.FormationRequestDTO;
import com.example.formation_backend.dtos.formation.FormationResponseDTO;
import com.example.formation_backend.dtos.participants.ParticipantResponse;
import com.example.formation_backend.entities.Domaine;
import com.example.formation_backend.entities.Formateur;
import com.example.formation_backend.entities.Formation;
import com.example.formation_backend.entities.Participant;
import com.example.formation_backend.repositories.DomaineRepository;
import com.example.formation_backend.repositories.FormateurRepository;
import com.example.formation_backend.repositories.FormationRepository;
import com.example.formation_backend.repositories.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FormationService {

    private final FormationRepository formationRepository;
    private final DomaineRepository domaineRepository;
    private final FormateurRepository formateurRepository;
    private final ParticipantRepository participantRepository;

    @Transactional(readOnly = true)
    public List<FormationResponseDTO> findAll() {
        return formationRepository.findAllWithParticipants()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public FormationResponseDTO findById(UUID id) {
        return toResponseDTO(getOrThrow(id));
    }

    @Transactional
    public FormationResponseDTO save(FormationRequestDTO dto) {
        Formation formation = toEntity(dto);
        Formation saved = formationRepository.save(formation);
        // Flush to ensure relationship is persisted before mapping back
        formationRepository.flush();
        return toResponseDTO(saved);
    }

    @Transactional
    public FormationResponseDTO update(UUID id, FormationRequestDTO dto) {
        Formation existing = getOrThrow(id);
        Domaine domaine = domaineRepository.findById(dto.getDomaineId())
                .orElseThrow(() -> new RuntimeException("Domaine non trouvé"));

        Formateur formateur = null;
        if (dto.getFormateurId() != null) {
            formateur = formateurRepository.findById(dto.getFormateurId())
                    .orElseThrow(() -> new RuntimeException("Formateur non trouvé"));
        }

        existing.setTitre(dto.getTitre().trim());
        existing.setAnnee(dto.getAnnee());
        existing.setDuree(dto.getDuree());
        existing.setBudget(dto.getBudget());
        existing.setDomaine(domaine);
        existing.setFormateur(formateur);

        // Update Participants
        if (dto.getParticipantIds() != null && !dto.getParticipantIds().isEmpty()) {
            List<Participant> participants = participantRepository.findAllById(dto.getParticipantIds());
            existing.setParticipants(new ArrayList<>(participants));
        } else {
            existing.getParticipants().clear();
        }

        Formation updated = formationRepository.save(existing);
        formationRepository.flush();
        return toResponseDTO(updated);
    }

    @Transactional
    public void delete(UUID id) {
        if (!formationRepository.existsById(id)) {
            throw new RuntimeException("Formation non trouvée");
        }
        formationRepository.deleteById(id);
    }

    // ── Private helpers ──────────────────────────────────────────

    private Formation getOrThrow(UUID id) {
        return formationRepository.findByIdWithDetails(id)
                .orElseThrow(() -> new RuntimeException("Formation non trouvée"));
    }

    private Formation toEntity(FormationRequestDTO dto) {
        Domaine domaine = domaineRepository.findById(dto.getDomaineId())
                .orElseThrow(() -> new RuntimeException("Domaine non trouvé"));

        Formateur formateur = null;
        if (dto.getFormateurId() != null) {
            formateur = formateurRepository.findById(dto.getFormateurId())
                    .orElseThrow(() -> new RuntimeException("Formateur non trouvé"));
        }

        Formation formation = Formation.builder()
                .titre(dto.getTitre().trim())
                .annee(dto.getAnnee())
                .duree(dto.getDuree())
                .budget(dto.getBudget())
                .domaine(domaine)
                .formateur(formateur)
                .participants(new ArrayList<>())
                .build();

        if (dto.getParticipantIds() != null && !dto.getParticipantIds().isEmpty()) {
            List<Participant> participants = participantRepository.findAllById(dto.getParticipantIds());
            formation.setParticipants(new ArrayList<>(participants));
        }

        return formation;
    }

    private FormationResponseDTO toResponseDTO(Formation f) {
        return FormationResponseDTO.builder()
                .id(f.getId())
                .titre(f.getTitre())
                .annee(f.getAnnee())
                .duree(f.getDuree())
                .budget(f.getBudget())
                .domaine(DomaineResponseDTO.builder()
                        .id(f.getDomaine().getId())
                        .libelle(f.getDomaine().getLibelle())
                        .build())
                .formateur(f.getFormateur() != null ? FormateurResponseDTO.builder()
                        .id(f.getFormateur().getId())
                        .nom(f.getFormateur().getNom())
                        .prenom(f.getFormateur().getPrenom())
                        .email(f.getFormateur().getEmail())
                        .tel(f.getFormateur().getTel())
                        .type(f.getFormateur().getType())
                        .employeurId(f.getFormateur().getEmployeur() != null ? f.getFormateur().getEmployeur().getId() : null)
                        .employeurNom(f.getFormateur().getEmployeur() != null ? f.getFormateur().getEmployeur().getNom() : null)
                        .build() : null)
                .participants(f.getParticipants() != null ? f.getParticipants().stream()
                        .map(this::toParticipantResponse)
                        .toList() : List.of())
                .build();
    }

    private ParticipantResponse toParticipantResponse(Participant p) {
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
