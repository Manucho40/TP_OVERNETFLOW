package com.example.tpspring.service;

import com.example.tpspring.vo.DepartementVO;
import com.example.tpspring.vo.PersonneVO;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class DepartementVoMockBuilder {
    private  Long id;
    private  String designation;
    private  String code;

    public DepartementVoMockBuilder setId(Long id) {
        this.id = id;
        return this;
    }

    public  DepartementVoMockBuilder setDesignation(String designation){
        this.designation = designation;
        return this;
    }

    public  DepartementVoMockBuilder setCode(String code){
        this.code = code;
        return this;
    }


    public DepartementVO build(){
        DepartementVO departementVO = mock(DepartementVO.class);
        when(departementVO.getId()).thenReturn(id);
        when(departementVO.getDesignation()).thenReturn(designation);
        when(departementVO.getCode()).thenReturn(code);
        return departementVO;
    }
}
