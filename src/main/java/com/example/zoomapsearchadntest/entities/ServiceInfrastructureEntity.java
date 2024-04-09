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
@Table(name="service_infrastructure")
public class ServiceInfrastructureEntity {

    @Id
    @Column(name = "structure_name")
    private String structureName;

    @Column(name = "brief_info")
    private String briefInfo;

    @Column(name = "full_info")
    private String fullInfo;

    @Column(name = "photo_link")
    private String photoLink;

}
