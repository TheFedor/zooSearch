package com.example.zoomapsearchadntest.repositoryes;

import com.example.zoomapsearchadntest.entities.EntrancesToBuildingsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EntrancesToBuildingsRepository extends JpaRepository<EntrancesToBuildingsEntity, Long> {
}
