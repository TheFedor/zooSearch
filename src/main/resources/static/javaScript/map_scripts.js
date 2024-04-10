//получаем элементы общие для многих функций
var mapContainer = document.getElementById('map-container');
//создаем канвас для последующего рисования
var canvas = document.createElement('canvas');
canvas.width = mapContainer.offsetWidth;
canvas.height = mapContainer.offsetHeight;
mapContainer.appendChild(canvas);
//Получаем контекст рисования для canvas
var ctx = canvas.getContext('2d');

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

function displayAllAvatars() {
    //var entityDataElement = document.getElementById('avatars-data');
    //var animalAvatarsList = JSON.parse(entityDataElement.getAttribute('data-animal-avatars'));
    //var structureAvatarsList = JSON.parse(entityDataElement.getAttribute('data-structure-avatars'));

    console.log('размещаем аватары');

    var matrElement = document.getElementById('matr');
    var matr1 = matrElement.getAttribute('matr1');

    matr1 = JSON.parse(matr1);
    console.log('выводим матрицы:')
    console.log(matr1[0][0]);
    console.log(matr1[0][1]);
    console.log(matr1[1][0]);
    console.log(matr1[1][1]);
    console.log('вывели матрицы.')

}

//сразу вызываем функцию
displayAllAvatars();