// Получаем ссылки на элементы DOM
const searchInputField = document.getElementById('searchInputField'); //Сохраняем ссылку на элемент страницы (поле ввода в блоке поиска) по id
const searchSubmitButton = document.getElementById('searchSubmitButton'); //Сохраняем ссылку на элемент (кнопка ввода в блоке поиска) по id

function filterAnimals() { //функция для поиска животных по списку
    var inputField, filter, selectBlock, options, option, i, j, txtValue, evenAndOddCounter; //объявляем переменные
    inputField = document.getElementById('searchInputField'); //получение элемента из DOM по id
    filter = inputField.value.toUpperCase(); //сохраняем преобразованное в верхний регистр значение из input
    selectBlock = document.getElementById('animal-select'); //получение элемента из DOM по id
    options = selectBlock.getElementsByTagName('option'); //получение элемента из DOM внутри элемента select по тегу option

    evenAndOddCounter = true; // true = четные, false = нечетные
    for (i = 0; i < options.length; ++i) { //цикл размера числа объектов options
        option = options[i]; //получаем текущий объект option
        txtValue = option.textContent || option.innerText; //получаем текстовое содержимое блока option (используется "вариант ИЛИ вариант", так как в старых версиях IE первый вариант может не поддерживаться)

        var content = getComputedStyle(option, '::before').getPropertyValue('content'); //получаем текстовое содержимое блока option, добавленное при помощи css файла
        content = content.replace(/^"(.*)"$/, '$1'); //удаляем двойные кавычки из начала и конца строки (если они есть)
        txtValue += '▶' + content
        var txtValues = txtValue.split('▶'); //разделяем значения

        option.style.display = "none"; //скрываем поле option
        for (j = 0; j < txtValues.length; ++j) {
            if (txtValues[j].toUpperCase().indexOf(filter) > -1) { //если поле option включает filter
                option.style.display = ""; //отображаем поле option
                if (evenAndOddCounter) { //если это четное поле option
                    option.style.backgroundColor = "#f0fff0";
                    evenAndOddCounter = false;
                } else { // если это нечетное поле option
                    option.style.backgroundColor = "#c7fcec";
                    evenAndOddCounter = true;
                }
                break;
            }
        }
    }
}

function selectAnimalPhotoAndData() { //функция для отображения картинки и информации о животном
    var selectBlock = document.getElementById('animal-select');
    var selectedOption = selectBlock.options[selectBlock.selectedIndex];
    var photoLink = selectedOption.getAttribute('data-photo');
    displayAnimalPhoto(photoLink);
}

function displayAnimalPhoto(photoLink) { //функция для отображения соответствующей фотографии животного
    var imageBlock = document.getElementById('animals-image-block');
    if (photoLink) {
        imageBlock.style.backgroundSize = 'contain';
        imageBlock.style.backgroundImage = 'url(' + photoLink + ')';
    } else {
        animalPhoto.style.backgroundImage = 'url(' + 'baseBackground/moskovskij_zoopark.png' + ')';
    }
}



// Обработчик события для кнопки "Ввести"
/*
searchSubmitButton.addEventListener('click', function() { //устанавливаем функцию (слушатель) на событие клика по объекту searchSubmitButton
    const inputValue = searchInputField.value; //Получаем значение из поля ввода по ссылке searchInputField

    // Создаем новый элемент для отображения текста
    const newTextElement = document.createElement('p'); //создаем новый элемент <p> для отображения текста
    newTextElement.textContent = inputValue; //Устанавливаем текстовое содержимое нового элемента равным полученному ранее значению

    // Добавляем новый элемент в соответствующий контейнер
    const middleInnerContainer = document.querySelector('.middle-inner-container'); //Сохраняем ссылку на элемент страницы (средний контейнер блока ввода) по классу
    middleInnerContainer.appendChild(newTextElement); //Добавляем новый элемент <p> внутрь контейнера '.middle-inner-container'

    searchInputField.value = ''; //Очищаем поле ввода после добавления текста
});*/

// Обработчик события для изменения размера поля ввода
/*
searchInputField.addEventListener('input', function() { //Устанавливаем функцию (слушатель) на событие ввода данных в поле объекта searchInputField
    this.style.width = (this.value.length * 8) + 'px'; //Устанавливаем ширину поля равной ширине его содержимого, умноженного на 8
});
 */