package com.example.formation_backend.services;

import com.example.formation_backend.dtos.formation.FormationRequestDTO;
import com.example.formation_backend.dtos.formation.FormationResponseDTO;
import com.example.formation_backend.entities.Domaine;
import com.example.formation_backend.entities.Formateur;
import com.example.formation_backend.entities.Formation;
import com.example.formation_backend.repositories.DomaineRepository;
import com.example.formation_backend.repositories.FormateurRepository;
import com.example.formation_backend.repositories.FormationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FormationService {

    private final FormationRepository formationRepository;
    private final DomaineRepository domaineRepository;
    private final FormateurRepository formateurRepository;

    public List<FormationResponseDTO> findAll() {
        return formationRepository.findAll()
                .stream().map(this::toResponseDTO).toList();
    }

    public FormationResponseDTO findById(UUID id) {
        return toResponseDTO(getOrThrow(id));
    }

    public FormationResponseDTO save(FormationRequestDTO dto) {
        return toResponseDTO(formationRepository.save(toEntity(dto)));
    }

    public FormationResponseDTO update(UUID id, FormationRequestDTO dto) {
        Formation existing = getOrThrow(id);
        
        // Update basic fields
        existing.setTitre(dto.getTitre().trim());
        existing.setAnnee(dto.getAnnee());
        existing.setDuree(dto.getDuree());
        existing.setBudget(dto.getBudget());
        
        // Update Relations
        existing.setDomaine(domaineRepository.findById(dto.getDomaineId())
                .orElseThrow(() -> new RuntimeException("Domaine introuvable")));
        
        if (dto.getFormateurId() != null) {
            existing.setFormateur(formateurRepository.findById(dto.getFormateurId())
                    .orElseThrow(() -> new RuntimeException("Formateur introuvable")));
        } else {
            existing.setFormateur(null);
        }

        return toResponseDTO(formationRepository.save(existing));
    }

    public void delete(UUID id) {
        formationRepository.delete(getOrThrow(id));
    }

    // ── Private helpers ──────────────────────────────────────────

    private Formation getOrThrow(UUID id) {
        return formationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formation introuvable"));
    }

    private Formation toEntity(FormationRequestDTO dto) {
        Domaine domaine = domaineRepository.findById(dto.getDomaineId())
                .orElseThrow(() -> new RuntimeException("Domaine introuvable"));
        
        Formateur formateur = null;
        if (dto.getFormateurId() != null) {
            formateur = formateurRepository.findById(dto.getFormateurId())
                    .orElseThrow(() -> new RuntimeException("Formateur introuvable"));
        }

        return Formation.builder()
                .titre(dto.getTitre().trim())
                .annee(dto.getAnnee())
                .duree(dto.getDuree())
                .budget(dto.getBudget())
                .domaine(domaine)
                .formateur(formateur)
                .build();
    }

    private FormationResponseDTO toResponseDTO(Formation f) {
        String formateurName = "Non attribué";
        if (f.getFormateur() != null) {
            formateurName = f.getFormateur().getPrenom() + " " + f.getFormateur().getNom();
        }

        return FormationResponseDTO.builder()
                .id(f.getId())
                .titre(f.getTitre())
                .annee(f.getAnnee())
                .duree(f.getDuree())
                .budget(f.getBudget())
                .domaineId(f.getDomaine().getId())
                .domaineLibelle(f.getDomaine().getLibelle())
                .formateurId(f.getFormateur() != null ? f.getFormateur().getId() : null)
                .formateurNomComplet(formateurName)
                .build();
    }
}
