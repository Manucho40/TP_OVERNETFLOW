package com.example.tpspring.service;

import com.example.tpspring.entity.Departement;
import com.example.tpspring.repository.DepartementRepository;
import com.example.tpspring.repository.PersonneRepository;
import com.example.tpspring.vo.DepartementVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DepartementService {

    private  final DepartementRepository departementRepository;
    @Autowired
    public DepartementService(DepartementRepository departementRepository){
        this.departementRepository = departementRepository;
    }

    /**
     * Recupère la liste compléte des departements
     *
     * @return Retourne une liste de departements
     */
    public List<DepartementVO> getAllDepartements(){
        List<Departement> departement = departementRepository.findAll();
        return departement.stream().map(DepartementVO::new).collect(Collectors.toList());
    }
}
