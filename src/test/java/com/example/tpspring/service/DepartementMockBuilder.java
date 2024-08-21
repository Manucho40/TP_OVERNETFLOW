package com.example.tpspring.service;

import com.example.tpspring.entity.Departement;
import com.example.tpspring.vo.DepartementVO;
import com.example.tpspring.vo.PersonneVO;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class DepartementMockBuilder {
    private  Long id;
    private  String designation;
    private  String code;

    public DepartementMockBuilder setId(Long id) {
        this.id = id;
        return this;
    }

    public  DepartementMockBuilder setDesignation(String designation){
        this.designation = designation;
        return this;
    }

    public  DepartementMockBuilder setCode(String code){
        this.designation = designation;
        return this;
    }


    public Departement build(){
        Departement departement = mock(Departement.class);
        when(departement.getId()).thenReturn(id);
        when(departement.getDesignation()).thenReturn(designation);
        when(departement.getCode()).thenReturn(code);
        return departement;
    }
}
