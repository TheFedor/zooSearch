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
    var name = name + '▶' + counter;
    counter += 1;
    var routeInnerArray = [name, thisEntrances[0][0], thisEntrances[0][1]];
    if (routeList.length === 0) {
        routeList.push(routeInnerArray);
        //добавляем картинку в маршрутный лист
        addImageToTopPanel(imgSrc, name);
        console.log('добавили: ' + routeList[routeList.length-1]);
    } else if (routeList.length === 1) {
        routeList.push([counter + '▶arrow', true]);
        routeList.push(routeInnerArray);
        //добавляем главный переход в маршрутный лист
        addArrowTranslationBetweenImagesOfRouteList(counter, true);
        counter += 1;
        //добавляем картинку в маршрутный лист
        addImageToTopPanel(imgSrc, name);
        //строим маршрут
        console.log('добавили: ' + routeList[routeList.length-2] + '  а также: '  + routeList[routeList.length-1]);
    } else {
        routeList.push([counter + '▶arrow', false]);
        routeList.push(routeInnerArray);
        //добавляем стандартный переход в маршрутный лист
        addArrowTranslationBetweenImagesOfRouteList(counter, false);
        counter += 1;
        //добавляем картинку в маршрутный лист
        addImageToTopPanel(imgSrc, name);
        //строим маршрут
        console.log('добавили: ' + routeList[routeList.length-2] + '  а также: '  + routeList[routeList.length-1]);
    }
    console.log('текущий routeList:');
    for (var i = 0; i < routeList.length; ++i) {
        console.log(i  + ': ' + routeList[i]);
    }
    console.log('Размер routeList: ' + routeList.length);
    console.log(' ');
}

function addArrowTranslationBetweenImagesOfRouteList(nameId, mainArrow) {
    var img = document.createElement('img');
    var specialId = nameId + '▶arrow';
    if (mainArrow) { //если стрелка главного перехода
        img.src = '../photosOfRouteListTransition/Главный-переход.png';
    } else {
        img.src = '../photosOfRouteListTransition/Переход.png';
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
    console.log('меняем главную стрелку на ' + nameId);
    //Для начала убираем прошлую mainWay
    console.log('ищем старую главную стрелку ');
    for (var i = 1; i < routeList.length; i+=2) {
        console.log(i + '- ' + routeList[i][0]);
        if (routeList[i][1]) {
            console.log('старая найдена: ' + routeList[i][0] + 'на индексе: '  + i);

            routeList[i][1] = false;
            var lastMainArrow = document.getElementById(routeList[i][0]);
            if (lastMainArrow) {
                lastMainArrow.src = '../photosOfRouteListTransition/Переход.png';
            } else { console.log('Прошлая main стрелка не была найдена'); }
            break;
        }
    }
    //теперь делаем текущую стрелку mainWay
    console.log('теперь ищем новую главную стрелку ' + nameId);
    for (var i = 1; i < routeList.length; i+=2) {
        console.log(i + '- ' + routeList[i][0]);
        if (routeList[i][0] === nameId) {
            console.log('новая найдена: ' + routeList[i][0] + 'на индексе: ' + i);
            routeList[i][1] = true;
            var newMainArrow = document.getElementById(nameId);
            if (newMainArrow) {
                newMainArrow.src = '../photosOfRouteListTransition/Главный-переход.png';
            } else { console.log('Новая main стрелка ' + nameId + ' не найдена'); }
            break;
        }
    }
    console.log(' ');

    //строим маршрут
}

function addImageToTopPanel(imgSrc, name) { //функция для добавления картинка в top-panel
    var img = document.createElement('img');
    img.src = imgSrc;
    //задаем размеры изображения
    img.style.height = '100%';
    img.style.width = 'auto';
    img.style.objectFit = 'cover';
    var specialId =  name;
    img.id = specialId;
    img.onclick = function() {
        dropImageFromTopPanel(specialId);
    }
    topPanel.appendChild(img);
}

function dropImageFromTopPanel(specialId) { //функция для удаления картинки из top-panel
    //ищем удаляемое изображение в маршрутном листе
    var index;
    for (var i = 0; i < routeList.length; i+= 2) {
        if (routeList[i][0].toLowerCase() === specialId.toLowerCase()) {
            index = i;
            break;
        }
    }

    //получаем важность стрелки после изображения (если она есть)
    var mainArrowAfter = false;
    var mainArrowBefore = false;
    if (index + 1 < routeList.length)
    {
        if (routeList[index+1][1]) {
            mainArrowAfter = true;
        }
    }
    if (index - 1 >= 0) {
        if (routeList[index-1][1]) {
            mainArrowBefore = true;
        }
    }

    var imageToDelete = document.getElementById(specialId);

    //рассматриваем случаи: удаляют последнее изображение (просто и перед ним mainWay) / удаляют единственное изображение / удаляют изображение перед mainWay (просто и изображение первое) /удаляют стандарт
    if (index === (routeList.length - 1)) { //первый случай
        if (routeList.length === 1) { //второй случай
            console.log('Путь 4');
            if (imageToDelete) {
                topPanel.removeChild(imageToDelete);
                routeList.splice(index, 1);
            } else {
                console.log('Изображение' + specialId + 'не найдено')
            }
        } else { //продолжение первого случая
            if (mainArrowBefore) { //вторая часть первого случая
                //если всего в маршрутном листе две точки
                if (routeList.length === 3) {
                    console.log('Путь 2');
                    var arrowName = routeList[index-1][0];
                    var arrowToDelete = document.getElementById(arrowName);
                    //удаляем картинки
                    if (imageToDelete && arrowToDelete) {
                        topPanel.removeChild(imageToDelete);
                        topPanel.removeChild(arrowToDelete);
                        //удаляем изображение и стрелку из списка
                        routeList.splice(index-1, 2);
                    } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
                } else {
                    console.log('Путь 3');
                    //передвигаем стрелку mainWay на один раньше
                    makeArrowToMain(routeList[index-3][0]);
                    //далее удаляем по стандарту
                    var arrowName = routeList[index-1][0];
                    var arrowToDelete = document.getElementById(arrowName);
                    //удаляем картинки
                    if (imageToDelete && arrowToDelete) {
                        topPanel.removeChild(imageToDelete);
                        topPanel.removeChild(arrowToDelete);
                        //удаляем изображение и стрелку из списка
                        routeList.splice(index-1, 2);
                    } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
                }
            } else { //первая часть первого случая
                console.log('Путь 1');
                //получаем id стрелки после для ее удаления
                var arrowName = routeList[index-1][0];
                var arrowToDelete = document.getElementById(arrowName);
                //удаляем картинки
                if (imageToDelete && arrowToDelete) {
                    topPanel.removeChild(imageToDelete);
                    topPanel.removeChild(arrowToDelete);
                    //удаляем изображение и стрелку из списка
                    routeList.splice(index-1, 2);
                } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
            }
        }
    } else if (mainArrowAfter) {
        if (routeList.length === 3) {
            console.log('Путь 5');
            //получаем id стрелки после для ее удаления
            var arrowName = routeList[index+1][0];
            var arrowToDelete = document.getElementById(arrowName);
            //удаляем картинки
            if (imageToDelete && arrowToDelete) {
                topPanel.removeChild(imageToDelete);
                topPanel.removeChild(arrowToDelete);
                //удаляем изображение и стрелку из списка
                routeList.splice(index, 2);
            } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
        } else {
            console.log('Путь 6');
            //переводим mainWay стрелку на один вперед
            makeArrowToMain(routeList[index+3][0])
            //Далее удаляем по стандарту
            //получаем id стрелки после для ее удаления
            var arrowName = routeList[index+1][0];
            var arrowToDelete = document.getElementById(arrowName);
            //удаляем картинки
            if (imageToDelete && arrowToDelete) {
                topPanel.removeChild(imageToDelete);
                topPanel.removeChild(arrowToDelete);
                //удаляем изображение и стрелку из списка
                routeList.splice(index, 2);
            } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
        }
    } else {
        console.log('Путь 7');
        //просто стандартно удаляем
        //получаем id стрелки после для ее удаления
        var arrowName = routeList[index+1][0];
        var arrowToDelete = document.getElementById(arrowName);
        //удаляем картинки
        if (imageToDelete && arrowToDelete) {
            topPanel.removeChild(imageToDelete);
            topPanel.removeChild(arrowToDelete);
            //удаляем изображение и стрелку из списка
            routeList.splice(index, 2);
        } else { console.log('Изображение ' + imageToDelete + ' / ' + arrowToDelete + 'не найдено');}
    }

    //строим маршрут
}