package com.example.zoomapsearchadntest.repositoryes;

import com.example.zoomapsearchadntest.entities.BuildingsOfObjectsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingsOfObjectsRepository extends JpaRepository<BuildingsOfObjectsEntity, String> {
}
