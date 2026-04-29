package com.example.formation_backend.services;

import com.example.formation_backend.dtos.domaine.DomaineRequestDTO;
import com.example.formation_backend.dtos.domaine.DomaineResponseDTO;
import com.example.formation_backend.entities.Domaine;
import com.example.formation_backend.repositories.DomaineRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DomaineService {

    private final DomaineRepository domaineRepository;

    public List<DomaineResponseDTO> findAll() {
        return domaineRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public DomaineResponseDTO findById(UUID id) {
        return domaineRepository.findById(id)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Domaine non trouvé"));
    }

    public DomaineResponseDTO save(DomaineRequestDTO dto) {
        String libelle = dto.getLibelle().trim();
        if (domaineRepository.existsByLibelle(libelle))
            throw new RuntimeException("Ce libellé existe déjà");
        Domaine saved = domaineRepository.save(
            Domaine.builder().libelle(libelle).build()
        );
        return toResponseDTO(saved);
    }

    public DomaineResponseDTO update(UUID id, DomaineRequestDTO dto) {
        Domaine domaine = domaineRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Domaine non trouvé"));

        String libelle = dto.getLibelle().trim();
        if (domaineRepository.existsByLibelleAndIdNot(libelle, id))
            throw new RuntimeException("Ce libellé est déjà utilisé par un autre domaine");

        domaine.setLibelle(libelle);
        Domaine updated = domaineRepository.save(domaine);
        return toResponseDTO(updated);
    }

    public void delete(UUID id) {
        if (!domaineRepository.existsById(id))
            throw new RuntimeException("Domaine non trouvé");
        domaineRepository.deleteById(id);
    }

    private DomaineResponseDTO toResponseDTO(Domaine d) {
        return DomaineResponseDTO.builder()
                .id(d.getId())
                .libelle(d.getLibelle())
                .build();
    }
}
