package com.example.zoomapsearchadntest.repositoryes;

import com.example.zoomapsearchadntest.entities.AnimalsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnimalsRepository extends JpaRepository<AnimalsEntity, String> {
}
