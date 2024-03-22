//Пакет (папка) где находится файл
package com.example.zoomapsearchadntest.entities;
//импорт классов и аннотаций из библиотек (Jakarta Persistence API и Lombok)
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.util.*;
import java.util.ArrayList;

@Entity //Аннотация, обозначающая что класс ниже является сущностью в БД. Сопоставляет Java-класс с таблицей БД
@Table(name = "animals") //Аннотация, указывает что сущность AnimalsEntity будет отображаться на таблицу с именем "animals" в БД
@Getter //Аннотация Lombok, автоматически создает геттеры для всех полей класса
@Setter //Аннотация Lombok, автоматически создает сеттеры для всех полей класса
public class AnimalsEntity {

    @Id //Аннотация, указывает что поле ниже является первичным ключом для сущности AnimalsEntity
    @Column(name="id") //Аннотация, которая сопоставляет поле ниже столбцу "id" из таблицы БД
    private Integer id;

    @Column(name="animalphylum")
    private String animalPhylum;

    @Column(name="animalclass")
    private String animalClass;

    @Column(name="animalorder")
    private String animalOrder;

    @Column(name="animalfamily")
    private String animalFamily;

    @Column(name="animalgenus")
    private String animalGenus;

    @Column(name="animalspecies")
    private String animalSpecies;

    @Column(name="briefinfo")
    private String briefInfo;

    @Column(name="fullinfo")
    private String fullInfo;

    @Column(name="photolink")
    private String photoLink;

    public String getAnimalBaseInformation() {
        return animalPhylum + " " + animalClass;
    }

    @Override //Аннотация, указывает что метод ниже переопределен (т.е. уже был определен, но мы переписываем его как нам нужно)
    public String toString() {
        return "AnimalsEntity{" +
                "id=" + id +
                ", animalPhylum='" + animalPhylum + '\'' +
                ", animalClass='" + animalClass + '\'' +
                ", animalOrder='" + animalOrder + '\'' +
                ", animalFamily='" + animalFamily + '\'' +
                ", animalGenus='" + animalGenus + '\'' +
                ", animalSpecies='" + animalSpecies + '\'' +
                ", briefInfo='" + briefInfo + '\'' +
                ", fullInfo='" + fullInfo + '\'' +
                '}';
    }
}
