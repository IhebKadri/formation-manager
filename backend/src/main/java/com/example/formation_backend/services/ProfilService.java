package com.example.formation_backend.services;

import com.example.formation_backend.dtos.profil.ProfilRequestDTO;
import com.example.formation_backend.dtos.profil.ProfilResponseDTO;
import com.example.formation_backend.entities.Profil;
import com.example.formation_backend.repositories.ParticipantRepository;
import com.example.formation_backend.repositories.ProfilRepository;
import com.example.formation_backend.exceptions.ResourceNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional
public class ProfilService {

    private final ProfilRepository profilRepository;
    private final ParticipantRepository participantRepository;

    @Transactional(readOnly = true)
    public List<ProfilResponseDTO> findAll() {
        return profilRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public ProfilResponseDTO findById(UUID id) {
        return profilRepository.findById(id)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new ResourceNotFoundException("Profil non trouvé avec l'id: " + id));
    }

    public ProfilResponseDTO save(ProfilRequestDTO dto) {
        String libelle = dto.getLibelle().trim();
        if (profilRepository.existsByLibelle(libelle)) {
            throw new RuntimeException("Ce libellé existe déjà");
        }
        Profil saved = profilRepository.save(
            Profil.builder().libelle(libelle).build()
        );
        return toResponseDTO(saved);
    }

    public ProfilResponseDTO update(UUID id, ProfilRequestDTO dto) {
        Profil existing = profilRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Profil non trouvé avec l'id: " + id));

        String libelle = dto.getLibelle().trim();
        if (profilRepository.existsByLibelleAndIdNot(libelle, id)) {
            throw new RuntimeException("Ce libellé est déjà utilisé par un autre profil");
        }

        existing.setLibelle(libelle);
        return toResponseDTO(profilRepository.save(existing));
    }

    public void delete(UUID id) {
        if (!profilRepository.existsById(id)) {
            throw new ResourceNotFoundException("Profil non trouvé avec l'id: " + id);
        }
        if (participantRepository.existsByProfilId(id)) {
            throw new RuntimeException("Impossible de supprimer ce profil car il est lié à un ou plusieurs participants.");
        }
        profilRepository.deleteById(id);
    }

    private ProfilResponseDTO toResponseDTO(Profil p) {
        return ProfilResponseDTO.builder()
                .id(p.getId())
                .libelle(p.getLibelle())
                .build();
    }
}
