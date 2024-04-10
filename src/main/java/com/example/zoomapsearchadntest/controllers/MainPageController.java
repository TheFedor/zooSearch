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
        List<ServiceInfrastructureAvatarsEntity> serviceInfrastructureAvatarsList = serviceInfrastructureAvatarsRepository.findAll();
        List<EntrancesToBuildingsEntity> entrancesToBuildingsList = entrancesToBuildingsRepository.findAll();

        //создаем удобные матрицы для передачи их в JS
        //      1-я матрица в каждой записи содержит поля {animal_species;animal_avatar_link;building_avatar_link(или нуль);x_coordinate_of_avatar;y_coordinate_of_avatar;building_name}
        String[][] locationOfAnimals = new String[animalAvatarsList.size()][6];
        //              заполняем матрицу 1
        for (int i = 0; i < locationOfAnimals.length; ++i) {
            locationOfAnimals[i][0] = animalAvatarsList.get(i).getAnimalsEntity().getAnimalSpecies();
            locationOfAnimals[i][1] = animalAvatarsList.get(i).getAnimalAvatarLink();
            if (animalAvatarsList.get(i).getXCoordinateAvatar() != null) { //если животное размещается в частном вольере
                locationOfAnimals[i][2] = "null";
                locationOfAnimals[i][3] = Integer.toString(animalAvatarsList.get(i).getXCoordinateAvatar());
                locationOfAnimals[i][4] = Integer.toString(animalAvatarsList.get(i).getYCoordinateAvatar());
            } else { //если животное размещается в общем вольере
                locationOfAnimals[i][2] = animalAvatarsList.get(i).getBuildingsOfObjectsEntity().getBuildingAvatarLink();
                locationOfAnimals[i][3] = Integer.toString(animalAvatarsList.get(i).getBuildingsOfObjectsEntity().getXCoordinateAvatar());
                locationOfAnimals[i][4] = Integer.toString(animalAvatarsList.get(i).getBuildingsOfObjectsEntity().getYCoordinateAvatar());
            }
            locationOfAnimals[i][5] = animalAvatarsList.get(i).getBuildingsOfObjectsEntity().getBuildingName();
        }
        //      2-я матрица в каждой записи содержит поля {structure_name;structure_avatar_link;;x_coordinate_of_avatar;y_coordinate_of_avatar;building_name}
        String[][] locationOfStructures = new String[serviceInfrastructureAvatarsList.size()][5];
        //              заполняем матрицу 2
        for (int i = 0; i < locationOfStructures.length; ++i) {
            locationOfStructures[i][0] = serviceInfrastructureAvatarsList.get(i).getServiceInfrastructureEntity().getStructureName();
            locationOfStructures[i][1] = serviceInfrastructureAvatarsList.get(i).getStructureAvatarLink();
            locationOfStructures[i][2] = Integer.toString(serviceInfrastructureAvatarsList.get(i).getXCoordinateAvatar());
            locationOfStructures[i][3] = Integer.toString(serviceInfrastructureAvatarsList.get(i).getYCoordinateAvatar());
            locationOfStructures[i][4] = serviceInfrastructureAvatarsList.get(i).getBuildingsOfObjectsEntity().getBuildingName();
        }
        //      3-я матрица в каждой записи содержит поля {building_name;x_coordinate_of_entrance;y_coordinate_of_entrance}
        String[][] entrances = new String[entrancesToBuildingsList.size()][3];
        //              заполняем матрицу 3
        for (int i = 0; i < entrances.length; ++i) {
            entrances[i][0] = entrancesToBuildingsList.get(i).getBuildingsOfObjectsEntity().getBuildingName();
            entrances[i][1] = Integer.toString(entrancesToBuildingsList.get(i).getXCoordinateOfEntrance());
            entrances[i][2] = Integer.toString(entrancesToBuildingsList.get(i).getYCoordinateOfEntrance());
        }
        //конвертируем матрицы в формат JSON для дальнейшего удобства передачи в JS файл
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonLocationOfAnimals = objectMapper.writeValueAsString(locationOfAnimals);
        String jsonLocationOfStructures = objectMapper.writeValueAsString(locationOfStructures);
        String jsonEntrances = objectMapper.writeValueAsString(entrances);
        //добавляем JSON форматы матриц в модель
        model.addAttribute("jsonLocationOfAnimals", jsonLocationOfAnimals);
        model.addAttribute("jsonLocationOfStructures", jsonLocationOfStructures);
        model.addAttribute("jsonEntrances", jsonEntrances);


        return "main_page"; //Возвращает имя представления, которое должно быть отображено. Тут "animalsPage" указывает на имя файла представления (http-файла), который должен быть отображен пользователю в результате работы этого метода, в ответ на запрос
    }
}
