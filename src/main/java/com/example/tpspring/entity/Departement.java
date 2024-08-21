package com.example.tpspring.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

import java.util.Set;

@Entity
@Table(name = "departement")
public class Departement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String designation;

    @Column(nullable = false, unique = true, length = 3)
    private String code;

    @OneToMany(mappedBy = "departement", fetch = FetchType.LAZY)
    private Set<Personne> personnes;

    public Departement() {}

    public Departement(String designation, String code) {
        this.designation = designation;
        this.code = code;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }
    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }
    public Set<Personne> getPersonnes() { return personnes; }
    public void setPersonnes(Set<Personne> personnes) { this.personnes = personnes; }
}