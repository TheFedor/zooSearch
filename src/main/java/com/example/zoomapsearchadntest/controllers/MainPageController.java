//Пакет (папка) где находится класс (файл)
package com.example.zoomapsearchadntest.controllers;
//Импорт необходимых классов и интерфейсов из других пакетов и библиотек
import com.example.zoomapsearchadntest.entities.*;
import com.example.zoomapsearchadntest.repositoryes.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;


@Controller //Аннотация, помечающая класс ниже как контроллер Spring MVC, который обрабатывает http-запросы от клиентов
@RequestMapping("/") //Аннотация, указывает базовый URL, который обрабатывается этим контроллером (то есть, грубо говоря, подставляет этот юрл в начало всех юрлов в классе ниже)
public class MainPageController {
    @Autowired //Аннотация, используемая для автоматического внедрения бина (управляемый контейнером Spring объект, который является частью приложения) в другой бин. В данном случае, автоматически внедряем зависимости репозитория 'animalsRepository' в контроллер, до того как обработаются методы нижеSystem.out.println("trrrrrr");
    //private AnimalsRepository animalsRepository; //'animalsRepository' представляет собой интерфейс, который предоставляет абстракцию доступа к данным для сущности 'AnimalsEntity'. То есть, мы его тут обязаны использовать, чтобы выполнять CRUD-операции с таблицей БД из этого класса
    private AnimalsInfoRepository animalsInfoRepository;
    @Autowired
    private ServiceInfrastructureRepository serviceInfrastructureRepository;
    @Autowired
    private AnimalAvatarsRepository animalAvatarsRepository;
    @Autowired
    private ServiceInfrastructureAvatarsRepository serviceInfrastructureAvatarsRepository;
    @Autowired
    private EntrancesToBuildingsRepository entrancesToBuildingsRepository;

    @GetMapping //Аннотация, обозначающая метод, который обрабатывает HTTP GET запросы к обозначенному в скобках URL (В данном случае, т.к. в скобках ничего, берется URL из @RequestMapping)
    public String index(Model model) throws JsonProcessingException { //Объект Model используется для хранения и передачи данных представлению
        List<AnimalsInfoEntity> animalsInfo = animalsInfoRepository.findAll();//(Sort.by(Sort.Direction.ASC, "animalsEntity.animalSpecies"));
        //На всякий сортируем полученный список
        Collections.sort(animalsInfo, new Comparator<AnimalsInfoEntity>() {
            @Override
            public int compare(AnimalsInfoEntity o1, AnimalsInfoEntity o2) {
                String animalSpecies1 = o1.getAnimalsEntity().getAnimalSpecies();
                String animalSpecies2 = o2.getAnimalsEntity().getAnimalSpecies();

                return animalSpecies1.compareToIgnoreCase(animalSpecies2);
            }
        });

        List<ServiceInfrastructureEntity> structuresInfo = serviceInfrastructureRepository.findAll();
        //на всякий случай сортируем
        Collections.sort(structuresInfo, new Comparator<ServiceInfrastructureEntity>() {
            @Override
            public int compare(ServiceInfrastructureEntity o1, ServiceInfrastructureEntity o2) {
                String structureName1 = o1.getStructureName();
                String structureName2 = o2.getStructureName();
                return structureName1.compareToIgnoreCase(structureName2);
            }
        });


        //List<AnimalsEntity> animals = animalsRepository.findAll(Sort.by(Sort.Direction.ASC, "animalSpecies")); //findAll() - Базовый метод JpaRepository для получения всех строк из таблицы БД, которые соответствуют сущности 'AnimalsEntity'; возвращает список объектов 'AnimalsEntity', содержащий все строки из таблицы БД, соответствующие этой сущности. Тут они сортируются по полю "animalSpecies" в порядке возрастания
        System.out.println("Контроллер сработал");

        model.addAttribute("structuresInfo",structuresInfo);
        model.addAttribute("animalsInfo", animalsInfo); //Сохраняет данные animals в модель под именем "animals". Другими словами, добавляет атрибут с именем "animals" и значением animals в объект Model

        //добавляем в модель записи для размещения аватарок и их входов
        List<AnimalAvatarsEntity> animalAvatarsList = animalAvatarsRepository.findAll();
        for (var i = 0; i < animalAvatarsList.size(); ++i) {
            System.out.println("аватарки животного: "+ animalAvatarsList.get(i).getAnimalsEntity().getAnimalSpecies());
        }
        List<ServiceInfrastructureAvatarsEntity> serviceInfrastructureAvatarsList = serviceInfrastructureAvatarsRepository.findAll();
        model.addAttribute("animalAvatars", animalAvatarsList);
        model.addAttribute("infrastructureAvatars", serviceInfrastructureAvatarsList);

        int[][] intMatr = new int[2][2];
        intMatr[0][0] = 1;
        intMatr[0][1] = 2;
        intMatr[1][0] = 9;
        intMatr[1][1] = 10;
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonIntMatr = objectMapper.writeValueAsString(intMatr);
        model.addAttribute("intMatr", jsonIntMatr);

        return "main_page"; //Возвращает имя представления, которое должно быть отображено. Тут "animalsPage" указывает на имя файла представления (http-файла), который должен быть отображен пользователю в результате работы этого метода, в ответ на запрос
    }
}
