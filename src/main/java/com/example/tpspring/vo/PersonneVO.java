package com.example.tpspring.vo;

import com.example.tpspring.entity.Personne;
import jakarta.persistence.Embeddable;

import java.util.Objects;

public class PersonneVO {
    private  Long id;
    private  String nom;
    private  String prenom;
    private  int age;
    private  DepartementVO departementVO;


    public PersonneVO (){}

    public PersonneVO(Personne personne) {
        this.id = personne.getId();
        this.nom = personne.getNom();
        this.prenom = personne.getPrenom();
        this.age = personne.getAge();
        this.departementVO = new DepartementVO(personne.getDepartement());

    }

    // Getters seulement pour assurer l'immuabilité
    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public int getAge() { return age; }
    public DepartementVO getDepartementVO(){return departementVO;}

}