package com.example.zoomapsearchadntest.repositoryes;

import com.example.zoomapsearchadntest.entities.AnimalsInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.awt.*;

@Repository
public interface AnimalsInfoRepository extends JpaRepository<AnimalsInfoEntity, Long> {

    //@Query("SELECT ae, aie FROM AnimalsEntity ae JOIN AnimalsInfoEntity aie ON ae.animalSpecies = aie.animalsEntity.animalSpecies")
    //List<Object[]> findAllAnimalsAndInfoAboutThem();

}
