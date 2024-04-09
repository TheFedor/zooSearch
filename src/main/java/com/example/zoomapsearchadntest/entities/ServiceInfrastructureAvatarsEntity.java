package com.example.zoomapsearchadntest.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="service_infrastructure_avatars")
public class ServiceInfrastructureAvatarsEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "structure_avatar_link")
    private String structureAvatarLink;

    @Column(name = "x_coordinate_avatar")
    private Integer xCoordinateAvatar;

    @Column(name = "y_coordinate_avatar")
    private Integer yCoordinateAvatar;

    @OneToOne
    @JoinColumn(name = "structure_name", referencedColumnName = "structure_name")
    private ServiceInfrastructureEntity serviceInfrastructureEntity;

    @ManyToOne
    @JoinColumn(name = "building_name", referencedColumnName = "building_name")
    private BuildingsOfObjectsEntity buildingsOfObjectsEntity;

}
