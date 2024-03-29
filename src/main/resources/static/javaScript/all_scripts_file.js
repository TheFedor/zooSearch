// Получаем ссылки на элементы DOM
const searchInputField = document.getElementById('searchInputField'); //Сохраняем ссылку на элемент страницы (поле ввода в блоке поиска) по id
const searchSubmitButton = document.getElementById('searchSubmitButton'); //Сохраняем ссылку на элемент (кнопка ввода в блоке поиска) по id

// переменная - матрица цветов карты
var colorMatrix = [];
var roadMatrix = [];

//Функция - заполнение матрицы
function findMapColorMatrix() {
    //получаем элемент map-container
    var mapContainer = document.getElementById('map-container');
    //получаем стиль backgroundImage этого класса
    var backgroundImageStyle = getComputedStyle(mapContainer).getPropertyValue('background-image');
    //извлекаем url из значения background-image
    var imageURL = backgroundImageStyle.replace('url("', '').replace('")', '');
    //создаем новый объект Image
    var image = new Image();
    //устанавливаем src изображения
    image.src = imageURL;
    console.log('ждем загрузки изображения');
    image.onload = function () {
        image.style.width = getComputedStyle(mapContainer).getPropertyValue('width');
        console.log('ширина задана: ' + image.style.width);
        image.style.height = getComputedStyle(mapContainer).getPropertyValue('height');
        console.log('высота задана: ' + image.style.height);

        //Заполняем матрицу по этому изображению

        //Небольшая пауза
        console.log('Небольшая пауза в 5 секунд');
        setTimeout(function() {
            console.log('Прошло 5 секунд');
            console.log('начинается обработка карты')
            // Создаем элемент canvas для работы с изображением
            var canvas = document.createElement('canvas');
            canvas.width = image.width;
            canvas.height = image.height;
            console.log('canvas создан')
            console.log('высота и ширина канвас: ' + canvas.height + ' ' + canvas.width);

            // Получаем контекст рисования на canvas
            var ctx = canvas.getContext('2d');
            console.log('контекст рисования не canvas')

            // Рисуем изображение на canvas
            ctx.drawImage(image, 0, 0);
            console.log('изображение на canvas нарисовано')

            // Получаем данные пикселей изображения
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;

            // Проходимся по каждому пикселю
            //попутно заполняем матрицу дорог (1 - дорога, 0 - не дорога
            console.log('111')
            for (var i = 0; i < data.length; i += 4) {
                // Получаем цвет пикселя (RGBA)
                var red = data[i];
                var green = data[i + 1];
                var blue = data[i + 2];
                var alpha = data[i + 3];

                // Сохраняем цвет пикселя в массив colorMatrix
                colorMatrix.push([red, green, blue, alpha]);
                if (i % 4000 === 0) {
                    console.log('i: ' + (i/4));
                }
                if (red === 0 && green === 150 && blue === 64 && alpha === 255) {
                    roadMatrix.push(1);
                } else {
                    roadMatrix.push(0);
                }
            }
            console.log('матрица дорог: ')
            console.log(roadMatrix);

        }, 5000); // 5000 миллисекунд = 5 секунд
    }

}

//вызываем функцию сразу
findMapColorMatrix();

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
    var briefInfo = selectedOption.getAttribute('animals-brief-description');
    displayAnimalBriefInfo(briefInfo);

    /*
    for (let y = 0; y < colorMatrix.length; y++) {
        let rowString = ""; // Создаем строку для текущей строки матрицы
        for (let x = 0; x < colorMatrix[y].length; x++) {
            // Получаем цвет текущего пикселя
            const color = colorMatrix[y][x];
            // Формируем строку с цветами текущей строки матрицы
            rowString += "[" + color.join(", ") + "] ";
        }
        // Выводим строку в консоль
        console.log(rowString);
    }*/
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

function displayAnimalBriefInfo(briefInfo) {
    document.getElementById('animals-information-block').innerHTML = briefInfo + '<br>Подробнее...';
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