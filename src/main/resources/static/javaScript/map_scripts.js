//получаем элементы общие для многих функций
var mapContainer = document.getElementById('map-container');
//создаем канвас для последующего рисования
var canvas = document.createElement('canvas');
canvas.width = mapContainer.offsetWidth;
canvas.height = mapContainer.offsetHeight;
mapContainer.appendChild(canvas);
//Получаем контекст рисования для canvas
var ctx = canvas.getContext('2d');

//на всякий случай создаем внешние матрицы расположения животных/структур и их входов
var locationOfAnimals = [];
var locationOfStructures = [];
var entrances = [];

//создаем вектор цветов карты
var mapColorVector = []; //2500 - ширина, 1500 - высота
//создаем матрицу дорог
var mapRoadMatrix = Array.from({ length: 1500 }, function() {
    return Array.from({ length: 2500 }, function() { return 0; });
});


//функция для заполнения вектора цветов
function fillingMapColorVector() {
    //получаем изображение - задний фон карты
    var backgroundImage = getComputedStyle(mapContainer).getPropertyValue('background-image');
    //извлекаем url из значения background-image
    var backgroundImageUrl = backgroundImage.replace('url("', '').replace('")', '');
    //создаем новый объект Java - изображение
    var image = new Image();
    //устанавливаем сурс нового изображения
    image.src = backgroundImageUrl;

    //console.log('ждем загрузки изображения');
    image.onload = function () {

        image.style.width = getComputedStyle(mapContainer).getPropertyValue('width');
        image.style.height = getComputedStyle(mapContainer).getPropertyValue('height');

        //небольшая пауза в 15 секунд
        setTimeout(function () {
            //console.log('Пауза в 15 секунд прошла');


            //создаем канвас для работы с изображением
            var localCanvas = document.createElement('canvas');
            localCanvas.width = image.width;
            localCanvas.height = image.height;

            //Получаем контекст рисования на канвас
            var localCtx = localCanvas.getContext('2d');
            //рисуем изображение на канвас
            localCtx.drawImage(image, 0, 0);

            //Получаем данные пикселей изображения
            var localImageData = localCtx.getImageData(0,0,localCanvas.width,localCanvas.height);
            var localData = localImageData.data;

            //проходим по каждому пикселю, сохраняя в формате RGBA
            for (var i = 0; i < localData.length; i+=4) {
                //if (i % 4000000 === 0) {
                    //console.log("текущая итерация: " + (i/4));
                //}
                // Получаем цвет пикселя (RGBA)
                var red = localData[i];
                var green = localData[i + 1];
                var blue = localData[i + 2];
                var alpha = localData[i + 3];

                //сохраняем цвета пикселей в (пока еще не матрицу) матрицу цветов
                mapColorVector.push([red, green, blue, alpha]);
            }

            //console.log('Матрица цветов получена');
            //console.log('Размер матрицы цветов: ' + mapColorVector.length);

            fillingMapRoadMatrix();

            //временная функция для проверки корректности полученных дорог
            //timeFuncToCheckCorrectlyRoadFilling()

        }, 5000);

    }

}

//сразу вызываем функцию
fillingMapColorVector();

//функция для построения матрицы дорог
function fillingMapRoadMatrix() {
    //console.log('Получаем матрицу дорог')
    //сразу заполняем матрицы дорог (1 - есть дорога, 2 - дороги нет)
    //для этого будем циклами проходить по матрице дорог и счетной переменной - по вектору цветов, для дорог подходит диапазон цветов
    var indexMapColorVector = 0;

    for (var i = 0; i < 1500; ++i) {
        for (var j = 0; j < 2500; ++j) {
            //если цвет подходит под диапазон цветов дороги
            var red = mapColorVector[indexMapColorVector][0];
            var green = mapColorVector[indexMapColorVector][1];
            var blue = mapColorVector[indexMapColorVector][2];
            if (red >= 0 && red <= 10 && green >= 123 && green <= 133 && blue >= 57 && blue <= 67) {
                mapRoadMatrix[i][j] = 1;
            } else {
                mapRoadMatrix[i][j] = -1;
            }
            indexMapColorVector++;
        }
    }
    //console.log("Матрица дорог составлена")
}

//временная функция для визуализации определенных дорог на карте в веб-сайте
function timeFuncToCheckCorrectlyRoadFilling() {
    // Очищаем весь canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < 1500; ++i) {
        for (var j = 0; j < 2500; ++j) {
            if (mapRoadMatrix[i][j] == 1) {
                // Устанавливаем цвет с альфа-каналом 0.5 (полупрозрачный красный)
                ctx.fillStyle = 'rgba(255, 0, 0, 0.4)';
                ctx.fillRect(j, i, 1, 1);
            } else {
                // Устанавливаем цвет с альфа-каналом 0.5 (полупрозрачный красный)
                ctx.fillStyle = 'rgba(255, 255, 0, 0.4)';
                ctx.fillRect(j, i, 1, 1);
            }
        }
    }
}


//обработка зума + (поменять)
document.getElementById('zoom-in').addEventListener('click', function () {
    mapContainer.style.width = (mapContainer.offsetWidth + 500) + 'px';
    mapContainer.style.height = (mapContainer.offsetHeight + 300) + 'px';
    mapContainer.style.left = (mapContainer.offsetLeft - 5) + 'px';
    mapContainer.style.top = (mapContainer.offsetTop - 5) + 'px';
})
//обработка зума - (поменять)
document.getElementById('zoom-out').addEventListener('click', function () {
    mapContainer.style.width = (mapContainer.offsetWidth - 500) + 'px';
    mapContainer.style.height = (mapContainer.offsetHeight - 300) + 'px';
    mapContainer.style.left = (mapContainer.offsetLeft - 5) + 'px';
    mapContainer.style.top = (mapContainer.offsetTop - 5) + 'px';
})

function gettingLocationsAndCoordinatesOfEntrances() { //функция для заполнения списков расположения объектов и входов
    //console.log('получение информации о расположении животных/структур и входов');
    var blockForDataTransmission = document.getElementById('hidden-block-for-data-transmission');
    var localLocationOfAnimals = blockForDataTransmission.getAttribute('location-of-animals');
    var localLocationOfStructures = blockForDataTransmission.getAttribute('location-of-structures');
    var localEntrances = blockForDataTransmission.getAttribute('data-entrances');
    localLocationOfAnimals = JSON.parse(localLocationOfAnimals);
    localLocationOfStructures = JSON.parse(localLocationOfStructures);
    localEntrances = JSON.parse(localEntrances);

    //console.log('данные расположений получены');
    locationOfAnimals = localLocationOfAnimals;
    locationOfStructures = localLocationOfStructures;
    entrances = localEntrances;
}

//сразу вызываем функцию
gettingLocationsAndCoordinatesOfEntrances();

function displayAllAvatars() { //функция для отображения аватарок на карте

    //проходим по массиву с аватарками животных
    var uniqueElements = {};
    for (var i = 0; i < locationOfAnimals.length; ++i) {
        //console.log('размещаем аватар: ' + locationOfAnimals[i][0]);
        if (locationOfAnimals[i][2].toLowerCase() === 'null') { //размещаем аватарку животного
            //console.log('    отдельная зона');
            var img = document.createElement('img'); //создаем новый элемент - изображение
            img.src = locationOfAnimals[i][1]; //устанавливаем путь к изображению
            img.style.position = 'absolute'; //устанавливаем абсолютное позиционирование
            //устанавливаем размеры изображения
            img.width = 40;
            img.height = 40;
            //устанавливаем координаты изображения относительно блока map-container
            var xCoordinate = parseInt(locationOfAnimals[i][3].trim());
            var yCoordinate = parseInt(locationOfAnimals[i][4].trim());
            img.style.left = (xCoordinate) + 'px';
            img.style.top = (yCoordinate) + 'px';
            //устанавливаем id изображения
            img.id = locationOfAnimals[i][0] + '▶' + locationOfAnimals[i][5];
            //добавляем изображение в родительский элемент
            mapContainer.appendChild(img);
        } else { //размещаем аватарку постройки, если еще не была размещена
            //console.log('    общее здание')
            if (!uniqueElements[locationOfAnimals[i][2]]) { //только если ранее не размещали эту аватарку
                uniqueElements[locationOfAnimals[i][2]] = true;
                var img = document.createElement('img'); //создаем новый элемент - изображение
                img.src = locationOfAnimals[i][2]; //устанавливаем путь к изображению
                img.style.position = 'absolute'; //устанавливаем абсолютное позиционирование
                //устанавливаем размеры изображения
                img.width = 40;
                img.height = 40;
                //устанавливаем координаты изображения относительно блока map-container
                var xCoordinate = parseInt(locationOfAnimals[i][3].trim());
                var yCoordinate = parseInt(locationOfAnimals[i][4].trim());
                img.style.left = (xCoordinate) + 'px';
                img.style.top = (yCoordinate) + 'px';
                //устанавливаем id изображения
                img.id = locationOfAnimals[i][0] + '▶' + locationOfAnimals[i][5];
                //добавляем изображение в родительский элемент
                mapContainer.appendChild(img);
            }
        }
    }

    //проходим по массиву с аватарками структур
    for (var i = 0; i < locationOfStructures.length; ++i) {
        //console.log('размещаем структуры');
        var img = document.createElement('img');
        img.src = locationOfStructures[i][1];
        img.style.position = 'absolute';
        img.width = 40;
        img.height = 40;
        var xCoordinate = parseInt(locationOfStructures[i][2].trim());
        var yCoordinate = parseInt(locationOfStructures[i][3].trim());
        img.style.left = (xCoordinate) + 'px';
        img.style.top = (yCoordinate) + 'px';
        img.id = locationOfStructures[i][0] + '▶' + locationOfStructures[i][4];
        mapContainer.appendChild(img);
    }

}

//сразу вызываем функцию
displayAllAvatars();