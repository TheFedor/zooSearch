package com.example.zoomapsearchadntest.controllers;

import com.example.zoomapsearchadntest.entities.AnimalsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import com.example.zoomapsearchadntest.repositoryes.animalsRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.awt.*;
import java.util.List;


@Controller
@RequestMapping("/")
public class animalsController {
    @Autowired
    private animalsRepository animalsRepository;

    @GetMapping
    public String index(Model model) {
        List<AnimalsEntity> animals = animalsRepository.findAll(Sort.by(Sort.Direction.ASC, "animalSpecies"));
        for (int i = 0; i < animals.size(); ++i) {
            System.out.println(animals.get(i));
        }
        model.addAttribute("animals", animals);
        return "animalsPage";
    }
}
