package com.example.zoomapsearchadntest.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="entrances_to_buildings")
public class EntrancesToBuildingsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "x_coordinate_of_entrance")
    private Integer xCoordinateOfEntrance;

    @Column(name = "y_coordinate_of_entrance")
    private Integer yCoordinateOfEntrance;

    @ManyToOne
    @JoinColumn(name = "building_name", referencedColumnName = "building_name")
    private BuildingsOfObjectsEntity buildingsOfObjectsEntity;
}
