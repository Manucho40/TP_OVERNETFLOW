package com.example.tpspring.service;
import com.example.tpspring.entity.Departement;
import com.example.tpspring.entity.Personne;
import com.example.tpspring.repository.DepartementRepository;
import com.example.tpspring.repository.PersonneRepository;
import com.example.tpspring.vo.DepartementVO;
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

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;


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
    public void should_obtenirListeDesPersonnes() {
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
    public void should_recuperePersonneParIdentidentifiant_obtenirPersonneParId() {
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
   public void should_AjouterNouvellePersonne() {
        // Given
        Departement mockDepartement = new DepartementMockBuilder()
                .setId(1L)
                .setCode("083")
                .setDesignation("Var")
                .build();

        Personne personne = new PersonneMockBuilder()
                .setId(1L)
                .setNom("Dupont")
                .setPrenom("Jean")
                .setAge(30)
                .setDepartement(mockDepartement)
                .build();
        PersonneVO mockPersonneVO = new PersonneVO(personne);
        when(departementRepository.findById(1L)).thenReturn(Optional.of(mockDepartement));
        when(personneRepository.save(any(Personne.class))).thenReturn(personne);

        //When
        PersonneVO personneVO = personneService.ajouterNouvellePersonne(mockPersonneVO);
        //Then
        assertNotNull(personneVO);
        assertNotNull(personneVO.getDepartementVO());
        assertEquals(personne.getNom(), personneVO.getNom());
        assertEquals(personne.getPrenom(), personneVO.getPrenom());
        assertEquals(personne.getAge(), personneVO.getAge());
    }


    @Test
    void should_supprimerUtilisateur_supprimerPersonne() {
        //Given
        when(personneRepository.existsById(1L)).thenReturn(true);

        //When
        personneService.supprimerPersonne(1L);

        //Then
        verify(personneRepository, times(1)).deleteById(1L);

    }

    @Test
    void updatePersonne() {
        // Given
      Departement departement = new Departement("Abidjan", "15e");
      //DepartementVO departementVO = new DepartementVoMockBuilder().setId(1L).setCode("D1").setDesignation("Desi").build();

      //PersonneVO personneVO = new PersonneVoMockBuilder().setId(1L).setNom("NOM1").setDepartementVO(departementVO).build()
        Personne personne = new Personne("III","YYY",56,departement);
        DepartementVO departementVO = new DepartementVO();
        PersonneVO personneVO = new PersonneVoMockBuilder().setId(1L).setNom("NOM1").setDepartementVO(departementVO).build();

        when(personneRepository.findById(1L)).thenReturn(Optional.of(personne));
        when(personneRepository.existsById(1L)).thenReturn(true);
        when(departementRepository.findById(departementVO.getId())).thenReturn(Optional.of(departement));
        //when(personneRepository.findById(1L)).thenReturn(Optional.of(personne));
        when(personneRepository.save(personne)).thenReturn(personne);
        //when(personneRepository.findById(any(Long.class))).thenReturn(Optional.of(personne));


        // When

        PersonneVO personne1 = personneService.modifierPersonne(1L, personneVO);

        // Then7
        assertNotNull(personne1);
        assertEquals(personne1.getNom(), "NOM1");


    }

}