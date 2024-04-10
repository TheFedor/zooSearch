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
    console.log('Полученные данные по расположению животных');
    for (var i = 0; i < locationOfAnimals.length; ++i) {
        console.log(i + ': ' + locationOfAnimals[i][0] + ' ; ' + locationOfAnimals[i][1] + ' ; ' + locationOfAnimals[i][2] + ' ; ' + locationOfAnimals[i][3] + ' ; ' + locationOfAnimals[i][4] + ' ; ' + locationOfAnimals[i][5]);
    }
    console.log('Полученные данные по структурам')
    for (var i = 0; i < locationOfStructures.length; ++i) {
        console.log(i + ': ' + locationOfStructures[i][0] + ' ; ' + locationOfStructures[i][1] + ' ; ' + locationOfStructures[i][2] + ' ; ' + locationOfStructures[i][3] + ' ; ' + locationOfStructures[i][4]);
    }
    console.log('Данные по входам')
    for (var i = 0; i < entrances.length; ++i) {
        console.log(i + ": " + entrances[i][0] + ' ; ' + entrances[i][1] + ' ; ' + entrances[i][2]);
    }
}

//сразу вызываем функцию
displayAllAvatars();