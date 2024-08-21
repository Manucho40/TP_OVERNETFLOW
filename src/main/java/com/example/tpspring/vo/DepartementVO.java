package com.example.tpspring.vo;

import com.example.tpspring.entity.Departement;

public class DepartementVO {
    private  Long id;
    private  String designation;
    private  String code;

    public DepartementVO() {
    }

    public DepartementVO(Departement departement) {
        this.id = departement.getId();
        this.designation = departement.getDesignation();
        this.code = departement.getCode();
    }

    public DepartementVO(Object o, String s) {
    }

    public Long getId() { return id; }
    public String getDesignation() { return designation; }
    public String getCode() { return code; }
}