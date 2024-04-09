package com.example.zoomapsearchadntest.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "animals")
public class AnimalsEntity {

    @Column(name = "animal_class")
    private String animalClass;

    @Column(name = "animal_order")
    private String animalOrder;

    @Column(name = "animal_family")
    private String animalFamily;

    @Column(name = "animal_genus")
    private String animalGenus;

    @Id
    @Column(name = "animal_species")
    private String animalSpecies;

    @Override
    public String toString() {
        return "AnimalsEntity{" + "animalSpecies='" + animalSpecies + '}';
    }
}
