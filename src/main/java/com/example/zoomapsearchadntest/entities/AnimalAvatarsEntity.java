package com.example.zoomapsearchadntest.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="animal_avatars")
public class AnimalAvatarsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "animal_avatar_link")
    private String animalAvatarLink;

    @Column(name = "x_coordinate_avatar")
    private Integer xCoordinateAvatar;

    @Column(name = "y_coordinate_avatar")
    private Integer yCoordinateAvatar;

    @ManyToOne
    @JoinColumn(name = "building_name", referencedColumnName = "building_name")
    private BuildingsOfObjectsEntity buildingsOfObjectsEntity;

    @OneToOne
    @JoinColumn(name = "animal_species", referencedColumnName = "animal_species")
    private AnimalsEntity animalsEntity;

    public String getAllInformation() {
        return id + "▶" +  animalAvatarLink + "▶" + xCoordinateAvatar + "▶" +yCoordinateAvatar + "▶" + buildingsOfObjectsEntity.getBuildingAvatarLink() + "▶" + buildingsOfObjectsEntity.getXCoordinateAvatar() + "▶" + buildingsOfObjectsEntity.getYCoordinateAvatar() + animalsEntity.getAnimalSpecies();
    }

    @Override
    public String toString() {
        return "AnimalAvatarsEntity{" + animalsEntity.getAnimalSpecies() + '}';
    }
}
