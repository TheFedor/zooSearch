package com.example.zoomapsearchadntest.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "animals")
@Getter
@Setter
public class AnimalsEntity {

    @Id
    @Column(name="id")
    private Integer id;

    @Column(name="animalphylum")
    private String animalPhylum;

    @Column(name="animalclass")
    private String animalClass;

    @Column(name="animalorder")
    private String animalOrder;

    @Column(name="animalfamily")
    private String animalFamily;

    @Column(name="animalgenus")
    private String animalGenus;

    @Column(name="animalspecies")
    private String animalSpecies;

    @Column(name="briefinfo")
    private String briefInfo;

    @Column(name="fullinfo")
    private String fullInfo;

    @Override
    public String toString() {
        return "AnimalsEntity{" +
                "id=" + id +
                ", animalPhylum='" + animalPhylum + '\'' +
                ", animalClass='" + animalClass + '\'' +
                ", animalOrder='" + animalOrder + '\'' +
                ", animalFamily='" + animalFamily + '\'' +
                ", animalGenus='" + animalGenus + '\'' +
                ", animalSpecies='" + animalSpecies + '\'' +
                ", briefInfo='" + briefInfo + '\'' +
                ", fullInfo='" + fullInfo + '\'' +
                '}';
    }
}
