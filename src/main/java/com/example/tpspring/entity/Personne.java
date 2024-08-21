package com.example.tpspring.entity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "personne")
public class Personne {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nom;

    @Column(nullable = false)
    private String prenom;

    @Column(nullable = false)
    private int age;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_departement", nullable = false)
    private Departement departement;

    public Personne() {}

    public Personne(String nom, String prenom, int age, Departement departement) {
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.departement = departement;
    }
    public void modifierPersonne( String nom, String prenom, int age, Departement departement){
        this.nom = nom;
        this.prenom = prenom;
        this.age = age;
        this.departement = departement;

    }

    public Long getId() { return id; }
    public String getNom() { return nom; }
    public String getPrenom() { return prenom; }
    public int getAge() { return age; }
    public Departement getDepartement() { return departement; }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setDepartement(Departement departement) {
        this.departement = departement;
    }
}