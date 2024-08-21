package com.example.tpspring.controller;

import com.example.tpspring.entity.Departement;
import com.example.tpspring.entity.Personne;
import com.example.tpspring.service.DepartementService;
import com.example.tpspring.service.PersonneService;
import com.example.tpspring.vo.DepartementVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class DepartementController {

    private final DepartementService departementService;

    @Autowired
    public DepartementController(DepartementService departementService){
        this.departementService= departementService;
    }


    @GetMapping("/departements")
    public List<DepartementVO> getAllDepartements(){
        return this.departementService.getAllDepartements();
    }
}
