package com.example.tpspring.controller;

import com.example.tpspring.service.PersonneService;
import com.example.tpspring.vo.PersonneVO;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@CrossOrigin("*")
@RestController
@RequestMapping("/api")
public class PersonneController {
    private final PersonneService personneService;

    public PersonneController(PersonneService personneService) {
        this.personneService = personneService;
    }

    /**
     * Expose la liste de toutes les personneVO.
     *
     * @return Retourne toutes les personneVO
     */
    @GetMapping("/personnes")
    public List<PersonneVO> getAlLPersonnes(){
        return personneService.obtenirListeDesPersonnes();
    }

    /**
     * Ajoute une nouvelle personneVO
     *
     * @param personneVO
     *
     * @return Retourne la nouvelle personneVO ajouter
     */
    @PostMapping("/personne")
    public PersonneVO addPersonne(@RequestBody PersonneVO personneVO){
        return personneService.ajouterNouvellePersonne(personneVO);
    }

    /**
     * Fournit la personneVO dont l'identifiant correspond à celui passé en paramètre
     *
     * @param id
     *
     * @return Retourne la personneVO dont l'identifiant correspond à celui passé en paramètre
     */
    @GetMapping("/personne/{id}")
    public PersonneVO obtenirPersonneById(@PathVariable("id") Long id){
        return personneService.obtenirPersonneParId(id);
    }

    /**
     * Permet de supprimer la personneVO dont l'id correspond à celui passé en paramètre
     *
     * @param id
     */
    @DeleteMapping("/personne/{id}")
    public void deletePersonne(@PathVariable("id") Long id) {
        personneService.supprimerPersonne(id);
    }

    /**
     * Modifie une personneVO
     *
     * @param id
     * @param personneVO
     *
     * @return Retourne la personneVO modifier
     */
    @PutMapping("/personne/{id}")
    public PersonneVO updatePersonne(@PathVariable("id") Long id, @RequestBody PersonneVO personneVO) {
        return  personneService.modifierPersonne(id, personneVO);
    }
}
