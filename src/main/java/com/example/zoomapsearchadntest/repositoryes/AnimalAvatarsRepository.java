package com.example.zoomapsearchadntest.repositoryes;

import com.example.zoomapsearchadntest.entities.AnimalAvatarsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalAvatarsRepository extends JpaRepository<AnimalAvatarsEntity, Long> {
}
