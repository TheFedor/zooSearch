package com.example.zoomapsearchadntest.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="animals_info")
public class AnimalsInfoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "brief_info")
    private String briefInfo;

    @Column(name = "full_info")
    private String fullInfo;

    @Column(name = "photo_link")
    private String photoLink;

    @OneToOne
    @JoinColumn(name = "animal_species", referencedColumnName = "animal_species")
    private AnimalsEntity animalsEntity;

    public String getAnimalBaseInformation() {
        return animalsEntity.getAnimalOrder() + "▶" + animalsEntity.getAnimalFamily() + "▶" + animalsEntity.getAnimalGenus();
    }

    @Override
    public String toString() {
        return "AnimalsInfoEntity{" + "id=" + id + ", briefInfo='" + briefInfo + ", animalsEntity=" + animalsEntity + '}';
    }
}
