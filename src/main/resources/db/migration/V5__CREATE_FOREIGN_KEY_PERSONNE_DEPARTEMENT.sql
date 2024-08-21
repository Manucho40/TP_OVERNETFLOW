ALTER TABLE personne
    ADD CONSTRAINT fk_departement FOREIGN KEY (id_departement) REFERENCES departement (id);