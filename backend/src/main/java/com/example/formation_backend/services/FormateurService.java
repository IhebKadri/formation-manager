package com.example.formation_backend.services;

import com.example.formation_backend.dtos.formateur.FormateurRequestDTO;
import com.example.formation_backend.dtos.formateur.FormateurResponseDTO;
import com.example.formation_backend.entities.Employeur;
import com.example.formation_backend.entities.Formateur;
import com.example.formation_backend.entities.TypeFormateur;
import com.example.formation_backend.repositories.EmployeurRepository;
import com.example.formation_backend.repositories.FormateurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FormateurService {

    private final FormateurRepository formateurRepository;
    private final EmployeurRepository employeurRepository;

    public List<FormateurResponseDTO> findAll() {
        return formateurRepository.findAll()
                .stream().map(this::toResponseDTO).toList();
    }

    public FormateurResponseDTO findById(UUID id) {
        return toResponseDTO(getOrThrow(id));
    }

    public FormateurResponseDTO save(FormateurRequestDTO dto) {
        // 1. Conditional validation
        if (dto.getType() == TypeFormateur.EXTERNE && dto.getEmployeurId() == null)
            throw new RuntimeException(
                "L'employeur est obligatoire pour un formateur externe");

        // 2. Email uniqueness
        if (formateurRepository.existsByEmail(dto.getEmail().trim()))
            throw new RuntimeException("Email déjà utilisé");

        return toResponseDTO(formateurRepository.save(toEntity(dto)));
    }

    public FormateurResponseDTO update(UUID id, FormateurRequestDTO dto) {
        // 1. Conditional validation
        if (dto.getType() == TypeFormateur.EXTERNE && dto.getEmployeurId() == null)
            throw new RuntimeException(
                "L'employeur est obligatoire pour un formateur externe");

        // 2. Email uniqueness (excluding self)
        if (formateurRepository.existsByEmailAndIdNot(dto.getEmail().trim(), id))
            throw new RuntimeException("Email déjà utilisé");

        Formateur existing = getOrThrow(id);
        updateEntityFromDTO(existing, dto);
        return toResponseDTO(formateurRepository.save(existing));
    }

    public void delete(UUID id) {
        formateurRepository.delete(getOrThrow(id));
    }

    // ── Private helpers ──────────────────────────────────────────

    private Formateur getOrThrow(UUID id) {
        return formateurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Formateur introuvable"));
    }

    private Formateur toEntity(FormateurRequestDTO dto) {
        Employeur employeur = null;
        if (dto.getType() == TypeFormateur.EXTERNE) {
            // 3. Employeur existence check
            employeur = employeurRepository.findById(dto.getEmployeurId())
                    .orElseThrow(() -> new RuntimeException("Employeur introuvable"));
        }
        return Formateur.builder()
                .nom(dto.getNom().trim())
                .prenom(dto.getPrenom().trim())
                .email(dto.getEmail().trim())
                .tel(dto.getTel())
                .type(dto.getType())
                .employeur(employeur)
                .build();
    }

    private void updateEntityFromDTO(Formateur f, FormateurRequestDTO dto) {
        f.setNom(dto.getNom().trim());
        f.setPrenom(dto.getPrenom().trim());
        f.setEmail(dto.getEmail().trim());
        f.setTel(dto.getTel());
        f.setType(dto.getType());
        if (dto.getType() == TypeFormateur.EXTERNE) {
            f.setEmployeur(employeurRepository.findById(dto.getEmployeurId())
                    .orElseThrow(() -> new RuntimeException("Employeur introuvable")));
        } else {
            f.setEmployeur(null); // switching to INTERNE clears the FK
        }
    }

    public FormateurResponseDTO toResponseDTO(Formateur f) {
        return FormateurResponseDTO.builder()
                .id(f.getId())
                .nom(f.getNom())
                .prenom(f.getPrenom())
                .email(f.getEmail())
                .tel(f.getTel())
                .type(f.getType())
                .employeurId(f.getEmployeur() != null ? f.getEmployeur().getId() : null)
                .employeurNom(f.getEmployeur() != null ? f.getEmployeur().getNom() : null)
                .build();
    }
}
