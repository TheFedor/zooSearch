//Пакет (папка) где находится файл
package com.example.zoomapsearchadntest.repositoryes;
//Импорты необходимых классов и интерфейсов из других пакетов и библиотек
import com.example.zoomapsearchadntest.entities.AnimalsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.awt.*;

@Repository //Аннотация, обозначающая, что интерфейс ниже - репозиторий (Spring компонент, который обеспечивает доступ и методы доступа к данным таблицы animals)
//Интерфейс animalRepository, расширяющий интерфейс JpaRepository (Предоставляет реализацию CRUD-операций для сущностей JPA, то есть обеспечивает базовую функциональность взаимодействия с данными)
public interface animalsRepository extends JpaRepository<AnimalsEntity, Integer> { //JpaRepository<AnimalsEntity, Integer>: AnimalsEntity - сущность, с которой работает репозиторий; Integer - тип первичного ключа для этой сущности

}
