//Пакет (папка) где находится файл
package com.example.zoomapsearchadntest;
//Импорт необходимых классов и интерфейсов из других пакетов и библиотек. В данном случае, используются классы из Spring Boot для запуска приложения
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication //Составная аннотация, которая объединяет в себе несколько других аннотаций. Она объявляет класс ниже как основной класс Spring Boot приложения, т.е. когда Spring boot обнаруживает эту аннотацию, он автоматически настраивает Spring приложение в соответствии с настройками по умолчанию и всеми добавлениями и переопределениями, которые указал разработчик
public class ZooMapSearchAdnTestApplication { //Основной класс (entry point) приложения

    public static void main(String[] args) { //точка входа в приложение

        SpringApplication.run(ZooMapSearchAdnTestApplication.class, args); //Метод run класса SpringApplication запускает Spring Boot приложение, загружая все компоненты и настраивая их в соответствии с аннотациями и конфигурацией. Параметр 'ZooMapSearchAdnApplication.class' указывает на основной класс приложения, а параметр 'args' передает аргументы командной строки приложению, если они есть
    }

}
