// Получаем ссылки на элементы DOM
const searchInputField = document.getElementById('searchInputField'); //Сохраняем ссылку на элемент страницы (поле ввода в блоке поиска) по id
const searchSubmitButton = document.getElementById('searchSubmitButton'); //Сохраняем ссылку на элемент (кнопка ввода в блоке поиска) по id

// переменная - матрица цветов карты
var colorMatrix = [];
var roadMatrix = [];
var roadMatrix2d = [];

//совсем временная переменная
var timeVariable = 0;

//временные переменные для рисования пути
// Получаем родительский элемент
var mapContainer = document.getElementById('map-container');
//рисуем наш путь
var canvas = document.createElement('canvas');
canvas.width = mapContainer.offsetWidth;
canvas.height = mapContainer.offsetHeight;
mapContainer.appendChild(canvas);
// Получаем контекст рисования для canvas
var ctx = canvas.getContext('2d');


//Совсем временная функция построения пути
function findRoad() {
    console.log('кликнули')
    var animalData = [
        { name: 'Азиатский слон.png', x: 50, y: 320 },
        { name: 'Африканский страус.png', x: 850, y: 450 },
        { name: 'Капская земляная белка.png', x: 100, y: 850 }
    ];

    var firstAnimal;
    var secondAnimal;

    if (timeVariable % 3 === 0){
        firstAnimal = animalData[0];
        secondAnimal = animalData[1];
        console.log('вариант 1')
        console.log('start: ' + firstAnimal.x + ';' + firstAnimal.y);
        console.log('end: ' + secondAnimal.x + ';' + secondAnimal.y);
    } else if (timeVariable % 3 === 1) {
        firstAnimal = animalData[0];
        secondAnimal = animalData[2];
        console.log('вариант 2')
        console.log('start: ' + firstAnimal.x + ';' + firstAnimal.y);
        console.log('end: ' + secondAnimal.x + ';' + secondAnimal.y);
    } else {
        firstAnimal = animalData[1];
        secondAnimal = animalData[2];
        console.log('вариант 3')
        console.log('start: ' + firstAnimal.x + ';' + firstAnimal.y);
        console.log('end: ' + secondAnimal.x + ';' + secondAnimal.y);
    }
    timeVariable += 1;

    var startX = firstAnimal.x;
    var startY = firstAnimal.y;
    var endX = secondAnimal.x;
    var endY = secondAnimal.y;

    console.log('начинаем искать путь')
    var path = findPath(startX, startY, endX, endY);
    console.log('путь найден: ' + path.length + ' ' + path[0].length);

    var iFoundIt = 0;
    for (var i = 0; i < path.length; ++i) {
        for (var j = 0; j < path[i].length; ++j) {
            if (path[i][j] === 2) {
                iFoundIt++;
            }
        }
    }
    console.log('теперь по path: ' + iFoundIt);

    // Очищаем весь canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < path.length; ++i) {
        for (var j = 0; j < path[i].length; ++j) {
            //если текущий элемент матрицы пути равен 2, то рисуем путь
            if (path[i][j] === 2) {
                ctx.fillStyle = '#00008B'; //цвет пути
                //рисуем пиксели в квадрате 20 от текущего
                for (var x = j - 7; x <= j + 7; ++x) {
                    for (var y = i - 7; y <= i + 7; ++y) {
                        if (x >= 0 && x < canvas.height && y >= 0 && y < canvas.width) {
                            ctx.fillRect(x, y, 1, 1); // рисуем пиксель
                        }
                    }
                }
            }
        }
    }
    console.log('нарисовано')
}

//функция поиска пути
function findPath(startX, startY, endX, endY) {
    var mapContainer = document.getElementById('map-container');

    //рисуем наш путь
    var canvas = document.createElement('canvas');
    canvas.width = mapContainer.width;
    canvas.height = mapContainer.height;
    mapContainer.appendChild(canvas);

    // Получаем контекст рисования для canvas
    var ctx = canvas.getContext('2d');


    var path = new Array(1000);
    var pathLength = new Array(1000);
    for (var i = 0; i < 1000; ++i) {
        var row = new Array(2000);
        var row1 = new Array(2000);
        for (var j = 0; j < 2000; ++j) {
            row[j] = -1;
            row1[j] = -1;
        }
        path[i] = row;
        pathLength[i] = row1;
    }
    pathLength[startY][startX] = 0;

    var query = new Array();
    query.push([startY, startX]);

    console.log('начинаем поиск пути');
    while (query.length > 0) {
        var now = query[0];
        ctx.fillStyle = 'blue'; //цвет пути
        ctx.fillRect(now[0], now[1], 1, 1); //рисуем пиксель
        var nowLength = pathLength[now[0]][now[1]];
        query.shift();
        //рассматриваем 8 окружающих точек
        if (now[0] + 1 < 1000) {
            if (now[1] + 1 < 2000) {
                if (roadMatrix2d[now[0]+1][now[1]+1] === 1 && (pathLength[now[0]+1][now[1]+1] < 0 || pathLength[now[0]+1][now[1]+1] > nowLength+1)) {
                    pathLength[now[0] + 1][now[1] + 1] = nowLength + 1;
                    query.push([now[0] + 1, now[1] + 1]);
                }
            }
            if (now[1] - 1 >= 0) {
                if (roadMatrix2d[now[0]+1][now[1]-1] === 1 && (pathLength[now[0]+1][now[1]-1] < 0 || pathLength[now[0]+1][now[1]+1] > nowLength+1)) {
                    pathLength[now[0] + 1][now[1] - 1] = nowLength + 1;
                    query.push([now[0] + 1, now[1] - 1]);
                }
            }
            if (roadMatrix2d[now[0]+1][now[1]] === 1 && (pathLength[now[0]+1][now[1]] < 0 || pathLength[now[0]+1][now[1]] > nowLength+1)) {
                pathLength[now[0] + 1][now[1]] = nowLength + 1;
                query.push([now[0] + 1, now[1]]);
            }
        }
        if (now[1] + 1 < 2000) {
            if (now[0] - 1 >= 0) {
                if (roadMatrix2d[now[0]-1][now[1]+1] === 1 && (pathLength[now[0]-1][now[1]+1] < 0 || pathLength[now[0]-1][now[1]+1] > nowLength+1)) {
                    pathLength[now[0] - 1][now[1] + 1] = nowLength + 1;
                    query.push([now[0] - 1, now[1] + 1]);
                }
            }
            if (roadMatrix2d[now[0]][now[1]+1] === 1 && (pathLength[now[0]][now[1]+1] < 0 || pathLength[now[0]][now[1]+1] > nowLength+1)) {
                pathLength[now[0]][now[1] + 1] = nowLength + 1;
                query.push([now[0], now[1] + 1]);
            }
        }
        if (now[0] - 1 >= 0) {
            if (now[1] - 1 >= 0) {
                if (roadMatrix2d[now[0]-1][now[1]-1] === 1 && (pathLength[now[0]-1][now[1]-1] < 0 || pathLength[now[0]-1][now[1]-1] > nowLength+1)) {
                    pathLength[now[0]-1][now[1] - 1] = nowLength + 1;
                    query.push([now[0]-1, now[1] - 1]);
                }
            }
            if (roadMatrix2d[now[0]-1][now[1]] === 1 && (pathLength[now[0]-1][now[1]] < 0 || pathLength[now[0]-1][now[1]] > nowLength+1)) {
                pathLength[now[0]-1][now[1]] = nowLength + 1;
                query.push([now[0]-1, now[1]]);
            }
        }
        if (now[1] - 1 >= 0) {
            if (roadMatrix2d[now[0]][now[1]-1] === 1 && (pathLength[now[0]][now[1]-1] < 0 || pathLength[now[0]][now[1]-1] > nowLength+1)) {
                pathLength[now[0]][now[1] - 1] = nowLength + 1;
                query.push([now[0], now[1] - 1]);
            }
        }
    }
    console.log('Длина пути: ' + pathLength[endY][endX]);

    //обрабатываем полученный результат и прописываем кратчайший путь в матрицу path
    path[startY][startX] = 2;
    path[endY][endX] = 2;
    var nowToPath = [endY, endX];
    while (nowToPath[0] !== startY && nowToPath[1] !== startX) {
        var now = nowToPath;
        //осматриваем от конца все 8 направлений
        var nowLength = pathLength[now[0]][now[1]];
        var nextCoordinate;
        if (now[0] + 1 < 1000) {
            if (now[1] + 1 < 2000) {
                if (pathLength[now[0]+1][now[1]+1] === nowLength-1) {
                    nextCoordinate = [now[0]+1,now[1]+1];
                }
            }
            if (now[1] - 1 >= 0) {
                if (pathLength[now[0]+1][now[1]-1] === nowLength-1) {
                    nextCoordinate = [now[0]+1,now[1]-1];
                }
            }
            if (pathLength[now[0]+1][now[1]] === nowLength-1) {
                nextCoordinate = [now[0]+1,now[1]];
            }
        }
        if (now[1] + 1 < 2000) {
            if (now[0] - 1 >= 0) {
                if (pathLength[now[0]-1][now[1]+1] === nowLength-1) {
                    nextCoordinate = [now[0]-1,now[1]+1];
                }
            }
            if (pathLength[now[0]][now[1]+1] === nowLength-1) {
                nextCoordinate = [now[0],now[1]+1];
            }
        }
        if (now[0] - 1 >= 0) {
            if (now[1] - 1 >= 0) {
                if (pathLength[now[0]-1][now[1]-1] === nowLength-1) {
                    nextCoordinate = [now[0]-1,now[1]-1];
                }
            }
            if (pathLength[now[0]-1][now[1]] === nowLength-1) {
                nextCoordinate = [now[0]-1,now[1]];
            }
        }
        if (now[1] - 1 >= 0) {
            if (pathLength[now[0]][now[1]-1] === nowLength-1) {
                nextCoordinate = [now[0],now[1]-1];
            }
        }
        path[nextCoordinate[0]][nextCoordinate[1]] = 2;
        nowToPath = [nextCoordinate[0], nextCoordinate[1]];
    }

    return path;

}

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
                var tr = true;
                if (red >=0 && red <= 30) {
                    if (green >= 140 && green <= 150) {
                        if (blue >= 60 && blue <= 70){
                            roadMatrix.push(1);
                            tr = false;
                        }
                    }
                }
                if (tr) {
                    roadMatrix.push(0);
                }
            }
            console.log('матрица дорог: ')
            console.log(roadMatrix);
            console.log('размер матрицы дорог: ' + roadMatrix.length);
            makeRoadMatrixTo2D(roadMatrix);
        }, 5000); // 5000 миллисекунд = 5 секунд
    }
}

//создаем функцию для задания 2d версии матрицы дорог
function makeRoadMatrixTo2D(matrix) {
    var rows = 1000;
    var cols = 2000;
    for (var i = 0; i < rows; ++i) {
        var row = [];
        for (var j = 0; j < cols; ++j) {
            var index = i * cols + j;
            row.push(roadMatrix[index]);
        }
        roadMatrix2d.push(row);
    }
}

//вызываем функцию сразу
findMapColorMatrix();

//функция для размещения аватаров на экране
function placingAnimalsAvatarOnTheMap() {

    var animalData = [
        { name: 'Азиатский слон.png', x: 50, y: 320 },
        { name: 'Африканский страус.png', x: 850, y: 450 },
        { name: 'Капская земляная белка.png', x: 100, y: 850 }
    ];

    console.log('размещаем аватары');

    // Получаем родительский элемент, в который будем добавлять изображения
    var mapContainer = document.getElementById('map-container');

    // Проходимся по массиву с данными об изображениях
    animalData.forEach(function(animal) {
        console.log('размещаем аватар: ' + animal.name);
        // Создаем новый элемент <img>
        var img = document.createElement('img');

        // Устанавливаем путь к изображению
        img.src = '../animalsAvatars/' + animal.name;

        // Устанавливаем абсолютное позиционирование
        img.style.position = 'absolute';

        // Устанавливаем координаты изображения относительно блока map-container
        img.style.left = animal.x + 'px';
        img.style.top = animal.y + 'px';

        // Устанавливаем id изображения
        img.id = animal.name.split('.').slice(0, -1).join('');

        // Добавляем изображение в родительский элемент
        mapContainer.appendChild(img);
    });
};

//вызываем функцию сразу
placingAnimalsAvatarOnTheMap();

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