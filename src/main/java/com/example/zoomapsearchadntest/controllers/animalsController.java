//Пакет (папка) где находится класс (файл)
package com.example.zoomapsearchadntest.controllers;
//Импорт необходимых классов и интерфейсов из других пакетов и библиотек
import com.example.zoomapsearchadntest.entities.AnimalsEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Controller;
import com.example.zoomapsearchadntest.repositoryes.animalsRepository;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;


@Controller //Аннотация, помечающая класс ниже как контроллер Spring MVC, который обрабатывает http-запросы от клиентов
@RequestMapping("/") //Аннотация, указывает базовый URL, который обрабатывается этим контроллером (то есть, грубо говоря, подставляет этот юрл в начало всех юрлов в классе ниже)
public class animalsController {
    @Autowired //Аннотация, используемая для автоматического внедрения бина (управляемый контейнером Spring объект, который является частью приложения) в другой бин. В данном случае, автоматически внедряем зависимости репозитория 'animalsRepository' в контроллер, до того как обработаются методы ниже
    private animalsRepository animalsRepository; //'animalsRepository' представляет собой интерфейс, который предоставляет абстракцию доступа к данным для сущности 'AnimalsEntity'. То есть, мы его тут обязаны использовать, чтобы выполнять CRUD-операции с таблицей БД из этого класса

    @GetMapping //Аннотация, обозначающая метод, который обрабатывае HTTP GET запросы к обозначенному в скобках URL (В данном случае, т.к. в скобках ничего, берется URL из @RequestMapping)
    public String index(Model model) { //Объект Model используется для хранения и передачи данных представлению
        List<AnimalsEntity> animals = animalsRepository.findAll(Sort.by(Sort.Direction.ASC, "animalSpecies")); //findAll() - Базовый метод JpaRepository для получения всех строк из таблицы БД, которые соответствуют сущности 'AnimalsEntity'; возвращает список объектов 'AnimalsEntity', содержащий все строки из таблицы БД, соответствующие этой сущности. Тут они сортируются по полю "animalSpecies" в порядке возрастания
        for (int i = 0; i < animals.size(); ++i) {
            System.out.println(animals.get(i));
        }
        model.addAttribute("animals", animals); //Сохраняет данные animals в модель под именем "animals". Другими словами, добавляет атрибут с именем "animals" и значением animals в объект Model
        return "animalsPage_old"; //Возвращает имя представления, которое должно быть отображено. Тут "animalsPage" указывает на имя файла представления (http-файла), который должен быть отображен пользователю в результате работы этого метода, в ответ на запрос
    }
}
