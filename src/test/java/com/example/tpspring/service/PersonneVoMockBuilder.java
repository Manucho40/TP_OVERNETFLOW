package com.example.tpspring.service;
import com.example.tpspring.vo.DepartementVO;
import com.example.tpspring.vo.PersonneVO;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class PersonneVoMockBuilder {
    private  Long id;
    private  String nom;
    private  String prenom;
    private  int age;
    private DepartementVO departementVO;

    public PersonneVoMockBuilder setId(Long id){
        this.id = id;
        return this;
    }

    public PersonneVoMockBuilder setNom(String nom){
        this.nom = nom;
        return this;
    }
    public PersonneVoMockBuilder setPrenom(String prenom){
        this.prenom = prenom;
        return this;
    }
    public PersonneVoMockBuilder setAge(int age){
        this.age = age;
        return this;
    }
    public PersonneVoMockBuilder setDepartementVO(DepartementVO departementVO){
        this.departementVO = departementVO;
        return this;
    }

    public PersonneVO build(){
        PersonneVO personneVO = mock(PersonneVO.class);
        when(personneVO.getId()).thenReturn(id);
        when(personneVO.getNom()).thenReturn(nom);
        when(personneVO.getPrenom()).thenReturn(prenom);
        when(personneVO.getAge()).thenReturn(age);
        when(personneVO.getDepartementVO()).thenReturn(departementVO);
        return personneVO;
    }




}
