package com.example.tpspring.service;
import com.example.tpspring.entity.Departement;
import com.example.tpspring.entity.Personne;
import com.example.tpspring.repository.DepartementRepository;
import com.example.tpspring.repository.PersonneRepository;
import com.example.tpspring.vo.PersonneVO;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
class PersonneServiceTest {

    @Mock private DepartementRepository departementRepository;
    @Mock private PersonneRepository personneRepository;
    @InjectMocks private PersonneService personneService;
    @Captor private ArgumentCaptor<Personne> personneArgumentCaptor;



    Departement mockDepartement1 = new DepartementMockBuilder()
            .setId(1L)
            .setCode("083")
            .setDesignation("Var")
            .build();
    Departement mockDepartement2 = new DepartementMockBuilder()
            .setId(2L)
            .setCode("02A")
            .setDesignation("Paris")
            .build();
    Departement mockDepartementInvalid = new DepartementMockBuilder()
            .setCode("")
            .setDesignation("")
            .build();
    Personne mockPersonne1 = new PersonneMockBuilder()
            .setId(1L)
            .setNom("Dupont")
            .setPrenom("Jean")
            .setAge(30)
            .setDepartement(mockDepartement1)
            .build();
    Personne mockPersonne2 = new PersonneMockBuilder()
            .setId(2L)
            .setNom("Bernard")
            .setPrenom("Jean")
            .setAge(30)
            .setDepartement(mockDepartement2)
            .build();
    Personne mockPersonneInvalid = new PersonneMockBuilder()
            .setNom("")
            .setPrenom("")
            .setAge(0)
            .setDepartement(mockDepartementInvalid)
            .build();

    @Test
    public void obtenirListeDesPersonnes() {
        // Given
        Personne personne1 = new PersonneMockBuilder()
                .setId(1L)
                .setNom("Dupont")
                .setPrenom("Jean")
                .setAge(30)
                .setDepartement(mockDepartement1)
                .build();
        Personne personne2 = new PersonneMockBuilder()
                .setId(2L)
                .setNom("Bernard")
                .setPrenom("Jean")
                .setAge(30)
                .setDepartement(mockDepartement2)
                .build();
        List<Personne> personnes = new ArrayList<>();
        personnes.add(personne1);
        personnes.add(personne2);

        when(personneRepository.findAll()).thenReturn(personnes);

        // When
        List<PersonneVO> personneVOListe = personneService.obtenirListeDesPersonnes();

        // Then
        assertEquals(personneVOListe.size(), 2);
    }

    @Test
    public void getPersonneId() {
        // Given
        Long id = mockPersonne1.getId();
        when(personneRepository.findById(id)).thenReturn(Optional.of(mockPersonne1));

        // When
         PersonneVO personneVO = personneService.obtenirPersonneParId(id);

        // Then
        assertNotNull(personneVO);
        assertEquals("Dupont", personneVO.getNom());
    }
    @Test
    void testObtenirPersonneById_Id_pas_trouver() {
        when(personneRepository.findById(1L)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () -> {
            personneService.obtenirPersonneParId(1L);
        });

        assertEquals("L'identifiant n'existe pas.", exception.getMessage());
    }

    @Test
   public void should_Ajouter_Personne() {
        // Given
        Departement mockDepartement = new DepartementMockBuilder()
                .setId(1L)
                .setCode("083")
                .setDesignation("Var")
                .build();

        Personne mockPersonne = new PersonneMockBuilder()
                .setId(1L)
                .setNom("Dupont")
                .setPrenom("Jean")
                .setAge(30)
                .setDepartement(mockDepartement)
                .build();


        PersonneVO mockPersonneVO = new PersonneVO(mockPersonne);

        when(departementRepository.findById(1L)).thenReturn(Optional.of(mockDepartement));
        when(personneRepository.save(any(Personne.class))).thenReturn(mockPersonne);

        PersonneVO personneVO = personneService.ajouterNouvellePersonne(mockPersonneVO);


        assertNotNull(personneVO);
        assertNotNull(personneVO.getDepartementVO());
        assertEquals(mockPersonne.getNom(), personneVO.getNom());
        assertEquals(mockPersonne.getPrenom(), personneVO.getPrenom());
        assertEquals(mockPersonne.getAge(), personneVO.getAge());

    }


    @Test
    void testDeletePersonne_Success() {
        when(personneRepository.existsById(1L)).thenReturn(true);

        personneService.supprimerPersonne(1L);

    }

    @Test
    void testDeletePersonne_IdNotFound() {
        when(personneRepository.existsById(1L)).thenReturn(false);

        personneService.supprimerPersonne(1L);

    }
   /* @Test
    void deletePersonne() {
        Integer id = 30;
        when(personneRepository.existsById(id)).thenReturn(true);
        boolean result = personneService.deletePersonne(id);
        assertEquals(true, personneService.deletePersonne(30));
    }

    @Test
    void updatePersonne() {
        Integer id = 27;
        PersonneVO addPersonne = new PersonneVO("SENI", "Anne Marie", 60, 1);
        Personne result = new Personne(new PersonneVO("SENI", "Anne Marie", 60, 1));
        ResponseEntity<Personne> resultat = ResponseEntity.ok(result);
        when(personneService.updatePersonne(id, addPersonne)).thenReturn(resultat);
        assertEquals(resultat, personneService.updatePersonne(id, addPersonne));

    }*/
}