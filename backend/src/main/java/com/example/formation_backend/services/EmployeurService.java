package com.example.formation_backend.services;

import com.example.formation_backend.dtos.employeur.EmployeurRequestDTO;
import com.example.formation_backend.dtos.employeur.EmployeurResponseDTO;
import com.example.formation_backend.entities.Employeur;
import com.example.formation_backend.repositories.EmployeurRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class EmployeurService {

    private final EmployeurRepository employeurRepository;

    public List<EmployeurResponseDTO> findAll() {
        return employeurRepository.findAll()
                .stream()
                .map(this::toResponseDTO)
                .toList();
    }

    public EmployeurResponseDTO findById(UUID id) {
        return employeurRepository.findById(id)
                .map(this::toResponseDTO)
                .orElseThrow(() -> new RuntimeException("Employeur non trouvé"));
    }

    public EmployeurResponseDTO save(EmployeurRequestDTO dto) {
        String nom = dto.getNom().trim();
        if (employeurRepository.existsByNom(nom))
            throw new RuntimeException("Cet employeur existe déjà");
        
        Employeur saved = employeurRepository.save(
            Employeur.builder().nom(nom).build()
        );
        return toResponseDTO(saved);
    }

    public EmployeurResponseDTO update(UUID id, EmployeurRequestDTO dto) {
        Employeur employeur = employeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employeur non trouvé"));

        String nom = dto.getNom().trim();
        if (employeurRepository.existsByNomAndIdNot(nom, id))
            throw new RuntimeException("Ce nom est déjà utilisé par un autre employeur");

        employeur.setNom(nom);
        Employeur updated = employeurRepository.save(employeur);
        return toResponseDTO(updated);
    }

    public void delete(UUID id) {
        if (!employeurRepository.existsById(id))
            throw new RuntimeException("Employeur non trouvé");
        employeurRepository.deleteById(id);
    }

    private EmployeurResponseDTO toResponseDTO(Employeur d) {
        return EmployeurResponseDTO.builder()
                .id(d.getId())
                .nom(d.getNom())
                .build();
    }
}
