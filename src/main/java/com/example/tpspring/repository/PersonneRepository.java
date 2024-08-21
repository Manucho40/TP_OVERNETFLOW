package com.example.tpspring.repository;

import com.example.tpspring.entity.Personne;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.ResponseEntity;

public interface PersonneRepository extends JpaRepository<Personne, Long> {
}
