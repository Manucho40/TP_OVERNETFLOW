package com.example.tpspring.service;
import com.example.tpspring.entity.Departement;
import com.example.tpspring.entity.Personne;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class PersonneMockBuilder {

    private Long id;
    private String nom;
    private String prenom;
    private int age;
    private Departement departement;

    public Personne build(){
        Personne personne = mock(Personne.class);
        when(personne.getId()).thenReturn(id);
        when(personne.getNom()).thenReturn(nom);
        when(personne.getPrenom()).thenReturn(prenom);
        when(personne.getAge()).thenReturn(age);
        when(personne.getDepartement()).thenReturn(departement);

        return personne;
    }

    public PersonneMockBuilder setId(Long id){
        this.id = id;
        return this;
    }

    public PersonneMockBuilder setNom(String nom){
        this.nom = nom;
        return this;
    }

    public PersonneMockBuilder setPrenom(String prenom){
        this.prenom = prenom;
        return this;
    }

    public PersonneMockBuilder setAge(int age){
        this.age = age;
        return this;
    }

    public PersonneMockBuilder setDepartement(Departement departement){
        this.departement = departement;
        return this;
    }
}
