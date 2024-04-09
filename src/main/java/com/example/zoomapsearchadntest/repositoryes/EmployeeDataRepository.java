package com.example.zoomapsearchadntest.repositoryes;

import com.example.zoomapsearchadntest.compositeKeys.EmployeeDataKey;
import com.example.zoomapsearchadntest.entities.EmployeeDataEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeDataRepository extends JpaRepository<EmployeeDataEntity, EmployeeDataKey> {
}
