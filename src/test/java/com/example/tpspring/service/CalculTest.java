package com.example.tpspring.service;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class CalculTest {

    Calcul calcul;
    @Test
    void additionner() {
        Calcul calcul = new Calcul(0, 0);
        Float resultat = calcul.additionner(0f, 5f);
        assertEquals(5, resultat);
    }

    @Test
    void soustraire() {
        Calcul calcul = new Calcul(0, 0);
        Float resultat = calcul.soustraire(5f, 2f);
        assertEquals(3, resultat);
    }

    @Test
    void multiplier() {
        Calcul calcul = new Calcul(0, 0);
        Float resultat = calcul.multiplier(6f, 2f);
        assertEquals(12, resultat);
    }

    @Test
    void diviser() throws Exception {
        Calcul calcul = new Calcul(0, 0);
        float resultat = calcul.diviser(6f,2f);
        assertEquals(3, resultat);
    }

    @Test
    void carre() {
        Calcul calcul = new Calcul(0, 0);
        float resultat = calcul.carre(5f);
        assertEquals(25, resultat);
    }

    @Test
    void identiteRemarquable() {
        Calcul calcul = new Calcul(0f, 0f);
        float resultat = calcul.identiteRemarquable(6, 4);
        assertEquals(100, resultat);
    }
}