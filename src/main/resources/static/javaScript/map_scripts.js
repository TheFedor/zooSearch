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

//обработка зума (возможно временно)
document.getElementById('zoom-in').addEventListener('click', function () {
    mapContainer.style.width = (mapContainer.offsetWidth + 500) + 'px';
    mapContainer.style.height = (mapContainer.offsetHeight + 300) + 'px';
    mapContainer.style.left = (mapContainer.offsetLeft - 5) + 'px';
    mapContainer.style.top = (mapContainer.offsetTop - 5) + 'px';
})

document.getElementById('zoom-out').addEventListener('click', function () {
    mapContainer.style.width = (mapContainer.offsetWidth - 500) + 'px';
    mapContainer.style.height = (mapContainer.offsetHeight - 300) + 'px';
    mapContainer.style.left = (mapContainer.offsetLeft - 5) + 'px';
    mapContainer.style.top = (mapContainer.offsetTop - 5) + 'px';
})

function gettingLocationsAndCoordinatesOfEntrances() {
    console.log('получение информации о расположении животных/структур и входов');
    var blockForDataTransmission = document.getElementById('hidden-block-for-data-transmission');
    var localLocationOfAnimals = blockForDataTransmission.getAttribute('location-of-animals');
    var localLocationOfStructures = blockForDataTransmission.getAttribute('location-of-structures');
    var localEntrances = blockForDataTransmission.getAttribute('data-entrances');
    localLocationOfAnimals = JSON.parse(localLocationOfAnimals);
    localLocationOfStructures = JSON.parse(localLocationOfStructures);
    localEntrances = JSON.parse(localEntrances);

    console.log('данные расположений получены');
    locationOfAnimals = localLocationOfAnimals;
    locationOfStructures = localLocationOfStructures;
    entrances = localEntrances;
}

//сразу вызываем функцию
gettingLocationsAndCoordinatesOfEntrances();

function displayAllAvatars() {

    //проходим по массиву с аватарками животных
    var uniqueElements = {};
    for (var i = 0; i < locationOfAnimals.length; ++i) {
        console.log('размещаем аватар: ' + locationOfAnimals[i][0]);
        if (locationOfAnimals[i][2].toLowerCase() === 'null') { //размещаем аватарку животного
            console.log('    отдельная зона');
            var img = document.createElement('img'); //создаем новый элемент - изображение
            img.src = locationOfAnimals[i][1]; //устанавливаем путь к изображению
            img.style.position = 'absolute'; //устанавливаем абсолютное позиционирование
            //устанавливаем размеры изображения
            img.width = 40;
            img.height = 40;
            //устанавливаем координаты изображения относительно блока map-container
            var xCoordinate = parseInt(locationOfAnimals[i][3].trim());
            var yCoordinate = parseInt(locationOfAnimals[i][4].trim());
            img.style.left = (xCoordinate/8) + 'px';
            img.style.top = (yCoordinate/8) + 'px';
            //устанавливаем id изображения
            img.id = locationOfAnimals[i][0] + '▶' + locationOfAnimals[i][5];
            //добавляем изображение в родительский элемент
            mapContainer.appendChild(img);
        } else { //размещаем аватарку постройки, если еще не была размещена
            console.log('    общее здание')
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
                img.style.left = (xCoordinate/8) + 'px';
                img.style.top = (yCoordinate/8) + 'px';
                //устанавливаем id изображения
                img.id = locationOfAnimals[i][0] + '▶' + locationOfAnimals[i][5];
                //добавляем изображение в родительский элемент
                mapContainer.appendChild(img);
            }
        }
    }

    //проходим по массиву с аватарками структур
    for (var i = 0; i < locationOfStructures.length; ++i) {
        console.log('размещаем структуры');
        var img = document.createElement('img');
        img.src = locationOfStructures[i][1];
        img.style.position = 'absolute';
        img.width = 40;
        img.height = 40;
        var xCoordinate = parseInt(locationOfStructures[i][2].trim());
        var yCoordinate = parseInt(locationOfStructures[i][3].trim());
        img.style.left = (xCoordinate/8) + 'px';
        img.style.top = (yCoordinate/8) + 'px';
        img.id = locationOfStructures[i][0] + '▶' + locationOfStructures[i][4];
        mapContainer.appendChild(img);
    }

}

//сразу вызываем функцию
displayAllAvatars();