//получаем контейнер top-panel
var topPanel = document.getElementById('top-panel');

//список для маршрутного листа (будет хранить массивы поочередно [name, x_coordinateOfEntrance, yCoordinateOfEntrance] ; [nameId, mainWay (bool)])
var routeList = [];
//создание общей переменной-счетчика
var counter = 0;


function addToRouteList(name, bool) { //Функция для добавления в маршрутный лист (bool=true - значит животное)
    console.log('добавляем в маршрутный лист по имени: ' + name)
    //ищем аватарку для добавления
    var imgSrc;
    var buildingName;
    if (bool) { //ищем по списку животных
        for (var i = 0; i < locationOfAnimals.length; ++i) {
            if (locationOfAnimals[i][0].toLowerCase() === name.toLowerCase()){ //если нашли животное
                imgSrc = locationOfAnimals[i][1];
                buildingName = locationOfAnimals[i][5];
                break;
            }
        }
    } else { //ищем по списку структур
        for (var i = 0; i < locationOfStructures.length; ++i) {
            if (locationOfStructures[i][0].toLowerCase() === name.toLowerCase()) {
                imgSrc = locationOfStructures[i][1];
                buildingName = locationOfStructures[i][4];
                break;
            }
        }
    }
    //теперь ищем адреса входов
    var thisEntrances = [];
    for (var i = 0; i < entrances.length; ++i) {
        if (entrances[i][0].toLowerCase() === buildingName.toLowerCase()) {
            var array = [entrances[i][1], entrances[i][2]];
            thisEntrances.push(array);
        }
    }

    //рассматриваем три случая: что это первая запись маршрутного листа, вторая или большая
    //здесь пока смухлюем и решим что у всех зданий один вход
    var routeInnerArray = [name, thisEntrances[0][0], thisEntrances[0][1]];
    if (routeList.length === 0) {
        routeList.push(routeInnerArray);
        //добавляем картинку в маршрутный лист
        addImageToTopPanel(imgSrc, name);
    } else if (routeList.length === 1) {
        routeList.push([counter, true]);
        routeList.push(routeInnerArray);
        //добавляем главный переход в маршрутный лист
        addArrowTranslationBetweenImagesOfRouteList(counter, true);
        counter += 1;
        //добавляем картинку в маршрутный лист
        addImageToTopPanel(imgSrc, name);
        //строим маршрут
    } else {
        routeList.push(counter, false);
        routeInnerArray = [name, thisEntrances[0][0], thisEntrances[0][1]];
        routeList.push(routeInnerArray);
        //добавляем стандартный переход в маршрутный лист
        addArrowTranslationBetweenImagesOfRouteList(counter, false);
        counter += 1;
        //добавляем картинку в маршрутный лист
        addImageToTopPanel(imgSrc, name);
        //строим маршрут
    }
}

function addArrowTranslationBetweenImagesOfRouteList(nameId, mainArrow) {
    var img = document.createElement('img');
    var specialId;
    if (mainArrow) { //если стрелка главного перехода
        img.src = '../photosOfRouteListTransition/Главный-переход.png';
        specialId = nameId + '▶main';
    } else {
        img.src = '../photosOfRouteListTransition/Переход.png';
        specialId = nameId + '▶stand';
    }
    img.style.height = '100%';
    img.style.width = 'auto';
    img.style.objectFit = 'cover';
    img.id = specialId;
    img.onclick = function () {
        makeArrowToMain(specialId);
    }
    topPanel.appendChild(img);
}

function makeArrowToMain(nameId) { // функция для перевода стрелки-перехода марш. листа в главную
    console.log("стрелка с id=" + nameId + "скоро будет главной");
}

function addImageToTopPanel(imgSrc, name) { //функция для добавления картинка в top-panel
    var img = document.createElement('img');
    img.src = imgSrc;
    //задаем размеры изображения
    img.style.height = '100%';
    img.style.width = 'auto';
    img.style.objectFit = 'cover';
    var specialId =  'img▶' + name;
    img.id = specialId;
    img.onclick = function() {
        dropImageFromTopPanel(specialId);
    }
    topPanel.appendChild(img);
}

function dropImageFromTopPanel(specialId) { //функция для удаления картинки из top-panel
    console.log('решили удалить из topPanel: ' + specialId);
}