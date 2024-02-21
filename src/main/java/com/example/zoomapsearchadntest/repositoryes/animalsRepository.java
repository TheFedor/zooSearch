package com.example.zoomapsearchadntest.repositoryes;

import com.example.zoomapsearchadntest.entities.AnimalsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.*;

@Repository
public interface animalsRepository extends JpaRepository<AnimalsEntity, Integer> {

}
