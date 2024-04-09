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
@Table(name="buildings_of_objects")
public class BuildingsOfObjectsEntity {

    @Column(name = "building_avatar_link")
    private String buildingAvatarLink;

    @Column(name = "x_coordinate_avatar")
    private Integer xCoordinateAvatar;

    @Column(name = "y_coordinate_avatar")
    private Integer yCoordinateAvatar;

    @Id
    @Column(name = "building_name")
    private String buildingName;

}
