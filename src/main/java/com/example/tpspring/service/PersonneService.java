package com.example.tpspring.service;

import com.example.tpspring.entity.Departement;
import com.example.tpspring.entity.Personne;
import com.example.tpspring.repository.DepartementRepository;
import com.example.tpspring.repository.PersonneRepository;
import com.example.tpspring.vo.PersonneVO;
import org.springframework.stereotype.Service;
import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
public class PersonneService {

    private final PersonneRepository personneRepository;
    private final DepartementRepository departementRepository;

    public PersonneService(PersonneRepository personneRepository, DepartementRepository departementRepository) {
        this.personneRepository = personneRepository;
        this.departementRepository = departementRepository;
    }

    /**
     * Recupère la liste des personnes
     *
     * @return Retourne une liste de personneVO
     */
    public List<PersonneVO> obtenirListeDesPersonnes() {
        List<Personne> personnes = personneRepository.findAll();
        return personnes.stream()
                .map(PersonneVO::new)
                .collect(toList());
    }

    /**
     * Ajoute une nouvelle personneVO
     *
     * @param personneVO
     *
     * @return Retourne la nouvelle personneVO ajouter
     */
    public PersonneVO ajouterNouvellePersonne(PersonneVO personneVO){
        Departement departement = departementRepository.findById(personneVO.getDepartementVO().getId()).orElseThrow(()->new RuntimeException("Le departement n'existe pas."));
        Personne personne = new Personne(personneVO.getNom(), personneVO.getPrenom(), personneVO.getAge(), departement);
        personneRepository.save(personne);
        return personneVO;
    }

    /**
     * Recupère la personneVO dont l'id correspond à celui passé en paramètre
     *
     * @param id
     *
     * @return retourne la personneVO qui dont l'id correspond à celui passé en paramètre
     */
    public PersonneVO obtenirPersonneParId(Long id){
        Personne personne = personneRepository.findById(id).orElseThrow(()->new RuntimeException("L'identifiant n'existe pas."));
        PersonneVO personneVO = new PersonneVO(personne);
        return personneVO;

    }

    /**
     * Supprime la personneVO dont l'id correspond à celui passé en paramètre
     *
     * @param id
     */
    public void supprimerPersonne(Long id) {
        if (personneRepository.existsById(id)) {
            personneRepository.deleteById(id);
        }
    }

    /**
     * Modifie une nouvelle personneVO à l'aide de son id et des modifcation qu'on soiuhaite apporté à la personneVO
     *
     * @param id
     *
     * @param personneVO
     *
     * @return Retourne la personneVO modifier
     */
    public PersonneVO modifierPersonne (Long id, PersonneVO personneVO){

           Personne personneRecupereeParId = personneRepository.findById(id).orElseThrow(()->new RuntimeException("Cette personne est inéxistante!"));
           Departement nouveauDepartement = departementRepository.findById(personneVO.getDepartementVO().getId())
                   .orElseThrow(() -> new RuntimeException("Le département n'existe pas."));

           personneRecupereeParId.modifierPersonne(new PersonneVO(personneRecupereeParId), nouveauDepartement);

           Personne personne = personneRepository.save(personneRecupereeParId);

           personneVO = new PersonneVO(personne);

           return  personneVO;
    }



}
