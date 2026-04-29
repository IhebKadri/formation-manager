package com.example.formation_backend.services;

import com.example.formation_backend.dtos.structure.StructureRequestDTO;
import com.example.formation_backend.dtos.structure.StructureResponseDTO;
import com.example.formation_backend.entities.Structure;
import com.example.formation_backend.repositories.ParticipantRepository;
import com.example.formation_backend.repositories.StructureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StructureService {

    private final StructureRepository structureRepository;
    private final ParticipantRepository participantRepository;

    public StructureResponseDTO findById(UUID id) {
        Structure structure = structureRepository.findById(id)
                .orElseThrow(() -> new com.example.formation_backend.exceptions.ResourceNotFoundException("Structure non trouvée"));
        return toResponseDTO(structure);
    }

    public List<StructureResponseDTO> findAll() {
        return structureRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public StructureResponseDTO save(StructureRequestDTO dto) {
        String libelle = dto.getLibelle().trim();
        if (structureRepository.existsByLibelle(libelle)) {
            throw new RuntimeException("Ce libellé de structure existe déjà");
        }
        Structure saved = structureRepository.save(
            Structure.builder().libelle(libelle).build()
        );
        return toResponseDTO(saved);
    }

    public StructureResponseDTO update(UUID id, StructureRequestDTO dto) {
        Structure existing = structureRepository.findById(id)
                .orElseThrow(() -> new com.example.formation_backend.exceptions.ResourceNotFoundException("Structure non trouvée"));

        String newLibelle = dto.getLibelle().trim();
        if (structureRepository.existsByLibelleAndIdNot(newLibelle, id)) {
            throw new RuntimeException("Une autre structure possède déjà ce libellé");
        }

        existing.setLibelle(newLibelle);
        return toResponseDTO(structureRepository.save(existing));
    }

    public void delete(UUID id) {
        if (!structureRepository.existsById(id)) {
            throw new com.example.formation_backend.exceptions.ResourceNotFoundException("Structure non trouvée");
        }
        if (participantRepository.existsByStructureId(id)) {
            throw new RuntimeException("Impossible de supprimer cette structure car elle est liée à un ou plusieurs participants.");
        }
        structureRepository.deleteById(id);
    }

    private StructureResponseDTO toResponseDTO(Structure s) {
        return StructureResponseDTO.builder()
                .id(s.getId())
                .libelle(s.getLibelle())
                .build();
    }
}
