package com.example.zoomapsearchadntest.entities;

import com.example.zoomapsearchadntest.compositeKeys.EmployeeDataKey;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="employee_data")
public class EmployeeDataEntity {

    @EmbeddedId
    private EmployeeDataKey id;

}
